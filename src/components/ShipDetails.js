import React, { useState } from "react";
import shipPort from "./ShipPort";
import { useEffect } from "react";
import axios from "axios";
import CrewMember from "./CrewMember";
import AddCrew from "./AddCrew";

const ShipDetails = (props) => {
  const id = props.id;
  const onCancel = props.onCancel;
  const [name, setName] = useState("");
  const [displacement, setDisplacement] = useState("");
  const [role, setRole] = useState("");
  const [crewMembers, setCrewmembers] = useState([]);
  const cancel = () => {
    onCancel();
  };

  const addCrew = (id, crewMember) => {
    shipPort.addCrew(id, crewMember);
  };

  const deleteCrew = (shipId, crewId) => {
    shipPort.deleteCrew(shipId, crewId);
  };

  const saveCrew = (shipId, crewMember, crewId) => {
    shipPort.editCrew(shipId, crewMember, crewId);
  };
  useEffect(() => {
    let path = `http://localhost:8081/ships/${props.id}`;
    axios.get(path).then((response) => {
      setName(response.data.name);
      setDisplacement(response.data.displacement);
      shipPort.getCrewmembers(props.id);
      shipPort.emitter.addListener("GET_CREW_SUCCESS", () => {
        setCrewmembers(shipPort.data);
      });
    });
  }, []);
  return (
    <div>
      Ship Details:Ship ID {id}
      <div>Name: {name}</div>
      <div>Displacement:{displacement}</div>
      <div>
        Crewmembers:
        {crewMembers.map((e) => (
          <CrewMember
            key={e.id}
            itemShip={id}
            itemCrew={e}
            onDeleteCrew={deleteCrew}
            onSaveCrew={saveCrew}
          ></CrewMember>
        ))}
      </div>
      <div>
        {" "}
        <button value="cancel" onClick={cancel}>
          Cancel{" "}
        </button>
      </div>
      <AddCrew onAdd={addCrew} idShip={id} />
    </div>
  );
};

export default ShipDetails;
