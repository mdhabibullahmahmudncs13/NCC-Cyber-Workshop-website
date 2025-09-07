# Storage Bucket Setup Guide

## Problem
The storage bucket with ID `68bbafbf001e80d92606` cannot be found in your Appwrite project.

## Solution Options

### Option 1: Create New Storage Bucket in Appwrite Console

1. **Go to Appwrite Console**: https://fra.cloud.appwrite.io/console/project-68bb9d7800190636a8b2
2. **Navigate to Storage** in the left sidebar
3. **Create New Bucket**:
   - Name: `profile-pictures` or `workshop-files`
   - Bucket ID: Leave empty (auto-generated) or use `profile-pictures`
4. **Set Permissions**:
   - **Read access**: `users` (authenticated users)
   - **Write access**: `users` (authenticated users)
   - **Update access**: `users` (authenticated users)
   - **Delete access**: `users` (authenticated users)
5. **Copy the new Bucket ID** from the bucket settings
6. **Update .env.local** with the new bucket ID

### Option 2: Update Environment Variable

If you have an existing bucket, get its ID and update `.env.local`:

```bash
NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=your-correct-bucket-id
```

### Option 3: Use Default Bucket

If you have a default bucket in your project:

1. Go to Storage in Appwrite Console
2. Find your existing bucket
3. Copy its ID
4. Update the environment variable

## Required Permissions

Make sure your storage bucket has these permissions:
- **Read**: `role:member` or `users`
- **Create**: `role:member` or `users` 
- **Update**: `role:member` or `users`
- **Delete**: `role:member` or `users`

## After Setup

1. Restart your development server: `npm run dev`
2. Try uploading a profile picture again
3. Check browser console for any additional errors

## Test Commands

```bash
# Stop development server
Ctrl+C

# Restart development server  
npm run dev
```
