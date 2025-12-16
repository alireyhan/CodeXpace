'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ApplyForm from './ApplyForm';
import { API_ENDPOINTS } from '@/lib/api';

interface JobDetail {
  id: number;
  title: string;
  department: string;
  number_of_openings: number;
  job_type: string;
  location: string;
  salary_range?: string;
  working_days?: string;
  application_deadline?: string;
  experience_required?: string;
  description: string;
  responsibilities?: string;
  requirements?: string;
  nice_to_have?: string;
  benefits?: string;
  is_active: boolean;
}

export default function JobDetail({ jobId }: { jobId: string }) {
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fetch job details from API
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching job with ID:', jobId);
        console.log('API Endpoint:', API_ENDPOINTS.JOB_POSTINGS);
        
        const response = await fetch(API_ENDPOINTS.JOB_POSTINGS);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch job details: ${response.status} ${response.statusText}`);
        }
        
        const jobs = await response.json();
        console.log('Fetched jobs:', jobs);
        console.log('Looking for job ID:', jobId);
        
        const foundJob = jobs.find((j: JobDetail) => j.id.toString() === jobId);
        console.log('Found job:', foundJob);
        
        if (foundJob) {
          setJob(foundJob);
        } else {
          setError(`Job with ID ${jobId} not found. Available jobs: ${jobs.map((j: JobDetail) => j.id).join(', ')}`);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  useEffect(() => {
    // Set visible immediately when job is loaded
    if (job) {
      setIsVisible(true);
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [job]);

  // Parse multiline strings into arrays
  const parseMultiline = (text?: string) => {
    if (!text) return [];
    return text.split('\n').filter(line => line.trim() !== '');
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <section className="py-20 bg-black relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            <p className="text-gray-400 mt-4">Loading job details...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || (!loading && !job)) {
    return (
      <section className="py-20 bg-black relative min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-8 text-center">
            <p className="text-red-400 text-lg mb-4">{error || 'Job not found'}</p>
            <p className="text-gray-400 text-sm mb-6">Job ID: {jobId}</p>
            <Link
              href="/careers"
              className="inline-flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Careers</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-black relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div ref={ref} className="space-y-8">
          {/* Back Button */}
          <Link
            href="/careers"
            className="inline-flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-300 mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Careers</span>
          </Link>

          {/* Job Header */}
          <div
            className="bg-black/60 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 transition-all duration-700 opacity-100"
            style={{
              boxShadow: '0 8px 32px rgba(220, 38, 38, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{job.title}</h1>
            <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">{job.description}</p>
            
            {/* Job Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Department</p>
                  <p className="text-white font-medium">{job.department}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Location</p>
                  <p className="text-white font-medium">{job.location}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Job Type</p>
                  <p className="text-white font-medium">{job.job_type}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Experience Required</p>
                  <p className="text-white font-medium">{job.experience_required}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Salary Range</p>
                  <p className="text-white font-medium">{job.salary_range}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Openings</p>
                  <p className="text-white font-medium">{job.number_of_openings} position{job.number_of_openings > 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>

            {/* Working Days & Deadline */}
            <div className="space-y-3 pt-4 border-t border-red-500/20">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Working Days</p>
                  <p className="text-white text-sm">{job.working_days || 'Not specified'}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Application Deadline</p>
                  <p className="text-white text-sm font-medium">{formatDate(job.application_deadline)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Responsibilities */}
          <div
            className="bg-black/60 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 transition-all duration-700 delay-200"
            style={{
              boxShadow: '0 8px 32px rgba(220, 38, 38, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Responsibilities</h2>
            <ul className="space-y-3">
              {parseMultiline(job.responsibilities || '').map((resp: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 mt-2.5"></div>
                  <p className="text-base text-gray-300 leading-relaxed">{resp}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div
            className="bg-black/60 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 transition-all duration-700 delay-300"
            style={{
              boxShadow: '0 8px 32px rgba(220, 38, 38, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Requirements</h2>
            <ul className="space-y-3">
              {parseMultiline(job.requirements || '').map((req: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 mt-2.5"></div>
                  <p className="text-base text-gray-300 leading-relaxed">{req}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Nice to Have */}
          {job.nice_to_have && (
            <div
              className="bg-black/60 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 transition-all duration-700 delay-400"
              style={{
                boxShadow: '0 8px 32px rgba(220, 38, 38, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Nice to Have</h2>
              <ul className="space-y-3">
                {parseMultiline(job.nice_to_have || '').map((item: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 mt-2.5"></div>
                    <p className="text-base text-gray-300 leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits && (
            <div
              className="bg-black/60 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 transition-all duration-700 delay-500"
              style={{
                boxShadow: '0 8px 32px rgba(220, 38, 38, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Benefits</h2>
              <ul className="space-y-3">
                {parseMultiline(job.benefits || '').map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 mt-2.5"></div>
                    <p className="text-base text-gray-300 leading-relaxed">{benefit}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Apply Button */}
          <div className="transition-all duration-700 delay-600">
            <button
              onClick={() => setShowApplyForm(!showApplyForm)}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-8 py-3 rounded-lg font-semibold text-sm md:text-base transition-all shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 hover:scale-105 transform uppercase tracking-wide w-full md:w-auto justify-center"
            >
              <span>{showApplyForm ? 'CLOSE APPLICATION' : 'APPLY NOW'}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showApplyForm ? "M5 15l7-7 7 7" : "M9 5l7 7-7 7"} />
              </svg>
            </button>
          </div>

          {/* Apply Form */}
          {showApplyForm && (
            <div className="transition-all duration-700 delay-700">
              <ApplyForm jobTitle={job.title} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


