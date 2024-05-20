import React from "react";
import CardItem from "../../common/CardItem";
import "../../styles/Cards.css";

function Cards() {
  return (
    <div className="p-16 bg-gray-800">
      <h1 className="text-center">Our services!</h1>
      {/* card wrapping container */}
      <div className="cards__container flex items-center max-w-[1120px] w-[90%] mx-auto my-0">
        <div className="relative mt-[50px] mb-[45px] mx-0">
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
          <ul className="cards__items ">
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
