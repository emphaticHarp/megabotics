const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  country: { type: String, default: 'India' },
  profileImage: String,
  isVerified: { type: Boolean, default: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGODB_URI not found in .env.local');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@megabotics.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@megabotics.com',
      password: hashedPassword,
      phone: '+91-1800-MEGABOT',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      role: 'admin',
      isVerified: true,
    });

    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@megabotics.com');
    console.log('Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
