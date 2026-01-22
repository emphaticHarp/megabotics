# Quick Start - MongoDB Authentication

## 🚀 Get Started in 3 Steps

### Step 1: Whitelist Your IP (5 minutes)
1. Go to: https://cloud.mongodb.com/
2. Log in with your MongoDB account
3. Select **Cluster0**
4. Click **Network Access** (left sidebar)
5. Click **Add IP Address**
6. Enter: `0.0.0.0/0` (for development)
7. Click **Confirm**
8. Wait 5-10 minutes

### Step 2: Start the Dev Server
```bash
npm run dev
```

### Step 3: Test Authentication
1. Open http://localhost:3000
2. Click **Sign In / Sign Up** button
3. Click **Sign Up** tab
4. Fill in the form:
   - Email: `test@example.com`
   - Full Name: `Test User`
   - Password: `TestPass123` (must have uppercase, lowercase, number)
   - Confirm Password: `TestPass123`
   - Check "I agree to Terms & Conditions"
5. Click **Create Account**
6. You should see success message and user name in navbar

---

## 🔑 Test Credentials

After registration, you can log in with:
- **Email:** test@example.com
- **Password:** TestPass123

---

## 📱 Features to Try

### Login
1. Click **Sign In / Sign Up**
2. Enter email and password
3. Click **Sign In**
4. See your name in navbar

### Logout
1. Click your name in navbar
2. Click **Logout** button
3. You'll be logged out

### Remember Me
- Check "Remember me" during login
- Your session will persist

### Forgot Password
- Click "Forgot Password?" link
- Follow the OTP verification flow

---

## 🛠️ Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Check for errors
npm run build
```

---

## 📂 Key Files

| File | Purpose |
|------|---------|
| `lib/auth-context.tsx` | Auth state management |
| `components/auth-modal.tsx` | Login/Register UI |
| `components/navbar.tsx` | User display & logout |
| `app/api/auth/login/route.ts` | Login endpoint |
| `app/api/auth/register/route.ts` | Registration endpoint |
| `lib/models/User.ts` | User database schema |
| `.env.local` | Environment variables |

---

## ✅ Checklist

- [ ] MongoDB Atlas IP whitelisted
- [ ] Dev server running (`npm run dev`)
- [ ] Can see "Sign In / Sign Up" button
- [ ] Can register new account
- [ ] Can log in with registered account
- [ ] User name shows in navbar
- [ ] Can log out
- [ ] Page refresh keeps you logged in

---

## 🐛 If Something Goes Wrong

1. **Check MongoDB connection:**
   - Verify IP is whitelisted
   - Wait 5-10 minutes after whitelisting
   - Check `.env.local` has correct URI

2. **Check dev server:**
   - Stop server (Ctrl+C)
   - Run `npm run dev` again
   - Check for error messages

3. **Check browser:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for error messages
   - Check Network tab for failed requests

4. **See detailed help:**
   - Read `TROUBLESHOOTING.md`
   - Read `MONGODB_SETUP.md`
   - Read `AUTH_IMPLEMENTATION_SUMMARY.md`

---

## 🎯 What's Next?

After authentication is working:
- [ ] Add email verification
- [ ] Add password reset email
- [ ] Add user profile page
- [ ] Add social login (Google, Facebook)
- [ ] Add two-factor authentication
- [ ] Add role-based access control

---

## 📞 Support

For detailed information, see:
- `MONGODB_SETUP.md` - MongoDB configuration
- `TROUBLESHOOTING.md` - Common issues
- `AUTH_IMPLEMENTATION_SUMMARY.md` - Complete implementation details
