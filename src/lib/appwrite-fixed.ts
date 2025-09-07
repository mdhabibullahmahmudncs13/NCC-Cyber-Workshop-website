import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';
import { AppwriteConfig } from '@/types';

const config: AppwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  storageBucketId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!,
  collections: {
    users: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
    workshopRegistrations: process.env.NEXT_PUBLIC_WORKSHOP_REGISTRATIONS_COLLECTION_ID!,
    instructors: process.env.NEXT_PUBLIC_INSTRUCTORS_COLLECTION_ID!,
    supportStaff: process.env.NEXT_PUBLIC_SUPPORT_STAFF_COLLECTION_ID!,
  },
};

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Test connection and log configuration
console.log('Appwrite Configuration:', {
  endpoint: config.endpoint,
  projectId: config.projectId,
  databaseId: config.databaseId
});

// Helper functions
export const generateUserId = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8);
  return `CS-2405${timestamp.slice(-3)}${random}`;
};

export const generateReferenceCode = (userId: string) => {
  return `NCC-${userId}`;
};

// Auth functions
export const authService = {
  // Create new account
  async createAccount(email: string, password: string, name: string) {
    try {
      const userId = generateUserId();
      const newAccount = await account.create(userId, email, password, name);
      return newAccount;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  },

  // Login
  async login(email: string, password: string) {
    try {
      console.log('Attempting login for:', email);
      
      // First, check if there's an existing session and delete it
      try {
        await account.deleteSession('current');
        console.log('Deleted existing session');
      } catch (error) {
        console.log('No existing session to delete');
      }
      
      // Create new session
      const session = await account.createEmailSession(email, password);
      console.log('Login successful, session created:', session);
      return session;
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Logout
  async logout() {
    try {
      return await account.deleteSession('current');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      console.log('Getting current user...');
      const user = await account.get();
      console.log('Current user retrieved:', user);
      return user;
    } catch (error: any) {
      console.error('Error getting current user:', error);
      
      // If user is not authenticated, return null instead of throwing
      if (error.code === 401 || error.message?.includes('missing scopes')) {
        console.log('User not authenticated (guest user)');
        return null;
      }
      
      return null;
    }
  },

  // Send email verification
  async sendEmailVerification() {
    try {
      return await account.createVerification(
        `${window.location.origin}/verify-email`
      );
    } catch (error) {
      console.error('Error sending email verification:', error);
      throw error;
    }
  },

  // Confirm email verification
  async confirmEmailVerification(userId: string, secret: string) {
    try {
      return await account.updateVerification(userId, secret);
    } catch (error) {
      console.error('Error confirming email verification:', error);
      throw error;
    }
  },
};

// Database functions
export const databaseService = {
  // Create user
  async createUser(userData: any) {
    try {
      return await databases.createDocument(
        config.databaseId,
        config.collections.users,
        userData.$id,
        userData
      );
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Get user
  async getUser(userId: string) {
    try {
      return await databases.getDocument(
        config.databaseId,
        config.collections.users,
        userId
      );
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  // Update user
  async updateUser(userId: string, userData: any) {
    try {
      return await databases.updateDocument(
        config.databaseId,
        config.collections.users,
        userId,
        userData
      );
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Create workshop registration
  async createWorkshopRegistration(registrationData: any) {
    try {
      return await databases.createDocument(
        config.databaseId,
        config.collections.workshopRegistrations,
        ID.unique(),
        registrationData
      );
    } catch (error) {
      console.error('Error creating workshop registration:', error);
      throw error;
    }
  },

  // Get user registrations
  async getUserRegistrations(userId: string) {
    try {
      return await databases.listDocuments(
        config.databaseId,
        config.collections.workshopRegistrations,
        [Query.equal('user_id', userId)]
      );
    } catch (error) {
      console.error('Error getting user registrations:', error);
      throw error;
    }
  },

  // Update registration
  async updateRegistration(registrationId: string, updateData: any) {
    try {
      return await databases.updateDocument(
        config.databaseId,
        config.collections.workshopRegistrations,
        registrationId,
        updateData
      );
    } catch (error) {
      console.error('Error updating registration:', error);
      throw error;
    }
  },

  // Create instructor
  async createInstructor(instructorData: any) {
    try {
      console.log('Database service: Creating instructor with data:', instructorData);
      console.log('Database service: Using database ID:', config.databaseId);
      console.log('Database service: Using collection ID:', config.collections.instructors);
      
      // Check if user is authenticated first
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('Authentication required. Please log in and try again.');
      }
      
      console.log('Database service: User authenticated:', currentUser.$id);
      
      const result = await databases.createDocument(
        config.databaseId,
        config.collections.instructors,
        ID.unique(),
        {
          ...instructorData,
          created_by: currentUser.$id,
          created_at: new Date().toISOString()
        }
      );
      
      console.log('Database service: Instructor created successfully:', result);
      return result;
    } catch (error: any) {
      console.error('Database service: Error creating instructor:', error);
      
      // Provide more specific error messages
      if (error.message?.includes('missing scopes')) {
        throw new Error('Authentication required. Please log in and try again.');
      } else if (error.message?.includes('Collection not found')) {
        throw new Error('Instructors collection not found. Please check your database setup.');
      } else if (error.message?.includes('Permission denied')) {
        throw new Error('You do not have permission to create instructors. Please check your account permissions.');
      }
      
      throw error;
    }
  },

  // Get all instructors
  async getAllInstructors() {
    try {
      return await databases.listDocuments(
        config.databaseId,
        config.collections.instructors
      );
    } catch (error) {
      console.error('Error getting instructors:', error);
      throw error;
    }
  },

  // Update instructor
  async updateInstructor(instructorId: string, instructorData: any) {
    try {
      return await databases.updateDocument(
        config.databaseId,
        config.collections.instructors,
        instructorId,
        instructorData
      );
    } catch (error) {
      console.error('Error updating instructor:', error);
      throw error;
    }
  },

  // Delete instructor
  async deleteInstructor(instructorId: string) {
    try {
      return await databases.deleteDocument(
        config.databaseId,
        config.collections.instructors,
        instructorId
      );
    } catch (error) {
      console.error('Error deleting instructor:', error);
      throw error;
    }
  },

  // Get all registrations (admin)
  async getAllRegistrations() {
    try {
      return await databases.listDocuments(
        config.databaseId,
        config.collections.workshopRegistrations
      );
    } catch (error) {
      console.error('Error getting all registrations:', error);
      throw error;
    }
  },

  // Search registrations
  async searchRegistrations(searchTerm: string) {
    try {
      return await databases.listDocuments(
        config.databaseId,
        config.collections.workshopRegistrations,
        [Query.search('name', searchTerm)]
      );
    } catch (error) {
      console.error('Error searching registrations:', error);
      throw error;
    }
  },
};

// Storage functions
export const storageService = {
  // Upload file
  async uploadFile(file: File) {
    try {
      return await storage.createFile(
        config.storageBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  // Get file preview
  getFilePreview(fileId: string) {
    return storage.getFilePreview(config.storageBucketId, fileId);
  },

  // Delete file
  async deleteFile(fileId: string) {
    try {
      return await storage.deleteFile(config.storageBucketId, fileId);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  },
};

export { config };
