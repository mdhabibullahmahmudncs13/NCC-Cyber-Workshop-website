'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { databaseService } from '@/lib/appwrite'
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
  Globe
} from 'lucide-react'
import { Instructor } from '@/types'
import { Button } from '@/components/ui/Button'

export default function InstructorsManagementPage() {
  const { user } = useAuth()
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingInstructor, setEditingInstructor] = useState<string | null>(null)
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
      const response = await databaseService.getAllInstructors()
      setInstructors((response.documents as unknown as Instructor[]) || [])
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
  }

  const handleAddInstructor = async () => {
    if (!formData.name.trim() || !formData.bio.trim()) {
      toast.error('Name and bio are required')
      return
    }

    try {
      console.log('Adding instructor with data:', formData)
      console.log('User ID:', user!.$id)
      
      const instructorData = {
        ...formData,
        expertise: formData.expertise.filter(skill => skill.trim() !== ''),
        created_by: user!.$id
      }
      
      console.log('Processed instructor data:', instructorData)

      await databaseService.createInstructor(instructorData)
      console.log('Instructor created successfully')
      
      toast.success('Instructor added successfully!')
      resetForm()
      fetchInstructors()
    } catch (error) {
      console.error('Failed to add instructor:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      toast.error(`Failed to add instructor: ${errorMessage}`)
    }
  }

  const handleUpdateInstructor = async (instructorId: string) => {
    if (!formData.name.trim() || !formData.bio.trim()) {
      toast.error('Name and bio are required')
      return
    }

    try {
      const instructorData = {
        ...formData,
        expertise: formData.expertise.filter(skill => skill.trim() !== '')
      }

      await databaseService.updateInstructor(instructorId, instructorData)
      toast.success('Instructor updated successfully!')
      resetForm()
      fetchInstructors()
    } catch (error) {
      console.error('Failed to update instructor:', error)
      toast.error('Failed to update instructor')
    }
  }

  const handleDeleteInstructor = async (instructorId: string) => {
    if (!confirm('Are you sure you want to delete this instructor?')) {
      return
    }

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
      expertise: instructor.expertise.length > 0 ? instructor.expertise : [''],
      profile_image: instructor.profile_image || '',
      social_linkedin: instructor.social_linkedin || '',
      social_twitter: instructor.social_twitter || '',
      social_github: instructor.social_github || '',
      social_website: instructor.social_website || ''
    })
    setEditingInstructor(instructor.$id)
    setShowAddForm(false)
  }

  const addExpertiseField = () => {
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

  const removeExpertise = (index: number) => {
    const newExpertise = formData.expertise.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      expertise: newExpertise.length > 0 ? newExpertise : ['']
    })
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">You need admin privileges to access this page.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyber-blue"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Manage <span className="text-cyber-purple">Instructors</span>
            </h1>
            <p className="text-gray-400">
              Add, edit, and manage workshop instructors
            </p>
          </div>
          <Button
            onClick={() => {
              resetForm()
              setShowAddForm(true)
            }}
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Instructor
          </Button>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingInstructor) && (
          <div className="bg-dark-200 border border-gray-700 rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                {editingInstructor ? 'Edit Instructor' : 'Add New Instructor'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white mb-4">Basic Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                    placeholder="Enter instructor's full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Image className="h-4 w-4 inline mr-2" />
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.profile_image}
                    onChange={(e) => setFormData({ ...formData, profile_image: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Briefcase className="h-4 w-4 inline mr-2" />
                    Bio *
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue resize-none"
                    placeholder="Enter instructor's bio and background..."
                  />
                </div>
              </div>

              {/* Expertise & Social Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white mb-4">Expertise & Links</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Users className="h-4 w-4 inline mr-2" />
                    Areas of Expertise
                  </label>
                  {formData.expertise.map((skill, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => updateExpertise(index, e.target.value)}
                        className="flex-1 px-4 py-2 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                        placeholder="e.g., Penetration Testing"
                      />
                      {formData.expertise.length > 1 && (
                        <button
                          onClick={() => removeExpertise(index)}
                          className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addExpertiseField}
                    className="mt-2 px-4 py-2 bg-cyber-blue hover:bg-cyber-blue/80 text-black rounded-lg text-sm"
                  >
                    <Plus className="h-4 w-4 inline mr-2" />
                    Add Expertise
                  </button>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300">
                    <Link className="h-4 w-4 inline mr-2" />
                    Social Media Links
                  </label>
                  
                  <div className="flex gap-2">
                    <Linkedin className="h-5 w-5 text-blue-400 mt-3" />
                    <input
                      type="url"
                      value={formData.social_linkedin}
                      onChange={(e) => setFormData({ ...formData, social_linkedin: e.target.value })}
                      className="flex-1 px-4 py-2 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                      placeholder="LinkedIn profile URL"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Twitter className="h-5 w-5 text-blue-400 mt-3" />
                    <input
                      type="url"
                      value={formData.social_twitter}
                      onChange={(e) => setFormData({ ...formData, social_twitter: e.target.value })}
                      className="flex-1 px-4 py-2 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                      placeholder="Twitter profile URL"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Github className="h-5 w-5 text-gray-400 mt-3" />
                    <input
                      type="url"
                      value={formData.social_github}
                      onChange={(e) => setFormData({ ...formData, social_github: e.target.value })}
                      className="flex-1 px-4 py-2 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                      placeholder="GitHub profile URL"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Globe className="h-5 w-5 text-green-400 mt-3" />
                    <input
                      type="url"
                      value={formData.social_website}
                      onChange={(e) => setFormData({ ...formData, social_website: e.target.value })}
                      className="flex-1 px-4 py-2 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                      placeholder="Personal website URL"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-700">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button 
                onClick={() => editingInstructor ? handleUpdateInstructor(editingInstructor) : handleAddInstructor()}
              >
                <Save className="h-4 w-4 mr-2" />
                {editingInstructor ? 'Update' : 'Add'} Instructor
              </Button>
            </div>
          </div>
        )}

        {/* Instructors List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Users className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Instructors Found</h3>
              <p className="text-gray-400 mb-4">Add your first instructor to get started.</p>
              <Button
                onClick={() => {
                  resetForm()
                  setShowAddForm(true)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Instructor
              </Button>
            </div>
          ) : (
            instructors.map((instructor) => (
              <div key={instructor.$id} className="bg-dark-200 border border-gray-700 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{instructor.name}</h3>
                    <p className="text-gray-400 text-sm line-clamp-3">{instructor.bio}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {instructor.expertise.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {instructor.expertise.length > 3 && (
                      <span className="px-2 py-1 bg-gray-600 text-gray-300 rounded-full text-xs">
                        +{instructor.expertise.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {instructor.social_linkedin && (
                      <a href={instructor.social_linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 text-blue-400 hover:text-blue-300" />
                      </a>
                    )}
                    {instructor.social_github && (
                      <a href={instructor.social_github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 text-gray-400 hover:text-gray-300" />
                      </a>
                    )}
                    {instructor.social_twitter && (
                      <a href={instructor.social_twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4 text-blue-400 hover:text-blue-300" />
                      </a>
                    )}
                    {instructor.social_website && (
                      <a href={instructor.social_website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 text-green-400 hover:text-green-300" />
                      </a>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEdit(instructor)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteInstructor(instructor.$id)}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
