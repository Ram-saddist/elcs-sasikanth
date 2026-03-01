import { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment
} from "firebase/firestore";
import Swal from "sweetalert2";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [user, setUser] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      setUser(userData);
    });
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
      setFiltered(data);
      const uniqueCategories = [
        "All",
        ...new Set(data.map((prod) => prod.category)),
      ];
      setCategories(uniqueCategories);
    };
    fetchProducts();
  }, []);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((prod) => prod.category === category));
    }
  };
  const handleAddToCart = async (product) => {
    if (!user) {
      Swal.fire("Please login first");
      navigate("/login");
      return;
    }
    try {
      const cartRef = doc(
        db,
        "cart",
        user.uid,
        "items",
        product.id
      );
      const cartSnap = await getDoc(cartRef);
      if (cartSnap.exists()) {
        await updateDoc(cartRef, {
          quantity: increment(1)
        });
      } else {
        await setDoc(cartRef, {
          name: product.name,
          imageUrl: product.imageUrl,
          category: product.category,
          manualUrl: product.manualUrl,
          quantity: 1,
          addedAt: new Date()
        });
      }
      Swal.fire("Item added to cart. Go and check once");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDownload = (url) => {
    if (user) {
      window.open(url, "_blank");
    } else {
      alert("Please log in to download the manual.");
      navigate("/login");
    }
  };
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Products</h2>
      {/* Category Filters */}
      <div className="mb-4 text-center">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn btn-outline-primary m-1 ${selectedCategory === cat ? "active" : ""
              }`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Product Grid */}
      <div className="row">
        {filtered.map((prod) => (
          <div className="col-md-4 mb-4" key={prod.id}>
            <div className="card h-100 shadow-sm">
              <div className="text-center p-3">
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="img-fluid"
                  style={{ height: "200px", objectFit: "contain" }}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{prod.name}</h5>
                <p className="card-text">{prod.description}</p>

                <div className="mt-auto">
                  <button
                    className="btn btn-sm btn-outline-success me-2"
                    onClick={() => handleDownload(prod.manualUrl)}
                  >
                    Download Manual
                  </button>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleAddToCart(prod)}
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}