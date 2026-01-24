const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const industrySchema = new mongoose.Schema({
  name: String,
  description: String,
  icon: String,
  image: String,
  learnMoreContent: String,
  solutions: [{ title: String, description: String }],
  benefits: [String],
  caseStudies: [String],
  isActive: { type: Boolean, default: true },
  order: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Industry = mongoose.model('Industry', industrySchema);

const industriesData = [
  {
    name: 'Agriculture',
    description: 'Smart farming solutions with drones and IoT sensors for crop monitoring and optimization',
    icon: '🌾',
    order: 1,
    learnMoreContent: 'Our agricultural solutions use advanced drone technology and AI-powered analytics to help farmers optimize crop yields, reduce water usage, and detect diseases early. We provide real-time monitoring of soil conditions, weather patterns, and crop health.',
    solutions: [
      { title: 'Crop Monitoring', description: 'Real-time aerial monitoring of crop health' },
      { title: 'Precision Irrigation', description: 'Automated irrigation based on soil moisture' },
      { title: 'Pest Detection', description: 'Early detection of pests and diseases' },
    ],
    benefits: ['Increased yield by 30%', 'Reduced water usage by 40%', 'Lower pesticide costs'],
  },
  {
    name: 'Defense',
    description: 'Advanced surveillance and security systems for military and defense applications',
    icon: '🛡️',
    order: 2,
    learnMoreContent: 'We provide cutting-edge defense solutions including autonomous surveillance systems, border patrol drones, and advanced threat detection systems. Our technology ensures maximum security with minimal human intervention.',
    solutions: [
      { title: 'Border Surveillance', description: 'Autonomous border patrol systems' },
      { title: 'Threat Detection', description: 'AI-powered threat identification' },
      { title: 'Secure Communication', description: 'Encrypted communication systems' },
    ],
    benefits: ['24/7 surveillance coverage', 'Real-time threat alerts', 'Reduced operational costs'],
  },
  {
    name: 'Infrastructure',
    description: 'Inspection and maintenance solutions for bridges, roads, and buildings',
    icon: '🏗️',
    order: 3,
    learnMoreContent: 'Our infrastructure inspection robots and drones provide detailed analysis of structural integrity, identify maintenance needs, and reduce inspection time by 80%. Perfect for bridges, tunnels, and high-rise buildings.',
    solutions: [
      { title: 'Bridge Inspection', description: 'Automated bridge structural analysis' },
      { title: 'Building Inspection', description: 'High-rise building facade inspection' },
      { title: 'Pipeline Monitoring', description: 'Underground pipeline inspection' },
    ],
    benefits: ['80% faster inspections', 'Improved safety', 'Detailed reports'],
  },
  {
    name: 'Environment',
    description: 'Environmental monitoring and conservation solutions using advanced sensors',
    icon: '🌍',
    order: 4,
    learnMoreContent: 'Monitor air quality, water pollution, and wildlife populations with our comprehensive environmental monitoring systems. Help protect ecosystems and ensure regulatory compliance.',
    solutions: [
      { title: 'Air Quality Monitoring', description: 'Real-time air pollution tracking' },
      { title: 'Water Quality Analysis', description: 'Automated water testing systems' },
      { title: 'Wildlife Tracking', description: 'GPS-based animal population monitoring' },
    ],
    benefits: ['Real-time data', 'Regulatory compliance', 'Conservation support'],
  },
  {
    name: 'Robotics',
    description: 'Industrial automation and robotic solutions for manufacturing and logistics',
    icon: '🤖',
    order: 5,
    learnMoreContent: 'Transform your manufacturing with our collaborative robots and automation systems. Increase productivity, improve quality, and reduce labor costs with our intelligent robotic solutions.',
    solutions: [
      { title: 'Assembly Automation', description: 'Automated assembly line robots' },
      { title: 'Welding Robots', description: 'Precision welding automation' },
      { title: 'Logistics Automation', description: 'Warehouse automation systems' },
    ],
    benefits: ['Increased productivity', 'Better quality control', 'Cost reduction'],
  },
  {
    name: 'Disaster Management',
    description: 'Emergency response and disaster relief solutions using drones and robots',
    icon: '🚨',
    order: 6,
    learnMoreContent: 'Rapid response to natural disasters with our specialized drones and robots. Assess damage, locate survivors, and deliver aid in areas inaccessible to humans.',
    solutions: [
      { title: 'Damage Assessment', description: 'Aerial damage evaluation' },
      { title: 'Survivor Detection', description: 'Thermal imaging for survivor location' },
      { title: 'Supply Delivery', description: 'Autonomous supply delivery drones' },
    ],
    benefits: ['Faster response time', 'Reduced risk to personnel', 'Better coordination'],
  },
];

async function seedIndustries() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGODB_URI not found in .env.local');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing industries
    await Industry.deleteMany({});
    console.log('Cleared existing industries');

    // Insert new industries
    const result = await Industry.insertMany(industriesData);
    console.log(`✅ ${result.length} industries seeded successfully!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding industries:', error);
    process.exit(1);
  }
}

seedIndustries();
