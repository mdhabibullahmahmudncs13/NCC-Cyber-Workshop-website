# 🔧 Payment Submission Troubleshooting

## Current Issue: "Failed to submit payment details"

### 🔍 Debugging Steps

1. **Open Browser Console**: 
   - Go to http://localhost:3001
   - Open Developer Tools (F12)
   - Go to Console tab

2. **Test Payment Submission**:
   - Register a user (if not already done)
   - Try to submit payment details
   - Watch the console for detailed error messages

3. **Common Issues to Check**:

#### A. **Appwrite Permissions**
- **Storage Bucket Permissions**: Check if authenticated users can create files
- **Collection Permissions**: Check if users can update their registrations

#### B. **Environment Variables**
Current values from your .env.local:
```
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=68bb9d7800190636a8b2
NEXT_PUBLIC_APPWRITE_DATABASE_ID=68bb9de0000fdca58f97
NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=68bbafbf001e80d92606
```

#### C. **Collection Attributes**
Make sure your `workshop_registrations` collection has these fields:
- `payment_transaction_number` (String, optional)
- `payment_transaction_id` (String, optional)
- `payment_screenshot_url` (String, optional)
- `payment_submitted_at` (DateTime, optional)
- `payment_status` (Enum: pending/verified/rejected)

#### D. **Storage Bucket Settings**
- Max file size: 10MB or higher
- Allowed extensions: jpg, jpeg, png
- Permissions: users can create files

### 🚨 Most Likely Issues:

1. **Missing Collection Attributes**: The payment fields don't exist in your collection
2. **Wrong Permissions**: Users can't update documents or upload files
3. **Storage Bucket Issues**: File upload fails due to permissions or settings

### 🛠️ Quick Fixes:

#### Fix 1: Check Appwrite Console
1. Go to your Appwrite project
2. Navigate to Databases → ncc_workshop_db → workshop_registrations
3. Check if all payment-related attributes exist
4. Check permissions allow users to update documents

#### Fix 2: Test Individual Components
1. Test file upload separately
2. Test document update separately
3. Check browser network tab for API responses

#### Fix 3: Recreate Collection (if needed)
If attributes are missing:
1. Delete and recreate the workshop_registrations collection
2. Follow the updated appwrite_setup.md guide exactly
3. Use the "Simple Permissions" from the guide

### 📋 Console Error Patterns to Look For:

- **"Unknown attribute"**: Missing fields in collection
- **"Permission denied"**: Incorrect permissions
- **"File too large"**: Storage bucket limits
- **"Invalid file type"**: Storage bucket file type restrictions
- **"Document not found"**: Registration ID issues

### 🔄 If All Else Fails:

1. **Reset Collections**: Delete and recreate with proper schema
2. **Check Appwrite Status**: Visit status.appwrite.io
3. **Use Simple Permissions**: Set all permissions to `users`, `users:*`

---

**📱 Test the payment form at: http://localhost:3001**
**🔍 Watch the browser console for detailed error messages**
