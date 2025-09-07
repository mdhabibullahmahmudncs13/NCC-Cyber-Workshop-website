# 🚨 URGENT: Authentication Scope Error Solution

## Error: `User (role: guests) missing scopes (["account"])`

This error means you're not properly authenticated. Here's the immediate fix:

## 🔧 **IMMEDIATE STEPS TO FIX**

### **Step 1: Clear All Browser Data**
1. **Open browser Developer Tools** (F12)
2. **Go to Application tab** (Chrome) or **Storage tab** (Firefox)
3. **Clear everything**:
   - Cookies
   - Local Storage
   - Session Storage
   - IndexedDB
4. **Hard refresh** the page (Ctrl+Shift+R)

### **Step 2: Test Authentication**
1. **Go to**: `http://localhost:3000/auth-test`
2. **Check status**: Should show "Not Authenticated (Guest)"
3. **Test Registration**:
   - Change email to: `admin@test.com`
   - Change password to: `password123`
   - Click "Test Register"
4. **Test Login**:
   - Use same credentials
   - Click "Test Login"
5. **Verify**: Should show "Authenticated" status

### **Step 3: Manual Database Setup (If Collections Don't Exist)**

**Go to Appwrite Console** and create these collections:

#### **Collection 1: `users`**
```
Collection ID: users
Attributes:
- name (String, 255, required)
- email (String, 255, required)  
- student_id (String, 50, required)
- phone (String, 20, required)
- institution (String, 255, required)
- role (String, 20, required, default: "user")
- registration_status (String, 20, required, default: "pending")

Permissions:
- Read: users, users:*
- Create: any, users:*
- Update: users:*
- Delete: users:*
```

#### **Collection 2: `instructors`**
```
Collection ID: instructors
Attributes:
- name (String, 255, required)
- bio (String, 2000, required)
- expertise (Array of Strings, optional)
- profile_image (String, 255, optional)
- social_linkedin (String, 255, optional)
- social_twitter (String, 255, optional)
- social_github (String, 255, optional)
- social_website (String, 255, optional)
- created_by (String, 50, required)
- created_at (String, 50, required)

Permissions:
- Read: any, users, users:*
- Create: users, users:*
- Update: users:*
- Delete: users:*
```

### **Step 4: Test Instructor Creation**
1. **First authenticate** at `/auth-test`
2. **Then go to**: `/dashboard/admin/instructors`
3. **Try adding an instructor**
4. **Should work without scope errors**

## 🎯 **Quick Test Commands**

Open browser console and run:

```javascript
// Test 1: Check authentication
account.get().then(user => {
  console.log('✅ User authenticated:', user);
}).catch(err => {
  console.log('❌ Not authenticated:', err);
});

// Test 2: Try manual login (if not authenticated)
account.createEmailSession('admin@test.com', 'password123')
  .then(session => {
    console.log('✅ Login successful:', session);
    window.location.href = '/dashboard/admin/instructors';
  })
  .catch(err => {
    console.log('❌ Login failed:', err);
  });
```

## 🔄 **If Still Getting Scope Error**

### **Emergency Fix - Manual Session Creation**

Run this in browser console:

```javascript
// Force authentication bypass for testing
const testInstructor = {
  name: "Test Instructor",
  bio: "Test bio for debugging",
  expertise: ["Cybersecurity"],
  created_by: "test-user-id",
  created_at: new Date().toISOString()
};

// Direct database call
databases.createDocument(
  '68bb9de0000fdca58f97', // Your database ID
  'instructors',           // Collection ID
  'ID.unique()',          // Document ID
  testInstructor
).then(result => {
  console.log('✅ Instructor created directly:', result);
}).catch(err => {
  console.log('❌ Direct creation failed:', err);
});
```

## 📞 **If Nothing Works**

The scope error usually means:
1. **No active session** - User not logged in
2. **Wrong permissions** - Collection doesn't allow user access
3. **Missing collections** - Database collections don't exist
4. **Appwrite misconfiguration** - Project settings issue

**SOLUTION**: Start fresh with authentication test page at `/auth-test`

---

**🚀 Try these steps in order and the scope error should be resolved!**
