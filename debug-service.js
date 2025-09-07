import { databaseService } from './src/lib/appwrite'

// List all methods available in databaseService
console.log('databaseService methods:', Object.getOwnPropertyNames(databaseService))
console.log('getAllUsers method exists:', typeof databaseService.getAllUsers)
console.log('createRegistration method exists:', typeof databaseService.createRegistration)
