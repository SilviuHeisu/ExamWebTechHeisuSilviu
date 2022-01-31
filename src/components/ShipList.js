import { useEffect, useState } from "react";
import shipPort from "./ShipPort";
import Ship from "./Ship";
import ShipDetails from "./ShipDetails";
import AddShip from "./AddShip";
import SimpleShip from "./SimpleShip";
import "./ShipList.css";
function ShipList() {
  const [ships, setShips] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [filterName, setfilterName] = useState(false);
  const [filterDep, setFilterDep] = useState(false);
  const [filteredShips, setFilteredShips] = useState([]);
  const [doOrder, setDoOrder] = useState(false);
  const [orderedShips, setOrderedShips] = useState([]);
  const [filteredShipsDisp, setFilteredShipsDisp] = useState([]);
  const [displacement, setDisplacement] = useState(0);
  useEffect(() => {
    shipPort.getShips();
    shipPort.emitter.addListener("GET_SHIPS_SUCCESS", () => {
      setShips(shipPort.data);
    });
    shipPort.emitter.addListener("GET_SHIP_FILTERED_SUCCESS", () => {
      setFilteredShips(shipPort.data);
    });
    shipPort.emitter.addListener("GET_SHIP_DISP_FILTERED_SUCCESS", () => {
      setFilteredShipsDisp(shipPort.data);
    });
    shipPort.emitter.addListener("GET_SHIPS_ORDERED_SUCCESS", () => {
      setOrderedShips(shipPort.data);
    });
  }, []);

  const searchByName = (evt) => {
    setfilterName(true);
    shipPort.getShipsByName(name);
  };
  const addShip = (ship) => {
    shipPort.addShip(ship);
  };

  const deleteShip = (shipId) => {
    shipPort.deleteShip(shipId);
    debugger;
    if (filterName == true) {
      let filteredShipsUpdated = filteredShips.filter((e) => e.id !== shipId);
      setFilteredShips(filteredShipsUpdated);
    } else if (filterDep == true) {
      debugger;

      let filteredShipsUpdatedDisp = filteredShipsDisp.filter(
        (e) => e.id !== shipId
      );
      console.log(filteredShipsDisp);
      setFilteredShipsDisp(filteredShipsUpdatedDisp);
    }
  };
  const editShip = (shipId, ship) => {
    shipPort.editShip(shipId, ship);
  };
  const selectShip = (shipId) => {
    setCount(shipId);
    setIsSelected(true);
  };
  const order = () => {
    setDoOrder(true);
    shipPort.getOrderedShips();
  };
  const cancel = () => {
    setIsSelected(false);
  };
  const searchByDisplacement = (evt) => {
    setFilterDep(true);
    shipPort.getShipsByDisplacement(displacement);
  };
  return (
    <div className="container">
      <div style={{ backgroundColor: "cyan" }}>
        {isSelected ? (
          <div>
            <ShipDetails onCancel={cancel} id={count}></ShipDetails>
          </div>
        ) : (
          <div>
            <h4>Available Ships:</h4>
            <div className="container">
              <div className="first">
                {ships.map((e) => (
                  <Ship
                    key={e.id}
                    item={e}
                    onDelete={deleteShip}
                    onEdit={editShip}
                    onSelect={selectShip}
                  ></Ship>
                ))}
              </div>
              <div className="second">
                <AddShip onAdd={addShip}></AddShip>
              </div>
            </div>
            <h4>Filter Existing Ships by name:</h4>
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></input>
            <input
              type="button"
              value="Submit Name"
              onClick={searchByName}
            ></input>
            {filterName ? (
              <div>
                {filteredShips.map((e) => (
                  <Ship
                    isFiltered={true}
                    key={e.id}
                    item={e}
                    onDelete={deleteShip}
                    onEdit={editShip}
                    onSelect={selectShip}
                  ></Ship>
                ))}
              </div>
            ) : (
              <div></div>
            )}
            <h4>Filter Existing Ships by displacement:</h4>
            <input
              type="number"
              placeholder="name"
              value={displacement}
              onChange={(event) => {
                setDisplacement(event.target.value);
              }}
            ></input>
            <input
              type="button"
              value="Submit Displacement"
              onClick={searchByDisplacement}
            ></input>
            {filterDep ? (
              <div>
                {filteredShipsDisp.map((e) => (
                  <Ship
                    isFiltered={true}
                    key={e.id}
                    item={e}
                    onDelete={deleteShip}
                    onEdit={editShip}
                    onSelect={selectShip}
                  ></Ship>
                ))}
              </div>
            ) : (
              <div></div>
            )}
            <input
              type="button"
              value="Get Sorted Ships"
              onClick={order}
            ></input>
            {doOrder ? (
              <div>
                {orderedShips.map((e) => (
                  <SimpleShip key={e.id} item={e}></SimpleShip>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShipList;
