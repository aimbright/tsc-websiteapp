import { useState, useEffect, useRef } from 'react';
import { generatePDF } from '../utils/pdfGenerator';
import './FlipbookViewer.css';

interface Page {
  id: number;
  type: 'cover' | 'category' | 'product' | 'table';
  content: any;
}

interface FlipbookViewerProps {
  pages: Page[];
  catalogTitle: string;
  onClose: () => void;
}

const FlipbookViewer = ({ pages, catalogTitle, onClose }: FlipbookViewerProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const flipbookRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Safety check
  if (!pages || pages.length === 0) {
    return (
      <div className="flipbook-viewer">
        <div style={{ padding: '50px', textAlign: 'center', color: 'white' }}>
          <h2>No pages available</h2>
          <button className="toolbar-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    // Only handle horizontal swipes (ignore if vertical swipe is larger)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextPage();
      } else {
        prevPage();
      }
    }

    touchStartX.current = 0;
    touchStartY.current = 0;
  };

  // Pinch zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      handleZoom(e.deltaY > 0 ? -10 : 10);
    }
  };

  useEffect(() => {
    if (isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, [isFullscreen]);

  const totalPages = pages.length;
  const pagesPerView = isMobile ? 1 : 2;
  const maxPage = totalPages - pagesPerView;

  const goToPage = (page: number) => {
    if (page < 0 || page > maxPage || isFlipping) return;
    
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsFlipping(false);
    }, 300);
  };

  const nextPage = () => goToPage(Math.min(currentPage + pagesPerView, maxPage));
  const prevPage = () => goToPage(Math.max(currentPage - pagesPerView, 0));

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.max(50, Math.min(200, prev + delta)));
  };

  const handleDownloadPDF = () => {
    try {
      generatePDF(pages, catalogTitle);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again or contact us.');
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevPage();
    if (e.key === 'ArrowRight') nextPage();
    if (e.key === '+' || e.key === '=') handleZoom(10);
    if (e.key === '-') handleZoom(-10);
    if (e.key === 'Escape') onClose();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress as any);
    return () => window.removeEventListener('keydown', handleKeyPress as any);
  }, [currentPage]);

  const renderPage = (page: Page, index: number) => {
    const pageNum = index + 1;
    
    switch (page.type) {
      case 'cover':
        return (
          <div key={page.id} className="flipbook-page cover-page">
            <div className="page-content">
              <div className="cover-content">
                <div className="cover-logo">STSC</div>
                <h1 className="cover-title">{catalogTitle}</h1>
                <div className="cover-year">2025</div>
                <div className="cover-image-placeholder">
                  <div className="placeholder-image">📚</div>
                </div>
                <div className="cover-footer">
                  <p>Sri Tirumala Sales Corporation</p>
                  <p>Your Trusted Hardware Partner</p>
                </div>
              </div>
            </div>
            <div className="page-number">{pageNum}</div>
          </div>
        );

      case 'category':
        return (
          <div key={page.id} className="flipbook-page category-page">
            <div className="page-content">
              <div className="category-header">
                <h2>{page.content.title}</h2>
                <div className="category-divider"></div>
              </div>
              <div className="category-description">
                <p>{page.content.description}</p>
              </div>
              <div className="category-products-preview">
                {page.content.products?.slice(0, 6).map((product: any, idx: number) => (
                  <div key={idx} className="product-preview-card">
                    <div className="product-image-placeholder">
                      <span>{product.icon}</span>
                    </div>
                    <h4>{product.name}</h4>
                  </div>
                ))}
              </div>
            </div>
            <div className="page-number">{pageNum}</div>
          </div>
        );

      case 'product':
        return (
          <div key={page.id} className="flipbook-page product-page">
            <div className="page-content">
              <div className="product-detail-header">
                <h2>{page.content.category}</h2>
              </div>
              <div className="product-detail-grid">
                {page.content.products.map((product: any, idx: number) => (
                  <div key={idx} className="product-detail-card">
                    <div className="product-detail-image">
                      <span className="product-icon-large">{product.icon}</span>
                    </div>
                    <div className="product-detail-info">
                      <h3>{product.name}</h3>
                      <p className="product-code">Code: {product.code}</p>
                      <p className="product-specs">{product.specs}</p>
                      <div className="product-price">₹{product.price}</div>
                      <p className="product-desc">{product.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="page-number">{pageNum}</div>
          </div>
        );

      case 'table':
        return (
          <div key={page.id} className="flipbook-page table-page">
            <div className="page-content">
              <div className="table-header">
                <h2>{page.content.title}</h2>
              </div>
              <table className="catalog-table">
                <thead>
                  <tr>
                    <th>Product Code</th>
                    <th>Product Name</th>
                    <th>Size/Variant</th>
                    <th>Price (₹)</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {page.content.items.map((item: any, idx: number) => (
                    <tr key={idx}>
                      <td>{item.code}</td>
                      <td>{item.name}</td>
                      <td>{item.size}</td>
                      <td>₹{item.price}</td>
                      <td>{item.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="page-number">{pageNum}</div>
          </div>
        );

      default:
        return null;
    }
  };

  const visiblePages = [];
  for (let i = 0; i < pagesPerView && currentPage + i < totalPages; i++) {
    visiblePages.push(pages[currentPage + i]);
  }

  return (
    <div className={`flipbook-viewer ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="flipbook-toolbar">
        <button className="toolbar-btn" onClick={onClose}>✕ Close</button>
        <div className="toolbar-center">
          <button className="toolbar-btn" onClick={prevPage} disabled={currentPage === 0}>
            ◀ Prev
          </button>
          <span className="page-indicator">
            {currentPage + 1} - {Math.min(currentPage + pagesPerView, totalPages)} / {totalPages}
          </span>
          <button className="toolbar-btn" onClick={nextPage} disabled={currentPage >= maxPage}>
            Next ▶
          </button>
        </div>
        <div className="toolbar-right">
          <button className="toolbar-btn" onClick={() => handleZoom(-10)}>− Zoom Out</button>
          <span className="zoom-level">{zoom}%</span>
          <button className="toolbar-btn" onClick={() => handleZoom(10)}>+ Zoom In</button>
          <button className="toolbar-btn" onClick={() => setIsFullscreen(!isFullscreen)}>
            {isFullscreen ? '⤓ Exit Fullscreen' : '⤢ Fullscreen'}
          </button>
        </div>
      </div>

      <div 
        className={`flipbook-container ${isFlipping ? 'flipping' : ''}`}
        ref={flipbookRef}
        style={{ transform: `scale(${zoom / 100})` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        <div className="flipbook-pages">
          {visiblePages.map((page, idx) => renderPage(page, currentPage + idx))}
        </div>
      </div>

      <div className="flipbook-footer">
        <button className="download-pdf-btn" onClick={handleDownloadPDF}>
          📥 Download Full Catalog (PDF)
        </button>
      </div>
    </div>
  );
};

export default FlipbookViewer;

