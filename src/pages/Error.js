import React from 'react';

const ErrorPage = () => {
  return (
    <div className=" h-screen w-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Oops! Something went wrong.
          </h2>
        </div>
        <div className="mt-8">
          <div className="flex items-center justify-center">
            <svg
              className="h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-center text-lg leading-6 font-medium text-gray-900">
            We're sorry, but there was an error processing your request.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
