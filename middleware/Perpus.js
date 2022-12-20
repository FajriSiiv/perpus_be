import Buku from "../model/buku.js";

export const cekStatusBuku = async (req, res, next) => {
  const { nama_buku } = req.body;

  const checkBuku = await Buku.findOne({
    where: {
      nama_buku: nama_buku,
    },
  });

  if (checkBuku.status_buku) {
    next();
  } else {
    res.status(401).send({
      msg: "Sedang di pinjam",
    });
  }
};

export const cekAdaBuku = async (req, res, next) => {
  const { nama_buku } = req.body;

  const checkBuku = await Buku.findAll({
    where: {
      nama_buku: nama_buku,
    },
  });

  if (parseInt(checkBuku.length) == 0) {
    res.status(401).send({ msg: "Buku tidak terdaftar" });
  } else {
    next();
  }
};

export const cekBukuTerdaftar = async (req, res, next) => {
  const { nama_buku, kategori, terbit_buku, author } = req.body;

  const checkBuku = await Buku.findAll({
    where: {
      nama_buku,
      kategori,
      terbit_buku,
      author,
    },
  });

  if (parseInt(checkBuku.length) == 0) {
    next();
  } else {
    res.status(401).send({ msg: "Buku sudah ada" });
  }
};
