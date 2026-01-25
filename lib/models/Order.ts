import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    userId: {
      type: String,
      default: null,
    },
    customerName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    items: [
      {
        productId: String,
        productName: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    couponCode: {
      type: String,
      default: null,
    },
    couponDiscount: {
      type: Number,
      default: 0,
    },
    paymentMethod: {
      type: String,
      enum: ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Wallet'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
      default: 'Pending',
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    trackingNumber: {
      type: String,
      default: null,
    },
    notes: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, strict: true }
);

if (mongoose.models.Order) {
  delete mongoose.models.Order;
}

export default mongoose.model('Order', orderSchema);
