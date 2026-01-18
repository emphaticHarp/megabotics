'use client';

export function Footer() {
  return (
    <footer className="relative bg-gray-950 text-white py-12 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Map Section */}
          <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800 h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3646.738720686919!2d91.33594297538517!3d23.934304478545425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3753f40b1e17beef%3A0x968fbf25214edf8d!2sICFAI%20University%20Tripura!5e0!3m2!1sen!2sin!4v1768722147467!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-800">
            {/* Brand */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold">MEGABOTICS</h3>
              <p className="text-xs text-gray-400">Make in India 🇮🇳</p>
              <p className="text-xs text-gray-500 leading-relaxed">Pioneering deep-tech robotics and autonomous solutions for a smarter future.</p>
            </div>

            {/* Navigation Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wide">Navigation</h4>
              <div className="grid grid-cols-2 gap-2">
                <a href="/" className="text-xs text-gray-400 hover:text-white transition-colors">Home</a>
                <a href="/about" className="text-xs text-gray-400 hover:text-white transition-colors">About</a>
                <a href="/products" className="text-xs text-gray-400 hover:text-white transition-colors">Products</a>
                <a href="/projects" className="text-xs text-gray-400 hover:text-white transition-colors">Projects</a>
                <a href="/research" className="text-xs text-gray-400 hover:text-white transition-colors">R&D</a>
                <a href="/blog" className="text-xs text-gray-400 hover:text-white transition-colors">Blog</a>
                <a href="/careers" className="text-xs text-gray-400 hover:text-white transition-colors">Careers</a>
                <a href="/contact" className="text-xs text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>

            {/* Social & Contact */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wide">Connect</h4>
              <div className="space-y-2">
                <div className="flex gap-3">
                  <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors text-sm">f</a>
                  <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors text-sm">📷</a>
                  <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-black rounded-lg flex items-center justify-center transition-colors text-sm">𝕏</a>
                  <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors text-sm">in</a>
                </div>
                <p className="text-xs text-gray-500">
                  <span className="block">📧 hello@megabotics.com</span>
                  <span className="block">📞 +91 (XXX) XXX-XXXX</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2026 MEGABOTICS. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </main>
    </footer>
  );
}
