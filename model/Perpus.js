import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Perpus = db.define(
  "perpustakaan",
  {
    nama_buku: {
      type: DataTypes.STRING,
    },
    jadwal_pinjam: {
      type: DataTypes.STRING,
    },
    jadwal_akhir: {
      type: DataTypes.STRING,
    },
    kategori: {
      type: DataTypes.STRING,
    },
    nomor_buku: {
      type: DataTypes.INTEGER,
    },
    nama_peminjam: {
      type: DataTypes.STRING,
    },
    status_buku: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

export default Perpus;
