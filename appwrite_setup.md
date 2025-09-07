# Appwrite Setup Guide for NCC Cyber Workshop 2025

This guide will walk you through setting up Appwrite for the NCC Cyber Workshop website.

## Table of Contents
1. [Create Appwrite Account](#create-appwrite-account)
2. [Create Project](#create-project)
3. [Database Setup](#database-setup)
4. [Collections Setup](#collections-setup)
5. [Storage Setup](#storage-setup)
6. [Authentication Setup](#authentication-setup)
7. [Environment Variables](#environment-variables)
8. [Security Settings](#security-settings)

## Create Appwrite Account

1. Visit [Appwrite Cloud](https://cloud.appwrite.io)
2. Sign up for a free account or log in if you already have one
3. Verify your email address

## Create Project

1. Click "Create Project" on your dashboard
2. Enter project name: `NCC Cyber Workshop 2025`
3. Select your preferred region (closest to your users)
4. Click "Create"
5. Note down your **Project ID** from the project settings

## Database Setup

1. Navigate to **Databases** in your project dashboard
2. Click "Create Database"
3. Enter database name: `ncc_workshop_db`
4. Click "Create"
5. Note down your **Database ID**

## Collections Setup

> **Important Note:** Appwrite automatically creates three system fields for every collection:
> - `$id` - Unique document identifier
> - `$createdAt` - Document creation timestamp
> - `$updatedAt` - Document last update timestamp
> 
> You don't need to create these fields manually. Only create the custom attributes listed below.

Create the following collections in your database:

### 1. Users Collection

**Collection ID:** `users`

**Attributes:**
> Note: Appwrite automatically creates `$id`, `$createdAt`, and `$updatedAt` fields for every document.

```
- name (String, 255 characters, required)
- email (String, 320 characters, required)
- student_id (String, 50 characters, required)
- phone (String, 20 characters, required)
- institution (String, 255 characters, required)
- role (Enum: ["user", "admin"], required, default: "user")
- profile_picture (String, 255 characters, optional)
- registration_status (Enum: ["pending", "verified", "rejected"], required, default: "pending")
```

**Indexes:**
```
- email (unique)
- student_id (unique)
- role
- registration_status
```

**Permissions:**
> **Important:** Set permissions carefully to avoid "missing scopes" errors.

```
Read:
- Any authenticated user: users
- Admin users: users:*

Create:
- Any authenticated user: users

Update:
- Document owner: users:{user_id}
- Admin users: users:*

Delete:
- Admin users: users:*
```

**Alternative Simple Permissions (Recommended for development):**
```
Read: users, users:*
Create: users
Update: users, users:*
Delete: users:*
```

### 2. Workshop Registrations Collection

**Collection ID:** `workshop_registrations`

**Attributes:**
> Note: Appwrite automatically creates `$id`, `$createdAt`, and `$updatedAt` fields for every document.

```
- user_id (String, 50 characters, required)
- workshop_type (String, 100 characters, required)
- registration_date (DateTime, required)
- payment_status (Enum: ["pending", "verified", "rejected"], required, default: "pending")
- payment_transaction_number (String, 100 characters, optional)
- payment_transaction_id (String, 100 characters, optional)
- payment_screenshot_url (String, 500 characters, optional)
- payment_submitted_at (DateTime, optional)
```

**Indexes:**
```
- user_id
- payment_status
- registration_date
```

**Permissions:**
```
Read:
- Document owner: users:{user_id}
- Admin users: users:*

Create:
- Any authenticated user: users

Update:
- Document owner: users:{user_id}
- Admin users: users:*

Delete:
- Admin users: users:*
```

**Alternative Simple Permissions (Recommended for development):**
```
Read: users, users:*
Create: users
Update: users, users:*
Delete: users:*
```

### 3. Instructors Collection

**Collection ID:** `instructors`

**Attributes:**
> Note: Appwrite automatically creates `$id`, `$createdAt`, and `$updatedAt` fields for every document.

```
- name (String, 255 characters, required)
- bio (String, 2000 characters, required)
- expertise (Array of Strings, required)
- profile_image (String, 255 characters, optional)
- social_linkedin (String, 255 characters, optional)
- social_twitter (String, 255 characters, optional)
- social_github (String, 255 characters, optional)
- social_website (String, 255 characters, optional)
- created_by (String, 50 characters, required)
```

**Permissions:**
```
Read:
- Any user (including guests): any
- Any authenticated user: users

Create:
- Admin users only: users:*

Update:
- Admin users only: users:*

Delete:
- Admin users only: users:*
```

**Alternative Simple Permissions (Recommended):**
```
Read: any
Create: users:*
Update: users:*
Delete: users:*
```

### 4. Support Staff Collection

**Collection ID:** `support_staff`

**Attributes:**
> Note: Appwrite automatically creates `$id`, `$createdAt`, and `$updatedAt` fields for every document.

```
- name (String, 255 characters, required)
- role (String, 255 characters, required)
- contact (String, 255 characters, required)
- profile_image (String, 255 characters, optional)
- created_by (String, 50 characters, required)
```

**Permissions:**
```
Read:
- Any user (including guests): any
- Any authenticated user: users

Create:
- Admin users only: users:*

Update:
- Admin users only: users:*

Delete:
- Admin users only: users:*
```

**Alternative Simple Permissions (Recommended):**
```
Read: any
Create: users:*
Update: users:*
Delete: users:*
```

## Storage Setup

1. Navigate to **Storage** in your project dashboard
2. Click "Create Bucket"
3. Enter bucket name: `workshop_files`
4. Configure the following settings:

**Bucket Settings:**
```
- Maximum file size: 10MB
- Allowed file extensions: jpg, jpeg, png, pdf
- Encryption: Enabled
- Antivirus: Enabled (if available)
```

**Permissions:**
```
Read:
- Users (authenticated users)
- Admins (role:admin)

Create:
- Users (authenticated users)

Update:
- Users (authenticated users can update their own files)
- Admins (role:admin can update all)

Delete:
- Users (authenticated users can delete their own files)
- Admins (role:admin can delete all)
```

5. Note down your **Bucket ID**

## Authentication Setup

1. Navigate to **Auth** in your project dashboard
2. Click on **Settings**
3. Configure the following:

**Security Settings:**
```
- Session length: 30 days
- Password length: Minimum 8 characters
- Password requirements: Mixed case, numbers, special characters
- Email verification: Required
- Two-factor authentication: Optional
```

**OAuth Providers (Optional):**
You can enable Google, GitHub, or other OAuth providers for easier login.

**Email Templates:**
Customize the email verification and password reset templates with your branding.

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=ncc_workshop_db
NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=workshop_files

# Collection IDs
NEXT_PUBLIC_USERS_COLLECTION_ID=users
NEXT_PUBLIC_WORKSHOP_REGISTRATIONS_COLLECTION_ID=workshop_registrations
NEXT_PUBLIC_INSTRUCTORS_COLLECTION_ID=instructors
NEXT_PUBLIC_SUPPORT_STAFF_COLLECTION_ID=support_staff

# App Configuration
NEXT_PUBLIC_APP_NAME="NCC Cyber Workshop 2025"
NEXT_PUBLIC_REGISTRATION_FEE=100
NEXT_PUBLIC_PAYMENT_NUMBER=01784275877
```

Replace the placeholder values with your actual Appwrite project details.

## Security Settings

### 1. Platforms Configuration

Add your domains to the platforms list:

1. Navigate to **Settings** > **Platforms**
2. Click "Add Platform"
3. Select "Web App"
4. Add your domains:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
   - `https://your-vercel-app.vercel.app` (if using Vercel)

### 2. API Keys (Optional)

If you need server-side functionality:

1. Navigate to **Settings** > **API Keys**
2. Click "Create API Key"
3. Set appropriate scopes (be minimal with permissions)
4. Add the API key to your server environment variables

### 3. Webhooks (Optional)

For advanced functionality like sending notifications:

1. Navigate to **Settings** > **Webhooks**
2. Create webhooks for events like:
   - User registration
   - Payment verification
   - Document updates

## Initial Data Setup

### Create Admin User

1. Register the first user through your application
2. In Appwrite console, navigate to **Databases** > **users**
3. Find your user document and update the `role` field to `"admin"`

### Add Sample Instructors

You can add instructor data through your admin panel or directly in the Appwrite console.

## Testing the Setup

1. Start your development server: `npm run dev`
2. Test user registration and login
3. Test workshop registration
4. Test payment form submission
5. Test admin functionality

## Production Deployment

### 1. Environment Variables

Make sure all environment variables are set in your production environment (Vercel, Netlify, etc.).

### 2. Domain Configuration

Update your Appwrite platform settings with your production domain.

### 3. Email Configuration

Configure SMTP settings for production email delivery:

1. Navigate to **Messaging** in Appwrite
2. Configure your SMTP provider
3. Test email delivery

## Backup and Monitoring

### 1. Database Backups

Appwrite Cloud provides automatic backups, but you can also:

1. Export your database regularly
2. Set up monitoring alerts
3. Configure backup retention policies

### 2. Monitoring

Set up monitoring for:

- API response times
- Error rates
- Storage usage
- Database performance

## Troubleshooting

### Common Issues

1. **"User (role: guests) missing scopes (["account"])" Error**
   - **Cause**: Incorrect collection permissions
   - **Solution**: Ensure collections have proper permissions set
   - **Quick Fix**: Use the "Alternative Simple Permissions" shown above
   - **In Appwrite Console**: Go to Database → Collection → Settings → Permissions

2. **"Project with the requested ID could not be found"**
   - **Cause**: Wrong Project ID or Endpoint
   - **Solution**: Verify Project ID and Endpoint in Appwrite console
   - **Check**: Settings → General in your Appwrite project

3. **CORS Errors**: Ensure your domain is added to platforms
4. **Permission Denied**: Check collection permissions
5. **File Upload Fails**: Verify bucket permissions and file size limits
6. **Email Not Sending**: Check SMTP configuration

### Debug Mode

Enable debug mode in development:

```javascript
// In your appwrite client configuration
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setDebug(true) // Enable debug mode
```

## Support

For additional help:

1. [Appwrite Documentation](https://appwrite.io/docs)
2. [Appwrite Discord Community](https://discord.gg/appwrite)
3. [GitHub Issues](https://github.com/appwrite/appwrite/issues)

---

**Note:** Keep your API keys and project credentials secure. Never commit them to version control. Use environment variables for all sensitive configuration.
