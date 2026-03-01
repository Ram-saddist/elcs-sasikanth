import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await user.reload(); // Refresh user's emailVerified flag

      if (!user.emailVerified) {
        alert("❌ Email not verified. Register once again and check email for latest verification link.");

        // Delete user from Firestore if exists
        try {
          await deleteDoc(doc(db, "users", user.uid));
        } catch (firestoreErr) {
          console.warn("No Firestore record to delete or already removed.");
        }

        // Delete user from Firebase Auth
        await deleteUser(user);
        navigate("/register")
        return;
      }

      navigate("/profile"); // ✅ Verified → continue
    } catch (err) {
      console.error(err);
      setError("Login failed: " + err.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Login</h2>

      {error && (
        <div className="alert alert-danger" role="alert">{error}</div>
      )}

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>

        <p className="mt-3">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
}