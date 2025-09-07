const { Client, Storage, Permission, Role } = require('node-appwrite');

// Configuration
const config = {
  endpoint: 'https://fra.cloud.appwrite.io/v1',
  projectId: '68bb9d7800190636a8b2',
  bucketId: 'bde3da204de6e38f3fb471da',
  // You need to get an API key from your Appwrite console
  // Go to Settings > API Keys > Create API Key with 'storage.write' scope
  apiKey: 'YOUR_API_KEY_HERE' // Replace with your actual API key
};

async function createStorageBucket() {
  console.log('🚀 Setting up Appwrite Storage Bucket...');
  
  if (config.apiKey === 'YOUR_API_KEY_HERE') {
    console.log('\n❌ Error: API Key not configured');
    console.log('To create the storage bucket automatically:');
    console.log('1. Go to your Appwrite Console: https://fra.cloud.appwrite.io');
    console.log('2. Navigate to Settings > API Keys');
    console.log('3. Create a new API Key with "storage.write" scope');
    console.log('4. Replace "YOUR_API_KEY_HERE" in this script with your API key');
    console.log('5. Run: node setup-storage-bucket.js');
    console.log('\nAlternatively, create the bucket manually:');
    console.log('1. Go to Storage > Buckets in your Appwrite Console');
    console.log('2. Click "Create Bucket"');
    console.log('3. Use bucket ID: bde3da204de6e38f3fb471da');
    console.log('4. Configure permissions as shown below');
    return;
  }

  const client = new Client();
  const storage = new Storage(client);

  client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setKey(config.apiKey);

  try {
    // Create storage bucket
    const bucket = await storage.createBucket(
      config.bucketId, // bucketId
      'Workshop Storage', // name
      [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users())
      ], // permissions
      false, // fileSecurity
      true, // enabled
      10 * 1024 * 1024, // maximumFileSize (10MB)
      ['jpg', 'jpeg', 'png', 'gif', 'pdf'], // allowedFileExtensions
      'none', // compression
      false, // encryption
      false // antivirus
    );

    console.log('✅ Storage bucket created successfully!');
    console.log('📁 Bucket ID:', bucket.$id);
    console.log('📝 Bucket Name:', bucket.name);
    console.log('📊 Max File Size:', (bucket.maximumFileSize / 1024 / 1024) + 'MB');
    console.log('📎 Allowed Extensions:', bucket.allowedFileExtensions.join(', '));
    console.log('\n✅ Your environment is now configured correctly!');
    
  } catch (error) {
    if (error.code === 409) {
      console.log('✅ Storage bucket already exists!');
      console.log('📁 Bucket ID: bde3da204de6e38f3fb471da');
      console.log('✅ Your environment is configured correctly!');
    } else {
      console.error('❌ Error creating storage bucket:', error.message);
      console.log('\n🔧 Manual Setup Instructions:');
      console.log('1. Go to your Appwrite Console: https://fra.cloud.appwrite.io');
      console.log('2. Navigate to Storage > Buckets');
      console.log('3. Click "Create Bucket"');
      console.log('4. Use these settings:');
      console.log('   - Bucket ID: bde3da204de6e38f3fb471da');
      console.log('   - Name: Workshop Storage');
      console.log('   - Maximum File Size: 10MB');
      console.log('   - Allowed Extensions: jpg, jpeg, png, gif, pdf');
      console.log('   - Permissions:');
      console.log('     * Read: Any');
      console.log('     * Create: Users');
      console.log('     * Update: Users');
      console.log('     * Delete: Users');
    }
  }
}

createStorageBucket();
