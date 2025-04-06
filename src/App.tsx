import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Globe } from 'lucide-react';
import Header from './components/Header';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import MuralShowcase from './components/MuralShowcase';

// Custom Pinterest SVG component
const PinterestIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
  </svg>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50">
              <Header />
              <About />
              <MuralShowcase />
              <Products />
              <Contact />
              
              {/* Footer */}
              <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white py-12">
                <div className="container mx-auto px-4">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-2xl font-bold mb-6 md:mb-0">
                      Best Art Technology
                    </div>

                    <div className="flex space-x-6">
                      <a
                        href="https://www.facebook.com/BestArtCanvasNepal/photos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors duration-300"
                      >
                        <Facebook className="w-6 h-6" />
                      </a>
                      <a
                        href="https://www.pinterest.com/bestarttech"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-400 transition-colors duration-300"
                      >
                        <PinterestIcon />
                      </a>
                      <a
                        href="https://bat.com.np/all-murals/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-400 transition-colors duration-300"
                      >
                        <Globe className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                  <div className="mt-8 text-center text-gray-300 text-sm">
                    © {new Date().getFullYear()} Best Art Technology. All rights reserved.
                  </div>
                </div>
              </footer>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;