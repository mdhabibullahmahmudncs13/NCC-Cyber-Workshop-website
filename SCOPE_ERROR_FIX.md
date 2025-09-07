# 🔐 Authentication Scope Error Fix

## Error: `User (role: guests) missing scopes (["account"])`

This error occurs when:
1. User is not properly authenticated
2. Appwrite session is not established correctly
3. User permissions are not configured properly

## 🛠️ **Quick Fixes**

### **Fix 1: Check Appwrite Authentication Settings**

1. **Go to Appwrite Console**:
   - Navigate to your project
   - Go to **Auth** → **Settings**

2. **Enable Authentication Methods**:
   - ✅ Enable **Email/Password** authentication
   - ✅ Set **Email Confirmation** to optional (for testing)
   - ✅ Add your domain to **Allowed Origins**: `http://localhost:3000`

3. **Check User Sessions**:
   - Go to **Auth** → **Users**
   - Verify users have active sessions

### **Fix 2: Update Appwrite Client Configuration**

The issue might be in the Appwrite client setup. Let me update the configuration:

```typescript
// Updated client configuration with proper scopes
const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

// Make sure we're using the latest Appwrite SDK
```

### **Fix 3: Collection Permissions**

For the instructors collection, set these permissions:

1. **Read Permissions**:
   - `any` (allow public read)
   - `users` (authenticated users)

2. **Create/Update/Delete Permissions**:
   - `users` (authenticated users)
   - `users:*` (any authenticated user)

### **Fix 4: Test Authentication Flow**

Use these steps to test:

1. **Clear browser data** (cookies, localStorage)
2. **Register a new account**
3. **Verify the account is created in Appwrite Console**
4. **Try logging in**
5. **Check browser console for authentication status**

## 🧪 **Debug Commands**

Run these in browser console to check authentication:

```javascript
// Check current user
account.get().then(user => {
  console.log('Current user:', user);
  console.log('User role:', user.labels);
}).catch(err => {
  console.log('Authentication error:', err);
});

// Check current session
account.getSession('current').then(session => {
  console.log('Current session:', session);
}).catch(err => {
  console.log('No active session:', err);
});
```

## 🎯 **Expected Results**

After fixing, you should see:
- User is properly authenticated (not a guest)
- Active session exists
- User has proper roles and permissions
- Can access account-related functionality

---

**🔧 Implementing fixes now...**
