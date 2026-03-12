# SKYLIX — Software Solutions & Agentic AI

## MongoDB Setup Guide (Step-by-Step)

This guide walks you through connecting your MongoDB Atlas cluster to the SKYLIX website — from creating the cluster to full backend integration.

---

### Prerequisites

- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- Node.js 18+ installed
- The SKYLIX project cloned locally

---

## Step 1: Create a MongoDB Atlas Cluster

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and sign up / log in.
2. Click **"Build a Database"** (or "Create" if you already have a project).
3. Choose the **FREE Shared (M0)** tier.
4. Select a cloud provider (any is fine — AWS is recommended) and a region close to you.
5. Click **"Create Cluster"**. It takes 1-3 minutes to provision.

---

## Step 2: Create a Database User

1. In the left sidebar, go to **Database Access** (under Security).
2. Click **"Add New Database User"**.
3. Choose **Password** authentication.
4. Set a **username** (e.g., `skylixAdmin`) and a **strong password** (e.g., `MyStr0ngP@ss!`)
   - ⚠️ **Remember these** — you'll need them for the connection string.
   - Avoid special characters like `@`, `#`, `%` in the password (they need URL encoding). Stick to letters, numbers, `!`, `.`, `_`.
5. Under **Database User Privileges**, select **"Read and write to any database"**.
6. Click **"Add User"**.

---

## Step 3: Whitelist Your IP Address

1. In the left sidebar, go to **Network Access** (under Security).
2. Click **"Add IP Address"**.
3. For development, click **"Allow Access from Anywhere"** (`0.0.0.0/0`).
   - ⚠️ For production, restrict this to your server's IP only.
4. Click **"Confirm"**.

---

## Step 4: Get Your Connection String

1. Go back to **Database** (Deployment) in the sidebar.
2. Click **"Connect"** on your cluster.
3. Choose **"Drivers"** (Connect your application).
4. Make sure **Driver = Node.js** and **Version = 5.5 or later** is selected.
5. Copy the connection string. It looks like:

```
mongodb+srv://skylixAdmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

6. **Replace `<password>`** with the actual password you created in Step 2.
7. **Add your database name** before the `?`. For example:

```
mongodb+srv://skylixAdmin:MyStr0ngP@ss!@cluster0.xxxxx.mongodb.net/skylix?retryWrites=true&w=majority&appName=Cluster0
```

The `skylix` part is your database name — MongoDB will create it automatically.

---

## Step 5: Add the Connection String to Your Project

1. Open (or create) the file `server/.env` in the project root:

```bash
# server/.env
MONGODB_URI=mongodb+srv://skylixAdmin:MyStr0ngP@ss!@cluster0.xxxxx.mongodb.net/skylix?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-to-something-random
ADMIN_DEFAULT_PASSWORD=Skylix@2026!
PORT=3001
ALLOWED_ORIGIN=http://localhost:5173
```

> **Replace the `MONGODB_URI` value** with YOUR actual connection string from Step 4.

> **Set `JWT_SECRET`** to a random string (at least 32 characters). This secures admin authentication.

⚠️ **Never commit `.env` to Git.** The `.gitignore` should already exclude it.

---

## Step 6: Install Server Dependencies

Open a terminal in the `server/` directory and run:

```bash
cd server
npm install
```

This installs:
- `mongoose` — MongoDB object modeling for Node.js
- `bcryptjs` — password hashing for admin auth
- `jsonwebtoken` — JWT token generation for admin sessions

---

## Step 7: Start the Server

```bash
cd server
npm run dev
```

You should see:

```
✦ SKYLIX API running on http://localhost:3001
✦ MongoDB connected successfully
```

If you see **"MongoDB connection failed"** instead, check:
- ✅ Your connection string is correct (no `<password>` placeholder left)
- ✅ Your IP is whitelisted in Network Access
- ✅ Your database user credentials are correct
- ✅ You're connected to the internet

---

## Step 8: Start the Client

In a separate terminal:

```bash
cd client
npm run dev
```

The website runs at `http://localhost:5173`.

---

## Step 9: Access the Admin Dashboard

1. Navigate to: `http://localhost:5173/skylix-admin-portal`
2. Log in with:
   - **Username:** `admin`
   - **Password:** The value of `ADMIN_DEFAULT_PASSWORD` in your `.env` (default: `Skylix@2026!`)
3. The default admin account is created automatically on first server startup.

> ⚠️ **Change the default password** after first login via the admin settings.

---

## Project Structure

```
sh/
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── context/           # React context providers
│   │   ├── pages/             # Page components
│   │   │   ├── admin/         # Admin dashboard pages (hidden)
│   │   │   └── ...            # Public pages
│   │   ├── App.jsx            # Router & routes
│   │   ├── index.css          # Design system
│   │   └── main.jsx           # Entry point
│   └── package.json
├── server/
│   ├── models/                # Mongoose schemas
│   ├── middleware/             # Auth middleware
│   ├── routes/                # API route handlers
│   ├── server.js              # Express app
│   ├── .env                   # Environment variables (NOT in Git)
│   └── package.json
└── README.md                  # This file
```

---

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB Atlas connection string | ✅ Yes |
| `JWT_SECRET` | Secret key for JWT tokens (32+ chars) | ✅ Yes |
| `ADMIN_DEFAULT_PASSWORD` | Default admin password | ✅ Yes |
| `PORT` | Server port (default: 3001) | No |
| `ALLOWED_ORIGIN` | CORS origin (default: http://localhost:5173) | No |

---

## Troubleshooting

### "MongoServerError: bad auth"
→ Your database user password is wrong. Go to Database Access in Atlas and reset it.

### "MongoNetworkError: connect ECONNREFUSED"
→ Your IP isn't whitelisted. Go to Network Access and add your IP or allow `0.0.0.0/0`.

### "MongoParseError: Invalid connection string"
→ Check for special characters in your password. URL-encode them or use simpler characters.

### Admin login returns 401
→ Ensure the server started successfully and created the default admin user. Check server logs.

---

## Deployment Notes

For production deployment:
1. Set `NODE_ENV=production` in your environment
2. Restrict MongoDB Network Access to your server IP only
3. Use a strong, unique `JWT_SECRET`
4. Change the default admin password immediately
5. Set `ALLOWED_ORIGIN` to your production domain
6. Build the client: `cd client && npm run build`
7. Serve the `dist/` folder via your hosting provider
