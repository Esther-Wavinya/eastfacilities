import { FaPhone, FaEnvelope } from "react-icons/fa";
import "../index.css"; // ensure footer styles are included

export default function Footer() {
  return (
    <footer className="custom-footer">
      <div className="footer-icons">
        <a href="tel:+254718142172" className="footer-btn phone">
          <FaPhone size={18} />
          <span>+254 718 142 172</span>
        </a>

        <a href="mailto:veronicah.wangui@east.ac.ke" className="footer-btn email">
          <FaEnvelope size={18} />
          <span>veronicah.wangui@east.ac.ke</span>
        </a>
      </div>
    </footer>
  );
}
