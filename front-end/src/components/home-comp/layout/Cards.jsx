import React from "react";
import CardItem from "../../common/CardItem";
import "../../styles/Cards.css";

function Cards() {
  return (
    <div className="p-16 bg-gray-800">
      <h1 className="flex justify-center text-3xl text-gray-100">Our services!</h1>
      {/* card wrapping container */}
      <div className="cards__container flex items-center max-w-[1120px] w-[90%] mx-auto my-0">
        <div className="relative mt-[50px] mb-[45px] mx-0">
          <ul className="cards__items">
            <CardItem
              src="/src/assets/images/create-event.png"
              text="Create events and allow others to book them"
              label="Create"
              path="/app/event-types"
            />
            <CardItem
              src="/src/assets/images/public-event.png"
              text="Check out events created by others"
              label="Public Page"
              path="/kita123"
            />
          </ul>
          <ul className="cards__items ">
            <CardItem
              src="/src/assets/images/create-booking.png"
              text="Set up your profile and start creating events"
              label="Profile"
              path="/app/bookings/"
            />
            <CardItem
              src="/src/assets/images/create-availability.png"
              text="Set up your availability and Working hours"
              label="Availability"
              path="/app/availability"
            />
            <CardItem
              src="/src/assets/images/google-calendar.png"
              text="Integrate your schedule with Google Calendar"
              label="Google Calendar"
              path="/kita"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
