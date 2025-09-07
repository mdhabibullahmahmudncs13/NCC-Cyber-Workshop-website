'use client'

import { useState } from 'react'
import { X, Upload, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { databaseService, storageService } from '@/lib/appwrite'
import { validateFile } from '@/lib/utils'
import toast from 'react-hot-toast'

interface PaymentFormProps {
  onClose: () => void
  onSuccess: () => void
  registrationId: string
}

export function PaymentForm({ onClose, onSuccess, registrationId }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    transaction_number: '',
    transaction_id: '',
    screenshot: null as File | null
  })
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.transaction_number || !formData.transaction_id || !formData.screenshot) {
      toast.error('Please fill in all fields and upload payment screenshot')
      return
    }

    setLoading(true)

    try {
      console.log('Starting payment submission...')
      console.log('Form data:', formData)
      
      // Upload screenshot
      console.log('Uploading file...')
      const uploadedFile = await storageService.uploadFile(formData.screenshot)
      console.log('File uploaded successfully:', uploadedFile)
      
      // Update registration with payment details
      const paymentDetails = {
        payment_transaction_number: formData.transaction_number,
        payment_transaction_id: formData.transaction_id,
        payment_screenshot_url: uploadedFile.$id,
        payment_submitted_at: new Date().toISOString(),
        payment_status: 'pending'
      }
      
      console.log('Payment details to update:', paymentDetails)
      console.log('Registration ID:', registrationId)

      await databaseService.updateRegistration(registrationId, paymentDetails)
      console.log('Registration updated successfully')
      
      toast.success('Payment details submitted successfully!')
      onSuccess()
    } catch (error) {
      console.error('Payment submission failed:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      toast.error(`Failed to submit payment details: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (file: File) => {
    const validation = validateFile(
      file,
      ['image/jpeg', 'image/png', 'image/jpg'],
      5 * 1024 * 1024 // 5MB
    )

    if (!validation.isValid) {
      toast.error(validation.errors[0])
      return
    }

    setFormData({ ...formData, screenshot: file })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileChange(file)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-dark-200 border border-gray-700 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-6 w-6 text-cyber-blue" />
            <h2 className="text-xl font-bold text-white">Submit Payment</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Payment Instructions */}
          <div className="bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-4">
            <h3 className="text-cyber-blue font-semibold mb-2">Payment Instructions</h3>
            <ol className="text-sm text-gray-300 space-y-1">
              <li>1. Send 100 TK via bKash/Nagad to: <span className="text-cyber-green font-mono">01784275877</span></li>
              <li>2. Use your reference code in the transaction</li>
              <li>3. Take a screenshot of the successful transaction</li>
              <li>4. Fill out the form below with transaction details</li>
            </ol>
          </div>

          <div>
            <label htmlFor="transaction_number" className="block text-sm font-medium text-white mb-2">
              Transaction Number *
            </label>
            <input
              id="transaction_number"
              name="transaction_number"
              type="text"
              required
              value={formData.transaction_number}
              onChange={(e) => setFormData({ ...formData, transaction_number: e.target.value })}
              className="form-input"
              placeholder="e.g., 8G3K5L9MNO"
            />
          </div>

          <div>
            <label htmlFor="transaction_id" className="block text-sm font-medium text-white mb-2">
              Transaction ID (TrxID) *
            </label>
            <input
              id="transaction_id"
              name="transaction_id"
              type="text"
              required
              value={formData.transaction_id}
              onChange={(e) => setFormData({ ...formData, transaction_id: e.target.value })}
              className="form-input"
              placeholder="e.g., AG2H4K7L8M"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Payment Screenshot *
            </label>
            
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive
                  ? 'border-cyber-blue bg-cyber-blue/10'
                  : formData.screenshot
                  ? 'border-cyber-green bg-cyber-green/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              onDragOver={(e) => {
                e.preventDefault()
                setDragActive(true)
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
            >
              {formData.screenshot ? (
                <div className="text-cyber-green">
                  <Upload className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-medium">{formData.screenshot.name}</p>
                  <p className="text-sm text-gray-400">
                    {(formData.screenshot.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, screenshot: null })}
                    className="text-sm text-red-400 hover:text-red-300 mt-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="text-gray-400">
                  <Upload className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-medium">Drop your screenshot here</p>
                  <p className="text-sm">or click to browse</p>
                  <p className="text-xs mt-2">PNG, JPG up to 5MB</p>
                </div>
              )}
              
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileChange(file)
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
            </div>
          </div>

          <div className="flex space-x-4 relative z-20">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}
              className="flex-1"
            >
              Submit Payment
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
