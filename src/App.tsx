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
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50"
              >
                <Header />
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <About />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="relative z-10"
                >
                  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
                    <MuralShowcase />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <Products />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <Contact />
                </motion.div>
                
                {/* Footer with enhanced animations */}
                <motion.footer 
                  className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white py-12 relative overflow-hidden"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {/* Animated background elements */}
                  <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/5"
                        style={{
                          width: Math.random() * 300 + 50,
                          height: Math.random() * 300 + 50,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.1, 0.2, 0.1],
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: Math.random() * 10 + 10,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <motion.div 
                        className="text-2xl font-bold mb-6 md:mb-0 animate-text-shimmer"
                        whileHover={{ scale: 1.05 }}
                      >
                        Best Art Technology
                      </motion.div>

                      <div className="flex space-x-6">
                        <motion.a
                          href="https://www.facebook.com/BestArtCanvasNepal/photos"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className="hover:text-blue-400 transition-colors duration-300"
                        >
                          <Facebook className="w-6 h-6" />
                        </motion.a>
                        <motion.a
                          href="https://www.pinterest.com/bestarttech"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                          className="hover:text-red-400 transition-colors duration-300"
                        >
                          <PinterestIcon />
                        </motion.a>
                        <motion.a
                          href="https://bat.com.np/all-murals/"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className="hover:text-green-400 transition-colors duration-300"
                        >
                          <Globe className="w-6 h-6" />
                        </motion.a>
                      </div>
                    </div>
                    <motion.div 
                      className="mt-8 text-center text-gray-300 text-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      © {new Date().getFullYear()} Best Art Technology. All rights reserved.
                    </motion.div>
                  </div>
                </motion.footer>
              </motion.div>
            </AnimatePresence>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;