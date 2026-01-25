import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendOrderConfirmationEmail(
  customerEmail: string,
  customerName: string,
  orderId: string,
  orderDetails: any
) {
  try {
    const itemsList = orderDetails.items
      .map((item: any) => `<li>${item.productName} x${item.quantity} - ₹${item.price.toLocaleString()}</li>`)
      .join('');

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(to right, #0891b2, #06b6d4); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Order Confirmation</h1>
          <p style="margin: 5px 0 0 0;">Megabotics</p>
        </div>
        
        <div style="padding: 20px; background: #f9fafb;">
          <p>Hi ${customerName},</p>
          <p>Thank you for your order! We're excited to process it.</p>
          
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Order Details</h3>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
            
            <h4>Items:</h4>
            <ul style="list-style: none; padding: 0;">
              ${itemsList}
            </ul>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 15px 0;">
            
            <div style="display: flex; justify-content: space-between; font-size: 16px;">
              <span><strong>Subtotal:</strong></span>
              <span>₹${(orderDetails.subtotal / 1000).toFixed(0)}K</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 16px;">
              <span><strong>Delivery Charge:</strong></span>
              <span>₹${orderDetails.deliveryCharge}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #0891b2; margin-top: 10px;">
              <span>Total:</span>
              <span>₹${(orderDetails.totalAmount / 1000).toFixed(0)}K</span>
            </div>
          </div>
          
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0;">Shipping Address</h4>
            <p style="margin: 5px 0;">
              ${orderDetails.address}<br>
              ${orderDetails.city}, ${orderDetails.state} - ${orderDetails.pincode}
            </p>
          </div>
          
          <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0891b2;">
            <p style="margin: 0;"><strong>What's Next?</strong></p>
            <p style="margin: 5px 0 0 0;">We'll send you a tracking number once your order ships. You can track your order status anytime.</p>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            If you have any questions, please contact us at support@megabotics.com
          </p>
        </div>
        
        <div style="background: #f3f4f6; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #666;">
          <p style="margin: 0;">© 2026 Megabotics. All rights reserved.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: `Order Confirmation - ${orderId}`,
      html: htmlContent,
    });

    console.log(`Order confirmation email sent to ${customerEmail}`);
    return true;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return false;
  }
}

export async function sendOrderStatusUpdateEmail(
  customerEmail: string,
  customerName: string,
  orderId: string,
  status: string,
  trackingNumber?: string
) {
  try {
    const statusMessages: Record<string, string> = {
      Processing: 'Your order is being prepared for shipment.',
      Shipped: `Your order has been shipped! Tracking number: ${trackingNumber || 'N/A'}`,
      Delivered: 'Your order has been delivered. Thank you for shopping with us!',
      Cancelled: 'Your order has been cancelled. A refund will be processed shortly.',
    };

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(to right, #0891b2, #06b6d4); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Order Status Update</h1>
        </div>
        
        <div style="padding: 20px; background: #f9fafb;">
          <p>Hi ${customerName},</p>
          <p>${statusMessages[status] || 'Your order status has been updated.'}</p>
          
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Status:</strong> <span style="color: #0891b2; font-weight: bold;">${status}</span></p>
            ${trackingNumber ? `<p><strong>Tracking Number:</strong> ${trackingNumber}</p>` : ''}
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            If you have any questions, please contact us at support@megabotics.com
          </p>
        </div>
        
        <div style="background: #f3f4f6; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #666;">
          <p style="margin: 0;">© 2026 Megabotics. All rights reserved.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: `Order Status Update - ${orderId}`,
      html: htmlContent,
    });

    console.log(`Order status email sent to ${customerEmail}`);
    return true;
  } catch (error) {
    console.error('Error sending order status email:', error);
    return false;
  }
}

export async function sendWelcomeEmail(customerEmail: string, customerName: string) {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(to right, #0891b2, #06b6d4); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Welcome to Megabotics!</h1>
        </div>
        
        <div style="padding: 20px; background: #f9fafb;">
          <p>Hi ${customerName},</p>
          <p>Welcome to Megabotics! We're thrilled to have you join our community of robotics and automation enthusiasts.</p>
          
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">What You Can Do:</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="padding: 8px 0;">✓ Browse our extensive product catalog</li>
              <li style="padding: 8px 0;">✓ Create a wishlist of your favorite products</li>
              <li style="padding: 8px 0;">✓ Track your orders in real-time</li>
              <li style="padding: 8px 0;">✓ Get exclusive deals and offers</li>
              <li style="padding: 8px 0;">✓ Read industry insights and blog posts</li>
            </ul>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            If you have any questions, please contact us at support@megabotics.com
          </p>
        </div>
        
        <div style="background: #f3f4f6; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #666;">
          <p style="margin: 0;">© 2026 Megabotics. All rights reserved.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: 'Welcome to Megabotics!',
      html: htmlContent,
    });

    console.log(`Welcome email sent to ${customerEmail}`);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
}
