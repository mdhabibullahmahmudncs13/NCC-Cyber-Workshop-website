# Deployment Checklist - NCC Cyber Workshop 2025

## Pre-Deployment Setup

### 1. Appwrite Configuration ✅
- [ ] Create Appwrite account at [cloud.appwrite.io](https://cloud.appwrite.io)
- [ ] Create new project: "NCC Cyber Workshop 2025"
- [ ] Set up database with collections (see `appwrite_setup.md`)
- [ ] Configure storage bucket for file uploads
- [ ] Set up authentication with email verification
- [ ] Configure platform URLs for your domain

### 2. Environment Variables ✅
- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Update with your Appwrite credentials:
  ```env
  NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
  NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
  NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
  NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=your_bucket_id
  ```

### 3. Database Collections ✅

**Users Collection** (`users`):
- name, email, student_id, phone, institution
- role (user/admin), registration_status, profile_picture
- Indexes: email (unique), student_id (unique)

**Workshop Registrations** (`workshop_registrations`):
- user_id, workshop_type, registration_date
- payment_status, payment transaction details (individual fields)

**Instructors** (`instructors`):
- name, bio, expertise (array), profile_image
- social links (individual fields)

**Support Staff** (`support_staff`):
- name, role, contact, profile_image

### 4. Storage Configuration ✅
- **Bucket Name**: `workshop_files`
- **Max File Size**: 10MB
- **Allowed Extensions**: jpg, jpeg, png, pdf
- **Permissions**: Read/Write for authenticated users

## Deployment Platforms

### Vercel (Recommended) 🌟

1. **Connect Repository**:
   - Connect your GitHub repo to Vercel
   - Import project settings

2. **Environment Variables**:
   ```bash
   # Add in Vercel dashboard under Settings > Environment Variables
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=your_bucket_id
   NEXT_PUBLIC_USERS_COLLECTION_ID=users
   NEXT_PUBLIC_WORKSHOP_REGISTRATIONS_COLLECTION_ID=workshop_registrations
   NEXT_PUBLIC_INSTRUCTORS_COLLECTION_ID=instructors
   NEXT_PUBLIC_SUPPORT_STAFF_COLLECTION_ID=support_staff
   NEXT_PUBLIC_APP_NAME="NCC Cyber Workshop 2025"
   NEXT_PUBLIC_REGISTRATION_FEE=100
   NEXT_PUBLIC_PAYMENT_NUMBER=01784275877
   ```

3. **Deploy**:
   - Push to main branch for automatic deployment
   - Or manually trigger deployment in Vercel dashboard

### Netlify Alternative

1. **Build Settings**:
   ```bash
   # Build command
   npm run build
   
   # Publish directory
   .next
   ```

2. **Environment Variables**: Same as Vercel
3. **Deploy**: Connect repo and configure build settings

### Railway Alternative

1. **Create Project**: Import from GitHub
2. **Set Environment Variables**: In project settings
3. **Deploy**: Automatic on push to main

## Post-Deployment Configuration

### 1. Update Appwrite Platform Settings
- Add your production domain to Appwrite platforms
- Example: `https://ncc-workshop.vercel.app`

### 2. Test Core Functionality
- [ ] Homepage loads correctly
- [ ] User registration works
- [ ] Email verification sends
- [ ] Login/logout functionality
- [ ] Workshop registration
- [ ] Payment form submission
- [ ] Admin panel access
- [ ] File uploads work

### 3. Create Admin User
1. Register first user through the website
2. In Appwrite console, update user role to "admin"
3. Verify admin panel access

### 4. Add Sample Data (Optional)
- Add instructor profiles
- Add support staff information
- Test with sample registrations

## Security Checklist

### Production Security ✅
- [ ] All API keys in environment variables
- [ ] No sensitive data in git repository
- [ ] HTTPS enabled (automatic with Vercel/Netlify)
- [ ] CORS configured in Appwrite
- [ ] File upload restrictions in place
- [ ] Database permissions properly set

### Monitoring Setup
- [ ] Set up error monitoring (Sentry, LogRocket)
- [ ] Configure uptime monitoring
- [ ] Set up analytics (Google Analytics, Plausible)
- [ ] Monitor Appwrite usage limits

## Performance Optimization

### Built-in Optimizations ✅
- Next.js 14 with App Router
- Automatic code splitting
- Image optimization
- Static generation where possible
- Tailwind CSS purging

### Additional Optimizations
- [ ] Set up CDN for static assets
- [ ] Enable compression
- [ ] Optimize images for web
- [ ] Set up proper caching headers

## Backup Strategy

### Database Backup
- [ ] Set up regular database exports
- [ ] Store backups in secure location
- [ ] Test backup restoration process

### Code Backup
- [ ] Use version control (Git)
- [ ] Regular commits and pushes
- [ ] Tag releases for easy rollback

## Launch Checklist

### Final Testing
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness testing
- [ ] Payment flow testing
- [ ] Admin functionality testing
- [ ] Load testing with multiple users

### Content Review
- [ ] All text content reviewed
- [ ] Contact information verified
- [ ] Payment details confirmed
- [ ] Workshop schedule finalized
- [ ] FAQ content complete

### Marketing Preparation
- [ ] Social media assets ready
- [ ] Launch announcement prepared
- [ ] Email templates configured
- [ ] Analytics tracking set up

## Workshop Management

### Registration Period (Sept 6-10, 2025)
- [ ] Monitor registration numbers
- [ ] Verify payments promptly
- [ ] Send confirmation emails
- [ ] Handle support requests

### Workshop Day (Sept 11, 2025)
- [ ] Participant list ready
- [ ] Check-in process prepared
- [ ] Certificates ready for completion
- [ ] Feedback collection system

## Support & Maintenance

### Ongoing Monitoring
- [ ] Daily payment verification
- [ ] User support requests
- [ ] System health monitoring
- [ ] Security updates

### Contact Information
- **Email**: cyber@ncc.org
- **Phone**: 01784275877
- **Payment Number**: 01784275877 (bKash/Nagad)

## Emergency Procedures

### If Website Goes Down
1. Check hosting platform status
2. Verify DNS settings
3. Roll back to previous version if needed
4. Contact hosting support
5. Update participants via alternative channels

### If Appwrite Issues
1. Check Appwrite status page
2. Verify API credentials
3. Test with Appwrite console
4. Contact Appwrite support
5. Implement manual backup procedures

## Success Metrics

### Target Metrics
- [ ] 100+ workshop registrations
- [ ] 95%+ payment completion rate
- [ ] <2 second page load times
- [ ] 99%+ uptime during registration period
- [ ] High user satisfaction scores

### Analytics to Track
- User registration conversion rate
- Payment completion rate
- Page load performance
- Error rates
- User engagement metrics

---

## Quick Commands

```bash
# Setup project
npm run setup

# Start development
npm run dev

# Test instructor creation (after fixing TypeScript issues)
# Go to http://localhost:3000/dashboard/admin/instructors
# Check browser console for debug logs when adding instructors

# Build for production
npm run build

# Start production server
npm run start

# Deploy to Vercel
vercel --prod
```

## Support Resources

- **Project Documentation**: `README.md`, `DEVELOPMENT.md`
- **Appwrite Setup**: `appwrite_setup.md`
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Appwrite Docs**: [appwrite.io/docs](https://appwrite.io/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

**🚀 Ready to launch the NCC Cyber Workshop 2025 website!**

Good luck with your cybersecurity workshop! 🛡️
