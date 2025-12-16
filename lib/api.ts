// API Configuration
// This file handles API base URL configuration for different environments

const getApiBaseUrl = (): string => {
  // If environment variable is set, use it
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    // Client-side: check if we're on localhost (local development)
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1';
    
    if (isLocalhost) {
      // Use local backend for local development
      return 'http://localhost:8000';
    }
  }

  // Default to production URL
  return 'http://207.180.233.44:8002';
};

export const API_BASE_URL = getApiBaseUrl();

// API Endpoints
export const API_ENDPOINTS = {
  INQUIRY: `${API_BASE_URL}/api/applications/inquiry/`,
  JOB_POSTINGS: `${API_BASE_URL}/api/applications/postings/`,
  JOB_APPLICATION: `${API_BASE_URL}/api/applications/apply/`,
};

