import { useState } from "react";

// ✅ IMPORT IMAGES
import outdoorImg from "../../assets/images/image 1.jpg";
import conferenceImg from "../../assets/images/image 2.jpg";
import basketballImg from "../../assets/images/image 3.jpg";

const grounds = [
  {
    id: 1,
    name: "Graduation Grounds",
    capacity: 200,
    price: 25000,
    image: outdoorImg,
  },
  {
    id: 2,
    name: "Wedding Reception Grounds",
    capacity: 200,
    price: 25000,
    image: outdoorImg,
  },
  {
    id: 3,
    name: "Teambuilding Grounds",
    capacity: 150,
    price: 15000,
    image: outdoorImg,
  },
  {
    id: 4,
    name: "Basketball Pitch",
    capacity: 100,
    price: 15000,
    image: basketballImg,
  },
  {
    id: 5,
    name: "Conference / Meeting Room",
    capacity: 50,
    price: 5000,
    image: conferenceImg,
  },
  {
    id: 6,
    name: "Birthday / Banquet Hall",
    capacity: 80,
    price: 5000,
    image: conferenceImg,
  },
];

export default function GroundsFacility() {
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

  const openModal = (groundName) => {
    setSelectedRoom(groundName);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`
Booking Confirmed!
Facility: ${selectedRoom}
Name: ${formData.name}
Check-In: ${formData.checkIn}
Check-Out: ${formData.checkOut}
    `);

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

  return (
    <div className="facility-page">
      <h1>Event Grounds & Venues</h1>

      {/* ===== 3 × 3 GRID ===== */}
      <div className="cards-grid">
        {grounds.map((ground) => (
          <div key={ground.id} className="facility-card">
            <img src={ground.image} alt={ground.name} />
            <h3>{ground.name}</h3>
            <p>Capacity: {ground.capacity} people</p>
            <p className="price">KES {ground.price.toLocaleString()}</p>
            <button className="card-btn" onClick={() => openModal(ground.name)}>
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* ===== MODAL (USING YOUR FORM) ===== */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Book {selectedRoom}</h2>

            <form onSubmit={handleSubmit} className="booking-form">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Phone:
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Check-In:
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Check-Out:
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Additional Notes:
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </label>

              <div className="modal-buttons">
                <button type="submit" className="card-btn">
                  Submit Booking
                </button>
                <button
                  type="button"
                  className="card-btn cancel"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
