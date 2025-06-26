"use client";

export default function LoginPage() {
  const handleLogin = () => {

    window.location.href = '/api/auth/login?returnTo=/dashboard';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md space-y-8 px-4">

        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to access the admin dashboard
            </p>
          </div>

          
          <div className="space-y-4">
            <button
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:scale-[1.02]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Sign in with Auth0
            </button>

            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                  Secure authentication powered by Auth0
                </span>
              </div>
            </div>

            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    You will be redirected to Auth0 for secure authentication. After signing in, you&apos;ll be returned to the dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

 
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Having trouble?{" "}
              <a
                href="#"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Contact support
              </a>
            </p>
          </div>
        </div>

 
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="underline hover:text-gray-700 dark:hover:text-gray-300"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline hover:text-gray-700 dark:hover:text-gray-300"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}