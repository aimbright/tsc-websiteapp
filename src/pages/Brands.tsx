import './Brands.css';

const Brands = () => {
  const brands = [
    {
      id: 1,
      name: 'Konarak Meters',
      logo: 'KM',
      description: 'Leading manufacturer of precision energy meters and electrical measuring instruments.',
      products: ['Energy Meters', 'Electrical Instruments', 'Measuring Devices']
    },
    {
      id: 2,
      name: 'Pioneer',
      logo: 'P',
      description: 'Trusted brand for quality paints, coatings, and surface protection solutions.',
      products: ['Paints', 'Coatings', 'Surface Protection']
    },
    {
      id: 3,
      name: 'Sheenlac',
      logo: 'S',
      description: 'Premium paints and wood finishes for residential and commercial applications.',
      products: ['Wood Finishes', 'Interior Paints', 'Exterior Paints']
    },
    {
      id: 4,
      name: 'Sika',
      logo: 'SI',
      description: 'Global leader in construction chemicals, sealants, and waterproofing solutions.',
      products: ['Construction Chemicals', 'Sealants', 'Waterproofing']
    }
  ];

  return (
    <div className="brands-page">
      <section className="page-hero">
        <div className="container">
          <h1>Our Brands</h1>
          <p>Authorized wholesale partner for leading brands in the industry</p>
        </div>
      </section>

      <section className="brands-content section">
        <div className="container">
          <div className="brands-list">
            {brands.map((brand) => (
              <div key={brand.id} className="brand-detail-card slide-in">
                <div className="brand-logo-large">
                  <div className="brand-logo-circle">
                    <span>{brand.logo}</span>
                  </div>
                </div>
                <h2>{brand.name}</h2>
                <p className="brand-description">{brand.description}</p>
                <div className="brand-products">
                  <h3>Product Categories:</h3>
                  <div className="products-tags">
                    {brand.products.map((product, index) => (
                      <span key={index} className="product-tag">{product}</span>
                    ))}
                  </div>
                </div>
                <div className="brand-cta">
                  <a href="/contact" className="cta-button">Contact for Bulk Orders</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Brands;

