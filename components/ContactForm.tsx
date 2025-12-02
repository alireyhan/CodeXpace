'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-black relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          Ready to Get{' '}
          <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent">
            Started?
          </span>
        </h2>
        <p className="text-center text-gray-400 text-sm mb-12">
          Let's build your next big thing together. Reach out for a free consult or proposal.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Side - Contact Info */}
          <div className="space-y-6">
            {/* Team Images */}
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-2 border-black bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center overflow-hidden"
                >
                  <div className="w-full h-full bg-gradient-to-br from-red-500/20 to-red-600/20"></div>
                </div>
              ))}
            </div>
            
            {/* Email */}
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-white text-sm">info@codexpace.com</p>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center space-x-3">
              <a href="#" className="w-8 h-8 bg-black/50 border border-red-500/30 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-colors backdrop-blur-sm">
                <span className="text-white text-xs">f</span>
              </a>
              <a href="#" className="w-8 h-8 bg-black/50 border border-red-500/30 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-colors backdrop-blur-sm">
                <span className="text-white text-xs">i</span>
              </a>
              <a href="#" className="w-8 h-8 bg-black/50 border border-red-500/30 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-colors backdrop-blur-sm">
                <span className="text-white text-xs">in</span>
              </a>
              <a href="#" className="w-8 h-8 bg-black/50 border border-red-500/30 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-colors backdrop-blur-sm">
                <span className="text-white text-xs">t</span>
              </a>
            </div>
            
            {/* Decorative Arrow */}
            <div className="flex items-center space-x-2 pt-4">
              <div className="flex-1 h-px bg-red-500/30" style={{
                backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 4px, currentColor 4px, currentColor 8px)'
              }}></div>
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-black/60 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6" style={{
            boxShadow: '0 8px 32px rgba(220, 38, 38, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
          }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 backdrop-blur-sm border border-red-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email*"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 backdrop-blur-sm border border-red-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-black/40 backdrop-blur-sm border border-red-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Please describe what you need?*"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-black/40 backdrop-blur-sm border border-red-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 hover:scale-105 transform flex items-center justify-center space-x-2"
              >
                <span>SUBMIT HERE</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
