'use client'

import { useState } from 'react'
import { Link } from '../../components/ui/link'
import { MotionDiv } from '../animations/MotionWrapper'
import FloatingElement from '../animations/FloatingElement'
import BusinessMatchingForm from '../forms/BusinessMatchingForm'
import ConsultantMatchingForm from '../forms/ConsultantMatchingForm'

export default function Contact() {
  const [activeForm, setActiveForm] = useState<'business' | 'consultant' | null>(null)

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-white opacity-70" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white/90 shadow-xl shadow-blue-600/10 ring-1 ring-blue-50" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Connect with the Right Partner
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Whether you're a business looking for expertise or a consultant ready to make an impact
            </p>
          </MotionDiv>
        </div>

        {!activeForm ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* For Businesses */}
            <FloatingElement duration={5} yOffset={10}>
              <MotionDiv
                className="group relative overflow-hidden bg-gradient-to-br from-violet-50 to-violet-100 rounded-3xl shadow-lg p-8 border border-violet-100 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <div className="h-16 w-16 rounded-full bg-violet-600/10 flex items-center justify-center">
                    <svg className="h-8 w-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">For Businesses</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start space-x-3 group-hover:translate-x-1 transition-transform duration-300">
                    <div className="mt-1">
                      <svg className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Access pre-vetted AI consultants</span>
                  </li>
                  <li className="flex items-start space-x-3 group-hover:translate-x-1 transition-transform duration-300">
                    <div className="mt-1">
                      <svg className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Transparent pricing and expertise</span>
                  </li>
                  <li className="flex items-start space-x-3 group-hover:translate-x-1 transition-transform duration-300">
                    <div className="mt-1">
                      <svg className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Quick matching within 48 hours</span>
                  </li>
                </ul>
                <button
                  onClick={() => setActiveForm('business')}
                  className="w-full inline-flex justify-center items-center rounded-xl bg-violet-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-violet-700 transition-all duration-300 group-hover:scale-105"
                >
                  Find Matching Consultants
                  <svg className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </MotionDiv>
            </FloatingElement>

            {/* For Consultants */}
            <FloatingElement duration={5} yOffset={10}>
              <MotionDiv
                className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <div className="h-16 w-16 rounded-full bg-blue-600/10 flex items-center justify-center">
                    <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">For Consultants</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start space-x-3 group-hover:translate-x-1 transition-transform duration-300">
                    <div className="mt-1">
                      <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Connect with quality clients</span>
                  </li>
                  <li className="flex items-start space-x-3 group-hover:translate-x-1 transition-transform duration-300">
                    <div className="mt-1">
                      <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Set your own rates and availability</span>
                  </li>
                  <li className="flex items-start space-x-3 group-hover:translate-x-1 transition-transform duration-300">
                    <div className="mt-1">
                      <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Focus on work, not sales</span>
                  </li>
                </ul>
                <button
                  onClick={() => setActiveForm('consultant')}
                  className="w-full inline-flex justify-center items-center rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-all duration-300 group-hover:scale-105"
                >
                  Join as Consultant
                  <svg className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </MotionDiv>
            </FloatingElement>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <button
                onClick={() => setActiveForm(null)}
                className="inline-flex items-center text-gray-600 hover:text-gray-900"
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Options
              </button>
            </div>
            {activeForm === 'business' ? (
              <BusinessMatchingForm />
            ) : (
              <ConsultantMatchingForm />
            )}
          </div>
        )}
      </div>
    </section>
  )
} 