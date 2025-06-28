import React from 'react';

const About = () => {
  return (
    <div id="about" className="section-padding">
      <div className="container">
        <div className="row">
          {/* About text content */}
          <div className="col-md-9">
            <div className="about-me">
              <h2>Introduction</h2>
              <p>
                I am Shuyi Sun. I enjoy applying my lifelong art experiences and passion to Computer Science, 
                research, and technical creations. I am currently obtaining a Bachelors of Science in Computer Science, 
                focusing on People and Media, from Georgia Institute of Technology.
              </p>
            </div>
          </div>
          
          {/* Profile image */}
          <div className="col-md-3">
            <div className="author">
              <img 
                src="https://cdn.discordapp.com/attachments/553353974472769558/562319435608752188/dinoLogo.png" 
                alt="Shuyi Sun"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 