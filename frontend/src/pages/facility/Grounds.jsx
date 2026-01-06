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
    capacity: 200,
    price: 15000,
    image: outdoorImg,
  },
  {
    id: 3,
    name: "Basketball Pitch",
    capacity: 200,
    price: 15000,
    image: basketballImg,
  },
  {
    id: 2,
    name: "Conference/Meeting Room",
    capacity: 50,
    price: 5000,
    image: conferenceImg,
  },
  {
    id: 2,
    name: "Birthday/Banquet Hall",
    capacity: 50,
    price: 5000,
    image: conferenceImg,
  },
];

export default function GroundsFacility() {
  const [showModal, setShowModal] = useState(false);
  const [selectedGround, setSelectedGround] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: "Full-Day",
    resources: [],
    message: "",
  });

  const timeSlots = ["Hourly", "Half-Day", "Full-Day", "Multi-Day"];
  const resourcesAvailable = ["Projector", "Chairs", "PA System", "Tables"];

  const openModal = (ground) => {
    setSelectedGround(ground);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGround(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      timeSlot: "Full-Day",
      resources: [],
      message: "",
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        resources: checked
          ? [...prev.resources, value]
          : prev.resources.filter((r) => r !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `Booking Confirmed!
Ground: ${selectedGround.name}
Name: ${formData.name}
Date: ${formData.date}
Time Slot: ${formData.timeSlot}`
    );

    // TODO: Backend integration + conflict detection
    closeModal();
  };

  return (
    <div className="facility-page">
      <h1>Event Grounds & Venues</h1>

      {/* ===== GROUNDS CARDS ===== */}
      <div className="cards-grid">
        {grounds.map((ground) => (
          <div key={ground.id} className="facility-card">
            <img src={ground.image} alt={ground.name} />
            <h3>{ground.name}</h3>
            <p>Capacity: {ground.capacity} people</p>
            <p className="price">KES {ground.price.toLocaleString()}</p>
            <button className="card-btn" onClick={() => openModal(ground)}>
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Book {selectedGround.name}</h2>

            <form onSubmit={handleSubmit} className="booking-form">
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Phone
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Date
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Time Slot
                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                >
                  {timeSlots.map((slot) => (
                    <option key={slot}>{slot}</option>
                  ))}
                </select>
              </label>

              <fieldset>
                <legend>Resources</legend>
                {resourcesAvailable.map((r) => (
                  <label key={r}>
                    <input
                      type="checkbox"
                      value={r}
                      checked={formData.resources.includes(r)}
                      onChange={handleChange}
                    />
                    {r}
                  </label>
                ))}
              </fieldset>

              <label>
                Additional Notes
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </label>

              <div className="modal-actions">
                <button type="submit" className="card-btn">
                  Submit Booking
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
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
