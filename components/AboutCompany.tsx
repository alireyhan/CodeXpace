import Image from 'next/image';

const benefits = [
  '7+ Years Delivering Results',
  'Flexible Engagement, Fast Start',
  'Experts in AI, Blockchain, Cloud, QA',
  'Transparent Pricing, No Surprises',
  'End-to-End Ownership',
];

export default function AboutCompany() {
  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          About{' '}
          <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent">
            Our
          </span>{' '}
          Company
        </h2>

        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-10">Why Choose CodeXpace?</h3>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 mt-2.5"></div>
                  <p className="text-white text-base leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
            
            {/* Right Side - Image with Unique Shape */}
            <div className="relative">
              {/* Unique shape with decorative borders */}
              <div className="relative">
                {/* Outer decorative border */}
                <div className="absolute -inset-3 border-2 border-red-500/20 rounded-[2rem]"></div>
                <div className="absolute -inset-1.5 border border-red-500/30 rounded-[1.75rem]"></div>
                
                {/* Main image container with unique rounded corners */}
                <div className="relative bg-black border-2 border-red-500/50 rounded-[1.5rem] overflow-hidden aspect-[4/3]" style={{
                  boxShadow: '0 12px 40px rgba(220, 38, 38, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                }}>
                  <Image
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                    alt="Team working with technology"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/30"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
