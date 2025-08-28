import SidebarLayout from "../../shared/Sidebar";
import Footer from "../../shared/Footer";
import "../../index.css"; 
import image3 from "../../assets/images/image 3.jpg";
import image8 from "../../assets/images/image 8.jpg";
import image12 from "../../assets/images/image 12.jpg";
import image14 from "../../assets/images/image 14.jpg";

export default function DashboardHome() {
  const cards = [
    {
      id: 1,
      image: image8,
      title: "Photoshoot",
      description: "Book open field for your photoshoot",
      amount: "KES 10,000",
    },
    {
      id: 2,
      image: image12,
      title: "Reception",
      description: "Book open grounds for your Reception, wedding, games, and Team building",
      amount: "KES 25,000",
    },
    {
      id: 3,
      image: image3,
      title: "Accommodation",
      description: "Book a room for accommodation",
      amount: "KES 25,000",
    },
    {
      id: 4,
      image: image14,
      title: "Conferences",
      description: "Book a hall for your Conference, meeting and indoor event",
      amount: "KES 25,000",
    },
  ];

  return (
    <>
      <SidebarLayout>
        <div className="card-grid">
          {cards.map((card) => (
            <div key={card.id} className="custom-card">
              <img src={card.image} alt={card.title} className="card-image" />
              <div className="card-body">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                <div className="card-footer">
                  <span className="card-amount">{card.amount}</span>
                  <button className="card-btn">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SidebarLayout>
      <Footer />
    </>
  );
}
