import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Sri Tirumala Sales Corporation</h3>
            <p>Your trusted partner for premium hardware solutions</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/brands">Brands</a></li>
              <li><a href="/catalogs">Catalogs</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Sri Tirumala Sales Corporation. All rights reserved.</p>
          <p className="designer">Designed by <span>AIM Bright</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

