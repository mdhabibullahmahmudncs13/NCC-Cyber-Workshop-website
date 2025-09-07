import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';
import { AppwriteConfig } from '@/types';

const config: AppwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1',
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '',
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
  storageBucketId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID || '',
  collections: {
    users: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID || 'users',
    workshopRegistrations: process.env.NEXT_PUBLIC_WORKSHOP_REGISTRATIONS_COLLECTION_ID || 'workshop_registrations',
    instructors: process.env.NEXT_PUBLIC_INSTRUCTORS_COLLECTION_ID || 'instructors',
    supportStaff: process.env.NEXT_PUBLIC_SUPPORT_STAFF_COLLECTION_ID || 'support_staff',
  },
};

// Initialize Appwrite client with fallback values
const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

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
      return await account.createEmailSession(email, password);
    } catch (error) {
      console.error('Error logging in:', error);
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
      return await account.get();
    } catch (error) {
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

  // Reset password
  async resetPassword(email: string) {
    try {
      return await account.createRecovery(
        email,
        `${window.location.origin}/reset-password`
      );
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  },

  // Confirm password reset
  async confirmPasswordReset(userId: string, secret: string, password: string) {
    try {
      return await account.updateRecovery(userId, secret, password, password);
    } catch (error) {
      console.error('Error confirming password reset:', error);
      throw error;
    }
  },
};

// Database functions
export const databaseService = {
  // Users
  async createUser(userData: any): Promise<any> {
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

  async getAllUsers(): Promise<any> {
    try {
      return await databases.listDocuments(
        config.databaseId,
        config.collections.users,
        [Query.orderDesc('$createdAt')]
      );
    } catch (error) {
      console.error('Error getting all users:', error);
      throw error;
    }
  },

  // Workshop Registrations
  async createRegistration(registrationData: any): Promise<any> {
    try {
      return await databases.createDocument(
        config.databaseId,
        config.collections.workshopRegistrations,
        ID.unique(),
        registrationData
      );
    } catch (error) {
      console.error('Error creating registration:', error);
      throw error;
    }
  },

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

  async getAllRegistrations() {
    try {
      return await databases.listDocuments(
        config.databaseId,
        config.collections.workshopRegistrations,
        [Query.orderDesc('$createdAt')]
      );
    } catch (error) {
      console.error('Error getting all registrations:', error);
      throw error;
    }
  },

  async updateRegistration(registrationId: string, data: any) {
    try {
      console.log('Database service: updating registration', registrationId)
      console.log('Database service: update data', data)
      console.log('Database ID:', config.databaseId)
      console.log('Collection ID:', config.collections.workshopRegistrations)
      const result = await databases.updateDocument(
        config.databaseId,
        config.collections.workshopRegistrations,
        registrationId,
        data
      );
      console.log('Database service: registration updated successfully', result)
      return result;
    } catch (error) {
      console.error('Error updating registration:', error);
      throw error;
    }
  },

  // Instructors
  async createInstructor(instructorData: any) {
    try {
      console.log('Database service: Creating instructor with data:', instructorData)
      console.log('Database ID:', config.databaseId)
      console.log('Collection ID:', config.collections.instructors)
      
      const result = await databases.createDocument(
        config.databaseId,
        config.collections.instructors,
        ID.unique(),
        instructorData
      );
      
      console.log('Database service: Instructor created successfully:', result)
      return result;
    } catch (error) {
      console.error('Error creating instructor:', error);
      throw error;
    }
  },

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

  async updateInstructor(instructorId: string, data: any) {
    try {
      return await databases.updateDocument(
        config.databaseId,
        config.collections.instructors,
        instructorId,
        data
      );
    } catch (error) {
      console.error('Error updating instructor:', error);
      throw error;
    }
  },

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

  // Support Staff
  async createSupportStaff(staffData: any) {
    try {
      return await databases.createDocument(
        config.databaseId,
        config.collections.supportStaff,
        ID.unique(),
        staffData
      );
    } catch (error) {
      console.error('Error creating support staff:', error);
      throw error;
    }
  },

  async getAllSupportStaff() {
    try {
      return await databases.listDocuments(
        config.databaseId,
        config.collections.supportStaff
      );
    } catch (error) {
      console.error('Error getting support staff:', error);
      throw error;
    }
  },

  async updateSupportStaff(staffId: string, data: any) {
    try {
      return await databases.updateDocument(
        config.databaseId,
        config.collections.supportStaff,
        staffId,
        data
      );
    } catch (error) {
      console.error('Error updating support staff:', error);
      throw error;
    }
  },

  async deleteSupportStaff(staffId: string) {
    try {
      return await databases.deleteDocument(
        config.databaseId,
        config.collections.supportStaff,
        staffId
      );
    } catch (error) {
      console.error('Error deleting support staff:', error);
      throw error;
    }
  },
};

// Storage functions
export const storageService = {
  async uploadFile(file: File) {
    try {
      console.log('Storage service: uploading file', file.name, file.size)
      console.log('Storage bucket ID:', config.storageBucketId)
      const result = await storage.createFile(
        config.storageBucketId,
        ID.unique(),
        file
      );
      console.log('Storage service: file uploaded successfully', result)
      return result;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  async deleteFile(fileId: string) {
    try {
      return await storage.deleteFile(config.storageBucketId, fileId);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  },

  getFilePreview(fileId: string) {
    return storage.getFilePreview(
      config.storageBucketId,
      fileId,
      400,
      400,
      'center',
      100
    );
  },

  getFileView(fileId: string) {
    return storage.getFileView(config.storageBucketId, fileId);
  },
};

export { config, ID, Query };
