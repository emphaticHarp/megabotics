const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://megabotics:869412%40Soumya@cluster0.glovzbd.mongodb.net/?appName=Cluster0';

async function checkData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log('Collections in database:');
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`  - ${collection.name}: ${count} documents`);
    }

    console.log('\n--- Checking specific collections ---\n');

    // Check Products
    const products = await db.collection('products').find({}).limit(2).toArray();
    console.log('Products sample:', products.length > 0 ? JSON.stringify(products[0], null, 2) : 'No products found');

    // Check Orders
    const orders = await db.collection('orders').find({}).limit(2).toArray();
    console.log('\nOrders sample:', orders.length > 0 ? JSON.stringify(orders[0], null, 2) : 'No orders found');

    // Check Users
    const users = await db.collection('users').find({}).limit(2).toArray();
    console.log('\nUsers sample:', users.length > 0 ? JSON.stringify(users[0], null, 2) : 'No users found');

    // Check Industries
    const industries = await db.collection('industries').find({}).limit(2).toArray();
    console.log('\nIndustries sample:', industries.length > 0 ? JSON.stringify(industries[0], null, 2) : 'No industries found');

    // Check Featured Projects
    const projects = await db.collection('featuredprojects').find({}).limit(2).toArray();
    console.log('\nFeatured Projects sample:', projects.length > 0 ? JSON.stringify(projects[0], null, 2) : 'No featured projects found');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkData();
