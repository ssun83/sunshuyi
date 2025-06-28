import React from 'react';

const Hero = () => {
  return (
    <div id="top" className="main-top">
      <div className="main-top-content">
        <h2>I am <span>Shuyi Sun</span></h2>
        <p>Researcher, Designer, Developer</p>
        
        {/* Social media links */}
        <ul className="social">
          <li>
            <a 
              href="https://instagram.com/zeusspade" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
            >
              <i className="fa fa-instagram"></i>
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/ssun83" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <i className="fa fa-github"></i>
            </a>
          </li>
          <li>
            <a 
              href="https://www.linkedin.com/in/shuyi-sun-432b54162/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <i className="fa fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a 
              href="mailto:xxianya@gmail.com?Subject=Hello" 
              target="_top"
              aria-label="Send Email"
            >
              <i className="fa fa-envelope"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Hero; 