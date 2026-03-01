const express = require("express");
const transporter = require("../utils/mailTransporter");
const generateOrderEmailTemplate = require("../utils/orderEmailTemplate");

const router = express.Router();

router.post("/send-order-email", async (req, res) => {
  const {
  customerEmail,
  customerName,
  customerPhone,
  items,
  total,
  orderDate,
  orderId,
  deliveryAddress
} = req.body;

  try {
    const emailHTML = generateOrderEmailTemplate({
  customerEmail,
  customerName,
  customerPhone,
  items,
  total,
  orderDate,
  orderId,
  deliveryAddress
});

    // 📩 ADMIN EMAIL
    const adminMailOptions = {
      from: `"ELCS Orders" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: customerEmail,
      subject: `🛒 New Order from ${customerName || customerEmail}`,
      html: emailHTML,
    };

    // 📩 CUSTOMER EMAIL
    const customerMailOptions = {
      from: `"ELCS Pvt Ltd" <${process.env.ADMIN_EMAIL}>`,
      to: customerEmail,
      subject: "✅ Your Order has been Placed Successfully!",
      html: emailHTML,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(customerMailOptions);

    res.json({ success: true, message: "Order emails sent successfully" });

  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

module.exports = router;