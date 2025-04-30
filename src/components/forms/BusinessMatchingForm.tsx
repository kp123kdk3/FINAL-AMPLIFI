'use client'

import { useState, useEffect } from 'react'
import { MotionDiv } from '../animations/MotionWrapper'

type BusinessFormData = {
  companyName: string
  industry: string
  companySize: string
  projectType: string[]
  budget: string
  timeline: string
  description: string
  goals: string
  challenges: string
}

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

export default function BusinessMatchingForm() {
  const [formData, setFormData] = useState<BusinessFormData>(() => {
    // Try to load saved draft from localStorage
    const savedDraft = localStorage.getItem('businessFormDraft')
    return savedDraft ? JSON.parse(savedDraft) : {
      companyName: '',
      industry: '',
      companySize: '',
      projectType: [],
      budget: '',
      timeline: '',
      description: '',
      goals: '',
      challenges: ''
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  // Save draft whenever form data changes
  useEffect(() => {
    localStorage.setItem('businessFormDraft', JSON.stringify(formData))
  }, [formData])

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {}
    
    switch (step) {
      case 1:
        if (!formData.companyName) errors.companyName = 'Company name is required'
        if (!formData.industry) errors.industry = 'Industry is required'
        if (!formData.companySize) errors.companySize = 'Company size is required'
        break
      case 2:
        if (formData.projectType.length === 0) errors.projectType = 'Select at least one project type'
        if (!formData.budget) errors.budget = 'Budget range is required'
        if (!formData.timeline) errors.timeline = 'Timeline is required'
        break
      case 3:
        if (!formData.description) errors.description = 'Project description is required'
        if (!formData.challenges) errors.challenges = 'Current challenges are required'
        break
      case 4:
        if (!formData.goals) errors.goals = 'Business goals are required'
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
      // TODO: Implement API call to match with consultants
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulated API call
      setShowSuccess(true)
      // Clear saved draft on successful submission
      localStorage.removeItem('businessFormDraft')
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleProjectTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      projectType: prev.projectType.includes(type)
        ? prev.projectType.filter(t => t !== type)
        : [...prev.projectType, type]
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
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Form Submitted Successfully!</h3>
        <p className="text-gray-600 mb-6">
          We're analyzing your needs and will match you with the perfect consultants within 48 hours.
        </p>
        <button
          onClick={() => setShowSuccess(false)}
          className="text-violet-600 hover:text-violet-700 font-medium"
        >
          Submit Another Form
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
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-900">
                Company Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                className={`mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ${
                  validationErrors.companyName ? 'ring-red-300' : ''
                }`}
                required
              />
              {validationErrors.companyName && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.companyName}</p>
              )}
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-900">
                Industry
                <span className="text-red-500">*</span>
              </label>
              <select
                id="industry"
                value={formData.industry}
                onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                className={`mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ${
                  validationErrors.industry ? 'ring-red-300' : ''
                }`}
                required
              >
                <option value="">Select Industry</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
              {validationErrors.industry && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.industry}</p>
              )}
            </div>

            <div>
              <label htmlFor="companySize" className="block text-sm font-medium text-gray-900">
                Company Size
                <span className="text-red-500">*</span>
              </label>
              <select
                id="companySize"
                value={formData.companySize}
                onChange={(e) => setFormData(prev => ({ ...prev, companySize: e.target.value }))}
                className={`mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ${
                  validationErrors.companySize ? 'ring-red-300' : ''
                }`}
                required
              >
                <option value="">Select Size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501+">501+ employees</option>
              </select>
              {validationErrors.companySize && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.companySize}</p>
              )}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Project Type (Select all that apply)
                <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {projectTypes.map(type => (
                  <label key={type} className="relative flex items-start p-4 rounded-lg border border-gray-200 hover:border-violet-300 hover:bg-violet-50/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.projectType.includes(type)}
                      onChange={() => handleProjectTypeChange(type)}
                      className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-600"
                    />
                    <span className="ml-3 text-sm text-gray-900">{type}</span>
                  </label>
                ))}
              </div>
              {validationErrors.projectType && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.projectType}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-900">
                  Budget Range
                  <span className="text-red-500">*</span>
                </label>
                <select
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  className={`mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ${
                    validationErrors.budget ? 'ring-red-300' : ''
                  }`}
                  required
                >
                  <option value="">Select Budget</option>
                  <option value="<10k">Less than $10,000</option>
                  <option value="10k-50k">$10,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k+">$100,000+</option>
                </select>
                {validationErrors.budget && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.budget}</p>
                )}
              </div>

              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-900">
                  Timeline
                  <span className="text-red-500">*</span>
                </label>
                <select
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                  className={`mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ${
                    validationErrors.timeline ? 'ring-red-300' : ''
                  }`}
                  required
                >
                  <option value="">Select Timeline</option>
                  <option value="immediate">Immediate</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
                {validationErrors.timeline && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.timeline}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                Project Description
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className={`mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ${
                  validationErrors.description ? 'ring-red-300' : ''
                }`}
                placeholder="Describe your project in detail..."
                required
              />
              {validationErrors.description && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
              )}
            </div>

            <div>
              <label htmlFor="challenges" className="block text-sm font-medium text-gray-900">
                Current Challenges
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="challenges"
                value={formData.challenges}
                onChange={(e) => setFormData(prev => ({ ...prev, challenges: e.target.value }))}
                rows={3}
                className={`mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 ${
                  validationErrors.challenges ? 'ring-red-300' : ''
                }`}
                placeholder="What challenges are you currently facing?"
                required
              />
              {validationErrors.challenges && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.challenges}</p>
              )}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="goals" className="block text-sm font-medium text-gray-900">
                What's your main business goal?
                <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3 mt-4">
                {['Grow revenue', 'Cut costs', 'Improve efficiency', 'Launch new products'].map((goal) => (
                  <label
                    key={goal}
                    className={`block w-full p-4 rounded-lg border ${
                      formData.goals === goal
                        ? 'border-violet-600 bg-violet-50 ring-1 ring-violet-600'
                        : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50/50'
                    } cursor-pointer transition-all duration-200`}
                  >
                    <input
                      type="radio"
                      name="goals"
                      value={goal}
                      checked={formData.goals === goal}
                      onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                      className="sr-only"
                    />
                    <span className="text-sm text-gray-900">{goal}</span>
                  </label>
                ))}
              </div>
              {validationErrors.goals && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.goals}</p>
              )}
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
              {isSubmitting ? 'Submitting...' : 'Get Started'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
} 