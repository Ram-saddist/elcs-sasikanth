import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase/config";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [registeredUser, setRegisteredUser] = useState(null);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Send verification email
      await sendEmailVerification(user);
      setRegisteredUser(user);
      alert("✅ Registration successful! Please check your email to verify.");
      navigate("/login");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("❌ This email is already registered. Try logging in.");
      } else if (err.code === "auth/weak-password") {
        setError("❌ Password should be at least 6 characters.");
      } else {
        setError("❌ Registration failed: " + err.message);
      }
    }
  };
  // Optional: Resend verification
  const resendVerification = async () => {
    if (registeredUser) {
      try {
        await sendEmailVerification(registeredUser);
        alert("📧 Verification email resent.");
      } catch (err) {
        alert("Error resending verification: " + err.message);
      }
    }
  };
  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Register Account</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleRegister}>
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
          <label className="form-label">Password (min 6 characters)</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Re-enter password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
      {/* Optional resend verification */}
      {registeredUser && (
        <div className="text-center mt-3">
          <button onClick={resendVerification} className="btn btn-outline-info btn-sm">
            Resend Verification Email
          </button>
        </div>
      )}
      <p className="mt-3">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}