import React from 'react';

const Resume = () => {
  return (
    <div id="service" className="section-padding">
      <div className="container">
        {/* Resume Link Section */}
        <div className="row">
          <div className="col-md-12">
            <div className="section-head">
              <h3>Resume</h3>
              <div className="single-service">
                <span>
                  <a 
                    href="documents/resume.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="View Resume"
                  >
                    <i className="fa fa-id-card"></i>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills and Experiences Section */}
        <div className="row">
          <div className="col-md-12">
            <div className="section-head">
              <h3>Skills and Experiences</h3>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Research Skills */}
          <div className="col-md-4">
            <div className="single-service">
              <span><i className="fa fa-area-chart"></i></span>
              <h3>Research</h3>
              <p>
                I have been involved in various forms of research in the fields of Computer Science.
              </p>
              <p>
                From my involvement with the Facilitating Interactions for Dogs with Occupations lab, 
                I designed and developed an experimental device for measuring aspects of dog temperament. 
                In addition to programming, this process required hardware skills such as 3D printing and modeling, 
                silicone casting, and circuitry. An extended abstract was published in the 2018 international 
                conference on Animal-Computer Interaction, titled "Technology for working dogs."
              </p>
              <p>
                I also involved myself in research for computational making the HCI classrooms, using skills 
                such as analyzing qualitative data and interviews, as well as coding and quantifying these information.
              </p>
            </div>
          </div>

          {/* Arts and Design Skills */}
          <div className="col-md-4">
            <div className="single-service">
              <span><i className="fa fa-paint-brush"></i></span>
              <h3>Arts and Design</h3>
              <p>
                I have been drawing, painting, and designing since the age of three.
              </p>
              <p>
                Throughout the years, I have won many awards, sold my art works, and had my work displayed. 
                With my abilities in traditional art, Adobe Creative Studio, and Autodesk, I greatly enjoy 
                finding ways to incorporate this passion into my technological, STEM focused major.
              </p>
              <p>
                Aside from my personal projects, I also designed the icon and posters for the Fifth 
                International Conference on Animal-Computer Interaction.
              </p>
            </div>
          </div>

          {/* Development Skills */}
          <div className="col-md-4">
            <div className="single-service">
              <span><i className="fa fa-file-code-o"></i></span>
              <h3>Developing</h3>
              <p>
                As my degree is in Computer Science, I have done many programming projects.
              </p>
              <p>
                I work with various programming languages and frameworks including JavaScript, React, 
                Python, Java, and more. I enjoy creating both web applications and desktop software, 
                always focusing on clean code and user experience.
              </p>
              <p>
                My development work spans from research applications to creative projects, combining 
                my technical skills with my design background to create meaningful digital experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume; 