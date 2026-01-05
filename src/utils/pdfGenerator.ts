import jsPDF from 'jspdf';

interface Page {
  id: number;
  type: 'cover' | 'category' | 'product' | 'table';
  content: any;
}

export const generatePDF = (pages: Page[], catalogTitle: string) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  const contentHeight = pageHeight - (margin * 2);

  pages.forEach((page, index) => {
    if (index > 0) {
      pdf.addPage();
    }

    switch (page.type) {
      case 'cover':
        renderCoverPage(pdf, catalogTitle, pageWidth, pageHeight, margin);
        break;
      case 'category':
        renderCategoryPage(pdf, page.content, pageWidth, pageHeight, margin, contentWidth);
        break;
      case 'product':
        renderProductPage(pdf, page.content, pageWidth, pageHeight, margin, contentWidth);
        break;
      case 'table':
        renderTablePage(pdf, page.content, pageWidth, pageHeight, margin, contentWidth);
        break;
    }

    // Add page number
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(
      `${index + 1} / ${pages.length}`,
      pageWidth - margin - 20,
      pageHeight - margin + 5
    );
  });

  // Save the PDF
  const fileName = `${catalogTitle.replace(/\s+/g, '_')}_2025.pdf`;
  pdf.save(fileName);
};

const renderCoverPage = (
  pdf: jsPDF,
  catalogTitle: string,
  pageWidth: number,
  pageHeight: number,
  margin: number
) => {
  // Background color
  pdf.setFillColor(10, 25, 41);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Logo
  pdf.setFontSize(48);
  pdf.setTextColor(212, 175, 55);
  pdf.setFont('helvetica', 'bold');
  const logoText = 'STSC';
  const logoWidth = pdf.getTextWidth(logoText);
  pdf.text(logoText, (pageWidth - logoWidth) / 2, pageHeight / 2 - 60);

  // Title
  pdf.setFontSize(24);
  pdf.setTextColor(212, 175, 55);
  const titleLines = pdf.splitTextToSize(catalogTitle, pageWidth - (margin * 2));
  let yPos = pageHeight / 2 - 20;
  titleLines.forEach((line: string) => {
    const textWidth = pdf.getTextWidth(line);
    pdf.text(line, (pageWidth - textWidth) / 2, yPos);
    yPos += 15;
  });

  // Year
  pdf.setFontSize(18);
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'normal');
  pdf.text('2025', pageWidth / 2, yPos + 20, { align: 'center' });

  // Company info
  pdf.setFontSize(14);
  pdf.setTextColor(255, 255, 255);
  pdf.text('Sri Tirumala Sales Corporation', pageWidth / 2, pageHeight - 60, { align: 'center' });
  pdf.text('Your Trusted Hardware Partner', pageWidth / 2, pageHeight - 45, { align: 'center' });
};

const renderCategoryPage = (
  pdf: jsPDF,
  content: any,
  pageWidth: number,
  pageHeight: number,
  margin: number,
  contentWidth: number
) => {
  let yPos = margin + 20;

  // Title
  pdf.setFontSize(20);
  pdf.setTextColor(30, 58, 95);
  pdf.setFont('helvetica', 'bold');
  const titleLines = pdf.splitTextToSize(content.title, contentWidth);
  titleLines.forEach((line: string) => {
    pdf.text(line, margin, yPos);
    yPos += 10;
  });

  yPos += 5;

  // Divider
  pdf.setDrawColor(212, 175, 55);
  pdf.setLineWidth(1);
  pdf.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 15;

  // Description
  pdf.setFontSize(11);
  pdf.setTextColor(50, 50, 50);
  pdf.setFont('helvetica', 'normal');
  const descLines = pdf.splitTextToSize(content.description, contentWidth);
  descLines.forEach((line: string) => {
    pdf.text(line, margin, yPos);
    yPos += 6;
  });

  yPos += 10;

  // Products preview (2 columns)
  if (content.products && content.products.length > 0) {
    const products = content.products.slice(0, 6);
    const colWidth = (contentWidth - 10) / 2;
    let col = 0;
    let rowY = yPos;

    products.forEach((product: any, idx: number) => {
      if (idx > 0 && idx % 2 === 0) {
        col = 0;
        rowY += 35;
      }

      const xPos = margin + (col * (colWidth + 10));

      // Product box
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.rect(xPos, rowY, colWidth, 30);

      // Product icon/name
      pdf.setFontSize(10);
      pdf.setTextColor(30, 58, 95);
      pdf.setFont('helvetica', 'bold');
      const nameLines = pdf.splitTextToSize(product.name, colWidth - 4);
      pdf.text(nameLines[0], xPos + 2, rowY + 8);

      col++;
    });
  }
};

