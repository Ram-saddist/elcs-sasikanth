import axios from "axios";
import { useState } from "react"; import "./Footer.css";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "https://sasikanth-elcs.onrender.com/api/contact/send-enquiry",
        formData
      );
      //https://sasikanth-elcs.onrender.com http://localhost:5000

      alert(res.data.msg);

      setFormData({
        name: "",
        email: "",
        message: ""
      });

    } catch (err) {
      alert("Failed to send enquiry");
    }
  };
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5 footer-shadow footer">

      <div className="container">
        <div className="row gy-4">

          {/* Company Address */}
          <div className="col-md-3">
            <h5 className="fw-bold">ELCS Pvt Ltd</h5>
            <p className="mb-1">Ambapuram - 6th line</p>
            <p className="mb-1">Vijayawada, AP 520012</p>
            <p className="mb-1">India</p>
          </div>

          {/* Contact Info */}
          <div className="col-md-3">
            <h6 className="fw-semibold text-white">Contact</h6>
            <p className="mb-1"><strong>Email:</strong> elcs.1126.main@gmail.com</p>
            <p className="mb-1"><strong>WhatsApp:</strong> 7382382685</p>
            <p className="mb-1"><strong>Phone:</strong> 7382382685</p>
          </div>

          {/* Social Links */}
          <div className="col-md-3">
            <h6 className="fw-semibold text-white">Follow Us</h6>
            <div className="d-flex gap-3 fs-4">
              <a target="_blank" href="https://www.linkedin.com/company/embedded-labs-and-control-systems/?viewAsMember=true" className="text-light text-decoration-none"> 
              <i class="fa-brands fa-linkedin"></i></a>
              <a target="_blank" href="https://www.instagram.com/elcs_electronics?igsh=MWFmdWpjMW9odnV0OA" className="text-light text-decoration-none">
              <i class="fa-brands fa-instagram"></i></a>
              <a target="_blank" href="#" className="text-light text-decoration-none">
                <i class="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* ✅ NEW: Contact Form */}
          <div className="col-md-3">
            <h6 className="fw-semibold text-white">Quick Message</h6>
            <form className="footer-form" onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                className="form-control mb-2"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                className="form-control mb-2"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                className="form-control mb-2"
                rows="3"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit" className="btn btn-primary w-100">
                Send Message
              </button>

            </form>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center text-secondary mt-4 pt-3 border-top">
          © {new Date().getFullYear()} ELCS Pvt Ltd. All rights reserved.
        </div>

      </div>
    </footer>
  );
}