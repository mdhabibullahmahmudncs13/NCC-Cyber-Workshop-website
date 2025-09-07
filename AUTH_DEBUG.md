# 🔐 Authentication & Redirect Debug Guide

## Issue: Login/Register successful but no redirect to dashboard

### 🔧 **Quick Fixes Applied**

1. **Enhanced Debug Logging**: Added comprehensive console logging to track authentication flow
2. **Forced Redirect**: Changed from `router.push()` to `window.location.href` for more reliable redirects
3. **Authentication State Management**: Improved state checking in AuthProvider
4. **Loading States**: Better loading state management during auth operations

### 🧪 **Test Steps**

#### **Test Login Flow**:
1. Go to `http://localhost:3000/login`
2. Open browser console (F12 → Console)
3. Enter test credentials and click "Sign In"
4. **Expected Console Output**:
   ```
   Starting login process...
   AuthProvider: Starting login for: test@example.com
   AuthProvider: Login successful, checking auth...
   AuthProvider: Checking authentication...
   AuthProvider: Current user from Appwrite: {...}
   AuthProvider: Fetching user data from database...
   AuthProvider: User data from database: {...}
   AuthProvider: Auth check complete, user: {...}
   Login successful, showing success message...
   Redirecting to dashboard...
   ```

#### **Test Registration Flow**:
1. Go to `http://localhost:3000/register`
2. Open browser console (F12 → Console)
3. Fill form and complete registration
4. **Expected Console Output**:
   ```
   Starting registration process...
   AuthProvider: Starting registration for: test@example.com
   AuthProvider: Account created: [user-id]
   AuthProvider: Creating user document...
   AuthProvider: User document created
   AuthProvider: Sending email verification...
   AuthProvider: Email verification sent
   AuthProvider: Checking auth after registration...
   AuthProvider: Registration complete, user: {...}
   Registration successful, showing success message...
   Redirecting to dashboard...
   ```

### 🚨 **Common Issues & Solutions**

#### **Issue 1: "Collection 'users' not found"**
**Fix**: Create the users collection in Appwrite
1. Go to Appwrite Console → Databases → ncc_workshop_db
2. Create collection with ID: `users`
3. Add required attributes:
   - `name` (String, required)
   - `email` (String, required) 
   - `student_id` (String, required)
   - `phone` (String, required)
   - `institution` (String, required)
   - `role` (String, required, default: "user")
   - `registration_status` (String, required, default: "pending")

#### **Issue 2: Permission Denied**
**Fix**: Set proper collection permissions
1. Go to users collection → Settings → Permissions
2. Set permissions:
   - **Read**: `users`, `users:*`
   - **Create**: `any` (for registration), `users:*`
   - **Update**: `users:*`
   - **Delete**: `users:*`

#### **Issue 3: Email Verification Fails**
**Fix**: Check Appwrite project settings
1. Go to Appwrite Console → Auth → Settings
2. Enable Email/Password authentication
3. Add allowed domains or set to allow all domains

#### **Issue 4: Database Service Error**
**Fix**: Verify database service functions
```typescript
// Check if these functions exist in /src/lib/appwrite.ts
databaseService.getUser()
databaseService.createUser()
```

### 🛠️ **Manual Test Commands**

Open browser console on any page and test:

```javascript
// Test 1: Check if Appwrite is connected
console.log('Testing Appwrite connection...')

// Test 2: Check current user
account.get().then(user => {
  console.log('Current user:', user)
}).catch(err => {
  console.log('No user logged in:', err)
})

// Test 3: Test login (replace with real credentials)
account.createEmailSession('test@example.com', 'password123')
  .then(session => {
    console.log('Login successful:', session)
    window.location.href = '/dashboard'
  })
  .catch(err => {
    console.error('Login failed:', err)
  })
```

### 📋 **Checklist**

- [ ] ✅ Appwrite project configured correctly
- [ ] ✅ Environment variables set in `.env.local`
- [ ] ✅ Collections created with proper schema
- [ ] ✅ Collection permissions set correctly
- [ ] ✅ Email/Password auth enabled in Appwrite
- [ ] ✅ Development server running on localhost:3000
- [ ] ✅ Browser console shows debug messages
- [ ] ✅ No network errors in browser dev tools

### 🎯 **Expected Behavior**

After successful login/register:
1. ✅ Console shows authentication success
2. ✅ Success toast notification appears
3. ✅ Page redirects to `/dashboard` within 2 seconds
4. ✅ Dashboard loads with user data
5. ✅ User can navigate to profile, logout, etc.

### 🔄 **If Still Not Working**

1. **Clear Browser Data**:
   - Clear cookies, localStorage, sessionStorage
   - Hard refresh (Ctrl+Shift+R)

2. **Check Network Tab**:
   - Look for failed API requests
   - Check if Appwrite endpoints are reachable

3. **Verify Appwrite Setup**:
   - Test login directly in Appwrite console
   - Check project status and billing

4. **Test with New Account**:
   - Try registering a completely new account
   - Use different email/password

---

**🚀 Test Now**: Try logging in at `http://localhost:3000/login`
**📊 Debug**: Watch browser console for detailed flow tracking
**✅ Success**: Should redirect to dashboard automatically
