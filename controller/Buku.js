import Buku from "../model/buku.js";
import Perpus from "../model/Perpus.js";

export const getBuku = async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  try {
    const response = await Buku.findAll({ limit, offset });

    res.json(response);
  } catch (error) {
    res.status(401).send({ msg: "Error data" });
  }
};

export const getBukuById = async (req, res) => {
  try {
    const response = await Buku.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.json(response);
  } catch (error) {
    res.status(401).send({ msg: "Error get data by id" });
  }
};

export const createBuku = async (req, res) => {
  const { nama_buku, terbit_buku, author, kategori, nomor_buku, status_buku } =
    req.body;

  try {
    await Buku.create({
      nama_buku,
      terbit_buku,
      author,
      kategori,
      nomor_buku,
      status_buku,
    });

    res.send({ msg: "Berhasil Create" });
  } catch (error) {
    res.status(401).send({ msg: "Tidak berhasil create data buku" });
  }
};

export const updateBuku = async (req, res) => {
  const namaBuku = await Buku.findOne({
    where: {
      id: req.params.id,
    },
  });

  const checkPerpus = await Perpus.findOne({
    where: {
      nama_buku: namaBuku.nama_buku,
    },
  });

  // res.send(checkPerpus);

  try {
    await Buku.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    await Perpus.update(
      {
        nama_buku: req.body.nama_buku,
        kategori: req.body.kategori,
      },
      {
        where: {
          nama_buku: checkPerpus.nama_buku,
          kategori: checkPerpus.kategori,
        },
      }
    );

    res.send({ msg: "berhasil update data" });
  } catch (error) {
    res.status(401).json({ msg: "gagal update" });
  }
};

export const deleteBuku = async (req, res) => {
  const namaBuku = await Buku.findOne({
    where: {
      id: req.params.id,
    },
  });

  // const namaPerpus = await Perpus.findAll({
  //   where: {
  //     nama_buku: namaBuku.nama_buku,
  //   },
  // });

  // res.send(namaPerpus);

  try {
    await Buku.destroy({
      where: {
        id: req.params.id,
      },
    });

    await Perpus.destroy({
      where: {
        nama_buku: namaBuku.nama_buku,
      },
    });

    res.send({ msg: "Berhasil menghapus buku" });
  } catch (error) {
    res.status(401).send({ msg: "Tidak berhasil menghapus" });
  }
};
