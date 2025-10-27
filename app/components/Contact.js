import React from 'react'

const Contact = () => {
  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">📞 Contact Me</h1>
        <p className="text-gray-600 mb-4">
          You can reach out to me via email or phone.
        </p>

        
        <div className="mb-4">
          <a
            href="mailto:iamprince220@gmail.com"
            className="text-blue-600 hover:underline text-lg font-medium"
          >
            📧 iamprince220@gmail.com
          </a>
        </div>

        
        <div>
          <a
            href="tel:7632003588"
            className="text-green-600 hover:underline text-lg font-medium"
          >
            📞 7632003588
          </a>
        </div>

        
        <p className="text-gray-500 mt-6">
          Feel free to contact me anytime!
        </p>
      </div>
    </div>
  )
}

export default Contact
