import React from "react";
import CardItem from "../../common/CardItem";
import "../../styles/Cards.css";

function Cards() {
  return (
    <div className="cards">
      <h1>Our services!</h1>
      {/* card wrapping container */}
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="/src/assets/images/img-1.jpeg"
              text="Kita doing the omurice thing1"
              label="kita1"
              path="/kita"
            />
            <CardItem
              src="/src/assets/images/img-2.jpeg"
              text="Kita doing the omurice thing1"
              label="kita1"
              path="/kita"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="/src/assets/images/img-3.jpeg"
              text="Kwaii"
              label="kita2"
              path="/kita"
            />
            <CardItem
              src="/src/assets/images/img-4.png"
              text="Kita doing the omurice thing1 kita"
              label="kita2"
              path="/kita"
            />
            <CardItem
              src="/src/assets/images/img-5.jpeg"
              text="Kita doing the omurice thing1"
              label="kita2"
              path="/kita"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
