# Products Admin Management System - Complete Setup

## Overview
Complete A-Z product management system with admin panel, MongoDB database, and dynamic features.

## What's Included

### 1. **Database Model** (`lib/models/Product.ts`)
- Product name, category, price, original price, discount
- Description, images (URLs), specifications
- Stock management (quantity, in/out of stock)
- Warranty and delivery options
- Rating and reviews count
- Maintenance mode toggle
- Active/inactive status

### 2. **API Endpoints** (`app/api/products/`)

#### GET `/api/products`
- Fetch all active products
- Returns products with string IDs for proper serialization

#### POST `/api/products`
- Create new product
- Validates required fields: name, category, price

#### PUT `/api/products/[id]`
- Update existing product
- Supports partial updates

#### DELETE `/api/products/[id]`
- Delete product permanently

### 3. **Admin Page** (`app/admin/products/page.tsx`)

#### Features:
- **Add/Edit/Delete Products** - Full CRUD operations
- **Product Form** - Two-column layout with all fields
- **Stock Management** - Toggle in/out of stock with quantity
- **Maintenance Mode** - Turn products on/off for maintenance
- **Headline/Announcement** - Scrolling text banner (right to left)
- **Search & Filter** - Find products by name or category
- **Product Table** - View all products with status indicators
- **Status Badges** - Show stock status and maintenance mode

#### Form Fields:
- **Left Column**:
  - Name, Category, Price, Original Price, Discount
  - Description, Stock Quantity
  - In Stock toggle, Maintenance toggle

- **Right Column**:
  - Warranty, Delivery, Rating, Reviews
  - Images (multiple URLs)
  - Specifications (multiple items)

### 4. **Headline/Announcement System**
- Scrolling text banner at top of admin page
- Moves from right to left continuously
- Edit button to update announcement
- Stored in component state (can be extended to database)

### 5. **Status Management**
- **In Stock / Out of Stock** - Toggle button
- **Maintenance Mode** - Toggle button with icon
- **Active/Inactive** - Managed in database

## How to Use

### Adding a Product
1. Go to `/admin/products`
2. Click "Add Product" button
3. Fill in all required fields (Name, Category, Price, Description)
4. Add images as URLs
5. Add specifications
6. Set warranty, delivery, rating, reviews
7. Click "Upload"

### Editing a Product
1. Find product in table
2. Click edit icon (pencil)
3. Modify fields
4. Click "Update"

### Managing Stock
1. Click "In Stock" or "Out" button to toggle
2. Update quantity in edit form

### Maintenance Mode
1. Click "Active" or "Maintenance" button to toggle
2. Product will show maintenance status

### Announcement/Headline
1. Click "Edit" button on banner
2. Enter announcement text
3. Click "Save"
4. Text scrolls from right to left

### Deleting a Product
1. Click delete icon (trash)
2. Confirm deletion

## Database Schema

```javascript
{
  name: String (required),
  category: String (required),
  price: Number (required),
  originalPrice: Number,
  discount: Number,
  description: String (required),
  images: [String],
  specs: [String],
  inStock: Boolean,
  stockQuantity: Number,
  warranty: String,
  delivery: String,
  rating: Number,
  reviews: Number,
  isMaintenance: Boolean,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Categories Available
- Drones
- Robotics
- Security
- Agriculture
- Infrastructure
- Emergency
- Environment
- Defence

## Warranty Options
- 1 Year
- 2 Years
- 3 Years

## Delivery Options
- 3-5 Business Days
- 5-7 Business Days
- 7-10 Business Days
- 10-14 Business Days
- 14-21 Business Days
- 21-30 Business Days

## Features Implemented

✅ Full CRUD operations
✅ Stock management (in/out of stock)
✅ Maintenance mode toggle
✅ Announcement/Headline system
✅ Search and filter
✅ Product table with status indicators
✅ Image URLs support
✅ Multiple specifications
✅ Rating and reviews
✅ Warranty and delivery options
✅ MongoDB integration
✅ Async params handling (Next.js 16)
✅ String ID serialization

## Next Steps (Optional)

1. **Orders Management** - Create orders page to view ordered products
2. **Analytics** - Add sales analytics and product performance
3. **Bulk Upload** - CSV import for multiple products
4. **Image Optimization** - Compress images before storing
5. **Inventory Alerts** - Notify when stock is low
6. **Product Reviews** - Manage customer reviews
7. **Pricing Rules** - Automatic discount calculations

## File Structure

```
lib/models/
  └── Product.ts

app/api/products/
  ├── route.ts (GET, POST)
  └── [id]/route.ts (PUT, DELETE)

app/admin/products/
  └── page.tsx (Admin management page)
```

## Notes

- All images are stored as URLs (not base64)
- Products are indexed in MongoDB for fast queries
- Maintenance mode doesn't delete products, just hides them
- Announcement text is stored in component state (can be moved to database)
- Stock status can be toggled without editing full product
- All timestamps are automatically managed by MongoDB

## Troubleshooting

### Products not showing?
- Check MongoDB connection in `.env.local`
- Verify products have `isActive: true`

### Images not displaying?
- Ensure image URLs are valid and accessible
- Check CORS settings if using external URLs

### Announcement not scrolling?
- Check CSS animation is applied
- Verify text is long enough to scroll

### Stock toggle not working?
- Check MongoDB connection
- Verify product ID is valid
- Check browser console for errors
