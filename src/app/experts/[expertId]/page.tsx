'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

type Expert = {
  id: string
  bio: string
  expertise: string[]
  hourlyRate: number
  isAvailable: boolean
  user: {
    name: string
    email: string
  }
}

export default function ExpertProfilePage({
  params,
}: {
  params: { expertId: string }
}) {
  const router = useRouter()
  const [expert, setExpert] = useState<Expert | null>(null)
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
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {expert.user.name}
                </h1>
                <p className="mt-2 text-gray-600">
                  {expert.user.email}
                </p>
              </div>
              <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                expert.isAvailable
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {expert.isAvailable ? 'Available' : 'Not Available'}
              </span>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900">About</h2>
                <p className="mt-2 text-gray-600">{expert.bio}</p>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900">Expertise</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {expert.expertise.map((skill) => (
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
                <h2 className="text-lg font-medium text-gray-900">Hourly Rate</h2>
                <p className="mt-2 text-gray-600">${expert.hourlyRate}/hour</p>
              </div>

              {expert.isAvailable && (
                <div className="mt-8">
                  <button
                    onClick={() => router.push(`/consultations/book/${expert.id}`)}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                  >
                    Book a Consultation
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