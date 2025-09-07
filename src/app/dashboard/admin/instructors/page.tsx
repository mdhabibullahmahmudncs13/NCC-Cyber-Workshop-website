'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { databaseService, storageService } from '@/lib/appwrite'
import { toast } from 'react-hot-toast'
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  User, 
  Briefcase, 
  Link,
  Image,
  Users,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Upload,
  Camera
} from 'lucide-react'
import { Instructor } from '@/types'
import { Button } from '@/components/ui/Button'

export default function InstructorsManagementPage() {
  const { user } = useAuth()
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingInstructor, setEditingInstructor] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    expertise: [''],
    profile_image: '',
    social_linkedin: '',
    social_twitter: '',
    social_github: '',
    social_website: ''
  })

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchInstructors()
    }
  }, [user])

  const fetchInstructors = async () => {
    try {
      setLoading(true)
      const instructorsList = await databaseService.getAllInstructors()
      setInstructors((instructorsList.documents as unknown) as Instructor[])
    } catch (error) {
      console.error('Failed to fetch instructors:', error)
      toast.error('Failed to load instructors')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      bio: '',
      expertise: [''],
      profile_image: '',
      social_linkedin: '',
      social_twitter: '',
      social_github: '',
      social_website: ''
    })
    setShowAddForm(false)
    setEditingInstructor(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleAddInstructor = async () => {
    if (!formData.name.trim() || !formData.bio.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const filteredExpertise = formData.expertise.filter(exp => exp.trim() !== '')
      
      const instructorData = {
        name: formData.name.trim(),
        bio: formData.bio.trim(),
        expertise: filteredExpertise,
        profile_image: formData.profile_image,
        social_linkedin: formData.social_linkedin,
        social_twitter: formData.social_twitter,
        social_github: formData.social_github,
        social_website: formData.social_website
      }

      await databaseService.createInstructor(instructorData)
      toast.success('Instructor added successfully!')
      resetForm()
      fetchInstructors()
    } catch (error) {
      console.error('Failed to add instructor:', error)
      toast.error('Failed to add instructor')
    }
  }

  const handleUpdateInstructor = async () => {
    if (!editingInstructor || !formData.name.trim() || !formData.bio.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const filteredExpertise = formData.expertise.filter(exp => exp.trim() !== '')
      
      const instructorData = {
        name: formData.name.trim(),
        bio: formData.bio.trim(),
        expertise: filteredExpertise,
        profile_image: formData.profile_image,
        social_linkedin: formData.social_linkedin,
        social_twitter: formData.social_twitter,
        social_github: formData.social_github,
        social_website: formData.social_website
      }

      await databaseService.updateInstructor(editingInstructor, instructorData)
      toast.success('Instructor updated successfully!')
      resetForm()
      fetchInstructors()
    } catch (error) {
      console.error('Failed to update instructor:', error)
      toast.error('Failed to update instructor')
    }
  }

  const handleDeleteInstructor = async (instructorId: string) => {
    if (!confirm('Are you sure you want to delete this instructor?')) return

    try {
      await databaseService.deleteInstructor(instructorId)
      toast.success('Instructor deleted successfully!')
      fetchInstructors()
    } catch (error) {
      console.error('Failed to delete instructor:', error)
      toast.error('Failed to delete instructor')
    }
  }

  const startEdit = (instructor: Instructor) => {
    setFormData({
      name: instructor.name,
      bio: instructor.bio,
      expertise: instructor.expertise || [''],
      profile_image: instructor.profile_image || '',
      social_linkedin: instructor.social_linkedin || '',
      social_twitter: instructor.social_twitter || '',
      social_github: instructor.social_github || '',
      social_website: instructor.social_website || ''
    })
    
    // Set image preview if instructor has a profile image
    if (instructor.profile_image) {
      // Check if it's a file ID or URL
      if (instructor.profile_image.startsWith('http')) {
        setImagePreview(instructor.profile_image)
      } else {
        // It's a file ID, get the preview URL
        try {
          const previewUrl = storageService.getFilePreview(instructor.profile_image).href
          setImagePreview(previewUrl)
        } catch (error) {
          console.error('Failed to load image preview:', error)
          setImagePreview(null)
        }
      }
    } else {
      setImagePreview(null)
    }
    
    setEditingInstructor(instructor.$id)
    setShowAddForm(false)
  }

  const addExpertise = () => {
    setFormData({
      ...formData,
      expertise: [...formData.expertise, '']
    })
  }

  const updateExpertise = (index: number, value: string) => {
    const newExpertise = [...formData.expertise]
    newExpertise[index] = value
    setFormData({
      ...formData,
      expertise: newExpertise
    })
  }

  const handleImageUpload = async (file: File) => {
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB')
      return
    }

    setUploadingImage(true)
    
    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)

      // Upload to storage
      const uploadResult = await storageService.uploadFile(file)

      // Update form data with file ID
      setFormData({
        ...formData,
        profile_image: uploadResult.$id
      })

      toast.success('Image uploaded successfully!')
    } catch (error) {
      console.error('Failed to upload image:', error)
      toast.error('Failed to upload image. Please check your connection and try again.')
      setImagePreview(null)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  const removeExpertise = (index: number) => {
    const newExpertise = formData.expertise.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      expertise: newExpertise.length > 0 ? newExpertise : ['']
    })
  }

  const getInstructorImageUrl = (instructor: Instructor) => {
    if (!instructor.profile_image) return null
    
    // If it's already a URL, return it
    if (instructor.profile_image.startsWith('http')) {
      return instructor.profile_image
    }
    
    // If it's a file ID, get the preview URL
    try {
      return storageService.getFilePreview(instructor.profile_image).href
    } catch (error) {
      console.error('Failed to get image URL:', error)
      return null
    }
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
          <p className="text-gray-300">You need admin privileges to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-cyber-blue flex items-center">
            <Users className="mr-3 h-8 w-8" />
            Manage Instructors
          </h1>
          <Button
            onClick={() => {
              resetForm()
              setShowAddForm(true)
            }}
            className="bg-cyber-blue hover:bg-cyber-blue/80"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Instructor
          </Button>
        </div>

        {(showAddForm || editingInstructor) && (
          <div className="bg-dark-200 rounded-lg p-6 mb-8 border border-gray-700">
            <h2 className="text-xl font-semibold mb-6 text-cyber-blue">
              {editingInstructor ? 'Edit Instructor' : 'Add New Instructor'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                  placeholder="Instructor name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Camera className="h-4 w-4 inline mr-2" />
                  Profile Image
                </label>
                
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {/* Upload button and preview */}
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={triggerFileSelect}
                    disabled={uploadingImage}
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white hover:bg-dark-200 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <Upload className="h-4 w-4" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                  </button>
                  
                  {/* Image preview */}
                  {imagePreview && (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-lg border border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null)
                          setFormData({ ...formData, profile_image: '' })
                          if (fileInputRef.current) fileInputRef.current.value = ''
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  
                  {/* Fallback URL input */}
                  <div className="text-sm text-gray-400">
                    Or enter image URL:
                  </div>
                  <input
                    type="url"
                    value={formData.profile_image.startsWith('http') ? formData.profile_image : ''}
                    onChange={(e) => setFormData({ ...formData, profile_image: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Briefcase className="h-4 w-4 inline mr-2" />
                  Bio *
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                  placeholder="Instructor bio and background"
                  rows={4}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Briefcase className="h-4 w-4 inline mr-2" />
                  Expertise Areas
                </label>
                <div className="space-y-2">
                  {formData.expertise.map((exp, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={exp}
                        onChange={(e) => updateExpertise(index, e.target.value)}
                        className="flex-1 px-4 py-2 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                        placeholder="e.g., Cybersecurity, Penetration Testing"
                      />
                      {formData.expertise.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExpertise(index)}
                          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addExpertise}
                    className="px-4 py-2 bg-cyber-blue text-white rounded-lg hover:bg-cyber-blue/80 transition-colors"
                  >
                    <Plus className="h-4 w-4 inline mr-2" />
                    Add Expertise
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Linkedin className="h-4 w-4 inline mr-2" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.social_linkedin}
                  onChange={(e) => setFormData({ ...formData, social_linkedin: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Twitter className="h-4 w-4 inline mr-2" />
                  Twitter
                </label>
                <input
                  type="url"
                  value={formData.social_twitter}
                  onChange={(e) => setFormData({ ...formData, social_twitter: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Github className="h-4 w-4 inline mr-2" />
                  GitHub
                </label>
                <input
                  type="url"
                  value={formData.social_github}
                  onChange={(e) => setFormData({ ...formData, social_github: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Globe className="h-4 w-4 inline mr-2" />
                  Website
                </label>
                <input
                  type="url"
                  value={formData.social_website}
                  onChange={(e) => setFormData({ ...formData, social_website: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                  placeholder="https://website.com"
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <Button
                onClick={editingInstructor ? handleUpdateInstructor : handleAddInstructor}
                className="bg-cyber-blue hover:bg-cyber-blue/80"
              >
                <Save className="mr-2 h-4 w-4" />
                {editingInstructor ? 'Update' : 'Save'} Instructor
              </Button>
              <Button
                onClick={resetForm}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-blue mx-auto mb-4"></div>
            <p className="text-gray-300">Loading instructors...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((instructor) => {
              const imageUrl = getInstructorImageUrl(instructor)
              
              return (
                <div key={instructor.$id} className="bg-dark-200 rounded-lg overflow-hidden border border-gray-700 hover:border-cyber-blue transition-colors">
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={instructor.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-cyber-blue"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-dark-300 border-2 border-gray-600 flex items-center justify-center">
                          <User className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-semibold text-white">{instructor.name}</h3>
                        <p className="text-gray-400">Instructor</p>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 text-sm line-clamp-3">{instructor.bio}</p>

                    {instructor.expertise && instructor.expertise.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {instructor.expertise.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-cyber-blue/20 text-cyber-blue text-xs rounded-full border border-cyber-blue/30"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2 mb-4">
                      {instructor.social_linkedin && (
                        <a
                          href={instructor.social_linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-cyber-blue transition-colors"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                      {instructor.social_twitter && (
                        <a
                          href={instructor.social_twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-cyber-blue transition-colors"
                        >
                          <Twitter className="h-4 w-4" />
                        </a>
                      )}
                      {instructor.social_github && (
                        <a
                          href={instructor.social_github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-cyber-blue transition-colors"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {instructor.social_website && (
                        <a
                          href={instructor.social_website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-cyber-blue transition-colors"
                        >
                          <Globe className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        onClick={() => startEdit(instructor)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 flex-1"
                      >
                        <Edit3 className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteInstructor(instructor.$id)}
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white flex-1"
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}

            {instructors.length === 0 && (
              <div className="md:col-span-2 lg:col-span-3 text-center py-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No Instructors Yet</h3>
                <p className="text-gray-400 mb-4">Start building your instructor team by adding the first instructor.</p>
                <Button
                  onClick={() => {
                    resetForm()
                    setShowAddForm(true)
                  }}
                  className="bg-cyber-blue hover:bg-cyber-blue/80"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Instructor
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
