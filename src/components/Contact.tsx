import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
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
      duration: 0.3,
      yoyo: Infinity
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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 
                         focus:ring-indigo-500 sm:text-sm"
                  required
                />
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 
                         focus:ring-indigo-500 sm:text-sm"
                  required
                />
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 
                         focus:ring-indigo-500 sm:text-sm"
                  required
                ></textarea>
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
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}