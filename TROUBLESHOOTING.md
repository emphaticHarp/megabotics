# Authentication Troubleshooting Guide

## Common Issues and Solutions

### 1. "Could not connect to any servers in your MongoDB Atlas cluster"

**Cause:** Your IP address is not whitelisted in MongoDB Atlas.

**Solution:**
1. Go to https://cloud.mongodb.com/
2. Select your cluster (Cluster0)
3. Click **Network Access** in the left sidebar
4. Click **Add IP Address**
5. Enter your public IP or `0.0.0.0/0` for development
6. Wait 5-10 minutes for changes to propagate
7. Try again

---

### 2. "Email already registered"

**Cause:** You're trying to register with an email that already exists in the database.

**Solution:**
- Use a different email address
- Or log in with the existing account if you remember the password

---

### 3. "Invalid email or password"

**Cause:** Either the email doesn't exist or the password is incorrect.

**Solution:**
- Double-check the email address
- Verify the password is correct
- Use the "Forgot Password" feature if needed

---

### 4. "useAuth must be used within AuthProvider"

**Cause:** A component using `useAuth()` is being rendered outside the `AuthProvider`.

**Solution:**
- Ensure `AuthProvider` wraps the entire app in `app/layout.tsx`
- Check that the component is a client component (`'use client'`)

---

### 5. Login/Register button doesn't work

**Cause:** Multiple possible reasons.

**Solution:**
1. Check browser console for errors (F12 → Console tab)
2. Check Network tab to see if API request is being made
3. Verify MongoDB is connected (check server logs)
4. Ensure form validation passes (all fields filled correctly)

---

### 6. User info not showing in navbar after login

**Cause:** Page hasn't refreshed or auth state hasn't updated.

**Solution:**
- Refresh the page (F5)
- Check browser console for errors
- Verify token is saved in localStorage (F12 → Application → Local Storage)

---

### 7. "Password must be at least 8 characters"

**Cause:** Password doesn't meet requirements.

**Requirements:**
- At least 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)

**Example valid password:** `SecurePass123`

---

### 8. Logout doesn't work

**Cause:** Logout button click not being registered.

**Solution:**
1. Check browser console for errors
2. Try refreshing the page
3. Clear browser cache and try again

---

## Debugging Steps

### Check MongoDB Connection
1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Try to register
4. Look for `/api/auth/register` request
5. Check the response for error details

### Check Auth State
1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Type: `localStorage.getItem('authToken')`
4. If it returns a token, auth is working
5. Type: `localStorage.getItem('authUser')`
6. Should show user data

### Check Environment Variables
1. Verify `.env.local` has correct values:
   ```
   MONGODB_URI=mongodb+srv://megabotics:869412%40Soumya@cluster0.glovzbd.mongodb.net/?appName=Cluster0
   JWT_SECRET=megabotics_secret_key_2024_secure_authentication
   ```
2. Restart dev server after changing `.env.local`

---

## MongoDB Atlas Checklist

- [ ] Cluster is created and running
- [ ] IP address is whitelisted
- [ ] Username and password are correct
- [ ] Database name is correct (should be auto-created)
- [ ] Connection string is properly formatted
- [ ] Special characters in password are URL-encoded

---

## Testing the API Directly

### Test Registration with cURL
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123",
    "confirmPassword": "TestPass123"
  }'
```

### Test Login with cURL
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

---

## Getting Help

If you're still having issues:

1. **Check the logs:**
   - Server console shows detailed error messages
   - Browser console (F12) shows client-side errors

2. **Verify setup:**
   - Run `npm run build` to check for build errors
   - Restart dev server: `npm run dev`

3. **Check MongoDB Atlas:**
   - Verify cluster is running
   - Check Network Access whitelist
   - Verify credentials in connection string

4. **Clear cache:**
   - Clear browser cache (Ctrl+Shift+Delete)
   - Clear localStorage: `localStorage.clear()` in console
   - Restart dev server

---

## Success Indicators

✅ You'll know it's working when:
- Registration form submits without errors
- User appears in navbar after login
- Logout button appears when logged in
- Page refresh keeps you logged in
- Logout clears user info from navbar
