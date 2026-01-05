import './Products.css';

const Products = () => {
  const productCategories = [
    {
      id: 1,
      name: 'Hardware Supplies',
      icon: '🔩',
      description: 'Complete range of hardware supplies including screws, nails, bolts, hinges, locks, handles, and all construction hardware essentials.',
      items: ['Screws & Nails', 'Bolts & Nuts', 'Hinges & Locks', 'Handles & Knobs', 'Construction Hardware']
    },
    {
      id: 2,
      name: 'Electrical & Meters',
      icon: '⚡',
      description: 'Premium electrical components, meters, switches, wires, and all electrical supplies from trusted manufacturers.',
      items: ['Energy Meters', 'Electrical Switches', 'Wires & Cables', 'Circuit Breakers', 'Electrical Accessories']
    },
    {
      id: 3,
      name: 'Paints & Coatings',
      icon: '🎨',
      description: 'High-quality paints, primers, varnishes, and protective coatings for interior, exterior, and industrial applications.',
      items: ['Interior Paints', 'Exterior Paints', 'Primers', 'Varnishes', 'Protective Coatings']
    },
    {
      id: 4,
      name: 'Construction Chemicals',
      icon: '🧪',
      description: 'Advanced construction chemicals including admixtures, sealants, waterproofing compounds, and repair materials.',
      items: ['Admixtures', 'Waterproofing', 'Sealants', 'Repair Compounds', 'Protective Coatings']
    },
    {
      id: 5,
      name: 'Tools & Accessories',
      icon: '🔧',
      description: 'Professional-grade hand tools, power tools, measuring instruments, and safety equipment.',
      items: ['Hand Tools', 'Power Tools', 'Measuring Instruments', 'Safety Equipment', 'Tool Accessories']
    },
    {
      id: 6,
      name: 'Building Materials',
      icon: '🏗️',
      description: 'Comprehensive range of building materials including cement, steel, aggregates, and construction essentials.',
      items: ['Cement & Aggregates', 'Steel Products', 'Bricks & Blocks', 'Roofing Materials', 'Construction Essentials']
    }
  ];

  return (
    <div className="products-page">
      <section className="page-hero">
        <div className="container">
          <h1>Our Products</h1>
          <p>Comprehensive range of premium hardware and construction supplies</p>
        </div>
      </section>

      <section className="products-content section">
        <div className="container">
          <div className="products-list">
            {productCategories.map((category) => (
              <div key={category.id} className="product-category-card slide-in">
                <div className="category-header">
                  <div className="category-icon">{category.icon}</div>
                  <h2>{category.name}</h2>
                </div>
                <p className="category-description">{category.description}</p>
                <div className="category-items">
                  <h3>Product Range:</h3>
                  <ul>
                    {category.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="category-cta">
                  <a href="/contact" className="cta-button">Enquire Now</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;

