const express = require("express");
const router = express.Router();
const transporter = require("../utils/mailTransporter.js");

router.post("/send-enquiry", async (req, res) => {

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {

    const mailOptions = {

      from: `"ELCS Website" <${process.env.ADMIN_EMAIL}>`,

      to: process.env.ADMIN_EMAIL,

      replyTo: email,

      subject: `New Contact Message from ${name}`,

      html: `
        <h3>New Message from Website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: "Enquiry Sent Successfully" });

  } catch (error) {

    console.log(error);
    res.status(500).json({ msg: "Failed to send enquiry" });

  }

});

module.exports = router;