import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Buku = db.define(
  "buku",
  {
    nama_buku: {
      type: DataTypes.STRING,
    },
    terbit_buku: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    kategori: {
      type: DataTypes.STRING,
    },
    nomor_buku: {
      type: DataTypes.INTEGER,
    },
    status_buku: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

export default Buku;
