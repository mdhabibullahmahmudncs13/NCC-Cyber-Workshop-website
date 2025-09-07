export interface User {
  $id: string;
  name: string;
  email: string;
  student_id: string;
  phone: string;
  institution: string;
  role: 'user' | 'admin';
  profile_picture?: string;
  registration_status: 'pending' | 'verified' | 'rejected';
  $createdAt: string;
  $updatedAt: string;
}

export interface WorkshopRegistration {
  $id: string;
  user_id: string;
  workshop_type: string;
  registration_date: string;
  payment_status: 'pending' | 'verified' | 'rejected';
  payment_transaction_number?: string;
  payment_transaction_id?: string;
  payment_screenshot_url?: string;
  payment_submitted_at?: string;
  $createdAt: string;
  $updatedAt: string;
}

export interface Instructor {
  $id: string;
  name: string;
  bio: string;
  expertise: string[];
  profile_image: string;
  social_linkedin?: string;
  social_twitter?: string;
  social_github?: string;
  social_website?: string;
  created_by: string;
  $createdAt: string;
  $updatedAt: string;
}

export interface SupportStaff {
  $id: string;
  name: string;
  role: string;
  contact: string;
  profile_image: string;
  created_by: string;
  $createdAt: string;
  $updatedAt: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  student_id: string;
  phone: string;
  institution: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface PaymentFormData {
  transaction_number: string;
  transaction_id: string;
  screenshot: File | null;
}

export interface WorkshopSchedule {
  time: string;
  title: string;
  description: string;
  instructor?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface AppwriteConfig {
  endpoint: string;
  projectId: string;
  databaseId: string;
  storageBucketId: string;
  collections: {
    users: string;
    workshopRegistrations: string;
    instructors: string;
    supportStaff: string;
  };
}
