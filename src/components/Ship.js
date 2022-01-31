import { useEffect, useState } from "react";

function Ship(props) {
  const { item, onDelete, onEdit, onSelect } = props;
  const [name, setName] = useState();
  const [displacement, setDisplacement] = useState();
const isFiltered=props.isFiltered;
  const [isEditing, setIsEditing] = useState(false);

  const deleteShip = (evt) => {
    onDelete(item.id);
  };
  const saveShip = (evt) => {
    onEdit(item.id, {
      name,
      displacement,
    });
    setIsEditing(false);
  };

  const edit = () => {
    setIsEditing(true);
  };

  const cancel = () => {
    setIsEditing(false);
  };

  const details = () => {
    onSelect(item.id);
  };

  return (
    <div style={{ backgroundColor: "lightblue" }}>
      {isEditing ? (
        <div>
          Ship name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
          Displacement:
          <input
            type="text"
            value={displacement}
            onChange={(event) => setDisplacement(event.target.value)}
          ></input>
          <input type="button" value={"save"} onClick={saveShip} />
          <input type="button" value={"cancel"} onClick={cancel} />
        </div>
      ) : (
        <div>
          Ship id:{item.id}
          Ship name :{item.name}
          Ship displacement: {item.displacement}
          <input type="button" value={"delete"} onClick={deleteShip} />
          <input type="button" value={"edit"} onClick={edit} />
          <input type="button" value={"details"} onClick={details} />
        </div>
      )}
    </div>
  );
}

export default Ship;
