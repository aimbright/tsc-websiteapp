import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="page-hero">
        <div className="container">
          <h1>About Us</h1>
          <p>Your trusted partner in premium hardware solutions</p>
        </div>
      </section>

      <section className="about-content section">
        <div className="container">
          <div className="about-section">
            <h2>Company Overview</h2>
            <p>
              Sri Tirumala Sales Corporation is a leading wholesale distributor of premium hardware 
              supplies, electrical components, paints, construction chemicals, and building materials. 
              With years of experience in the industry, we have established ourselves as a trusted 
              partner for businesses across the region.
            </p>
            <p>
              Our commitment to quality, reliability, and customer satisfaction has made us the 
              preferred choice for contractors, builders, retailers, and industrial clients. We 
              maintain strong relationships with leading manufacturers and brands, ensuring that 
              our customers receive genuine products at competitive wholesale prices.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              To provide premium quality hardware solutions and building materials while maintaining 
              the highest standards of service, reliability, and customer satisfaction. We strive to 
              be the most trusted wholesale partner in the region, building long-term relationships 
              with our clients through genuine products and exceptional service.
            </p>
          </div>

          <div className="about-section">
            <h2>Why Choose Us</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <h3>Genuine Products</h3>
                <p>100% authentic products from authorized distributors and manufacturers</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💰</div>
                <h3>Competitive Pricing</h3>
                <p>Best wholesale rates for bulk orders and long-term partnerships</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🚚</div>
                <h3>Reliable Supply</h3>
                <p>Consistent supply chain with timely deliveries and inventory management</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🤝</div>
                <h3>Partnership Approach</h3>
                <p>Building lasting relationships with personalized service and support</p>
              </div>
            </div>
          </div>

          <div className="about-section gst-section">
            <div className="gst-badge">
              <h3>GSTIN</h3>
              <p className="gst-number">Registered Business</p>
              <p className="gst-note">GST compliant operations</p>
            </div>
          </div>

          <div className="about-section director-section">
            <h2>Managing Director</h2>
            <div className="director-card">
              <div className="director-info">
                <h3>Mr. Dilli Babu, B.A.</h3>
                <p className="director-title">Managing Director</p>
                <p className="director-description">
                  With extensive experience in the hardware and construction materials industry, 
                  Mr. Dilli Babu leads Sri Tirumala Sales Corporation with a vision of excellence 
                  and customer-centric approach. Under his leadership, the company has grown to 
                  become a trusted name in wholesale distribution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

