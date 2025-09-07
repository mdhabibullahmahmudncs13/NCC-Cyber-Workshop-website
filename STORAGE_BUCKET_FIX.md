# 🔧 Storage Bucket Fix Guide

## Problem
Your application is showing this error:
```
Storage bucket with the requested ID could not be found.
{"message":"Storage bucket with the requested ID could not be found.","code":404,"type":"storage_bucket_not_found","version":"1.8.0"}
```

## ✅ Solution: Create Storage Bucket

### Quick Fix (Manual - Recommended)

1. **Open Appwrite Console**
   - Go to: https://fra.cloud.appwrite.io
   - Login to your account

2. **Navigate to Storage**
   - Click on "Storage" in the left sidebar
   - Click on "Buckets"

3. **Create New Bucket**
   - Click "Create Bucket"
   - **Bucket ID**: `bde3da204de6e38f3fb471da` (IMPORTANT: Use this exact ID)
   - **Name**: Workshop Storage
   - **Maximum File Size**: 10MB (10485760 bytes)
   - **Allowed File Extensions**: `jpg, jpeg, png, gif, pdf`

4. **Set Permissions**
   - **Read**: Any
   - **Create**: Users  
   - **Update**: Users
   - **Delete**: Users

5. **Save the Bucket**

### Alternative: Automatic Setup (Advanced)

If you have an API key:

1. **Get API Key**
   - Go to Settings > API Keys in Appwrite Console
   - Create new API key with "storage.write" scope

2. **Update setup script**
   - Edit `setup-storage-bucket.js`
   - Replace `YOUR_API_KEY_HERE` with your actual API key

3. **Run setup script**
   ```bash
   node setup-storage-bucket.js
   ```

## ✅ Verification

After creating the bucket, your environment file (`.env.local`) is already updated with:
```
NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=bde3da204de6e38f3fb471da
```

## 🚀 Test the Fix

1. **Restart your development server**
   ```bash
   npm run dev
   ```

2. **Try uploading a file**
   - Go to Profile page
   - Try uploading a profile picture
   - Or try payment form with screenshot upload

3. **Check for errors**
   - Storage errors should be resolved
   - File uploads should work correctly

## 📁 Files Modified

- `.env.local` - Updated with new bucket ID
- `setup-storage-bucket.js` - Script to create bucket automatically
- `.env.local.backup` - Backup of original environment file

## 🔍 Troubleshooting

If you still get errors:

1. **Check bucket ID matches exactly**: `bde3da204de6e38f3fb471da`
2. **Verify permissions are set correctly**
3. **Make sure bucket is enabled**
4. **Restart your development server**

## 📞 Need Help?

If the issue persists:
1. Check browser console for detailed error messages
2. Verify Appwrite project ID is correct
3. Ensure you're logged in to the correct Appwrite account
