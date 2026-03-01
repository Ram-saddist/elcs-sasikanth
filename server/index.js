const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
// cors() - Allows React app (localhost:5173) to call this server (localhost:5000)
app.use(cors());
// express.json() - Parses incoming JSON data from React's fetch() request
app.use(express.json());

// Create Nodemailer transporter (Gmail configuration)
// This is like setting up your "email sender" - it logs into Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,    // Your admin Gmail
    pass: process.env.ADMIN_PASSWORD, // Gmail App Password
  },
});

// API Route: Send order email to admin
// When React calls: fetch("http://localhost:5000/api/send-order-email", ...)
// This function runs:
app.post("/api/send-order-email", async (req, res) => {
  // req.body contains the data sent from React
  const { customerEmail, customerName, customerPhone, items, total, orderDate } = req.body;

  // Format the product list for the email
  const productList = items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px;border:1px solid #ddd;">${item.name}</td>
          <td style="padding:8px;border:1px solid #ddd;text-align:center;">${item.quantity}</td>
          <td style="padding:8px;border:1px solid #ddd;text-align:right;">₹${item.price || 0}</td>
          <td style="padding:8px;border:1px solid #ddd;text-align:right;">₹${(item.price || 0) * item.quantity}</td>
        </tr>`
    )
    .join("");

  // HTML email template - this is what the admin sees in their inbox
  const emailHTML = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#1a5cff;">New Order Received!</h2>
      <hr/>

      <h3>Customer Details:</h3>
      <p><strong>Name:</strong> ${customerName || "N/A"}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <p><strong>Phone:</strong> ${customerPhone || "N/A"}</p>
      <p><strong>Order Date:</strong> ${orderDate}</p>

      <h3>Products Ordered:</h3>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:#f5f5f5;">
            <th style="padding:8px;border:1px solid #ddd;text-align:left;">Product</th>
            <th style="padding:8px;border:1px solid #ddd;">Qty</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:right;">Price</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:right;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${productList}
        </tbody>
      </table>

      <h3 style="text-align:right;color:#1a5cff;">Total: ₹${total}</h3>
    </div>
  `;

  // Email options - who sends, who receives, subject, content
  const mailOptions = {
    from: process.env.ADMIN_EMAIL,       // Sender (admin Gmail)
    to: process.env.ADMIN_EMAIL,         // Receiver (same admin Gmail)
    subject: `New Order from ${customerName || customerEmail}`,
    html: emailHTML,                     // HTML formatted email
  };

  try {
    // Send the email using Nodemailer
    await transporter.sendMail(mailOptions);
    console.log("Order email sent to admin:", process.env.ADMIN_EMAIL);
    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
