import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const phoneNumber = '+919876543210';
  const whatsappNumber = '+919876543210';
  const whatsappMessage = encodeURIComponent('Hello! I would like to know more about your products.');

  const productCategories = [
    {
      id: 1,
      name: 'Hardware Supplies',
      icon: '🔩',
      description: 'Complete range of hardware supplies for all your construction and industrial needs.',
      link: '/products'
    },
    {
      id: 2,
      name: 'Electrical & Meters',
      icon: '⚡',
      description: 'Premium electrical components and precision meters from trusted brands.',
      link: '/products'
    },
    {
      id: 3,
      name: 'Paints & Coatings',
      icon: '🎨',
      description: 'High-quality paints and protective coatings for lasting finishes.',
      link: '/products'
    },
    {
      id: 4,
      name: 'Construction Chemicals',
      icon: '🧪',
      description: 'Advanced construction chemicals for enhanced durability and performance.',
      link: '/products'
    },
    {
      id: 5,
      name: 'Tools & Accessories',
      icon: '🔧',
      description: 'Professional-grade tools and accessories for every application.',
      link: '/products'
    },
    {
      id: 6,
      name: 'Building Materials',
      icon: '🏗️',
      description: 'Comprehensive range of building materials for construction projects.',
      link: '/products'
    }
  ];

  const brands = [
    { id: 1, name: 'Konarak Meters', logo: 'KM' },
    { id: 2, name: 'Pioneer', logo: 'P' },
    { id: 3, name: 'Sheenlac', logo: 'S' },
    { id: 4, name: 'Sika', logo: 'SI' }
  ];

  const trustPoints = [
    { id: 1, icon: '✓', title: 'Genuine Products', description: '100% authentic products from authorized distributors' },
    { id: 2, icon: '💰', title: 'Wholesale Pricing', description: 'Competitive wholesale rates for bulk orders' },
    { id: 3, icon: '🚚', title: 'Reliable Supply', description: 'Consistent supply chain with timely deliveries' },
    { id: 4, icon: '🤝', title: 'Long-Term Partnerships', description: 'Building lasting relationships with our clients' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content fade-in">
          <div className="hero-logo">
            <div className="logo-circle-large">
              <span className="logo-text-large">STSC</span>
            </div>
          </div>
          <h1 className="hero-title">Sri Tirumala Sales Corporation</h1>
          <p className="hero-subtitle">
            Your trusted partner for premium hardware solutions, delivering quality and reliability across the region.
          </p>
          <div className="hero-cta">
            <a href={`tel:${phoneNumber}`} className="cta-button call-button">
              📞 Call Now
            </a>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button whatsapp-button"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section section">
        <div className="container">
          <h2 className="section-title">Products</h2>
          <div className="products-grid">
            {productCategories.map((category) => (
              <div key={category.id} className="product-card slide-in">
                <div className="product-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <Link to={category.link} className="product-cta">
                  View Products
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="brands-section section">
        <div className="container">
          <h2 className="section-title">Brands</h2>
          <p className="brands-subtitle">Authorized wholesale partner for leading brands</p>
          <div className="brands-grid">
            {brands.map((brand) => (
              <div key={brand.id} className="brand-card slide-in">
                <div className="brand-logo-placeholder">
                  <span>{brand.logo}</span>
                </div>
                <h3>{brand.name}</h3>
              </div>
            ))}
          </div>
          <div className="brands-cta">
            <Link to="/contact" className="cta-button">
              Contact us for bulk orders
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Highlights */}
      <section className="trust-section section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="trust-grid">
            {trustPoints.map((point) => (
              <div key={point.id} className="trust-card slide-in">
                <div className="trust-icon">{point.icon}</div>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

