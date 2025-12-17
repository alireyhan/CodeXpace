'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ApplyForm from './ApplyForm';

interface JobDetail {
  title: string;
  department: string;
  number_of_openings: number;
  job_type: string;
  location: string;
  salary_range: string;
  working_days: string;
  application_deadline: string;
  experience_required: string;
  description: string;
  responsibilities: string;
  requirements: string;
  nice_to_have: string;
  benefits: string;
  is_active: boolean;
}

const jobDetails: Record<string, JobDetail> = {
  'senior-software-engineer': {
    title: 'Senior Software Engineer - (Full-Time)',
    department: 'Web Development',
    number_of_openings: 3,
    job_type: 'Full-Time',
    location: 'Warsaw, Poland',
    salary_range: '$80k to $100k (Based on your experience)',
    working_days: 'Weekly 05 days. Sunday To Thursday. 09 AM to 06 PM. (Launch Break 01 Hour)',
    application_deadline: '2023-10-10',
    experience_required: '6+ Years',
    description: "We're looking for an eager and knowledgeable WordPress Developer to join our technical team in Warsaw, Poland. You'll be expected to utilize bleeding-edge technology and robust techniques. You should be an excellent communicator and comfortable managing multiple tasks. you also need to be a team player and have a problem-solving aptitude. Working quickly and creatively should come naturally to you, as well as being an innovative problem-solver who takes pride in producing logical, simple, and effective solutions to what are often very new and complex issues.",
    responsibilities: "Refactor current code to service-oriented architecture.\nCollaborate with a unique background of engineering, product, and operations team members to deliver the best solution for our customers.\nSolve technical problems that few have solved before – no one else helps local businesses the way we do.\nParticipate in the decision-making progress – we want you to speak up.\nMentor your team members to share your passion for software, your appreciation for the engineering field, and your respect for the craft of software development.\nTake on the challenge of making what you build higher quality, faster, and more scalable.\nParticipate in on-call rotation.",
    requirements: "6+ years of previous professional software development experience.\nPrevious backend restful API development experience.\nStrong experience in a programming language like Python, PHP, NodeJS, Java, etc.\nCan adapt to new or different programming languages.\nExperience integrating a broad variety of technologies via API consumption/production.\nAbility to collaborate with a unique background of engineering, product, and operations team members to deliver the best solution for our customers.\nDeep knowledge and a passion for coding standards and following proven design patterns.\nSolid foundation in data structures and algorithms.\nExperience with Agile, working in sprints, and participating in Agile ceremonies.",
    nice_to_have: "Experience with AWS.\nExperience building CI/CD and server/deployment automation solutions.\nExperience with open-source puppet, infrastructure-as-code.\nPassion for technology.\nYou have high standards and want to make a difference with your work.\nYou are always trying to improve.",
    benefits: "Company-wide 401(k) plan.\nLife & disability insurance offered.\nCompetitive compensation—salary, bonus, equity.\nMedical, dental, and vision; flex spending account.\nFlexible paid time off & sick leave.",
    is_active: true,
  },
  'customer-success-manager': {
    title: 'Customer Success Manager',
    department: 'Customer Success',
    number_of_openings: 2,
    job_type: 'Full-Time',
    location: 'Tokyo',
    salary_range: '$60k to $80k (Based on your experience)',
    working_days: 'Weekly 05 days. Monday To Friday. 09 AM to 06 PM. (Launch Break 01 Hour)',
    application_deadline: '2024-12-31',
    experience_required: '3+ Years',
    description: "We're looking for a customer success manager to join our team.",
    responsibilities: "Build and maintain strong customer relationships.\nEnsure customer satisfaction and retention.\nIdentify upsell and expansion opportunities.\nCollaborate with product and engineering teams.",
    requirements: "3+ years of experience in customer success or account management.\nStrong communication and relationship-building skills.\nExperience with SaaS products.\nAbility to work in a fast-paced environment.",
    nice_to_have: "Experience with CRM systems.\nTechnical background.\nMultilingual capabilities.",
    benefits: "Competitive compensation.\nHealth insurance.\nFlexible work arrangements.\nProfessional development opportunities.",
    is_active: true,
  },
  'product-designer': {
    title: 'Product Designer',
    department: 'Design',
    number_of_openings: 1,
    job_type: 'Full-Time',
    location: 'Remote',
    salary_range: '$70k to $90k (Based on your experience)',
    working_days: 'Weekly 05 days. Monday To Friday. 09 AM to 06 PM. (Launch Break 01 Hour)',
    application_deadline: '2024-12-31',
    experience_required: '3+ Years',
    description: "We're looking for a mid-level product designer to join our team.",
    responsibilities: "Create user-centered design solutions.\nCollaborate with product managers and engineers.\nConduct user research and usability testing.\nDevelop design systems and guidelines.",
    requirements: "3+ years of experience in product design.\nStrong portfolio showcasing UX/UI design skills.\nProficiency in design tools (Figma, Sketch, etc.).\nUnderstanding of user research and testing methodologies.",
    nice_to_have: "Experience with prototyping tools.\nAnimation and motion design skills.\nFront-end development knowledge.",
    benefits: "Design tools subscription.\nConference and workshop attendance.\nCreative freedom.\nCompetitive benefits package.",
    is_active: true,
  },
  'backend-developer': {
    title: 'Backend Developer',
    department: 'Engineering',
    number_of_openings: 2,
    job_type: 'Part-time',
    location: 'In House',
    salary_range: '$50k to $70k (Based on your experience)',
    working_days: 'Weekly 03 days. Flexible schedule.',
    application_deadline: '2024-12-31',
    experience_required: '4+ Years',
    description: "We're looking for an experienced backend developer to join our team.",
    responsibilities: "Develop and maintain backend services.\nDesign and implement APIs.\nOptimize database performance.\nEnsure system reliability and scalability.",
    requirements: "4+ years of experience in backend development.\nStrong knowledge of server-side technologies.\nExperience with databases and APIs.\nUnderstanding of security best practices.",
    nice_to_have: "Experience with microservices architecture.\nCloud platform certifications.\nOpen source contributions.",
    benefits: "Flexible working hours.\nRemote work options.\nLearning and development budget.\nHealth and wellness programs.",
    is_active: true,
  },
  'engineering-manager': {
    title: 'Engineering Manager',
    department: 'Engineering',
    number_of_openings: 1,
    job_type: 'Full-Time',
    location: 'New York',
    salary_range: '$120k to $150k (Based on your experience)',
    working_days: 'Weekly 05 days. Monday To Friday. 09 AM to 06 PM. (Launch Break 01 Hour)',
    application_deadline: '2024-12-31',
    experience_required: '7+ Years',
    description: "We're looking for an engineering manager to join our team.",
    responsibilities: "Lead and manage engineering teams.\nDrive technical strategy and roadmap.\nFoster a culture of innovation and excellence.\nCollaborate with stakeholders across the organization.",
    requirements: "7+ years of experience in software engineering.\n3+ years of experience in engineering management.\nStrong leadership and team-building skills.\nExperience with agile methodologies.",
    nice_to_have: "MBA or management certification.\nExperience scaling engineering teams.\nPublic speaking and conference experience.",
    benefits: "Executive compensation package.\nEquity participation.\nComprehensive health benefits.\nLeadership development programs.",
    is_active: true,
  },
  'content-writer': {
    title: 'Content Writer',
    department: 'Marketing',
    number_of_openings: 1,
    job_type: 'Full-Time',
    location: 'Remote',
    salary_range: '$40k to $60k (Based on your experience)',
    working_days: 'Weekly 05 days. Monday To Friday. 09 AM to 06 PM. (Launch Break 01 Hour)',
    application_deadline: '2024-12-31',
    experience_required: '2+ Years',
    description: "We're looking for a content writer to join our team.",
    responsibilities: "Create engaging content for various channels.\nDevelop content strategies and editorial calendars.\nCollaborate with marketing and product teams.\nEnsure content quality and consistency.",
    requirements: "2+ years of experience in content writing.\nStrong writing and editing skills.\nUnderstanding of SEO best practices.\nAbility to write for technical and non-technical audiences.",
    nice_to_have: "Experience with content management systems.\nVideo script writing.\nSocial media management.",
    benefits: "Content creation tools.\nWriting workshops and courses.\nCreative writing time.\nCompetitive benefits package.",
    is_active: true,
  },
};

