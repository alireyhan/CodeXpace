export default function Footer() {
  return (
    <footer className="bg-black border-t border-red-500/20 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            Copyright © 2024 CodeXpace. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className="w-8 h-8 bg-gray-900 border border-red-500/30 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-colors">
              <span className="text-white text-xs">f</span>
            </a>
            <a href="#" className="w-8 h-8 bg-gray-900 border border-red-500/30 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-colors">
              <span className="text-white text-xs">i</span>
            </a>
            <a href="#" className="w-8 h-8 bg-gray-900 border border-red-500/30 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-colors">
              <span className="text-white text-xs">in</span>
            </a>
            <a href="#" className="w-8 h-8 bg-gray-900 border border-red-500/30 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-colors">
              <span className="text-white text-xs">t</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

