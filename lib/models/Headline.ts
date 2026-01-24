import mongoose from 'mongoose';

const headlineSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: false,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, strict: true }
);

if (mongoose.models.Headline) {
  delete mongoose.models.Headline;
}

export default mongoose.model('Headline', headlineSchema);
