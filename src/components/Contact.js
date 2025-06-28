import React, { useState } from 'react';

const Contact = () => {
  // Form state management
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent('Contact from Portfolio Website');
    const body = encodeURIComponent(`
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}

Message:
${formData.message}
    `);
    
    // Open email client with pre-filled information
    window.location.href = `mailto:xxianya@gmail.com?subject=${subject}&body=${body}`;
    
    // Reset form after submission
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
  };

  return (
    <div id="contact" className="section-padding">
      <div className="container">
        <div className="row">
          {/* Section Header */}
          <div className="col-md-12">
            <div className="section-head">
              <h3>Contact Me</h3>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-md-6">
            <div className="contact-form">
              <form onSubmit={handleSubmit} className="my-contact-form">
                {/* Name Fields */}
                <div className="row">
                  <div className="col-md-6">
                    <input 
                      type="text" 
                      name="firstName" 
                      id="f_name" 
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input 
                      type="text" 
                      name="lastName" 
                      id="l_name" 
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="row">
                  <div className="col-md-12">
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="row">
                  <div className="col-md-12">
                    <textarea 
                      name="message" 
                      id="message" 
                      cols="30" 
                      rows="10" 
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="row">
                  <div className="col-md-12">
                    <input 
                      type="submit" 
                      id="submit" 
                      value="Send Message"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Details */}
          <div className="col-md-6">
            <div className="contact-address">
              <h2>Get In Touch</h2>
              <div className="row">
                <div className="contact-details">
                  {/* Phone */}
                  <div className="row">
                    <div className="col-md-2 col-md-offset-2">
                      <p><strong>Phone:</strong></p>
                    </div>
                    <div className="col-md-8">
                      <p>
                        <a href="tel:+14702098797" style={{ color: 'inherit', textDecoration: 'none' }}>
                          +1 (470) 209-8797
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="row">
                    <div className="col-md-2 col-md-offset-2">
                      <p><strong>Email:</strong></p>
                    </div>
                    <div className="col-md-8">
                      <p>
                        <a 
                          href="mailto:xxianya@gmail.com" 
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          xxianya@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Additional Contact Info */}
                  <div className="row" style={{ marginTop: '30px' }}>
                    <div className="col-md-12">
                      <p style={{ textAlign: 'center', fontStyle: 'italic' }}>
                        Feel free to reach out for collaborations, opportunities, or just to say hello!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 