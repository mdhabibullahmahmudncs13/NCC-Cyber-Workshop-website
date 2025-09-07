'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { databaseService, storageService } from '@/lib/appwrite'
import { toast } from 'react-hot-toast'
import { 
  User, 
  Edit3, 
  Save, 
  X, 
  Mail, 
  Phone, 
  School, 
  IdCard,
  Shield,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Camera,
  Upload
} from 'lucide-react'
import { User as UserType } from '@/types'

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    institution: '',
    student_id: '',
    profile_picture: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        institution: user.institution || '',
        student_id: user.student_id || '',
        profile_picture: user.profile_picture || ''
      })
    }
  }, [user])

  const handleSave = async () => {
    if (!user) return

    setLoading(true)
    try {
      const updatedData = {
        name: formData.name,
        phone: formData.phone,
        institution: formData.institution,
        student_id: formData.student_id
      }

      await databaseService.updateUser(user.$id, updatedData)
      await updateUser(updatedData)
      
      setIsEditing(false)
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Failed to update profile:', error)
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        institution: user.institution || '',
        student_id: user.student_id || '',
        profile_picture: user.profile_picture || ''
      })
    }
    setIsEditing(false)
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    console.log('Starting image upload...', file.name, file.size)

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file')
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB')
      return
    }

    setUploadingImage(true)
    try {
      console.log('User ID:', user?.$id)
      console.log('Current profile picture:', user?.profile_picture)
      console.log('Storage bucket ID:', process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID)
      console.log('Appwrite endpoint:', process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      console.log('Project ID:', process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)

      // Delete old profile picture if exists
      if (user?.profile_picture) {
        try {
          console.log('Deleting old profile picture:', user.profile_picture)
          await storageService.deleteFile(user.profile_picture)
          console.log('Old profile picture deleted successfully')
        } catch (error) {
          console.warn('Could not delete old profile picture:', error)
        }
      }

      // Upload new image
      console.log('Uploading new image...')
      const uploadResult = await storageService.uploadFile(file)
      console.log('Upload result:', uploadResult)
      const newProfilePictureId = uploadResult.$id

      // Update user profile with new image
      console.log('Updating user profile with new image ID:', newProfilePictureId)
      const updateResult = await databaseService.updateUser(user!.$id, {
        profile_picture: newProfilePictureId
      })
      console.log('Database update result:', updateResult)

      // Update local state
      setFormData(prev => ({
        ...prev,
        profile_picture: newProfilePictureId
      }))

      // Update auth context
      console.log('Updating auth context...')
      await updateUser({
        ...user!,
        profile_picture: newProfilePictureId
      })

      console.log('Profile picture upload completed successfully!')
      toast.success('Profile picture updated successfully!')
    } catch (error) {
      console.error('Failed to upload profile picture:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      
      // More specific error messages
      if (error instanceof Error) {
        if (error.message.includes('Storage bucket')) {
          toast.error('Storage configuration error. Please check bucket settings.')
        } else if (error.message.includes('permission')) {
          toast.error('Permission denied. Please check storage permissions.')
        } else {
          toast.error(`Upload failed: ${error.message}`)
        }
      } else {
        toast.error('Failed to update profile picture: Unknown error')
      }
    } finally {
      setUploadingImage(false)
    }
  }

  const getProfileImageUrl = (imageId: string | undefined) => {
    if (!imageId) return null
    return storageService.getFilePreview(imageId).href
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-400" />
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-400" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'rejected':
        return 'text-red-400 bg-red-400/10 border-red-400/20'
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyber-blue"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            My <span className="text-cyber-blue">Profile</span>
          </h1>
          <p className="text-gray-400">
            Manage your account information and settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-dark-200 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <User className="h-5 w-5 mr-2 text-cyber-blue" />
                  Personal Information
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 bg-cyber-blue hover:bg-cyber-blue/80 text-black font-medium rounded-lg transition-colors"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Picture Section */}
              <div className="flex items-center space-x-6 mb-8 pb-6 border-b border-gray-700">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-dark-300 border-2 border-gray-600">
                    {user.profile_picture ? (
                      <img
                        src={getProfileImageUrl(user.profile_picture) || undefined}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyber-blue"></div>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-2">Profile Picture</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Upload a professional photo to personalize your profile. Max size: 5MB
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                      className="flex items-center px-4 py-2 bg-cyber-blue hover:bg-blue-600 text-black font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      {uploadingImage ? 'Uploading...' : 'Change Photo'}
                    </button>
                    {user.profile_picture && (
                      <button
                        onClick={async () => {
                          try {
                            setUploadingImage(true)
                            await storageService.deleteFile(user.profile_picture!)
                            await databaseService.updateUser(user.$id, { profile_picture: '' })
                            await updateUser({ ...user, profile_picture: '' })
                            setFormData(prev => ({ ...prev, profile_picture: '' }))
                            toast.success('Profile picture removed')
                          } catch (error) {
                            console.error('Failed to remove profile picture:', error)
                            toast.error('Failed to remove profile picture')
                          } finally {
                            setUploadingImage(false)
                          }
                        }}
                        disabled={uploadingImage}
                        className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white">
                      {user.name || 'Not provided'}
                    </div>
                  )}
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email Address
                  </label>
                  <div className="px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-gray-400">
                    {user.email}
                    <span className="text-xs ml-2">(Cannot be changed)</span>
                  </div>
                </div>

                {/* Student ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <IdCard className="h-4 w-4 inline mr-2" />
                    Student ID
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.student_id}
                      onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                      placeholder="Enter your student ID"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white">
                      {user.student_id || 'Not provided'}
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white">
                      {user.phone || 'Not provided'}
                    </div>
                  )}
                </div>

                {/* Institution */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <School className="h-4 w-4 inline mr-2" />
                    Institution
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                      placeholder="Enter your institution"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white">
                      {user.institution || 'Not provided'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="space-y-6">
            {/* Account Status Card */}
            <div className="bg-dark-200 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-cyber-blue" />
                Account Status
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Registration Status</span>
                  <div className="flex items-center">
                    {getStatusIcon(user.registration_status)}
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.registration_status)}`}>
                      {user.registration_status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Account Role</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                    user.role === 'admin' 
                      ? 'text-purple-400 bg-purple-400/10 border-purple-400/20' 
                      : 'text-blue-400 bg-blue-400/10 border-blue-400/20'
                  }`}>
                    {user.role}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Member Since</span>
                  <span className="text-white text-sm">
                    {new Date(user.$createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-dark-200 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <a
                  href="/dashboard"
                  className="block w-full px-4 py-2 bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue rounded-lg hover:bg-cyber-blue/20 transition-colors text-center"
                >
                  View Dashboard
                </a>
                {user.role === 'admin' && (
                  <a
                    href="/dashboard/admin"
                    className="block w-full px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors text-center"
                  >
                    Admin Panel
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
