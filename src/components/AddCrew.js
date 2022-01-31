import React from "react";
import shipPort from "./ShipPort";
import { useState } from "react";
const AddCrew = (props) => {
  const { onAdd, idShip } = props;
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const add = (evt) => {
    onAdd(idShip, {
      name,
      role,
    });
  };

  return (
    <div>
      <h3>Add new crewmember</h3>
      <div>
        <input
          type="text"
          placeholder="name"
          onChange={(event) => setName(event.target.value)}
        ></input>
      </div>
      <div></div>
      <div>
        <label> CAPTAIN</label>
        <input
          type="radio"
          value="CAPTAIN"
          name="CAPTAIN"
          id="CAPTAIN"
          onClick={(evt) => {
            setRole(document.getElementById("CAPTAIN").value);
          }}
        />
        <label>BOATSWAIN</label>
        <input
          type="radio"
          value="BOATSWAIN"
          name="BOATSWAIN"
          id="BOATSWAIN"
          onClick={(evt) => {
            setRole(document.getElementById("BOATSWAIN").value);
          }}
        />
      </div>
      <div>
        <input type="button" value="add me!" onClick={add}></input>
      </div>
    </div>
  );
};

export default AddCrew;
