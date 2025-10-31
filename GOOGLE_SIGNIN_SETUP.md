# Google Sign-In Setup Guide

## 🔴 Important: Google Sign-In is currently showing a 400 error because you need to add your Google Client ID.

## Steps to Fix Google Sign-In:

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

### 2. Create OAuth 2.0 Client ID

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: Amazon Clone
   - User support email: Your email
   - Developer contact: Your email
   - Save and Continue

4. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: Amazon Clone
   
5. **Add Authorized JavaScript origins**:
   ```
   http://localhost:3000
   https://vivekssss.github.io
   ```

6. **Add Authorized redirect URIs**:
   ```
   http://localhost:3000
   http://localhost:3000/login
   https://vivekssss.github.io/Amazon-clone
   https://vivekssss.github.io/Amazon-clone/login
   ```

7. Click "Create"
8. **Copy the Client ID** (it looks like: `123456789-abcdefg.apps.googleusercontent.com`)

### 3. Add Client ID to Your Project

Open `app/layout.tsx` and replace the placeholder:

```typescript
// Find this line (around line 27):
<GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID_HERE">

// Replace with your actual Client ID:
<GoogleOAuthProvider clientId="123456789-abcdefg.apps.googleusercontent.com">
```

### 4. Test Locally

1. Save the file
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Go to `http://localhost:3000/login`
4. Click "Continue with Google"
5. Sign in with your Google account

### 5. Deploy to Production

After adding your Client ID:

```bash
git add app/layout.tsx
git commit -m "Add Google OAuth Client ID"
git push origin main
```

The GitHub Actions workflow will automatically deploy your updated site.

## ⚠️ Security Notes

- **Never commit your Client Secret** (only Client ID is needed for frontend)
- The Client ID is safe to expose in frontend code
- Make sure to add both localhost and production URLs to authorized origins

## 🔍 Troubleshooting

### Error 400: redirect_uri_mismatch
- Make sure you added the exact URLs to "Authorized redirect URIs"
- Include both with and without trailing slashes

### Error 400: invalid_request
- Check that your Client ID is correct
- Verify the Google+ API is enabled

### Sign-in popup closes immediately
- Check browser console for errors
- Ensure authorized JavaScript origins are correct

## ✅ Success!

Once configured, users will be able to:
- Sign in with Google
- See their Google profile picture
- Have their name and email auto-filled
- Stay logged in across sessions

---

**Current Status**: ❌ Not configured (placeholder Client ID)
**After Setup**: ✅ Fully functional Google Sign-In
