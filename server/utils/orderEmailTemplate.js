const generateOrderEmailTemplate = ({
  customerEmail,
  customerName,
  customerPhone,
  items,
  total,
  orderDate,
  orderId,
  deliveryAddress
}) => {

  const productList = items.map(item => `
    <tr>
      <td style="padding:8px;border:1px solid #ddd;">${item.name}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:center;">${item.quantity}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:right;">₹${item.price || 0}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:right;">
        ₹${(item.price || 0) * item.quantity}
      </td>
    </tr>
  `).join("");

  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">

    <h2 style="color:#1a5cff;">New Order Received!</h2>
    <hr/>

    <h3>Order ID: ${orderId}</h3>

    <h3>Customer Details:</h3>
    <p><strong>Name:</strong> ${customerName || "N/A"}</p>
    <p><strong>Email:</strong> ${customerEmail}</p>
    <p><strong>Phone:</strong> ${customerPhone || "N/A"}</p>
    <p><strong>Order Date:</strong> ${orderDate}</p>

    <hr/>

    <h3>Delivery Address:</h3>
    <p>
      <strong>${deliveryAddress?.name || ""}</strong><br/>
      ${deliveryAddress?.address || ""}<br/>
      📞 ${deliveryAddress?.contact || ""}
    </p>

    <hr/>

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
};

module.exports = generateOrderEmailTemplate;