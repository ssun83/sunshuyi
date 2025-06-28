import React from 'react';

const Header = ({ scrolled, scrollToSection }) => {
  return (
    <header id="top">
      <nav className={`navbar navbar-default navbar-fixed-top ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-menu">
            {/* Brand/Logo */}
            <div className="navbar-header">
              <button 
                className="navbar-brand logo" 
                onClick={() => scrollToSection('top')}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                SHUYI SUN
              </button>
              
              {/* Mobile menu toggle button */}
              <button 
                type="button" 
                className="navbar-toggle collapsed" 
                data-toggle="collapse" 
                data-target="#main-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            
            {/* Navigation menu */}
            <div className="collapse navbar-collapse" id="main-menu">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <button 
                    onClick={() => scrollToSection('top')}
                    style={{ background: 'none', border: 'none', color: '#2d2c28', padding: '15px' }}
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('about')}
                    style={{ background: 'none', border: 'none', color: '#2d2c28', padding: '15px' }}
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('service')}
                    style={{ background: 'none', border: 'none', color: '#2d2c28', padding: '15px' }}
                  >
                    Resume
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('portfolio')}
                    style={{ background: 'none', border: 'none', color: '#2d2c28', padding: '15px' }}
                  >
                    Portfolio
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    style={{ background: 'none', border: 'none', color: '#2d2c28', padding: '15px' }}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 