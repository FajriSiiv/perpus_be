import { Sequelize } from "sequelize";

const db = new Sequelize("test_perpus", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
