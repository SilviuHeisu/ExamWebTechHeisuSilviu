import React from "react";

const SimpleShip = (props) => {
  debugger;
  const item = props.item;
  return (
    <div>
      Ship id:{item.id}
      Ship name :{item.name}
      Ship displacement: {item.displacement}
    </div>
  );
};

export default SimpleShip;
