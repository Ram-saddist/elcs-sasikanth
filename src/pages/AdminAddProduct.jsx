import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  collection,
  doc,
  getDoc,
  addDoc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AdminAddProduct() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    imageUrl: "",
    manualUrl: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        console.log("Logged in user:", currentUser?.uid);
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);

        // Check if current user is an admin
        const adminRef = doc(db, "admins", currentUser.uid);
        const snapshot = await getDoc(adminRef);
        console.log(snapshot,adminRef)
        if (snapshot.exists()) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "products"), form);
      alert("✅ Product added successfully!");
      setForm({
        name: "",
        description: "",
        category: "",
        imageUrl: "",
        manualUrl: ""
      });
    } catch (err) {
      console.error("Error adding product:", err);
      alert("❌ Failed to add product.");
    }
  };

  if (user && !isAdmin) {
    return (
      <div className="container mt-5">
        <h3 className="text-danger">⛔ Access Denied. Admins only.</h3>
      </div>
    );
  }
  if (!user) {
  return <div className="container mt-5"><h4>Checking access...</h4></div>;
}

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4">Add New Product (Admin)</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL (Google Drive)</label>
          <input
            type="url"
            className="form-control"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            required />
        </div>

        <div className="mb-3">
          <label className="form-label">Manual PDF URL (Google Drive)</label>
          <input
            type="url"
            className="form-control"
            value={form.manualUrl}
            onChange={(e) => setForm({ ...form, manualUrl: e.target.value })}
            required />
        </div>

        <button type="submit" className="btn btn-primary w-100">Add Product</button>
      </form>
    </div>
  );
}
