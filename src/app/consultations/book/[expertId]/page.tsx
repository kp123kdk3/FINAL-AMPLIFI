'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ConsultationBookingForm from '@/components/ConsultationBookingForm'
import { motion } from 'framer-motion'

export default function BookConsultationPage({
  params,
}: {
  params: { expertId: string }
}) {
  const router = useRouter()
  const [expert, setExpert] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const response = await fetch(`/api/experts/${params.expertId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch expert details')
        }
        const data = await response.json()
        setExpert(data)
      } catch (err) {
        setError('Failed to load expert details')
      } finally {
        setLoading(false)
      }
    }

    fetchExpert()
  }, [params.expertId])

  const handleSuccess = () => {
    router.push('/consultations')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    )
  }

  if (error || !expert) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Error</h2>
          <p className="mt-2 text-gray-600">{error || 'Expert not found'}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-violet-600 hover:text-violet-700"
          >
            Go back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white shadow rounded-lg p-6 sm:p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                Book a Consultation with {expert.user.name}
              </h1>
              <p className="mt-2 text-gray-600">
                {expert.bio}
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-violet-100 text-violet-800">
                  ${expert.hourlyRate}/hour
                </span>
              </div>
            </div>

            <ConsultationBookingForm
              expertId={expert.id}
              userId="current-user-id" // Replace with actual user ID from auth
              onSuccess={handleSuccess}
              onError={setError}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
} 