// API Configuration
// This file handles API base URL configuration for different environments
// Uses Next.js API routes as proxy to avoid mixed content issues (HTTPS -> HTTP)

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
      // Use local backend directly for local development
      return 'http://localhost:8000';
    }
    
    // For production (Vercel), use Next.js API routes as proxy
    // This avoids mixed content issues (HTTPS page -> HTTP API)
    return ''; // Empty string means use relative URLs (same origin)
  }

  // Server-side: use Next.js API routes
  return '';
};

export const API_BASE_URL = getApiBaseUrl();

// API Endpoints
// In production (Vercel), these use Next.js API routes which proxy to the backend
// In local development, these point directly to the backend
export const API_ENDPOINTS = {
  INQUIRY: API_BASE_URL 
    ? `${API_BASE_URL}/api/applications/inquiry/`
    : '/api/inquiry',
  JOB_POSTINGS: API_BASE_URL
    ? `${API_BASE_URL}/api/applications/postings/`
    : '/api/jobs',
  JOB_APPLICATION: API_BASE_URL
    ? `${API_BASE_URL}/api/applications/apply/`
    : '/api/apply',
};

