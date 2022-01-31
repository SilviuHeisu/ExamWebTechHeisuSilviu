const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const cors = require("cors");
let countPagination = 0;
let limit = 2;
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sqlite/sample.db",
  define: {
    timestamps: false,
  },
});
const Ship = sequelize.define("ship", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoincrement: true,
  },
  name: {
    type: Sequelize.DataTypes.STRING,
    validate: {
      len: [3, 100],
    },
  },
  displacement: {
    type: Sequelize.DataTypes.INTEGER,
    validate: {
      min: 50,
    },
  },
});

const CrewMember = sequelize.define("crewmember", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoincrement: true,
  },
  name: {
    type: Sequelize.DataTypes.STRING,
    validate: {
      len: [5, 100],
    },
  },
  role: {
    type: Sequelize.DataTypes.ENUM("CAPTAIN", "BOATSMAIN"),
  },
});
Ship.hasMany(CrewMember);
const app = express();
app.use(express());
app.use(bodyParser.json());

app.get("/sync", async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    res.status(201).json({ message: "Tables created" });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error" });
  }
});

app.get("/ships", async (req, res) => {
  try {
    const ships = await Ship.findAll({});
    console.log(ships);
    res.status(200).json(ships);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error" });
  }
});

app.post("/ships", async (req, res) => {
  try {
    await Ship.create(req.body);
    res.status(201).json({ message: "created" });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error" });
  }
});
app.get("/ships/:shipId", async (req, res) => {
  try {
    const ship = await Ship.findByPk(req.params.shipId);
    if (ship) {
      res.status(200).json(ship);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error" });
  }
});

app.put("/ships/:shipId", async (req, res) => {
  try {
    const ship = await Ship.findByPk(req.params.shipId);
    if (ship) {
      await ship.update(req.body, { fields: ["name", "displacement"] });
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error" });
  }
});
app.delete("/ships/:shipId", async (req, res) => {
  try {
    const ship = await Ship.findByPk(req.params.shipId);
    if (ship) {
      await ship.destroy();
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error" });
  }
});
app.get("/moviesCategoryFilter/:category", async (req, res) => {
  try {
    const movies = await Movie.findAll({
      where: { category: req.params.category },
    });

    res.status(200).json(movies);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error" });
  }
});

app.get("/moviesFilter/:title", async (req, res) => {
  try {
    const movies = await Movie.findAll({
      where: { title: req.params.title },
    });

    res.status(200).json(movies);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error" });
  }
});

// sort alfabetic pe title
//   app.get("/moviesSorted", async (req, res) => {

//     try {
//       const movies = await Movie.findAll({
//           order:[['title', 'ASC']]

//       }).then((movies)=>{
//         res.status(200).json(movies);
//       })

//     } catch (err) {
//       console.warn(err);
//       res.status(500).json({ message: "some error" });
//     }
//   });

app.get("/moviesSort", async (req, res) => {
  try {
    const movies = await Movie.findAll({});
    const moviesSorted = movies.sort((e, i) => e.title.localeCompare(i.title));
    console.log(moviesSorted);
    res.status(200).json(moviesSorted);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error" });
  }
});

app.get("/moviesPagination", async (req, res) => {
  try {
    Movie.findAndCountAll({
      limit: limit,
      offset: countPagination,
    }).then(function (result) {
      res.status(202).json(result.rows);
      countPagination += limit;
    });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error" });
  }
});

app.get("/ships/:shipId/crewmembers", async (req, res) => {
  try {
    const ship = await Ship.findByPk(req.params.id);
    if (ship) {
      const crewmembers = await movie.getCrewmembers();

      res.status(200).json(crewmembers);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error" });
  }
});

app.post("/ships/:shipId/crewmembers", async (req, res) => {
  try {
    const ship = await Ship.findByPk(req.params.shipId);
    if (ship) {
      const crewmember = req.body;
      crewmember.shipId = ship.id;
      await CrewMember.create(crewmember);

      res.status(201).json({ message: "created" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error" });
  }
});

app.get("/ships/:shipId/crewmembers/:crewId", async (req, res) => {
  try {
    const ship = await Ship.findByPk(req.params.shipId);
    if (ship) {
      const crewmembers = await ship.getCrewmembers({
        where: { id: req.params.crewId },
      });
      const crewmember = crewmembers.shift();
      if (crewmember) {
        res.status(200).json(crewmember);
      } else {
        res.status(404).json({ message: " crewmember not found" });
      }

      res.status(200).json(crewmembers);
    } else {
      res.status(404).json({ message: " ship not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error" });
  }
});
app.put("/ships/:shipId/crewmembers/:crewId", async (req, res) => {
  try {
    const ship = await Ship.findByPk(req.params.shipId);
    if (ship) {
      const crewmembers = await ship.getCrewmembers({
        where: { id: req.params.crewId },
      });
      const crewmember = crewmembers.shift();
      if (crewmember) {
        await crewmember.update(req.body);
        res.status(202).json({ message: "accepted" });
      } else {
        res.status(404).json({ message: " crewmember not found" });
      }

      res.status(200).json(crewmembers);
    } else {
      res.status(404).json({ message: " ship not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error" });
  }
});
app.delete("/ships/:shipId/crewmembers/:crewId", async (req, res) => {
  try {
    const ship = await Ship.findByPk(req.params.shipId);
    if (ship) {
      const crewmembers = await ship.getCrewmembers({
        where: { id: req.params.crewId },
      });
      const crewmember = crewmembers.shift();
      if (crewmember) {
        await crewmember.destroy();
        res.status(202).json({ message: "accepted" });
      } else {
        res.status(404).json({ message: " crewmember not found" });
      }

      res.status(200).json(crewmembers);
    } else {
      res.status(404).json({ message: " ship not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error" });
  }
});
//FILTERING
app.get("/shipsFilter/:name", async (req, res) => {
  try {
    const ships = await Ship.findAll({
      where: { name: req.params.name },
    });

    res.status(200).json(ships);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error" });
  }
});
app.get("/displacementFilter/:displacement", async (req, res) => {
  try {
    const ships = await Ship.findAll({
      where: {
        displacement: req.params.displacement,
      },
    });

    if (ships) res.status(200).json(ships);
    else res.status(500).json({ message: "not found" });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error" });
  }
});
//SORTING
app.get("/shipsSorted", async (req, res) => {
  try {
    const ships = await Ship.findAll({});
    const shipsSorted = ships.sort((e, i) => e.name.localeCompare(i.name));

    res.status(200).json(shipsSorted);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error" });
  }
});
//PAGING
app.get("/shipsPagination", async (req, res) => {
  try {
    Ship.findAndCountAll({
      // where: { category: req.params.category },

      limit: limit,
      offset: countPagination,
    }).then(function (result) {
      res.status(202).json(result.rows);
      countPagination += limit;
    });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error" });
  }
});
app.listen(8081);