export default function JobDetail({ jobId }: { jobId: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const job = jobDetails[jobId] || jobDetails['senior-software-engineer'];

  useEffect(() => {
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
  }, []);

  // Parse multiline strings into arrays
  const parseMultiline = (text: string) => {
    return text.split('\n').filter(line => line.trim() !== '');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section className="py-20 bg-black relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div ref={ref} className="space-y-8">
          {/* Back Button */}
          <Link
            href="/careers"
            className={`inline-flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-300 mb-8 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Careers</span>
          </Link>

          {/* Job Header */}
          <div
            className={`bg-black/60 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
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
                  <p className="text-white text-sm">{job.working_days}</p>
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
            className={`bg-black/60 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              boxShadow: '0 8px 32px rgba(220, 38, 38, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Responsibilities</h2>
            <ul className="space-y-3">
              {parseMultiline(job.responsibilities).map((resp: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 mt-2.5"></div>
                  <p className="text-base text-gray-300 leading-relaxed">{resp}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div
            className={`bg-black/60 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              boxShadow: '0 8px 32px rgba(220, 38, 38, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Requirements</h2>
            <ul className="space-y-3">
              {parseMultiline(job.requirements).map((req: string, index: number) => (
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
              className={`bg-black/60 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                boxShadow: '0 8px 32px rgba(220, 38, 38, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Nice to Have</h2>
              <ul className="space-y-3">
                {parseMultiline(job.nice_to_have).map((item: string, index: number) => (
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
              className={`bg-black/60 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                boxShadow: '0 8px 32px rgba(220, 38, 38, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Benefits</h2>
              <ul className="space-y-3">
                {parseMultiline(job.benefits).map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 mt-2.5"></div>
                    <p className="text-base text-gray-300 leading-relaxed">{benefit}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Apply Button */}
          <div
            className={`transition-all duration-700 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
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


