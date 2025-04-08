import { Link, useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const services = [
    { id: "BirthdayPlanning", url: "/img/101-Of-Planning-An-Unforgettable-Kids-Birthday-Party.avif", title: "Birthday Planning" },
    { id: "AnniversaryPlanning", url: "https://cdn.cherishx.com/uploads/1638354920_large.jpg", title: "Anniversary Planning" },
    { id: "CampingTripPlanning", url: "https://images.squarespace-cdn.com/content/v1/61c342ed9e6b627e0357fe0a/e661ab62-d95c-4dea-9525-f3b1838e81ae/05-21_BounceBox_NaturePhotos_001-47.jpg", title: "Camping Trip Planning" },
    { id: "GameNightPlanning", url: "https://i0.wp.com/shystrangemanic.com/wp-content/uploads/2019/10/games.jpg?resize=1024%2C633", title: "Game Night Planning" },
    { id: "PartyPlanning", url: "/img/images.jpg", title: "Party Planning" },
    { id: "WeddingPlanning", url: "https://cdn0.weddingwire.in/vendor/5192/3_2/960/jpg/rk-decor_15_295192-159047117373584.jpeg", title: "Wedding Planning" },
    { id: "BabyShowerPlanning", url: "/img/baby-shower-planning-service-500x500.webp", title: "Baby Shower Planning" },
    { id: "CorporateEventPlanning", url: "/img/corporate-events.jpg", title: "Corporate Event Planning" },
    { id: "FestivalCelebrationPlanning", url: "/img/The-Park-Hotel-in-Kolkata.jpg", title: "Festival Celebration Planning" },
    { id: "CharityEventPlanning", url: "/img/iStock-540095978-1024x683.jpg", title: "Charity Event Planning" },
    { id: "SportsEventPlanning", url: "/img/images (1).jpg", title: "Sports Event Planning" },
    { id: "GraduationPartyPlanning", url: "/img/planning-a-graduation-party.webp", title: "Graduation Party Planning" },
  ];

  const containerStyle = {
    padding: "20px",
    maxWidth: "1500px",
    margin: "0 auto",
  };

  const bannerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", 
    gap: "50px",
  };

  const itemStyle = {
    backgroundColor: "rgb(191, 192, 181)",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.3s ease-in-out",
    padding: "0px",
  };

  const imgStyle = {
    width: "100%",
    borderRadius: "10px",
    height: "300px",
    objectFit: "cover",
    marginBottom: "10px",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: " #333",
    marginBottom: "15px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: " rgb(98, 73, 71)",
    color: " #fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", fontSize: "32px", marginBottom: "20px" }}>OUR SERVICES</h2>
      <div style={bannerStyle}>
        {services.map((service) => (
          <div
            style={itemStyle}
            key={service.id}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src={service.url} alt={service.title} style={imgStyle} />
            <h3 style={titleStyle}>{service.title}</h3>
            <button
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#ff4b2b")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#661b2c")}
              onClick={() => navigate(`/service/${service.id}`)}
            >
              Create Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;