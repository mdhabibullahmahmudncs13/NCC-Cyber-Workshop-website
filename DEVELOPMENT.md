# Development Guide - NCC Cyber Workshop 2025

## Quick Start

1. **Setup the project**:
   ```bash
   npm run setup
   ```

2. **Configure Appwrite** (See `appwrite_setup.md` for detailed instructions):
   - Create Appwrite account and project
   - Set up database collections
   - Configure authentication and storage
   - Update `.env.local` with your credentials

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**: [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes group
│   │   ├── login/page.tsx        # Login page
│   │   └── register/page.tsx     # Registration page
│   ├── dashboard/                # Protected dashboard routes
│   │   ├── admin/page.tsx        # Admin panel
│   │   └── page.tsx              # User dashboard
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Landing page
├── components/                   # Reusable React components
│   ├── forms/                    # Form components
│   │   └── PaymentForm.tsx       # Payment submission form
│   ├── layout/                   # Layout components
│   │   ├── Footer.tsx            # Site footer
│   │   └── Navbar.tsx            # Navigation header
│   ├── providers/                # Context providers
│   │   ├── AuthProvider.tsx      # Authentication context
│   │   └── ThemeProvider.tsx     # Theme management
│   ├── sections/                 # Landing page sections
│   │   ├── FAQ.tsx               # FAQ section
│   │   ├── Hero.tsx              # Hero section
│   │   ├── Instructors.tsx       # Instructors section
│   │   ├── Schedule.tsx          # Workshop schedule
│   │   └── WorkshopDetails.tsx   # Workshop information
│   └── ui/                       # UI components
│       ├── Button.tsx            # Button component
│       └── CountdownTimer.tsx    # Registration countdown
├── lib/                          # Utility libraries
│   ├── appwrite.ts               # Appwrite SDK configuration
│   └── utils.ts                  # Helper functions
├── styles/                       # Global styles
│   └── globals.css               # Tailwind CSS + custom styles
└── types/                        # TypeScript definitions
    └── index.ts                  # Type definitions
```

## Key Features Implementation

### 1. Authentication System
- **Location**: `src/components/providers/AuthProvider.tsx`
- **Features**: Login, registration, email verification, password reset
- **Database**: Users collection with role-based permissions

### 2. Workshop Registration
- **Location**: `src/app/dashboard/page.tsx`
- **Features**: Registration form, status tracking, payment integration
- **Database**: Workshop_registrations collection

### 3. Payment System
- **Location**: `src/components/forms/PaymentForm.tsx`
- **Features**: bKash/Nagad payment submission, screenshot upload
- **Storage**: Payment screenshots in Appwrite storage

### 4. Admin Panel
- **Location**: `src/app/dashboard/admin/page.tsx`
- **Features**: User management, payment verification, analytics
- **Access**: Admin role required

### 5. Responsive Design
- **Framework**: Tailwind CSS with custom cybersecurity theme
- **Breakpoints**: Mobile-first responsive design
- **Dark Mode**: Default dark theme with neon accents

## Development Workflow

### Adding New Features

1. **Create component structure**:
   ```bash
   # For new page
   src/app/new-feature/page.tsx
   
   # For new component
   src/components/feature/NewComponent.tsx
   ```

2. **Add types** (if needed):
   ```typescript
   // src/types/index.ts
   export interface NewFeature {
     id: string;
     name: string;
   }
   ```

3. **Update Appwrite** (if needed):
   - Add new collection
   - Update permissions
   - Add to database service

4. **Test and validate**:
   ```bash
   npm run build
   npm run dev
   ```

### Code Style Guidelines

1. **File Naming**:
   - Components: `PascalCase.tsx`
   - Pages: `page.tsx`
   - Utilities: `camelCase.ts`

2. **Component Structure**:
   ```typescript
   'use client' // If using hooks
   
   import statements...
   
   interface ComponentProps {
     // props definition
   }
   
   export function ComponentName({ props }: ComponentProps) {
     // component logic
     return (
       // JSX
     )
   }
   ```

3. **Styling**:
   - Use Tailwind CSS classes
   - Custom styles in `globals.css`
   - Responsive design first

### Environment Variables

Required environment variables in `.env.local`:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=your_bucket_id

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

## Testing

### Manual Testing Checklist

- [ ] User registration flow
- [ ] Email verification
- [ ] Login/logout functionality
- [ ] Workshop registration
- [ ] Payment form submission
- [ ] Admin panel access
- [ ] Payment verification
- [ ] Responsive design on mobile
- [ ] Dark mode theme

### Test User Accounts

Create test accounts for different scenarios:

1. **Regular User**: Test workshop registration and payment
2. **Admin User**: Test admin panel features
3. **Verified User**: Test complete workflow

## Deployment

### Vercel Deployment (Recommended)

1. **Connect repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy with automatic builds**

### Other Platforms

The application supports deployment on:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

### Pre-deployment Checklist

- [ ] All environment variables configured
- [ ] Appwrite collections set up with proper permissions
- [ ] Authentication configured for production domain
- [ ] File storage permissions configured
- [ ] Email templates customized
- [ ] Admin user created
- [ ] Test all major workflows

## Performance Optimization

### Built-in Optimizations

1. **Next.js 14 Features**:
   - App Router for better performance
   - Automatic code splitting
   - Image optimization
   - Static generation where possible

2. **Tailwind CSS**:
   - Purged unused styles
   - Optimized for production builds
   - Custom utilities for consistent design

3. **Component Structure**:
   - Client/Server component separation
   - Lazy loading where appropriate
   - Optimized re-renders

### Monitoring

Monitor these metrics in production:
- Page load times
- API response times
- Error rates
- User registration conversion
- Payment completion rates

## Security Considerations

### Implemented Security Features

1. **Authentication**:
   - Email verification required
   - Secure session management
   - Role-based access control

2. **Data Validation**:
   - Client-side form validation
   - Server-side validation via Appwrite
   - File upload restrictions

3. **Database Security**:
   - Collection-level permissions
   - User-specific data access
   - Admin-only operations

### Security Best Practices

- Never commit API keys or secrets
- Use environment variables for all configuration
- Validate all user inputs
- Implement proper error handling
- Keep dependencies updated

## Troubleshooting

### Common Issues

1. **Build Errors**:
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

2. **Appwrite Connection Issues**:
   - Check environment variables
   - Verify platform configuration in Appwrite
   - Check network connectivity

3. **Authentication Problems**:
   - Verify email verification settings
   - Check user permissions in database
   - Validate session management

4. **Payment Form Issues**:
   - Check file upload permissions
   - Verify storage bucket configuration
   - Validate file size limits

### Debug Mode

Enable debug logging in development:

```typescript
// In appwrite.ts
const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setDebug(true) // Add this for debugging
```

## Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Follow code style guidelines**
4. **Test thoroughly**
5. **Submit pull request**

## Support

For development support:
- Check documentation files
- Review Appwrite documentation
- Test with minimal examples
- Create GitHub issues for bugs

---

**Happy coding! 🚀**
