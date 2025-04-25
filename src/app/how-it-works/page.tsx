import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works | Amplifi',
  description: 'Learn how Amplifi connects businesses with AI consultants through our simple, effective process.',
}

export default function HowItWorks() {
  return (
    <main className="relative isolate">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-violet-50 to-white opacity-70" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white/90 shadow-xl shadow-violet-600/10 ring-1 ring-violet-50" />
      </div>

      {/* Decorative blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[calc(50%-30rem)] top-[calc(50%-20rem)] transform-gpu blur-3xl">
          <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-violet-100 to-blue-200 opacity-20" />
        </div>
        <div className="absolute left-[calc(50%+20rem)] top-[calc(50%-30rem)] transform-gpu blur-3xl">
          <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-blue-200 to-violet-100 opacity-20" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            How{' '}
            <span className="relative">
              <span className="absolute -inset-1 block -skew-y-3 bg-gradient-to-r from-violet-600 to-blue-500 opacity-30"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-500">
                Amplifi
              </span>
            </span>{' '}
            Works
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our streamlined process connects you with the perfect AI consultant in just a few steps.
          </p>
        </div>
      </div>

      {/* Process Steps */}
      <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <div className="relative">
            {/* Vertical line connecting steps */}
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-violet-600/0 via-violet-600/50 to-violet-600/0 md:left-[2.25rem]" />
            
            <div className="space-y-16">
              {/* Step 1 */}
              <div className="relative flex flex-col gap-10 md:flex-row">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-500 shadow-lg">
                  <span className="text-xl font-semibold text-white">1</span>
                </div>
                <div className="md:flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">Tell us about your needs</h3>
                  <p className="mt-3 text-base text-gray-600">
                    Share your project requirements, goals, and timeline. Whether you need help with AI strategy, implementation, or optimization, we'll understand your unique needs.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col gap-10 md:flex-row">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-500 shadow-lg">
                  <span className="text-xl font-semibold text-white">2</span>
                </div>
                <div className="md:flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">Get matched with experts</h3>
                  <p className="mt-3 text-base text-gray-600">
                    Our platform matches you with pre-vetted AI consultants who have the exact expertise you need. We consider technical skills, industry experience, and project requirements.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col gap-10 md:flex-row">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-500 shadow-lg">
                  <span className="text-xl font-semibold text-white">3</span>
                </div>
                <div className="md:flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">Review and select</h3>
                  <p className="mt-3 text-base text-gray-600">
                    Review detailed profiles and past work of your matched consultants. Choose the best fit for your project with confidence.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex flex-col gap-10 md:flex-row">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-500 shadow-lg">
                  <span className="text-xl font-semibold text-white">4</span>
                </div>
                <div className="md:flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">Start working together</h3>
                  <p className="mt-3 text-base text-gray-600">
                    Begin collaborating with your chosen consultant right away. We'll be here to support you throughout the entire process, ensuring your project's success.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative mt-24 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 px-12 py-16">
            <div className="absolute inset-0 bg-grid-white/10" />
            <div className="relative">
              <h2 className="text-center text-3xl font-bold tracking-tight text-white">Ready to get started?</h2>
              <p className="mt-4 text-center text-lg text-white/90">
                Join the growing number of businesses leveraging AI expertise through Amplifi.
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  href="/contact"
                  className="rounded-full bg-white px-8 py-3 text-base font-semibold text-violet-600 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get Started Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 