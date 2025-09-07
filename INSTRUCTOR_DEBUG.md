# 🔧 Instructor Creation Debug Guide

## Current Issue: "Failed to add instructor"

### 🔍 Debugging Steps

1. **Open Browser Console**:
   - Go to `http://localhost:3000/dashboard/admin/instructors`
   - Open Developer Tools (F12)
   - Go to Console tab

2. **Try Adding an Instructor**:
   - Click "Add Instructor"
   - Fill in the form (Name and Bio are required)
   - Click "Add Instructor"
   - Watch console for detailed error messages

### 🚨 Most Common Issues

#### 1. **Missing Appwrite Collection**
**Error**: Collection not found or doesn't exist

**Solution**: Create the `instructors` collection in Appwrite
1. Go to Appwrite Console → Databases → ncc_workshop_db
2. Create collection with ID: `instructors`
3. Add these attributes:
   - `name` (String, 255 chars, required)
   - `bio` (String, 2000 chars, required)
   - `expertise` (Array of Strings, optional)
   - `profile_image` (String, 255 chars, optional)
   - `social_linkedin` (String, 255 chars, optional)
   - `social_twitter` (String, 255 chars, optional)
   - `social_github` (String, 255 chars, optional)
   - `social_website` (String, 255 chars, optional)
   - `created_by` (String, 50 chars, required)

#### 2. **Wrong Collection Permissions**
**Error**: Permission denied

**Solution**: Set collection permissions
1. Go to Collection → Settings → Permissions
2. Set these permissions:
   - **Read**: `any`, `users`, `users:*`
   - **Create**: `users`, `users:*`
   - **Update**: `users:*`
   - **Delete**: `users:*`

#### 3. **Collection ID Mismatch**
**Error**: Collection not found

**Check**: Your environment variables
```bash
NEXT_PUBLIC_INSTRUCTORS_COLLECTION_ID=instructors
```

#### 4. **Invalid Data Format**
**Error**: Document validation failed

**Check**: Required fields are provided
- Name (required)
- Bio (required)
- created_by (automatically added)

#### 5. **Authentication Issue**
**Error**: User not authenticated or not admin

**Check**: 
- User is logged in
- User has admin role
- Browser session is valid

### 🛠️ Quick Fixes

#### Fix 1: Verify Collection Exists
1. Go to Appwrite Console
2. Navigate to: Project → Databases → ncc_workshop_db
3. Check if `instructors` collection exists
4. If not, create it following the schema above

#### Fix 2: Reset Permissions
1. Go to: Collection → Settings → Permissions
2. Clear all permissions
3. Add simple permissions:
   - Read: `any`
   - Create: `users`
   - Update: `users`
   - Delete: `users`

#### Fix 3: Test with Simple Data
Try adding an instructor with minimal data:
```
Name: Test Instructor
Bio: This is a test instructor for debugging
```

#### Fix 4: Check Environment Variables
Verify your `.env.local` file has:
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_INSTRUCTORS_COLLECTION_ID=instructors
```

### 📋 Console Error Patterns

Look for these error messages in the browser console:

- **"Collection not found"**: Create the instructors collection
- **"Permission denied"**: Fix collection permissions
- **"Document validation failed"**: Check required fields
- **"Invalid attribute"**: Collection schema mismatch
- **"Unauthorized"**: Authentication or admin role issue

### 🔄 Step-by-Step Test

1. **Check Authentication**:
   - Confirm you're logged in as admin
   - Check `user.role === 'admin'` in console

2. **Test Collection Access**:
   - Try viewing existing instructors first
   - Check if getAllInstructors() works

3. **Test Simple Creation**:
   - Use minimal required data only
   - Add debugging console logs

4. **Verify Database**:
   - Check Appwrite console for new documents
   - Verify permissions are correct

### 🎯 Expected Console Output

When working correctly, you should see:
```
Adding instructor with data: {name: "...", bio: "..."}
Database service: Creating instructor with data: {...}
Database service: Instructor created successfully: {...}
Instructor created successfully
```

### 🚨 If Collection Doesn't Exist

Create it manually:
1. **Appwrite Console** → **Databases** → **ncc_workshop_db**
2. **Create Collection**: ID = `instructors`
3. **Add Attributes** (see schema above)
4. **Set Permissions** (see permissions above)
5. **Test again**

---

**📱 Test at: http://localhost:3000/dashboard/admin/instructors**
**🔍 Watch browser console for detailed error messages**
