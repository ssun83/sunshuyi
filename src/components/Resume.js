import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for fading in elements
const fadeIn = {
  hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Container for staggered animations
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Resume = () => {
  return (
    <div id="service" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
        >
          <div className="section-head">
            <h3>Core Expertise</h3>
          </div>
        </motion.div>

        {/* Expertise Cards */}
        <motion.div 
          className="row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Interactive Biosensing */}
          <motion.div className="col-md-4" variants={fadeIn}>
            <div className="single-service">
              <span className="glow-icon"><i className="fa fa-heartbeat"></i></span>
              <h3>ML + Interactive Biosensing</h3>
              <p>
                I pioneer novel biosensors for both humans and animals, integrating electrochemical and colorimetric
                sensing into everyday objects. My work uses machine learning to translate subtle biological signals 
                from wearable tech and ACI into actionable health insights.
              </p>
            </div>
          </motion.div>

          {/* Creative Technology & Prototyping */}
          <motion.div className="col-md-4" variants={fadeIn}>
            <div className="single-service">
              <span className="glow-icon"><i className="fa fa-magic"></i></span>
              <h3>Creative Tech & Prototyping</h3>
              <p>
                Bridging the gap between art and engineering, I bring concepts to life through rapid prototyping. 
                My skills span hardware design, 3D modeling, and embedded systems to create beautiful, functional, 
                and user-centered interactive devices.
              </p>
            </div>
          </motion.div>

          {/* Full-Stack & Data Science */}
          <motion.div className="col-md-4" variants={fadeIn}>
            <div className="single-service">
              <span className="glow-icon"><i className="fa fa-code"></i></span>
              <h3>Full-Stack & Data Science</h3>
              <p>
                I build robust, end-to-end systems to power my research. This includes architecting IoT platforms,
                developing data visualization dashboards, and applying machine learning to extract meaningful 
                patterns from complex, multi-modal data streams.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Resume Link Section - Simplified and Animated */}
        <motion.div
          className="row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
        >
          <div className="col-md-12">
            <div className="resume-cta">
              <h4>Want the formal version?</h4>
              <a 
                href="documents/resume.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary"
                aria-label="View Full Resume"
              >
                View Full Resume
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume; 