import mongoose from 'mongoose';

const industrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide industry name'],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide industry description'],
    },
    icon: {
      type: String,
      default: '🏭',
    },
    image: {
      type: String,
      default: '',
      // Limit to 1MB for base64 images
      validate: {
        validator: function(v: string) {
          return !v || v.length < 1048576; // 1MB in bytes
        },
        message: 'Image is too large. Please use a smaller image or URL.',
      },
    },
    learnMoreContent: {
      type: String,
      default: '',
    },
    solutions: [
      {
        title: String,
        description: String,
      },
    ],
    benefits: [String],
    caseStudies: [String],
    isActive: {
      type: Boolean,
      default: true,
      index: true,
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
  { timestamps: true }
);

export default mongoose.models.Industry || mongoose.model('Industry', industrySchema);
