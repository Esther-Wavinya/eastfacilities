import { useState } from "react";

export default function GroundsFacility() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Graduation",
    venue: "Outdoor Grounds",
    date: "",
    timeSlot: "Full-Day",
    resources: [],
    message: "",
  });

  const venues = [
    { name: "Outdoor Grounds", capacity: 200 },
    { name: "Conference Room", capacity: 50 },
    { name: "Banquet Hall", capacity: 50 },
  ];

  const timeSlots = ["Hourly", "Half-Day", "Full-Day", "Multi-Day"];
  const resourcesAvailable = ["Projector", "Chairs", "PA System", "Tables"];

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
      `Booking submitted!\nName: ${formData.name}\nVenue: ${formData.venue}\nDate: ${formData.date}\nTime: ${formData.timeSlot}`
    );
    // TODO: connect to backend/API to save booking and detect conflicts
  };

  return (
    <div className="facility-page">
      <h1>Custom Event Spaces</h1>

      <p>Select from halls, conference rooms, or outdoor venues. Each venue has its own capacity and layout.</p>

      <h2>Booking Options</h2>
      <ul>
        <li>Multiple booking formats – hourly, half-day, full-day, multi-day.</li>
        <li>Resource allocation – assign projectors, chairs, tables, PA system.</li>
      </ul>

      <h2>Book Your Event</h2>
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
          Event Type:
          <select name="eventType" value={formData.eventType} onChange={handleChange}>
            <option>Graduation</option>
            <option>Birthday</option>
            <option>Wedding</option>
            <option>Conference</option>
            <option>Team Building</option>
            <option>Basketball Pitch</option>
            <option>Corporate Event</option>
          </select>
        </label>

        <label>
          Venue:
          <select name="venue" value={formData.venue} onChange={handleChange}>
            {venues.map((v) => (
              <option key={v.name} value={v.name}>
                {v.name} (Capacity: {v.capacity})
              </option>
            ))}
          </select>
        </label>

        <label>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>

        <label>
          Time Slot:
          <select name="timeSlot" value={formData.timeSlot} onChange={handleChange}>
            {timeSlots.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>

        <fieldset>
          <legend>Select Resources:</legend>
          {resourcesAvailable.map((r) => (
            <label key={r}>
              <input
                type="checkbox"
                name="resources"
                value={r}
                checked={formData.resources.includes(r)}
                onChange={handleChange}
              />
              {r}
            </label>
          ))}
        </fieldset>

        <label>
          Additional Notes:
          <textarea name="message" value={formData.message} onChange={handleChange} />
        </label>

        <button type="submit" className="card-btn">Submit Booking</button>
      </form>
    </div>
  );
}
