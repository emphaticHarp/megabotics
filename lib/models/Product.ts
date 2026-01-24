import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide product category'],
      index: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
    },
    originalPrice: {
      type: Number,
      default: null,
    },
    discount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
    },
    images: [String],
    specs: [String],
    inStock: {
      type: Boolean,
      default: true,
      index: true,
    },
    stockQuantity: {
      type: Number,
      default: 0,
    },
    warranty: {
      type: String,
      default: '1 Year',
    },
    delivery: {
      type: String,
      default: '3-5 Business Days',
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    reviewsDistribution: {
      type: Map,
      of: Number,
      default: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    isMaintenance: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
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

if (mongoose.models.Product) {
  delete mongoose.models.Product;
}

export default mongoose.model('Product', productSchema);
