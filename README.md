# NCC Cyber Workshop 2025 Website

A modern, responsive website for the NCC (Niter Computer Club) Cyber Workshop 2025 built with Next.js, Appwrite, and Tailwind CSS.

**Status**: ✅ Build Fixed - Deployment Ready

## 🚀 Features

- **Modern Design**: Cybersecurity-themed UI with dark mode and neon accents
- **Responsive**: Mobile-first design that works on all devices
- **Authentication**: Secure user registration and login with email verification
- **Workshop Registration**: Complete registration system with payment tracking
- **Payment Integration**: bKash/Nagad payment submission with screenshot upload
- **Admin Panel**: Comprehensive admin dashboard for user and registration management
- **Real-time Updates**: Dynamic content and status updates
- **SEO Optimized**: Built with Next.js 13+ App Router for optimal performance

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom cybersecurity theme
- **Backend**: Appwrite (Database, Authentication, Storage)
- **UI Components**: Custom components with Lucide React icons
- **Form Handling**: React Hook Form with validation
- **Notifications**: React Hot Toast
- **Animation**: Framer Motion (optional)

## 📋 Prerequisites

- Node.js 18+ and npm
- Appwrite account (free tier available)
- Git for version control

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ncc-cyber-workshop-2025
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Appwrite

Follow the detailed [Appwrite Setup Guide](./appwrite_setup.md) to:
- Create an Appwrite project
- Set up database and collections
- Configure authentication and storage
- Set up permissions

### 4. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=your_storage_bucket_id_here

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

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the website.

## 📖 Project Structure

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── (auth)/            # Authentication pages
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── dashboard/         # User dashboard
│   │   ├── admin/         # Admin panel
│   │   └── profile/       # User profile
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── forms/             # Form components
│   ├── layout/            # Layout components
│   ├── providers/         # Context providers
│   ├── sections/          # Page sections
│   └── ui/                # UI components
├── lib/                   # Utility libraries
│   ├── appwrite.ts        # Appwrite configuration
│   └── utils.ts           # Helper functions
├── styles/                # Global styles
│   └── globals.css        # Tailwind CSS imports
└── types/                 # TypeScript type definitions
    └── index.ts           # Global types
```

## 🔧 Configuration

### Database Schema

The application uses the following Appwrite collections:

1. **Users**: User profiles and authentication data
2. **Workshop Registrations**: Registration and payment tracking
3. **Instructors**: Workshop instructor information
4. **Support Staff**: Support team information

### Authentication

- Email/password authentication with email verification
- Role-based access control (user/admin)
- Secure session management
- Password reset functionality

### Payment System

- Mobile banking integration (bKash/Nagad)
- Payment screenshot upload
- Admin verification system
- Reference code generation

## 👨‍💻 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting (optional)
- Component-based architecture

### Adding Features

1. Create components in appropriate directories
2. Use TypeScript interfaces for type safety
3. Follow the existing naming conventions
4. Update documentation as needed

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy with automatic builds on push

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

### Environment Variables for Production

Ensure all environment variables are set in your production environment. Never commit sensitive data to version control.

## 🛡️ Security

- Input validation on all forms
- File upload restrictions
- Rate limiting (Appwrite handles this)
- CORS configuration
- Environment variable protection
- XSS protection via React

## 📱 Features Overview

### For Users
- Workshop registration
- Payment submission
- Profile management
- Registration status tracking
- Email notifications

### For Admins
- User management
- Payment verification
- Registration analytics
- Instructor management
- Support staff management

## 🎨 Customization

### Theme Colors

The cybersecurity theme uses these custom colors (defined in `tailwind.config.js`):

- `cyber-blue`: #00d4ff
- `cyber-green`: #00ff88
- `cyber-purple`: #8b5cf6
- `cyber-pink`: #ff0080
- `cyber-yellow`: #ffff00

### Styling

- Dark mode by default
- Responsive design with mobile-first approach
- Custom animations and transitions
- Cyber-themed visual effects

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:

- Email: cyber@ncc.org
- Phone: 01784275877
- Documentation: Check the docs folder

## 📄 License

This project is created for NCC (Niter Computer Club) Cyber Workshop 2025.

## 🙏 Acknowledgments

- NCC (Niter Computer Club) for organizing the workshop
- Appwrite for backend services
- Next.js team for the framework
- Tailwind CSS for styling utilities

---

**Workshop Details:**
- Date: September 11, 2025
- Registration: September 6-10, 2025  
- Fee: 100 TK
- Payment: bKash/Nagad to 01784275877
