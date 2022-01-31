import React from "react";
import shipPort from "./ShipPort";
import { useState } from "react";
import { useEffect } from "react";
const CrewMember = (props) => {
  const { itemShip, itemCrew, onDeleteCrew, onSaveCrew } = props;
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(itemCrew.name);
  const [role, setRole] = useState(itemCrew.role);
  useEffect(() => {}, []);
  const deleteCrew = (evt) => {
    debugger;
    onDeleteCrew(itemShip, itemCrew.id);
  };
  const saveCrew = (evt) => {
    debugger;
    onSaveCrew(
      itemShip,
      {
        name,
        role,
      },
      itemCrew.id
    );
    setIsEditing(false);
  };

  const editCrew = () => {
    setIsEditing(true);
  };

  const cancel = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          Crewmembers:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
          with role
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
          <input type="button" value={"save"} onClick={saveCrew} />
          <input type="button" value={"cancel"} onClick={cancel} />
        </div>
      ) : (
        <div>
          Crew Member: <span>{itemCrew.name}</span>
          Role: <span>{itemCrew.role}</span>
          <input type="button" value={"delete"} onClick={deleteCrew} />
          <input type="button" value={"edit"} onClick={editCrew} />
        </div>
      )}
    </div>
  );
};

export default CrewMember;
