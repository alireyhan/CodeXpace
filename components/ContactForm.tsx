"use client";

import { useState } from "react";
import Image from "next/image";
import { API_ENDPOINTS } from "@/lib/api";
import client1 from "../assets/Clients/1.jpeg";
import client2 from "../assets/Clients/2.jpeg";
import client3 from "../assets/Clients/3.jpeg";
import client4 from "../assets/Clients/4.jpeg";
import client5 from "../assets/Clients/5.jpeg";

const benefits = [
  'Proven Track Record of Delivering Results',
  'Flexible Engagement Models & Rapid Onboarding',
  'Expertise in AI, Blockchain, Cloud, and Quality Assurance',
  'Clear, Transparent Pricing with No Hidden Costs',
  'Full-End Ownership of Projects from Start to Finish',
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch(API_ENDPOINTS.INQUIRY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Inquiry submitted successfully!",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to submit inquiry. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
      console.error("Error submitting inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section
      id="contact-form"
      className="contact-form-section py-20 bg-black relative min-h-[600px] w-full"
      style={{
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        position: 'relative',
        zIndex: 100,
        overflow: 'visible',
        width: '100%',
        height: 'auto',
        minHeight: '600px',
        animation: 'none !important',
        transition: 'none !important',
        transform: 'none !important'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8  relative w-full" style={{ position: 'relative', zIndex: 11 }}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Contact{" "}
          <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent">
            US
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Side - Contact Info */}
          <div className=" flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
              Ready to Get{" "}
              <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent">
                Started?
              </span>
            </h2>
            <p className="text-start text-gray-400 text-sm mb-12 max-w-[400px]">
              Turn your ideas into impactful digital products. Connect with our team for a free consultation and discover how we can help you achieve your business goals.
            </p>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            {/* <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Get{' '}
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent">
              Started
            </span>
            ?
          </h2> */}
          <div
            className="bg-black/60 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6"
            style={{
              boxShadow:
                "0 8px 32px rgba(220, 38, 38, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitStatus.type && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    submitStatus.type === "success"
                      ? "bg-green-500/20 border border-green-500/50 text-green-400"
                      : "bg-red-500/20 border border-red-500/50 text-red-400"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full bg-black/40 backdrop-blur-sm border border-red-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  disabled={isSubmitting}
                  className="w-full bg-black/40 backdrop-blur-sm border border-red-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full bg-black/40 backdrop-blur-sm border border-red-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  disabled={isSubmitting}
                  className="w-full bg-black/40 backdrop-blur-sm border border-red-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-fit bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-2.5 rounded-lg font-semibold text-sm shadow-lg shadow-red-500/20 flex items-center justify-center space-x-2"
              >
                <span>{isSubmitting ? "SUBMITTING..." : "SUBMIT HERE"}</span>
                {!isSubmitting && (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                )}
              </button>
            </form>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
