import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  serverTimestamp,
  getDoc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "./Cart.css";
const SERVER_URL = "http://localhost:5000";
export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [user, setUser] = useState(null);
  // 🔥 NEW STATES FOR ADDRESS
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();
  // ✅ Listen to Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  // ✅ Fetch Cart
  const fetchCart = async (uid) => {
    if (!uid) return;
    const snapshot = await getDocs(
      collection(db, "cart", uid, "items")
    );
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCartItems(items);
  };
  // 🔥 FETCH USER ADDRESSES FROM PROFILE
  const fetchUserAddresses = async (uid) => {
    if (!uid) return;
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      setUserAddresses(data.addresses || []);
    }
  };
  useEffect(() => {
    if (user) {
      fetchCart(user.uid);
      fetchUserAddresses(user.uid);
    }
  }, [user]);
  // ✅ Calculate Total
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );
  // ✅ Update Quantity
  const updateQuantity = async (productId, newQty) => {
    if (!user) return;
    if (newQty <= 0) {
      await removeItem(productId);
      return;
    }
    await updateDoc(
      doc(db, "cart", user.uid, "items", productId),
      { quantity: newQty }
    );
    fetchCart(user.uid);
  };
  // ✅ Remove Item
  const removeItem = async (productId) => {
    if (!user) return;
    await deleteDoc(doc(db, "cart", user.uid, "items", productId));
    fetchCart(user.uid);
  };
  // ✅ Clear Cart
  const clearCart = async () => {
    if (!user) return;
    const snapshot = await getDocs(
      collection(db, "cart", user.uid, "items")
    );
    const promises = snapshot.docs.map((docItem) =>
      deleteDoc(doc(db, "cart", user.uid, "items", docItem.id))
    );
    await Promise.all(promises);
    setCartItems([]);
  };
  // ✅ Place Order + Send Email
  const handlePlaceOrder = async () => {
    if (!user) {
      Swal.fire("Please login first");
      navigate("/login");
      return;
    }
    if (cartItems.length === 0) {
      Swal.fire("Your cart is empty!");
      return;
    }
    if (!selectedAddress) {
      Swal.fire("Please select Delivery Address!");
      return;
    }
    setLoading(true);
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};
      const customerName = userData.name || "";
      const customerPhone = userData.phone || "";
      // 1️⃣ Store Order
      const orderRef = await addDoc(collection(db, "orders"), {
        userId: user.uid,
        userEmail: user.email,
        customerName,
        customerPhone,
        items: cartItems,
        total: cartTotal,
        deliveryAddress: selectedAddress,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      console.log("Selected Address:", selectedAddress);
      // 2️⃣ Send Email
      await axios.post(`${SERVER_URL}/api/send-order-email`, {
        customerEmail: user.email,
        customerName,
        customerPhone,
        items: cartItems.map((item) => ({
          name: item.name,
          price: item.price || 0,
          quantity: item.quantity,
        })),
        total: cartTotal,
        orderDate: new Date().toLocaleString(),
        orderId: orderRef.id,
        deliveryAddress: selectedAddress
      });
      await clearCart();
      setOrderPlaced(true);
    } catch (error) {
      console.error("Order Error:", error);
      Swal.fire("Failed to place order");
    } finally {
      setLoading(false);
    }
  };
  if (orderPlaced) {
    return (
      <div className="cart-container">
        <h2>Product Enquiry Placed Successfully!</h2>
        <p>Confirmation email has been sent. Owner will approach you</p>
        <button className="btn btn-dark text-white" onClick={() => navigate("/products")}>
          Continue Shopping
        </button>
      </div>
    );
  }
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="btn-primary" onClick={() => navigate("/products")}>
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />

                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">₹{item.price || 0}</p>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="cart-item-subtotal">
                  ₹{(item.price || 0) * item.quantity}
                </div>
                <button className="cart-item-remove" onClick={() => removeItem(item.id)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
          {/* 🔥 ADDRESS SELECTION */}
          <div className="mt-3">
            <h5>Select Delivery Address</h5>
            <select
              className="form-select mb-3"
              onChange={(e) =>
                setSelectedAddress(
                  userAddresses.find((addr, i) => i == e.target.value)
                )
              }
            >
              <option value="">Select Address</option>
              {userAddresses.map((addr, index) => (
                <option key={index} value={index}>
                  {addr.name} - {addr.address} ({addr.type})
                </option>
              ))}
            </select>
          </div>
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>₹{cartTotal}</span>
            </div>
            <button
              className="btn-primary btn-place-order"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Placing Enquiry..." : "Place Enquiry for further details"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}