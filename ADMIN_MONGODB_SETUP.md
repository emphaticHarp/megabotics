# Admin Panel MongoDB Setup Guide

## Overview
The admin panel now uses real MongoDB authentication instead of demo credentials. All admin users must be registered in the database with admin role.

## Setup Steps

### 1. Verify MongoDB Connection
Make sure your `.env.local` has the correct MongoDB URI:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/megabotics?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here
```

### 2. Create Admin User
Run the following command to create the default admin user:
```bash
npm run create-admin
```

This will create an admin account with:
- **Email**: admin@megabotics.com
- **Password**: admin123

### 3. Login to Admin Panel
1. Go to `http://localhost:3001/admin/login`
2. Enter the credentials above
3. Click "Sign In"
4. You'll be redirected to the admin dashboard

## How It Works

### Admin Login Flow
1. User enters email and password on `/admin/login`
2. Request sent to `/api/auth/admin-login` endpoint
3. API validates credentials against MongoDB
4. Checks if user has `role: 'admin'`
5. If valid, generates JWT token
6. Token stored in localStorage
7. User redirected to `/admin/dashboard`

### API Endpoint
**POST** `/api/auth/admin-login`

Request body:
```json
{
  "email": "admin@megabotics.com",
  "password": "admin123"
}
```

Response (success):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "Admin User",
    "email": "admin@megabotics.com",
    "role": "admin"
  }
}
```

Response (error):
```json
{
  "error": "Invalid credentials"
}
```

## Creating Additional Admin Users

### Option 1: Using MongoDB Compass
1. Connect to your MongoDB database
2. Go to `megabotics` database → `users` collection
3. Insert a new document:
```json
{
  "name": "New Admin",
  "email": "newadmin@megabotics.com",
  "password": "hashed_password_here",
  "role": "admin",
  "isVerified": true,
  "country": "India",
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

### Option 2: Create a Registration Script
Create `scripts/add-admin.js`:
```javascript
// Similar to create-admin.js but with custom email/password
```

## Security Features

✅ **Password Hashing** - Passwords hashed with bcryptjs (10 salt rounds)
✅ **JWT Tokens** - Secure token-based authentication
✅ **Role-Based Access** - Only users with `role: 'admin'` can login
✅ **Token Expiration** - Tokens expire after 7 days
✅ **Error Handling** - Generic error messages to prevent user enumeration

## Database Schema

Admin users are stored in the `users` collection with:
```typescript
{
  name: string,
  email: string (unique),
  password: string (hashed),
  phone: string,
  address: string,
  city: string,
  state: string,
  zipCode: string,
  country: string,
  profileImage: string,
  isVerified: boolean,
  role: 'admin' | 'user',
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### "Invalid credentials" error
- Check email and password are correct
- Verify user exists in MongoDB
- Ensure user has `role: 'admin'`

### "MongoDB connection failed"
- Check MONGODB_URI in `.env.local`
- Verify MongoDB cluster is running
- Check network access in MongoDB Atlas

### "Access denied. Admin privileges required."
- User exists but doesn't have admin role
- Update user document: `role: 'admin'`

## Next Steps

1. ✅ Admin login working with MongoDB
2. Create admin user management page
3. Add admin registration endpoint
4. Implement admin role verification on all admin pages
5. Add audit logging for admin actions
6. Implement 2FA for admin accounts

## Files Modified/Created

- `app/admin/login/page.tsx` - Updated to use MongoDB API
- `app/api/auth/admin-login/route.ts` - New API endpoint
- `scripts/create-admin.js` - Script to create admin user
- `package.json` - Added `create-admin` script
- `ADMIN_MONGODB_SETUP.md` - This file
