import { EventEmitter } from "fbemitter";
const SERVER = "http://localhost:8081";

class ShipPort {
  constructor() {
    this.data = [];
    this.emitter = new EventEmitter();
  }

  async getShips() {
    try {
      const response = await fetch(`${SERVER}/ships`);
      if (!response.ok) {
        throw response;
      }
      this.data = await response.json();
      this.emitter.emit("GET_SHIPS_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("GET_SHIPS_ERROR");
    }
  }

  async getRoles() {
    try {
      const response = await fetch(`${SERVER}/roles`);
      if (!response.ok) {
        throw response;
      }
      this.data = await response.json();
      this.emitter.emit("GET_ROLES_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("GET_ROLES_ERROR");
    }
  }

  async getShip(id) {
    try {
      const response = await fetch(`${SERVER}/ships/${id}`);
      if (!response.ok) {
        throw response;
      }
      this.data = await response.json();
      this.emitter.emit("GET_SHIP_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("GET_SHIP_ERROR");
    }
  }

  async getShipsByName(name) {
    try {
      const response = await fetch(`${SERVER}/shipsFilter/${name}`);
      if (!response.ok) {
        throw response;
      }
      this.data = await response.json();
      this.emitter.emit("GET_SHIP_FILTERED_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("GET_SHIP_FILTERED_ERROR");
    }
  }
  async getShipsByDisplacement(displacement) {
    try {
      debugger;
      const response = await fetch(
        `${SERVER}/displacementFilter/${displacement}`
      );
      if (!response.ok) {
        throw response;
      }
      this.data = await response.json();
      this.emitter.emit("GET_SHIP_DISP_FILTERED_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("GET_SHIP_DISP_FILTERED_ERROR");
    }
  }
  async getOrderedShips() {
    try {
      debugger;
      const response = await fetch(
        `${SERVER}/shipsSorted/`
      );
      if (!response.ok) {
        throw response;
      }
      this.data = await response.json();
      this.emitter.emit("GET_SHIPS_ORDERED_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("GET_SHIPS_ORDERED_ERROR");
    }
  }
  async addShip(ship) {
    try {
      const response = await fetch(`${SERVER}/ships`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ship),
      });
      if (!response.ok) {
        throw response;
      }
      this.getShips();
    } catch (err) {
      console.warn(err);
      this.emitter.emit("ADD_SHIP_ERROR");
    }
  }

  async editShip(id, movie) {
    try {
      const response = await fetch(`${SERVER}/ships/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });
      if (!response.ok) {
        throw response;
      }
      this.getShips();
    } catch (err) {
      console.warn(err);
      this.emitter.emit("UPDATE_SHIP_ERROR");
    }
  }

  async deleteShip(id) {
    try {
      const response = await fetch(`${SERVER}/ships/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw response;
      }
      this.getShips();
    } catch (err) {
      console.warn(err);
      this.emitter.emit("DELETE_SHIP_ERROR");
    }
  }

  //-------------------- CREWMEMBERS--------------------
  async getCrewmembers(shipId) {
    try {
      const response = await fetch(`${SERVER}/ships/${shipId}/crewmembers`);
      if (!response.ok) {
        throw response;
      }

      this.data = await response.json();
      this.emitter.emit("GET_CREW_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("GET_CREW_ERROR");
    }
  }

  async getCrewmember(shipId, crewId) {
    try {
      const response = await fetch(
        `${SERVER}/ships/${shipId}/crewmembers/${crewId}`
      );
      if (!response.ok) {
        throw response;
      }
      this.data = await response.json();
      this.emitter.emit("GET_CREW_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("GET_CREW_ERROR");
    }
  }

  async addCrew(shipId, crewmember) {
    try {
      const response = await fetch(`${SERVER}/ships/${shipId}/crewmembers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(crewmember),
      });
      if (!response.ok) {
        throw response;
      }
      this.getCrewmembers(shipId);
    } catch (err) {
      console.warn(err);
      this.emitter.emit("ADD_CREW_ERROR");
    }
  }

  async editCrew(shipId, crewmember, crewId) {
    try {
      const response = await fetch(
        `${SERVER}/ships/${shipId}/crewmembers/${crewId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(crewmember),
        }
      );
      if (!response.ok) {
        throw response;
      }
      this.getCrewmembers(shipId);
    } catch (err) {
      console.warn(err);
      this.emitter.emit("UPDATE_CREW_ERROR");
    }
  }

  async deleteCrew(shipId, crewId) {
    try {
      const response = await fetch(
        `${SERVER}/ships/${shipId}/crewmembers/${crewId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw response;
      }

      this.getCrewmembers(shipId);
    } catch (err) {
      console.warn(err);
      this.emitter.emit("DELETE_CREW_ERROR");
    }
  }
}

const shipPort = new ShipPort();
export default shipPort;
