import dormImage from "../../assets/images/bedroom 1.jpg";
import twinImage from "../../assets/images/bedroom 3.jpg";
import suiteImage from "../../assets/images/bedroom 4.jpg";
import { useState } from "react";
import SidebarLayout from "../../shared/Sidebar";
import Footer from "../../shared/Footer";
import "../../index.css"; 

export default function Accommodation() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Booking Confirmed!\nRoom: ${selectedRoom}\nName: ${formData.name}\nCheck-In: ${formData.checkIn}\nCheck-Out: ${formData.checkOut}`
    );
    setModalOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      message: "",
    });
  };

  const openModal = (roomType) => {
    setSelectedRoom(roomType);
    setModalOpen(true);
  };

  const cards = [
    {
      id: 1,
      image: dormImage,
      title: "Dorm-Style Bunk Beds",
      description: "Common bathroom and toilet facilities",
      roomType: "Dorm-Style Bunk Beds",
      amount: "KES 500 per person per night",
    },
    {
      id: 2,
      image: twinImage,
      title: "Standard Twin Room",
      description: "Private bathroom and toilet inside the room",
      roomType: "Standard Twin Room",
      amount: "KES 1,500 per night",
    },
    {
      id: 3,
      image: suiteImage,
      title: "Furnished Suite",
      description: "Fully furnished with private washrooms",
      roomType: "Furnished Suite",
      amount: "KES 2,500 per night",
    },
  ];

  return (
    <SidebarLayout>
      <div className="facility-page">
        <h1>Accommodation Options</h1>

        {/* ===== 3x3 GRID ===== */}
        <div className="cards-grid">
          {cards.map((card) => (
            <div key={card.id} className="facility-card">
              <img src={card.image} alt={card.title} />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <p className="price">{card.amount}</p>
              <button className="card-btn" onClick={() => openModal(card.roomType)}>
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* ===== MODAL ===== */}
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
      </div>
    </SidebarLayout>
  );
}