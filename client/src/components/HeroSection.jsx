import { useNavigate } from "react-router-dom";



const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <img
        src="https://assets.cntraveller.in/photos/63d8e5103d7229d4cf308f01/16:9/w_1024%2Cc_limit/Prequel-lead.jpg"
        alt="restaurant"
      />
      <div className="item">
        <h3>Event Plan Maker</h3>
        <div>
        <h1>Your Personal Plan Maker</h1>
        <p>Crafting unforgettable moments! Where dreams transform into unforgettable experiences </p>
          <button onClick={() => navigate("/services")}>Create Now!</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
