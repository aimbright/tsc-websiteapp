import './Contact.css';

const Contact = () => {
  const phoneNumber = '+919876543210';
  const whatsappNumber = '+919876543210';
  const email = 'info@sritirumalasales.com';
  const address = 'Your Business Address, City, State, PIN Code';
  const whatsappMessage = encodeURIComponent('Hello! I would like to know more about your products.');

  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with us for your wholesale hardware needs</p>
        </div>
      </section>

      <section className="contact-content section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p className="contact-intro">
                We're here to help! Reach out to us for bulk orders, product inquiries, 
                or any questions about our services.
              </p>

              <div className="contact-methods">
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-details">
                    <h3>Phone</h3>
                    <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">💬</div>
                  <div className="contact-details">
                    <h3>WhatsApp</h3>
                    <a 
                      href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {whatsappNumber}
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div className="contact-details">
                    <h3>Email</h3>
                    <a href={`mailto:${email}`}>{email}</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-details">
                    <h3>Address</h3>
                    <p>{address}</p>
                  </div>
                </div>
              </div>

              <div className="contact-cta">
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button whatsapp-button"
                >
                  💬 Chat on WhatsApp
                </a>
                <a href={`tel:${phoneNumber}`} className="cta-button call-button">
                  📞 Call Now
                </a>
              </div>
            </div>

            <div className="contact-map">
              <h2>Find Us</h2>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.1234567890123!2d72.8776559!3d19.0759837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjUiTiA3MsKwNTInMzkuNiJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '15px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Business Location"
                ></iframe>
              </div>
              <p className="map-note">
                * Please update the Google Maps embed URL with your actual business location
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

