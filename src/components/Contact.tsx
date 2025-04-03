import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.03,
    boxShadow: "0px 8px 25px rgba(79, 70, 229, 0.4)",
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  tap: {
    scale: 0.97,
    boxShadow: "0px 2px 10px rgba(79, 70, 229, 0.2)"
  }
};

const contactItemVariants = {
  hover: {
    x: 8,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const successVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: { opacity: 0, y: -20 }
};

type FormStatus = 'idle' | 'success';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Create mailto link with form data
    const subject = `Contact Form Submission from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    
    window.location.href = `mailto:oliasmit872@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setStatus('idle');
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-200"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 30 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <motion.h2 
            className="text-4xl font-bold text-gray-900 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Contact Us
          </motion.h2>
          <motion.p 
            className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Get in touch to discuss your next art project
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.6,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{ 
              y: -5,
              boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.08)"
            }}
          >
            {status === 'success' ? (
              <motion.div
                variants={successVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center py-8"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 1.2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.4, 1]
                  }}
                >
                  <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h3>
                <p className="text-gray-600 mb-4">Your email client should open automatically.</p>
                <p className="text-gray-500 text-sm">If it doesn't, please email us directly at oliasmit872@gmail.com</p>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 ${
                      errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''
                    }`}
                  />
                  {errors.name && (
                    <motion.p 
                      className="mt-2 text-sm text-red-500"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 ${
                      errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''
                    }`}
                  />
                  {errors.email && (
                    <motion.p 
                      className="mt-2 text-sm text-red-500"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 ${
                      errors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''
                    }`}
                  ></textarea>
                  {errors.message && (
                    <motion.p 
                      className="mt-2 text-sm text-red-500"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <span className="relative z-10">Send Message</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </motion.button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>

          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.6,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <motion.div 
              className="flex items-start space-x-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-indigo-100 transition-all duration-300"
              variants={contactItemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-3 bg-indigo-50 rounded-full">
                <Mail className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Email</h3>
                <a 
                  href="mailto:oliasmit872@gmail.com" 
                  className="mt-2 text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
                >
                  bestarttechnology@gmail.com
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start space-x-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-indigo-100 transition-all duration-300"
              variants={contactItemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-3 bg-indigo-50 rounded-full">
                <Phone className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Phone</h3>
                <p className="mt-2 text-gray-700">+977-01-4987265</p>
                <div className="mt-4 flex gap-3">
                  <motion.a 
                    href="https://api.whatsapp.com/send/?phone=9779803337100&text=Hello,+Best+Art+Technology&type=phone_number&app_absent=0" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
                    whileHover={{ y: -2 }}
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </motion.a>
                  <motion.a 
                    href="viber://chat?number=9779803337100" 
                    className="text-sm px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center"
                    whileHover={{ y: -2 }}
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.155 13.893c.716-6.027-.344-9.832-2.256-11.553l.002-.001C19.729.926 17.792.5 15.745.5c-3.195 0-6.197 1.196-8.432 3.329-2.982 2.834-4.491 6.867-4.043 11.089.44 4.111 3.1 7.764 6.92 9.25-.146.93-.219 1.78-.146 2.493.054.562.251 1.026.545 1.359.294.333.697.5 1.197.5.146 0 .315-.024.512-.073.955-.244 2.726-1.191 4.013-2.188 1.42.499 2.889.748 4.343.748 3.193 0 6.197-1.196 8.432-3.329 2.237-2.135 3.471-4.95 3.406-7.99zM12.22 19.595a1.104 1.104 0 01-1.104-1.104c0-.608.497-1.104 1.104-1.104.608 0 1.104.496 1.104 1.104 0 .607-.496 1.104-1.104 1.104zm5.905-1.104a1.104 1.104 0 01-2.207 0c0-.608.496-1.104 1.103-1.104.608 0 1.104.496 1.104 1.104zm2.207 0a1.104 1.104 0 01-2.207 0c0-.608.496-1.104 1.104-1.104.607 0 1.103.496 1.103 1.104z"/>
                    </svg>
                    Viber
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start space-x-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-indigo-100 transition-all duration-300"
              variants={contactItemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-3 bg-indigo-50 rounded-full">
                <MapPin className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Location</h3>
                <p className="mt-2 text-gray-700">Sowyambhu, Sano Bharyang<br />Kathmandu, Nepal</p>
                <motion.a 
                  href="https://maps.app.goo.gl/XWiQqKRRjwP2sxAV8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center text-sm px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  View on Map
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}