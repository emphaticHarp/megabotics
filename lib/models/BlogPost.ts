import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: 'Admin',
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    tags: [String],
    image: {
      type: String,
      default: null,
    },
    views: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
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

if (mongoose.models.BlogPost) {
  delete mongoose.models.BlogPost;
}

export default mongoose.model('BlogPost', blogPostSchema);
