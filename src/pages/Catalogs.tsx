import { useState } from 'react';
import FlipbookViewer from '../components/FlipbookViewer';
import { generatePDF as generatePDFUtil } from '../utils/pdfGenerator';
import './Catalogs.css';

// Generate dummy catalog pages
const generateCatalogPages = (catalogType: string) => {
  const pages: any[] = [];

  // Cover Page
  pages.push({
    id: 1,
    type: 'cover',
    content: {}
  });

  // Category Pages with Products
  const categories = {
    'Hardware': {
      products: [
        { name: 'Steel Screws Set', code: 'HW-SS-001', specs: 'M6 x 25mm, Pack of 100', price: '450', description: 'High-quality steel screws for construction', icon: '🔩' },
        { name: 'Nylon Nuts', code: 'HW-NN-002', specs: 'M8, Pack of 50', price: '280', description: 'Durable nylon nuts for various applications', icon: '⚙️' },
        { name: 'Door Hinges', code: 'HW-DH-003', specs: '4 inch, Heavy Duty', price: '850', description: 'Premium door hinges with ball bearings', icon: '🚪' },
        { name: 'Padlocks', code: 'HW-PL-004', specs: '40mm, Brass Body', price: '650', description: 'Security padlocks with keys', icon: '🔒' }
      ]
    },
    'Electrical': {
      products: [
        { name: 'Energy Meter', code: 'EL-EM-001', specs: 'Single Phase, 5-30A', price: '2500', description: 'Digital energy meter with LCD display', icon: '⚡' },
        { name: 'MCB Switch', code: 'EL-MCB-002', specs: '16A, Single Pole', price: '450', description: 'Miniature circuit breaker', icon: '🔌' },
        { name: 'Wire Cable', code: 'EL-WC-003', specs: '2.5 sqmm, 90m', price: '3200', description: 'Copper wire cable for electrical wiring', icon: '🔌' },
        { name: 'Switch Socket', code: 'EL-SS-004', specs: 'Modular, White', price: '180', description: 'Premium switch socket with safety shutters', icon: '🔌' }
      ]
    },
    'Paints': {
      products: [
        { name: 'Interior Emulsion', code: 'PT-IE-001', specs: '20L, Premium', price: '3200', description: 'Washable interior paint with smooth finish', icon: '🎨' },
        { name: 'Exterior Paint', code: 'PT-EP-002', specs: '20L, Weatherproof', price: '3800', description: 'UV resistant exterior paint', icon: '🏠' },
        { name: 'Primer', code: 'PT-PR-003', specs: '10L, Universal', price: '1800', description: 'High-quality primer for all surfaces', icon: '🖌️' },
        { name: 'Varnish', code: 'PT-VA-004', specs: '5L, Clear', price: '1200', description: 'Wood varnish for protection and shine', icon: '✨' }
      ]
    },
    'Chemicals': {
      products: [
        { name: 'Waterproofing Compound', code: 'CH-WC-001', specs: '25kg, Powder', price: '2800', description: 'Cement-based waterproofing compound', icon: '🧪' },
        { name: 'Tile Adhesive', code: 'CH-TA-002', specs: '20kg, Ready Mix', price: '450', description: 'Premium tile adhesive for all tiles', icon: '🧱' },
        { name: 'Sealant', code: 'CH-SE-003', specs: '300ml, Acrylic', price: '350', description: 'Flexible sealant for joints and gaps', icon: '🔧' },
        { name: 'Concrete Admixture', code: 'CH-CA-004', specs: '1L, Superplasticizer', price: '850', description: 'Concrete strength enhancer', icon: '🏗️' }
      ]
    }
  };

  const categoryData = categories[catalogType as keyof typeof categories] || categories['Hardware'];

  // Category Introduction Page
  pages.push({
    id: 2,
    type: 'category',
    content: {
      title: `${catalogType} Products`,
      description: `Comprehensive range of ${catalogType.toLowerCase()} products from trusted manufacturers. All products are genuine and come with manufacturer warranty.`,
      products: categoryData.products
    }
  });

  // Product Detail Pages (2 products per page)
  for (let i = 0; i < categoryData.products.length; i += 2) {
    pages.push({
      id: pages.length + 1,
      type: 'product',
      content: {
        category: catalogType,
        products: categoryData.products.slice(i, i + 2)
      }
    });
  }

  // Table Page
  pages.push({
    id: pages.length + 1,
    type: 'table',
    content: {
      title: `${catalogType} - Complete Price List`,
      items: categoryData.products.map((p: any) => ({
        code: p.code,
        name: p.name,
        size: p.specs,
        price: p.price,
        stock: 'In Stock'
      }))
    }
  });

  return pages;
};

