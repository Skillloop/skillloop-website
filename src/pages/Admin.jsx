import React from 'react'
import AdminSignIn from '../components/AdminSignIn'

export default function Admin() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800">
        <AdminSignIn />
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            If you are not an admin, please{' '}
            <a href="/" className="text-blue-500 hover:underline">
              return to the homepage
            </a>.
          </p>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            For any issues, please contact support at{' '}
            <a href="mailto:myskillloop@gmail.com" className="text-blue-500 hover:underline">
              myskillloop@gmail.com
            </a>
          </p>
        </div>
    </div>
  )
}
