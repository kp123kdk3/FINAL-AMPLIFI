'use client'

import { useState, useEffect } from 'react'
import { MotionDiv } from '../animations/MotionWrapper'

type ConsultantFormData = {
  fullName: string
  email: string
  expertise: string[]
  yearsOfExperience: string
  hourlyRate: string
  availability: string
  preferredIndustries: string[]
  preferredProjectTypes: string[]
  bio: string
  pastProjects: string
  certifications: string
}

const expertiseAreas = [
  'AI Strategy',
  'Machine Learning',
  'Deep Learning',
  'Natural Language Processing',
  'Computer Vision',
  'Data Science',
  'Data Engineering',
  'MLOps',
  'AI Integration',
  'Process Automation',
  'Digital Transformation',
  'Other'
]

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Retail',
  'Manufacturing',
  'Education',
  'Other'
]

const projectTypes = [
  'AI Strategy',
  'Machine Learning Implementation',
  'Data Analytics',
  'Process Automation',
  'Digital Transformation',
  'Custom AI Solution',
  'AI Integration',
  'Other'
]

export default function ConsultantMatchingForm() {
  const [formData, setFormData] = useState<ConsultantFormData>(() => {
    // Try to load saved draft from localStorage
    const savedDraft = localStorage.getItem('consultantFormDraft')
    return savedDraft ? JSON.parse(savedDraft) : {
      fullName: '',
      email: '',
      expertise: [],
      yearsOfExperience: '',
      hourlyRate: '',
      availability: '',
      preferredIndustries: [],
      preferredProjectTypes: [],
      bio: '',
      pastProjects: '',
      certifications: ''
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  // Save draft whenever form data changes
  useEffect(() => {
    localStorage.setItem('consultantFormDraft', JSON.stringify(formData))
  }, [formData])

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {}
    
    switch (step) {
      case 1:
        if (!formData.fullName) errors.fullName = 'Full name is required'
        if (!formData.email) errors.email = 'Email is required'
        if (!formData.yearsOfExperience) errors.yearsOfExperience = 'Years of experience is required'
        break
      case 2:
        if (formData.expertise.length === 0) errors.expertise = 'Select at least one area of expertise'
        if (!formData.hourlyRate) errors.hourlyRate = 'Hourly rate is required'
        if (!formData.availability) errors.availability = 'Availability is required'
        break
      case 3:
        if (formData.preferredIndustries.length === 0) errors.preferredIndustries = 'Select at least one preferred industry'
        if (formData.preferredProjectTypes.length === 0) errors.preferredProjectTypes = 'Select at least one preferred project type'
        break
      case 4:
        if (!formData.bio) errors.bio = 'Professional bio is required'
        if (!formData.pastProjects) errors.pastProjects = 'Past projects are required'
        break
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(currentStep)) return
    
    setIsSubmitting(true)
    try {
      // TODO: Implement API call to match with businesses
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulated API call
      setShowSuccess(true)
      // Clear saved draft on successful submission
      localStorage.removeItem('consultantFormDraft')
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMultiSelect = (field: 'expertise' | 'preferredIndustries' | 'preferredProjectTypes', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  if (showSuccess) {
    return (
      <MotionDiv
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Profile Submitted Successfully!</h3>
        <p className="text-gray-600 mb-6">
          We're analyzing your profile and will match you with suitable projects within 48 hours.
        </p>
        <button
          onClick={() => setShowSuccess(false)}
          className="text-violet-600 hover:text-violet-700 font-medium"
        >
          Update Profile
        </button>
      </MotionDiv>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-violet-600 transition-all duration-300"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-900">
                Full Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className={`mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ${
                  validationErrors.fullName ? 'ring-red-300' : ''
                }`}
                required
              />
              {validationErrors.fullName && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ${
                  validationErrors.email ? 'ring-red-300' : ''
                }`}
                required
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-900">
                Years of Experience
                <span className="text-red-500">*</span>
              </label>
              <select
                id="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData(prev => ({ ...prev, yearsOfExperience: e.target.value }))}
                className={`mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ${
                  validationErrors.yearsOfExperience ? 'ring-red-300' : ''
                }`}
                required
              >
                <option value="">Select Experience</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="10+">10+ years</option>
              </select>
              {validationErrors.yearsOfExperience && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.yearsOfExperience}</p>
              )}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Areas of Expertise (Select all that apply)
                <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {expertiseAreas.map(area => (
                  <label key={area} className="relative flex items-start p-4 rounded-lg border border-gray-200 hover:border-violet-300 hover:bg-violet-50/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.expertise.includes(area)}
                      onChange={() => handleMultiSelect('expertise', area)}
                      className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-600"
                    />
                    <span className="ml-3 text-sm text-gray-900">{area}</span>
                  </label>
                ))}
              </div>
              {validationErrors.expertise && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.expertise}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-900">
                  Hourly Rate (USD)
                  <span className="text-red-500">*</span>
                </label>
                <select
                  id="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                  className={`mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ${
                    validationErrors.hourlyRate ? 'ring-red-300' : ''
                  }`}
                  required
                >
                  <option value="">Select Rate</option>
                  <option value="<50">Less than $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200+">$200+</option>
                </select>
                {validationErrors.hourlyRate && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.hourlyRate}</p>
                )}
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-900">
                  Availability
                  <span className="text-red-500">*</span>
                </label>
                <select
                  id="availability"
                  value={formData.availability}
                  onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                  className={`mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ${
                    validationErrors.availability ? 'ring-red-300' : ''
                  }`}
                  required
                >
                  <option value="">Select Availability</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="project-based">Project-based</option>
                </select>
                {validationErrors.availability && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.availability}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Preferred Industries (Select all that apply)
                <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {industries.map(industry => (
                  <label key={industry} className="relative flex items-start p-4 rounded-lg border border-gray-200 hover:border-violet-300 hover:bg-violet-50/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.preferredIndustries.includes(industry)}
                      onChange={() => handleMultiSelect('preferredIndustries', industry)}
                      className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-600"
                    />
                    <span className="ml-3 text-sm text-gray-900">{industry}</span>
                  </label>
                ))}
              </div>
              {validationErrors.preferredIndustries && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.preferredIndustries}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Preferred Project Types (Select all that apply)
                <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {projectTypes.map(type => (
                  <label key={type} className="relative flex items-start p-4 rounded-lg border border-gray-200 hover:border-violet-300 hover:bg-violet-50/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.preferredProjectTypes.includes(type)}
                      onChange={() => handleMultiSelect('preferredProjectTypes', type)}
                      className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-600"
                    />
                    <span className="ml-3 text-sm text-gray-900">{type}</span>
                  </label>
                ))}
              </div>
              {validationErrors.preferredProjectTypes && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.preferredProjectTypes}</p>
              )}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-900">
                Professional Bio
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                rows={4}
                className={`mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ${
                  validationErrors.bio ? 'ring-red-300' : ''
                }`}
                placeholder="Tell us about your professional background and expertise..."
                required
              />
              {validationErrors.bio && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.bio}</p>
              )}
            </div>

            <div>
              <label htmlFor="pastProjects" className="block text-sm font-medium text-gray-900">
                Past Projects
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="pastProjects"
                value={formData.pastProjects}
                onChange={(e) => setFormData(prev => ({ ...prev, pastProjects: e.target.value }))}
                rows={4}
                className={`mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ${
                  validationErrors.pastProjects ? 'ring-red-300' : ''
                }`}
                placeholder="Describe your most relevant past projects..."
                required
              />
              {validationErrors.pastProjects && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.pastProjects}</p>
              )}
            </div>

            <div>
              <label htmlFor="certifications" className="block text-sm font-medium text-gray-900">
                Certifications & Qualifications
              </label>
              <textarea
                id="certifications"
                value={formData.certifications}
                onChange={(e) => setFormData(prev => ({ ...prev, certifications: e.target.value }))}
                rows={3}
                className="mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                placeholder="List your relevant certifications and qualifications..."
              />
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
            >
              Back
            </button>
          )}
          <div className="flex-1" />
          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-violet-600 border border-transparent rounded-md shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-violet-600 border border-transparent rounded-md shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
} 