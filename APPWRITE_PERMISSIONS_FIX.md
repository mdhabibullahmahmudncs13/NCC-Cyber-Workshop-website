# Appwrite Image Upload Permissions Fix

## Issue
Failed to upload images in the instructor management page at `/dashboard/admin/instructors`.

## Root Cause Analysis
The image upload failure is most likely due to **Appwrite storage bucket permissions** not being properly configured for authenticated users. 

## Solution Steps

### 1. Check Appwrite Storage Bucket Permissions

**In your Appwrite Console:**

1. Navigate to **Storage** → **Buckets**
2. Select your storage bucket (`68bbafbf001e80d92606`)
3. Go to **Permissions** tab
4. Ensure the following permissions are set:

**Required Permissions:**
- **Create documents**: `users` (authenticated users can upload files)
- **Read documents**: `any` (public read access for viewing images)
- **Update documents**: `users` (authenticated users can update files)
- **Delete documents**: `users` (authenticated users can delete files)

### 2. Alternative Permission Settings

If you want more granular control:

**Option A - Admin Only:**
- **Create**: `role:admin`
- **Read**: `any`
- **Update**: `role:admin`  
- **Delete**: `role:admin`

**Option B - Authenticated Users:**
- **Create**: `users`
- **Read**: `any`
- **Update**: `users`
- **Delete**: `users`

### 3. Verify Environment Variables

Ensure these are properly set in `.env.local`:

```bash
NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=68bbafbf001e80d92606
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=68bb9d7800190636a8b2
```

### 4. Test Upload Functionality

After fixing permissions:

1. **Login as admin** in the application
2. Navigate to `/dashboard/admin/instructors`
3. Click "Add Instructor" or edit existing instructor
4. Try uploading an image using the "Upload Image" button
5. Check browser console for any error messages

### 5. Common Error Messages and Solutions

**"AppwriteException: Parameter 'file' has to be a File"**
- Solution: Ensure you're selecting actual image files, not text files

**"AppwriteException: Document with the requested ID could not be found"**
- Solution: Check that storage bucket ID is correct in environment variables

**"AppwriteException: Invalid permissions"**
- Solution: Update storage bucket permissions as described above

**"Upload failed: Network error"**
- Solution: Check internet connection and Appwrite service status

### 6. Debugging Steps

If upload still fails:

1. **Check browser console** for detailed error messages
2. **Verify authentication**: Ensure user is logged in with admin role
3. **Test with smaller images**: Try uploading images under 1MB first
4. **Check file format**: Ensure using supported formats (JPG, PNG, GIF, WebP)

### 7. Storage Bucket Configuration Checklist

✅ **Bucket exists** with ID `68bbafbf001e80d92606`  
✅ **File size limit** set appropriately (recommended: 10MB max)  
✅ **Allowed file extensions** include: `jpg, jpeg, png, gif, webp`  
✅ **Permissions** configured for authenticated users  
✅ **Antivirus scanning** enabled (if available)  

### 8. Expected Behavior After Fix

1. **File Upload**: Click "Upload Image" → select file → see preview immediately
2. **Form Submission**: Image uploads to Appwrite storage → file ID stored in database
3. **Image Display**: Instructor cards show uploaded images via Appwrite preview URLs
4. **Error Handling**: Clear error messages for invalid files or upload failures

## Testing Verification

```bash
# Test storage connection
curl -X GET \
  'https://fra.cloud.appwrite.io/v1/storage/buckets/68bbafbf001e80d92606/files' \
  -H 'X-Appwrite-Project: 68bb9d7800190636a8b2'
```

This should return a list of files if permissions are correct.

## Need Further Help?

If the issue persists after following these steps:

1. **Check Appwrite Console Logs** for detailed error information
2. **Review browser network tab** to see exact request/response details  
3. **Verify user authentication** in browser developer tools
4. **Test with different file types/sizes** to isolate the issue

The upload functionality is now properly implemented with:
- ✅ File validation (type and size)
- ✅ Image preview before upload
- ✅ Progress indicators
- ✅ Error handling and user feedback
- ✅ Fallback URL input option
