# 🔧 Quick Fix: Appwrite Permissions Error

## Error: "User (role: guests) missing scopes (["account"])"

This error occurs when your Appwrite collections have incorrect permissions set up.

## 🚀 Quick Solution

### Step 1: Go to Appwrite Console
1. Open [Appwrite Cloud](https://cloud.appwrite.io)
2. Go to your project: **NCC Cyber Workshop 2025**
3. Navigate to **Databases** → **ncc_workshop_db**

### Step 2: Fix Each Collection Permissions

For **EACH** of these collections:
- `users`
- `workshop_registrations` 
- `instructors`
- `support_staff`

Do the following:

1. **Click on the collection**
2. **Go to Settings tab**
3. **Click on Permissions**
4. **Clear all existing permissions**
5. **Add these simple permissions**:

#### For ALL Collections, set these permissions:

**Read Permissions:**
```
any
users
users:*
```

**Create Permissions:**
```
users
users:*
```

**Update Permissions:**
```
users
users:*
```

**Delete Permissions:**
```
users:*
```

### Step 3: Save and Test

1. **Save permissions** for each collection
2. **Restart your development server**:
   ```bash
   npm run dev
   ```
3. **Test user registration** at http://localhost:3000

## 📝 What These Permissions Mean

- `any` = Anyone (including non-logged-in users) can read
- `users` = Any authenticated user can perform the action
- `users:*` = Any authenticated user with any role can perform the action

## ✅ Expected Result

After fixing permissions, you should be able to:
- ✅ Register new users
- ✅ Login/logout
- ✅ View workshop information
- ✅ Submit registrations
- ✅ Upload payment screenshots

## 🛡️ Production Security

For production, you can set more restrictive permissions:

**Users Collection:**
- Read: `users:{user_id}`, `users:*` (users can read their own data + admins read all)
- Update: `users:{user_id}`, `users:*` (users can update their own data + admins update all)

**Registrations Collection:**
- Read: `users:{user_id}`, `users:*`
- Create: `users`
- Update: `users:{user_id}`, `users:*`

But for development/testing, the simple permissions above work perfectly!

## 🔄 Alternative: Reset and Recreate

If permissions are too messed up:

1. **Delete all collections**
2. **Follow the `appwrite_setup.md` guide exactly**
3. **Use the "Alternative Simple Permissions" shown in each section**

---

**Need help?** The permissions fix should resolve the "missing scopes" error immediately! 🎉
