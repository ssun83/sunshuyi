import React, { useState } from 'react';

const Contact = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Handle copy to clipboard with snackbar notification
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    
    // Show snackbar
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 2000);
  };

  // Handle email button click - copy to clipboard
  const handleEmailClick = () => {
    copyToClipboard('xxianya@gmail.com');
  };

  // Handle phone click - copy to clipboard
  const handlePhoneClick = () => {
    copyToClipboard('+14702098797');
  };

  return (
    <div id="contact" style={{ 
      backgroundColor: '#fafafa', 
      minHeight: '100vh',
      paddingTop: '120px',
      paddingBottom: '120px'
    }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 40px' }}>
        
        {/* Hero Section */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '100px'
        }}>
          <h1 style={{ 
            fontSize: '4.5rem',
            fontWeight: '600',
            color: '#1d1d1f',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
            lineHeight: '1.1'
          }}>
            Let's Connect
          </h1>
          <p style={{ 
            fontSize: '1.5rem',
            color: '#6e6e73',
            fontWeight: '400',
            lineHeight: '1.4',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Ready to bring your next project to life? Let's talk about how we can work together.
          </p>
        </div>

        {/* Contact Details - Centered */}
        <div style={{ 
          textAlign: 'center',
          padding: '80px 60px',
          backgroundColor: 'white',
          borderRadius: '24px',
          boxShadow: '0 8px 60px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e5e5e7'
        }}>
          
          {/* Email Section */}
          <div style={{ marginBottom: '80px' }}>
            <h3 style={{ 
              fontSize: '1.3rem',
              fontWeight: '500',
              color: '#6e6e73',
              marginBottom: '24px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Email
            </h3>
            <button
              onClick={handleEmailClick}
              style={{
                background: 'linear-gradient(135deg, #007aff 0%, #0056cc 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '28px 56px',
                fontSize: '1.4rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                boxShadow: '0 12px 40px rgba(0, 122, 255, 0.3)',
                fontFamily: 'inherit',
                letterSpacing: '0.02em'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-6px) scale(1.03)';
                e.target.style.boxShadow = '0 20px 60px rgba(0, 122, 255, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 12px 40px rgba(0, 122, 255, 0.3)';
              }}
            >
              xxianya@gmail.com
            </button>
            <p style={{ 
              fontSize: '0.9rem',
              color: '#8e8e93',
              marginTop: '16px',
              fontStyle: 'italic'
            }}>
              Click to copy to clipboard
            </p>
          </div>

          {/* Phone Section */}
          <div style={{ marginBottom: '80px' }}>
            <h3 style={{ 
              fontSize: '1.3rem',
              fontWeight: '500',
              color: '#6e6e73',
              marginBottom: '24px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Phone
            </h3>
            <button
              onClick={handlePhoneClick}
              style={{
                background: 'white',
                color: '#1d1d1f',
                border: '2px solid #e5e5e7',
                borderRadius: '20px',
                padding: '28px 56px',
                fontSize: '1.4rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                letterSpacing: '0.02em'
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = '#007aff';
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12)';
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = '#e5e5e7';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              +1 (470) 209-8797
            </button>
            <p style={{ 
              fontSize: '0.9rem',
              color: '#8e8e93',
              marginTop: '16px',
              fontStyle: 'italic'
            }}>
              Click to copy to clipboard
            </p>
          </div>

          {/* Call to Action */}
          <div style={{ 
            padding: '50px 40px',
            backgroundColor: '#fafafa',
            borderRadius: '20px',
            border: '1px solid #f0f0f0'
          }}>
            <h3 style={{ 
              fontSize: '2rem',
              fontWeight: '600',
              color: '#1d1d1f',
              marginBottom: '20px',
              letterSpacing: '-0.01em'
            }}>
              Let's Build Something Amazing
            </h3>
            <p style={{ 
              fontSize: '1.2rem',
              color: '#6e6e73',
              lineHeight: '1.6',
              margin: '0',
              maxWidth: '500px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Whether it's a quick chat or a full collaboration, I'm here to help bring your ideas to life.
            </p>
          </div>
        </div>

        {/* Snackbar */}
        {showSnackbar && (
          <div style={{
            position: 'fixed',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#1d1d1f',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '500',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            zIndex: 1000,
            animation: 'snackbarSlideIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            letterSpacing: '0.01em'
          }}>
            Copied to clipboard
          </div>
        )}

        <style>
          {`
            @keyframes snackbarSlideIn {
              from {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Contact; 