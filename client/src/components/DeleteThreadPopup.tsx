import React, { useState } from "react";
import Popup from "reactjs-popup";

const PopupModal = () => {
  const [close, toggleClose] = useState<boolean>(false);
  return (
    <Popup
      trigger={<button className=""> Delete </button>}
      position="right center"
    >
      {close && (
        <div className="modal">
          <button className="close" onClick={() => toggleClose(!close)}>
            &times;
          </button>
          <div className="header"> Modal Title </div>
          <div className="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a
            nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet
            quibusdam voluptates delectus doloremque, explicabo tempore dicta
            adipisci fugit amet dignissimos?
            <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur sit commodi beatae optio voluptatum sed eius cumque,
            delectus saepe repudiandae explicabo nemo nam libero ad, doloribus,
            voluptas rem alias. Vitae?
          </div>
          <div className="actions">
            <button
              className="button"
              onClick={() => {
                console.log("modal closed ");
                toggleClose(false);
              }}
            >
              close modal
            </button>
          </div>
        </div>
      )}
      ;
    </Popup>
  );
};

export default PopupModal;
