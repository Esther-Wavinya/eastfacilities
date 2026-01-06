import dormImage from "../../assets/images/bedroom1.jpg";
import twinImage from "../../assets/images/bedroom2.jpg";
import suiteImage from "../../assets/images/bedroom3.jpg";
import { useState } from "react";
import SidebarLayout from "../../shared/Sidebar";
import Footer from "../../shared/Footer";
import "../../index.css"; 
import image8 from "../../assets/images/image 8.jpg"; // Grounds


export default function DashboardHome() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roomType: "",
    checkIn: "",
    checkOut: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking submitted!\nName: ${formData.name}\nRoom: ${formData.roomType}\nCheck-In: ${formData.checkIn}`);
    setModalOpen(false);
  };

  const openModal = (roomType) => {
    setSelectedRoom(roomType);
    setFormData({ ...formData, roomType });
    setModalOpen(true);
  };

  const cards = [
    {
      id: 1,
      image: image8,
      title: "Grounds",
      description: (
        <ul>
          <li>Outdoor/Graduation events/Wedding receptions: KES 25,000 + Caution Money KES 10,000</li>
          <li>Conference/Meeting rooms: KES 5,000</li>
          <li>Basketball pitch events: KES 15,000</li>
        </ul>
      ),
      link: "/facility/grounds",
    },
    {
      id: 2,
      image: dormImage,
      title: "Dorm-Style Bunk Beds",
      description: "KES 500 per person per night",
      roomType: "Dorm-Style Bunk Beds",
    },
    {
      id: 3,
      image: twinImage,
      title: "Standard Twin Room",
      description: "KES 1,500 per night",
      roomType: "Standard Twin Room",
    },
    {
      id: 4,
      image: suiteImage,
      title: "Furnished Suite",
      description: "KES 2,500 per night",
      roomType: "Furnished Suite",
    },
  ];

  return (
    <SidebarLayout>
      <div className="card-grid">
        {cards.map((card) => (
          <div key={card.id} className="custom-card">
            <img src={card.image} alt={card.title} className="card-image" />
            <div className="card-body">
              <h3 className="card-title">{card.title}</h3>
              <div className="card-description">{card.description}</div>
              <div className="card-footer">
                {card.roomType ? (
                  <button className="card-btn" onClick={() => openModal(card.roomType)}>Book Now</button>
                ) : (
                  <a href={card.link}>
                    <button className="card-btn">Book Now</button>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for booking form */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Book {selectedRoom}</h2>
            <form onSubmit={handleSubmit} className="booking-form">
              <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </label>
              <label>
                Phone:
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </label>
              <label>
                Check-In:
                <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required />
              </label>
              <label>
                Check-Out:
                <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} required />
              </label>
              <label>
                Additional Notes:
                <textarea name="message" value={formData.message} onChange={handleChange} />
              </label>
              <div className="modal-buttons">
                <button type="submit" className="card-btn">Submit Booking</button>
                <button type="button" className="card-btn cancel" onClick={() => setModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </SidebarLayout>
  );
}