const Catalogs = () => {
  const [selectedCatalog, setSelectedCatalog] = useState<number | null>(null);
  const [viewingFlipbook, setViewingFlipbook] = useState(false);
  const [currentFlipbookPages, setCurrentFlipbookPages] = useState<any[]>([]);
  const [currentFlipbookTitle, setCurrentFlipbookTitle] = useState('');

  const catalogs = [
    {
      id: 1,
      title: 'Hardware Supplies Catalog',
      description: 'Complete catalog of all hardware supplies and construction materials including screws, nails, bolts, hinges, locks, and all construction hardware essentials.',
      category: 'Hardware',
      size: '5.2 MB',
      pages: '120 pages',
      year: '2025',
      icon: '🔩'
    },
    {
      id: 2,
      title: 'Electrical & Meters Catalog',
      description: 'Comprehensive catalog of electrical components and precision meters from trusted manufacturers including energy meters, switches, wires, and circuit breakers.',
      category: 'Electrical',
      size: '4.8 MB',
      pages: '95 pages',
      year: '2025',
      icon: '⚡'
    },
    {
      id: 3,
      title: 'Paints & Coatings Catalog',
      description: 'Full range of paints, primers, varnishes, and protective coatings for interior, exterior, and industrial applications.',
      category: 'Paints',
      size: '6.1 MB',
      pages: '150 pages',
      year: '2025',
      icon: '🎨'
    },
    {
      id: 4,
      title: 'Construction Chemicals Catalog',
      description: 'Advanced construction chemicals including admixtures, sealants, waterproofing compounds, and repair materials for enhanced durability.',
      category: 'Chemicals',
      size: '5.5 MB',
      pages: '110 pages',
      year: '2025',
      icon: '🧪'
    }
  ];

  const handleView = (catalog: typeof catalogs[0], e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    console.log('Opening catalog:', catalog.title);
    
    // Auto-expand the catalog item
    setSelectedCatalog(catalog.id);
    
    // Generate pages and open flipbook
    const pages = generateCatalogPages(catalog.category);
    console.log('Generated pages:', pages.length);
    
    setCurrentFlipbookPages(pages);
    setCurrentFlipbookTitle(catalog.title);
    
    // Use setTimeout to ensure state updates properly
    setTimeout(() => {
      setViewingFlipbook(true);
      // Prevent body scroll when flipbook is open
      document.body.style.overflow = 'hidden';
      console.log('Flipbook should be open now');
    }, 100);
  };

  const handleDownload = (catalog: typeof catalogs[0]) => {
    // Generate and download PDF directly
    const pages = generateCatalogPages(catalog.category);
    try {
      generatePDFUtil(pages, catalog.title);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to contact page if PDF generation fails
      alert('PDF generation failed. Please contact us for the catalog.');
      window.location.href = '/contact';
    }
  };

  const closeFlipbook = () => {
    setViewingFlipbook(false);
    setCurrentFlipbookPages([]);
    setCurrentFlipbookTitle('');
    // Restore body scroll
    document.body.style.overflow = 'auto';
  };

  if (viewingFlipbook && currentFlipbookPages.length > 0) {
    return (
      <FlipbookViewer
        pages={currentFlipbookPages}
        catalogTitle={currentFlipbookTitle}
        onClose={closeFlipbook}
      />
    );
  }

  return (
    <div className="catalogs-page">
      <section className="catalogs-hero">
        <div className="container">
          <div className="catalogs-hero-content">
            <h1>📚 Product Catalogs</h1>
            <p className="hero-subtitle">Browse and download our comprehensive product catalogs</p>
            <p className="hero-description">
              Access detailed information about our complete range of hardware supplies, 
              electrical components, paints, construction chemicals, and building materials. 
              Click "View Catalog" to browse our interactive digital flipbook or download the PDF version.
            </p>
          </div>
        </div>
      </section>

      <section className="catalogs-content section">
        <div className="container">
          <div className="catalogs-layout">
            {catalogs.map((catalog) => (
              <div 
                key={catalog.id} 
                className={`catalog-item ${selectedCatalog === catalog.id ? 'selected' : ''}`}
                onClick={() => setSelectedCatalog(selectedCatalog === catalog.id ? null : catalog.id)}
              >
                <div className="catalog-item-header">
                  <div className="catalog-icon-wrapper">
                    <span className="catalog-icon">{catalog.icon}</span>
                  </div>
                  <div className="catalog-header-info">
                    <div className="catalog-category-badge">{catalog.category}</div>
                    <h3>{catalog.title}</h3>
                  </div>
                </div>

                <div className={`catalog-item-details ${selectedCatalog === catalog.id ? 'expanded' : ''}`}>
                  <p className="catalog-description">{catalog.description}</p>
                  
                  <div className="catalog-meta">
                    <div className="meta-item">
                      <span className="meta-label">📄 Pages:</span>
                      <span className="meta-value">{catalog.pages}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">💾 Size:</span>
                      <span className="meta-value">{catalog.size}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">📅 Year:</span>
                      <span className="meta-value">{catalog.year}</span>
                    </div>
                  </div>

                  <div className="catalog-actions">
                    <button 
                      onClick={(e) => handleView(catalog, e)}
                      className="view-catalog-btn"
                      type="button"
                    >
                      <span>👁️</span> View Catalog
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(catalog);
                      }}
                      className="download-btn-primary"
                      type="button"
                    >
                      <span>⬇️</span> Download PDF
                    </button>
                  </div>
                </div>
                
                {/* Quick action buttons - always visible */}
                <div className="catalog-quick-actions">
                  <button 
                    onClick={(e) => handleView(catalog, e)}
                    className="quick-view-btn"
                    type="button"
                    title="View Catalog"
                  >
                    👁️ View
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(catalog);
                    }}
                    className="quick-download-btn"
                    type="button"
                    title="Download PDF"
                  >
                    ⬇️ Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="catalogs-footer-note">
            <p>
              <strong>Note:</strong> Use the interactive flipbook viewer to browse products with realistic page-flip animations. 
              For bulk orders or custom catalog requests, please contact us directly. 
              We can provide detailed pricing and specifications tailored to your requirements.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalogs;
