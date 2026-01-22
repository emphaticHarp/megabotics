# MongoDB Atlas IP Whitelist Setup

## Issue
The registration/login is failing because your IP address is not whitelisted in MongoDB Atlas.

## Solution

### Step 1: Get Your IP Address
- Visit: https://www.whatismyipaddress.com/
- Note down your public IP address

### Step 2: Add IP to MongoDB Atlas Whitelist
1. Go to: https://cloud.mongodb.com/
2. Log in with your MongoDB account
3. Select your cluster (Cluster0)
4. Go to **Network Access** (in the left sidebar)
5. Click **Add IP Address**
6. Enter your IP address from Step 1
7. Click **Confirm**

### Step 3: Alternative - Allow All IPs (Development Only)
If you want to allow all IPs for development:
1. Go to **Network Access** in MongoDB Atlas
2. Click **Add IP Address**
3. Enter: `0.0.0.0/0`
4. Click **Confirm**

**⚠️ WARNING**: Only use `0.0.0.0/0` for development. For production, always whitelist specific IPs.

### Step 4: Test the Connection
After whitelisting, try registering again. The connection should work now.

## MongoDB Connection String
Your connection string is already configured in `.env.local`:
```
MONGODB_URI=mongodb+srv://megabotics:869412%40Soumya@cluster0.glovzbd.mongodb.net/?appName=Cluster0
```

The `%40` is the URL-encoded version of `@` from the password `869412@Soumya`.

## Troubleshooting
- If it still doesn't work, wait 5-10 minutes after whitelisting (Atlas takes time to propagate)
- Check that the username and password are correct
- Verify the cluster name is correct (should be `cluster0`)
