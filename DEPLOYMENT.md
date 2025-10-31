# Amazon Clone - Deployment Guide

## 🚀 Deploy to GitHub Pages

### Prerequisites
- GitHub account
- Repository pushed to GitHub

### Steps to Deploy:

#### 1. Enable GitHub Pages
1. Go to your repository on GitHub: `https://github.com/vivekssss/Amazon-clone`
2. Click on **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select **GitHub Actions**

#### 2. Push Your Code
```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

#### 3. Automatic Deployment
- The GitHub Actions workflow will automatically trigger
- Wait 2-3 minutes for the build and deployment
- Your site will be live at: `https://vivekssss.github.io/Amazon-clone/`

#### 4. Check Deployment Status
- Go to **Actions** tab in your repository
- You'll see the "Deploy to GitHub Pages" workflow running
- Green checkmark = successful deployment
- Red X = failed (check logs for errors)

### 🔧 Configuration Files

The following files have been configured for deployment:

1. **next.config.js** - Next.js configuration for static export
2. **.github/workflows/deploy.yml** - GitHub Actions workflow
3. **public/.nojekyll** - Prevents Jekyll processing

### 🌐 Google Sign-In Setup (Required)

To enable Google Sign-In on your deployed site:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create a new one
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `https://vivekssss.github.io` (for production)
6. Add authorized redirect URIs:
   - `http://localhost:3000`
   - `https://vivekssss.github.io/Amazon-clone`
7. Copy the **Client ID**
8. Update `app/layout.tsx`:
   ```typescript
   <GoogleOAuthProvider clientId="YOUR_ACTUAL_CLIENT_ID_HERE">
   ```

### 📝 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm start
```

### 🔍 Troubleshooting

#### Deployment fails
- Check the Actions tab for error logs
- Ensure all dependencies are in package.json
- Verify next.config.js is properly configured

#### Images not loading
- Images are set to `unoptimized: true` in next.config.js
- External images from Unsplash should work fine

#### 404 errors on routes
- Next.js static export doesn't support dynamic routes by default
- All routes are pre-rendered during build

#### Google Sign-In not working
- Verify Client ID is correct
- Check authorized origins in Google Cloud Console
- Ensure production URL is added to authorized origins

### 🎉 Success!

Once deployed, your Amazon Clone will be live at:
**https://vivekssss.github.io/Amazon-clone/**

Share it with friends and add it to your portfolio! 🚀
