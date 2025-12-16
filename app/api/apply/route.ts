import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://207.180.233.44:8002';

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the request
    const formData = await request.formData();
    
    // Forward the form data to the backend
    const response = await fetch(`${BACKEND_URL}/api/applications/apply/`, {
      method: 'POST',
      body: formData, // FormData can be sent directly
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { status: 'error', message: data.message || 'Failed to submit application' },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error proxying application:', error);
    return NextResponse.json(
      { status: 'error', message: 'An error occurred while submitting application' },
      { status: 500 }
    );
  }
}

