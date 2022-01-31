import { useState } from "react";
import { useEffect } from "react";
import shipPort from "./ShipPort";
import React from "react";

const AddShip = (props) => {
  const onAdd = props.onAdd;
  const [name, setName] = useState("");
  const [displacement, setDisplacement] = useState("");

  const add = (evt) => {
    onAdd({
      name,
      displacement,
    });
  };

  return (
    <div>
      <h4>Add a new Ship</h4>
      <div>
        <input
          type="text"
          placeholder="title"
          onChange={(event) => setName(event.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Displacement"
          onChange={(event) => setDisplacement(event.target.value)}
        ></input>
        <div>
          <input type="button" value="Submit Values" onClick={add}></input>
        </div>
      </div>
    </div>
  );
};

export default AddShip;
