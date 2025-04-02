import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.02,
    boxShadow: "0px 5px 15px rgba(79, 70, 229, 0.3)",
    transition: {
      duration: 0.3
    }
  },
  tap: {
    scale: 0.98
  }
};

const contactItemVariants = {
  hover: {
    x: 5,
    transition: {
      duration: 0.2
    }
  }
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
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            Get in touch to discuss your next art project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="bg-gray-50 p-8 rounded-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">Your email client should open automatically.</p>
                <p className="text-gray-600 mt-2">If it doesn't, please email us directly at bestarttechnology@gmail.com</p>
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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 
                           focus:ring-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 
                           focus:ring-indigo-500 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 
                           focus:ring-indigo-500 sm:text-sm ${errors.message ? 'border-red-500' : ''}`}
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold 
                         hover:bg-indigo-700 transition-colors duration-300"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Send Message
                </motion.button>
              </motion.form>
            )}
          </motion.div>

          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              className="flex items-start space-x-4"
              variants={contactItemVariants}
              whileHover="hover"
            >
              <Mail className="h-6 w-6 text-indigo-600 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                <a 
                  href="mailto:bestarttechnology@gmail.com" 
                  className="mt-1 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  bestarttechnology@gmail.com
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start space-x-4"
              variants={contactItemVariants}
              whileHover="hover"
            >
              <Phone className="h-6 w-6 text-indigo-600 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                <p className="mt-1 text-gray-600">+977-01-4987265</p>
                <div className="mt-2 flex gap-3">
                  <a 
                    href="https://api.whatsapp.com/send/?phone=9779803337100&text=Hello,+Best+Art+Technology&type=phone_number&app_absent=0" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a 
                    href="viber://chat?number=9779803337100" 
                    className="text-sm px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
                  >
                    Viber
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start space-x-4"
              variants={contactItemVariants}
              whileHover="hover"
            >
              <MapPin className="h-6 w-6 text-indigo-600 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Location</h3>
                <p className="mt-1 text-gray-600">Sowyambhu, Sano Bharyang<br />Kathmandu, Nepal</p>
                <a 
                  href="https://maps.app.goo.gl/XWiQqKRRjwP2sxAV8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
                >
                  View on Map
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}