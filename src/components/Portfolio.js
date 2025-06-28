import React from 'react';

const Portfolio = () => {
  // Portfolio data - can be moved to a separate data file later
  const portfolioItems = [
    {
      id: 1,
      image: "http://ashkanx.com/wp-content/uploads/2015/07/coming-soon.jpg",
      title: "Project 1",
      link: "#"
    },
    {
      id: 2,
      image: "http://ashkanx.com/wp-content/uploads/2015/07/coming-soon.jpg",
      title: "Project 2",
      link: "#"
    },
    {
      id: 3,
      image: "http://ashkanx.com/wp-content/uploads/2015/07/coming-soon.jpg",
      title: "Project 3",
      link: "#"
    },
    {
      id: 4,
      image: "http://ashkanx.com/wp-content/uploads/2015/07/coming-soon.jpg",
      title: "Project 4",
      link: "#"
    },
    {
      id: 5,
      image: "http://ashkanx.com/wp-content/uploads/2015/07/coming-soon.jpg",
      title: "Project 5",
      link: "#"
    },
    {
      id: 6,
      image: "http://ashkanx.com/wp-content/uploads/2015/07/coming-soon.jpg",
      title: "Project 6",
      link: "#"
    },
    {
      id: 7,
      image: "http://ashkanx.com/wp-content/uploads/2015/07/coming-soon.jpg",
      title: "Project 7",
      link: "#"
    },
    {
      id: 8,
      image: "http://ashkanx.com/wp-content/uploads/2015/07/coming-soon.jpg",
      title: "Project 8",
      link: "#"
    }
  ];

  return (
    <div id="portfolio" className="section-padding">
      <div className="container">
        <div className="row">
          {/* Section Header */}
          <div className="col-md-12">
            <div className="section-head">
              <h3>My Works</h3>
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="row">
            {portfolioItems.map((item) => (
              <div key={item.id} className="single-work">
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`View ${item.title}`}
                >
                  <img 
                    className="img-responsive" 
                    src={item.image} 
                    alt={item.title}
                    loading="lazy"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio; 