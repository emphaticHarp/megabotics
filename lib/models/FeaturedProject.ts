import mongoose from 'mongoose';

const featuredProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide project title'],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide project description'],
    },
    image: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Please provide project category'],
      index: true,
    },
    technologies: [String],
    highlights: [String],
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
  { timestamps: true, strict: true, collection: 'featuredprojects' }
);

// Delete the model if it exists to force recreation
if (mongoose.models.FeaturedProject) {
  delete mongoose.models.FeaturedProject;
}

export default mongoose.model('FeaturedProject', featuredProjectSchema);
