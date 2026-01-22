// Quick MongoDB connection test
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://megabotics:869412%40Soumya@cluster0.glovzbd.mongodb.net/?appName=Cluster0';

console.log('Testing MongoDB connection...');
console.log('URI:', MONGODB_URI);
console.log('');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ SUCCESS: Connected to MongoDB!');
    console.log('Connection details:');
    console.log('- Host:', mongoose.connection.host);
    console.log('- Database:', mongoose.connection.name);
    console.log('- State:', mongoose.connection.readyState === 1 ? 'Connected' : 'Not connected');
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((error) => {
    console.log('❌ FAILED: Could not connect to MongoDB');
    console.log('Error:', error.message);
    console.log('');
    console.log('Troubleshooting steps:');
    console.log('1. Wait 5-15 minutes for IP whitelist to propagate');
    console.log('2. Verify IP address is correct: 223.239.85.220');
    console.log('3. Check MongoDB credentials are correct');
    console.log('4. Verify cluster name is "cluster0"');
    console.log('5. Try adding 0.0.0.0/0 temporarily for testing');
    process.exit(1);
  });
