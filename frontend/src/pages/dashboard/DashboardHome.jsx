import { useNavigate } from "react-router-dom";
import SidebarLayout from "../../shared/Sidebar";
import Footer from "../../shared/Footer";
import "../../index.css"; 
import image3 from "../../assets/images/image 3.jpg";
import image8 from "../../assets/images/image 8.jpg";

export default function DashboardHome() {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      image: image8,
      title: "Grounds",
      description: (
        <ul>
          <li>Outdoor/Graduation events/Wedding receptions: KES 25,000 with Caution Money of KES 10,000</li>
          <li>Conference/Meeting rooms: KES 5,000</li>
          <li>Basketball pitch events: KES 15,000</li>
        </ul>
      ),
      link: "/facility/grounds",
    },
    {
      id: 2,
      image: image3,
      title: "Accommodation",
      description: (
        <ul>
          <li>Dorm-Style Bunk Beds: KES 500 per person per night</li>
          <li>Standard Twin Room: KES 1,500</li>
          <li>Furnished Suite: KES 2,500</li>
        </ul>
      ),
      link: "/facility/accommodation",
    },
  ];

  return (
    <SidebarLayout>
      <div className="facility-page">
        <h1>Dashboard</h1>

        <div className="cards-grid">
          {cards.map((card) => (
            <div key={card.id} className="facility-card">
              <img src={card.image} alt={card.title} />
              <h3>{card.title}</h3>
              <div className="card-description">{card.description}</div>
              <button
                className="card-btn"
                onClick={() => navigate(card.link)}
              >
                View & Book
              </button>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </SidebarLayout>
  );
}
