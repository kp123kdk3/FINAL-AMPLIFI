'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

type Consultation = {
  id: string
  date: string
  duration: number
  status: string
  notes: string | null
  expert: {
    user: {
      name: string
      email: string
    }
    bio: string
    expertise: string[]
    hourlyRate: number
  }
}

export default function ConsultationDetailsPage({
  params,
}: {
  params: { consultationId: string }
}) {
  const router = useRouter()
  const [consultation, setConsultation] = useState<Consultation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const response = await fetch(`/api/consultations/${params.consultationId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch consultation details')
        }
        const data = await response.json()
        setConsultation(data)
      } catch (err) {
        setError('Failed to load consultation details')
      } finally {
        setLoading(false)
      }
    }

    fetchConsultation()
  }, [params.consultationId])

  const handleCancel = async () => {
    try {
      const response = await fetch(`/api/consultations/${params.consultationId}/cancel`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to cancel consultation')
      }

      router.push('/consultations')
    } catch (err) {
      setError('Failed to cancel consultation')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    )
  }

  if (error || !consultation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Error</h2>
          <p className="mt-2 text-gray-600">{error || 'Consultation not found'}</p>
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
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Consultation with {consultation.expert.user.name}
                </h1>
                <p className="mt-2 text-gray-600">
                  {new Date(consultation.date).toLocaleString()}
                </p>
              </div>
              <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                consultation.status === 'CONFIRMED'
                  ? 'bg-green-100 text-green-800'
                  : consultation.status === 'PENDING'
                  ? 'bg-yellow-100 text-yellow-800'
                  : consultation.status === 'CANCELLED'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {consultation.status}
              </span>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Expert Details</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="mt-1 text-sm text-gray-900">{consultation.expert.user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="mt-1 text-sm text-gray-900">{consultation.expert.user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Bio</p>
                    <p className="mt-1 text-sm text-gray-900">{consultation.expert.bio}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Expertise</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {consultation.expert.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Hourly Rate</p>
                    <p className="mt-1 text-sm text-gray-900">${consultation.expert.hourlyRate}/hour</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900">Consultation Details</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Duration</p>
                    <p className="mt-1 text-sm text-gray-900">{consultation.duration} minutes</p>
                  </div>
                  {consultation.notes && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Notes</p>
                      <p className="mt-1 text-sm text-gray-900">{consultation.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {consultation.status === 'PENDING' && (
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Cancel Consultation
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 