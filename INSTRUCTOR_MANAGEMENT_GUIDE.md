# 🎯 How to Update Instructor Information

## 📋 Overview

You can now manage instructor information through the admin panel! Here are the different ways to update instructors:

## 🔧 Methods to Update Instructors

### 1. **Admin Dashboard (Recommended)**
The easiest way to manage instructors:

1. **Go to Admin Panel**: Visit `http://localhost:3000/dashboard/admin`
2. **Click "Manage Instructors"** in the Quick Actions section
3. **Add/Edit/Delete instructors** using the web interface

**Features:**
- ✅ Add new instructors with full details
- ✅ Edit existing instructor information
- ✅ Delete instructors
- ✅ Manage expertise areas
- ✅ Add social media links
- ✅ Upload profile images

### 2. **Direct Database Access**
For advanced users who prefer database management:

1. **Go to Appwrite Console**: Visit your Appwrite project
2. **Navigate to**: Databases → ncc_workshop_db → instructors
3. **Add/Edit documents** directly in the database

### 3. **API Integration**
For developers who want to integrate with external systems:

```javascript
// Add instructor
await databaseService.createInstructor({
  name: "John Doe",
  bio: "Expert in cybersecurity...",
  expertise: ["Penetration Testing", "Network Security"],
  profile_image: "https://example.com/photo.jpg",
  social_linkedin: "https://linkedin.com/in/johndoe",
  social_github: "https://github.com/johndoe",
  created_by: "admin_user_id"
})

// Update instructor
await databaseService.updateInstructor(instructorId, {
  name: "Updated Name",
  bio: "Updated bio..."
})

// Delete instructor
await databaseService.deleteInstructor(instructorId)
```

## 🚀 Step-by-Step Guide (Admin Dashboard)

### Adding a New Instructor

1. **Access Admin Panel**:
   - Login as admin user
   - Go to `/dashboard/admin`
   - Click "Manage Instructors"

2. **Add Instructor**:
   - Click the "Add Instructor" button
   - Fill in the form:
     - **Name** *(required)*: Full name of the instructor
     - **Bio** *(required)*: Background and experience
     - **Profile Image**: URL to instructor's photo
     - **Expertise**: Areas of specialization (can add multiple)
     - **Social Links**: LinkedIn, Twitter, GitHub, Website

3. **Save**:
   - Click "Add Instructor" to save
   - The instructor will appear on the homepage immediately

### Editing an Existing Instructor

1. **Find the Instructor**:
   - Go to `/dashboard/admin/instructors`
   - Locate the instructor card

2. **Edit**:
   - Click the blue "Edit" button (pencil icon)
   - Modify the information in the form
   - Click "Update Instructor" to save

### Deleting an Instructor

1. **Locate the Instructor**:
   - Go to `/dashboard/admin/instructors`
   - Find the instructor you want to remove

2. **Delete**:
   - Click the red "Delete" button (trash icon)
   - Confirm the deletion
   - The instructor will be removed immediately

## 📝 Required Information

### Minimum Required Fields:
- **Name**: Instructor's full name
- **Bio**: Background, experience, and credentials

### Optional Fields:
- **Profile Image**: URL to instructor's photo
- **Expertise**: Areas of specialization (e.g., "Penetration Testing", "Digital Forensics")
- **Social Media Links**:
  - LinkedIn profile
  - Twitter handle
  - GitHub profile
  - Personal website

## 🎨 Display on Website

Instructors appear in the "Expert Instructors" section on the homepage with:
- ✅ Profile photo (if provided)
- ✅ Name and bio
- ✅ Expertise badges
- ✅ Social media links
- ✅ Professional card layout

## 🔄 Real-Time Updates

- **Immediate**: Changes appear on the website instantly
- **No Restart Required**: Updates are live without server restart
- **Fallback System**: If database is unavailable, shows default instructors

## 🛡️ Access Control

- **Admin Only**: Only users with admin role can manage instructors
- **Secure**: All operations require authentication
- **Audit Trail**: Changes are logged with timestamps

## 🔗 Quick Links

- **Admin Dashboard**: `http://localhost:3000/dashboard/admin`
- **Instructor Management**: `http://localhost:3000/dashboard/admin/instructors`
- **Homepage (to see changes)**: `http://localhost:3000`

## 💡 Pro Tips

1. **Image URLs**: Use high-quality, professional photos
2. **Bio Length**: Keep bios informative but concise (2-3 sentences ideal)
3. **Expertise**: Use clear, specific terms (e.g., "Web Application Security" vs "Security")
4. **Social Links**: Ensure all URLs are complete and working

## 🚨 Troubleshooting

### If instructors don't appear:
1. Check admin permissions
2. Verify database connection
3. Check browser console for errors
4. Ensure Appwrite collections are set up correctly

### If edit form doesn't save:
1. Verify all required fields are filled
2. Check network connection
3. Ensure proper admin role permissions

---

**🎯 The instructor management system is now fully operational!** 

You can easily keep your workshop instructor information up-to-date through the user-friendly admin interface. 🛡️✨
