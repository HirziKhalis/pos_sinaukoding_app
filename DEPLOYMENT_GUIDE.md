# Deploying PadiPos to Vercel

This guide will walk you through deploying your **Next.js + Prisma** application to Vercel.

## ⚠️ Important: Database Migration

Currently, your project uses **SQLite**. SQLite stores data in a local file (`dev.db`). Vercel is a "serverless" platform, meaning it doesn't have a permanent file system. If you deploy with SQLite, **your database will be wiped every time the server restarts**, and it won't work correctly.

**Recommendation:** Switch to **Vercel Postgres** (easiest) or another cloud provider like Neon or Supabase.

---

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and create a new repository (e.g., `padi-pos`).
2. Run these commands in your project terminal to push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   # Replace with your actual repository URL
   git remote add origin https://github.com/YOUR_USERNAME/padi-pos.git
   git push -u origin main
   ```

## Step 2: Set Up Vercel Project

1. Go to [Vercel.com](https://vercel.com) and sign up/login.
2. Click **"Add New..."** -> **"Project"**.
3. Select your GitHub repository (`padi-pos`).
4. **Do NOT click Deploy yet.** We need to set up the database first.

## Step 3: Set Up Vercel Postgres (Database)

1. In the Vercel project deployment screen, look for the **Storage** tab or section (usually asks if you want to add a database).
2. Click **Add** -> **Postgres**.
3. Give it a name (e.g., `padipos-db`) and create it.
4. Once created, Vercel will automatically add the environment variables (`POSTGRES_PRISMA_URL`, `POSTGRES_URL_NON_POOLING`, etc.) to your project settings.

## Step 4: Update Your Code for Postgres

You need to generate a migration script that works for Postgres instead of SQLite.

1. **Modify `prisma/schema.prisma`**:
   Change the datasource provider from `sqlite` to `postgresql`.

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("POSTGRES_PRISMA_URL") // Uses Vercel's pooling URL
     directUrl = env("POSTGRES_URL_NON_POOLING") // Uses Vercel's direct URL
   }
   ```

2. **Generate Client locally**:

   ```bash
   npx prisma generate
   ```

3. **Commit and Push these changes** to GitHub:
   ```bash
   git add .
   git commit -m "Switch to Postgres for Vercel"
   git push
   ```

## Step 5: Configure Environment Variables

In your Vercel Project Settings > **Environment Variables**, ensure you have:

1. `JWT_SECRET`: Generate a strong random string (openssl rand -base64 32). This is vital for your login to work.
2. `POSTGRES_PRISMA_URL` etc. (Should be auto-added by Step 3).

## Step 6: Deploy

1. Go back to Vercel and click **Deploy**.
2. Wait for the build to complete.

## Step 7: Push Schema to Production DB

Once deployed, your application is running, but the database is empty (no tables). You need to push your schema structure to the live Vercel Postgres database.

Run this command locally (ensure you are logged into Vercel via CLI, or copy the connection string):

**The Easy Way (Vercel CLI):**

1. Install Vercel CLI: `npm i -g vercel`
2. Link your project: `vercel link`
3. Push DB schema:
   ```bash
   vercel env pull .env.local  # Downloads prod env vars
   npx prisma db push          # Pushes schema to the remote DB defined in .env.local
   ```

## Step 8: Create Admin User (Seeding)

You'll need an initial user to log in. You can run a script or use Prisma Studio against the production DB.

```bash
npx prisma studio
```

(This opens a GUI where you can manually add your first ADMIN user with a hashed password).

---

**Troubleshooting:**

- **Script Command `npx prisma db push`**: This is destructive if you have data. For production, it's often safer to use `prisma migrate deploy`, but for a first launch `db push` is fine.
- **Images**: Since you are using `public/uploads` for profile pictures, **these will disappear** on Vercel deployments! Vercel does not store uploaded files permanently.
  - **Solution:** You need a cloud storage service like **UploadThing**, **Cloudinary**, or **AWS S3** to store user images properly.
