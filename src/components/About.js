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

const About = () => {
  return (
    <div id="about" className="section-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-head">
              <h3>Who I Am</h3>
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <motion.div 
          className="row about-intro-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {/* Profile Content */}
          <motion.div className="col-md-7" variants={fadeIn}>
            <div className="about-me">
              <h2>A Researcher and Inventor at the Intersection of Biology, Hardware, and Design.</h2>
              <p>
                I recently earned my PhD in Computer Science from the University of California, Davis, 
                where my work focused on inventing new ways to sense and interpret the world. My passion 
                is creating novel biosensing systems that make the invisible visible—capturing subtle 
                biological cues from both humans and animals to enhance health, communication, and our connection 
                to the world around us.
              </p>
              <p>
                My doctoral thesis established 'Animal Biosensing Computing,' a new field dedicated to non-invasively 
                monitoring pet health. But my research isn't limited to our furry friends. I've also developed 
                wearable biosensors for people, embedding diagnostic technology into everyday items like jewelry and lipstick. 
                At my core, I'm a builder who loves taking ideas from concept to creation, blending scientific rigor with 
                creative vision to build technology that makes a real impact.
              </p>
            </div>
          </motion.div>
          
          {/* Profile Image */}
          <motion.div className="col-md-5" variants={fadeIn}>
            <div className="author">
              <img 
                src={`${process.env.PUBLIC_URL}/img/pfp.png`}
                alt="Dr. Shuyi Sun - PhD in Computer Science, UC Davis"
                loading="lazy"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Core Contributions Section */}
        <motion.div 
          className="row" 
          style={{marginTop: '60px'}}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div className="col-md-12" variants={fadeIn}>
            <div className="section-head">
              <h3>My Focus</h3>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Novel Biosensor Integration */}
          <motion.div className="col-md-4" variants={fadeIn}>
            <div className="single-service">
              <span className="glow-icon"><i className="fa fa-flask"></i></span>
              <h3>Novel Biosensor Integration</h3>
              <p>
                I invent and validate novel biosensors—electrochemical, colorimetric, and fluorescent—that 
                seamlessly merge with everyday objects. I turn items like jewelry, toys, and litter boxes into 
                powerful, non-invasive diagnostic tools.
              </p>
            </div>
          </motion.div>

          {/* Intelligent Interactive Systems */}
          <motion.div className="col-md-4" variants={fadeIn}>
            <div className="single-service">
              <span className="glow-icon"><i className="fa fa-sitemap"></i></span>
              <h3>Intelligent Interactive Systems</h3>
              <p>
                I architect and build complete, intelligent systems that connect hardware, software, and data. 
                I create ecosystems that provide a holistic, actionable understanding of well-being for pets 
                and people alike.
              </p>
            </div>
          </motion.div>

          {/* Human & Animal-Centered Design */}
          <motion.div className="col-md-4" variants={fadeIn}>
            <div className="single-service">
              <span className="glow-icon"><i className="fa fa-paw"></i></span>
              <h3>Human & Animal-Centered Design</h3>
              <p>
                Every project I undertake is grounded in user-centered design—whether the 'user' is a person or a pet. 
                I focus on creating technology that is intuitive, respectful, and empowering for all.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 