const renderProductPage = (
  pdf: jsPDF,
  content: any,
  pageWidth: number,
  pageHeight: number,
  margin: number,
  contentWidth: number
) => {
  let yPos = margin + 15;

  // Category header
  pdf.setFontSize(16);
  pdf.setTextColor(30, 58, 95);
  pdf.setFont('helvetica', 'bold');
  pdf.text(content.category, margin, yPos);
  yPos += 10;

  // Divider
  pdf.setDrawColor(212, 175, 55);
  pdf.setLineWidth(1);
  pdf.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 15;

  // Products (2 per page)
  if (content.products && content.products.length > 0) {
    content.products.forEach((product: any) => {
      if (yPos > pageHeight - margin - 60) {
        pdf.addPage();
        yPos = margin + 15;
      }

      // Product card border
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.rect(margin, yPos, contentWidth, 50);

      // Product name
      pdf.setFontSize(12);
      pdf.setTextColor(30, 58, 95);
      pdf.setFont('helvetica', 'bold');
      pdf.text(product.name, margin + 3, yPos + 8);

      // Product code
      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Code: ${product.code}`, margin + 3, yPos + 15);

      // Specs
      pdf.setFontSize(9);
      pdf.setTextColor(50, 50, 50);
      pdf.text(product.specs, margin + 3, yPos + 22);

      // Price
      pdf.setFontSize(14);
      pdf.setTextColor(212, 175, 55);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`₹${product.price}`, margin + 3, yPos + 32);

      // Description
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.setFont('helvetica', 'normal');
      const descLines = pdf.splitTextToSize(product.description, contentWidth - 6);
      pdf.text(descLines[0], margin + 3, yPos + 40);

      yPos += 60;
    });
  }
};

const renderTablePage = (
  pdf: jsPDF,
  content: any,
  pageWidth: number,
  pageHeight: number,
  margin: number,
  contentWidth: number
) => {
  let yPos = margin + 15;

  // Title
  pdf.setFontSize(16);
  pdf.setTextColor(30, 58, 95);
  pdf.setFont('helvetica', 'bold');
  pdf.text(content.title, margin, yPos);
  yPos += 15;

  // Table header
  pdf.setFillColor(10, 25, 41);
  pdf.rect(margin, yPos, contentWidth, 10, 'F');

  pdf.setFontSize(9);
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  
  const colWidths = [30, 60, 40, 30, 20];
  const headers = ['Code', 'Product Name', 'Size/Variant', 'Price', 'Stock'];
  let xPos = margin + 2;

  headers.forEach((header, idx) => {
    pdf.text(header, xPos, yPos + 7);
    xPos += colWidths[idx];
  });

  yPos += 12;

  // Table rows
  pdf.setFontSize(8);
  pdf.setTextColor(50, 50, 50);
  pdf.setFont('helvetica', 'normal');

  content.items.forEach((item: any, idx: number) => {
    if (yPos > pageHeight - margin - 15) {
      pdf.addPage();
      yPos = margin + 15;
    }

    // Alternate row color
    if (idx % 2 === 0) {
      pdf.setFillColor(245, 245, 245);
      pdf.rect(margin, yPos - 3, contentWidth, 8, 'F');
    }

    xPos = margin + 2;
    const rowData = [item.code, item.name, item.size, `₹${item.price}`, item.stock];

    rowData.forEach((data, dataIdx) => {
      const textLines = pdf.splitTextToSize(data, colWidths[dataIdx] - 2);
      pdf.text(textLines[0], xPos, yPos);
      xPos += colWidths[dataIdx];
    });

    yPos += 10;
  });
};

