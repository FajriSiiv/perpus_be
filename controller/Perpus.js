import Buku from "../model/buku.js";
import Perpus from "../model/Perpus.js";

export const getPerpus = async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  // res.send({ limit, page, offset });

  try {
    const response = await Perpus.findAll({
      limit,
      offset,
    });
    res.send(response);
  } catch (error) {
    res.status(401).send({ msg: "Gagal Melihat Data" });
  }
};

export const getPerpusAll = async (req, res) => {
  // res.send({ limit, page, offset });

  try {
    const response = await Perpus.findAll();
    res.send(response);
  } catch (error) {
    res.status(401).send({ msg: "Gagal Melihat Data" });
  }
};

export const getPerpusById = async (req, res) => {
  try {
    const response = await Perpus.findOne({
      where: {
        id: req.params.idBuku,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(401).send({ msg: "Tidak mendapatkan buku" });
  }
};

export const createPerpus = async (req, res) => {
  const { nama_buku, jadwal_pinjam, jadwal_akhir, nama_peminjam, status_buku } =
    req.body;

  const checkBuku = await Buku.findOne({
    where: {
      nama_buku: nama_buku,
    },
  });

  try {
    await Perpus.create({
      nama_buku: nama_buku,
      jadwal_pinjam: jadwal_pinjam,
      jadwal_akhir: jadwal_akhir,
      kategori: checkBuku.kategori,
      nomor_buku: 1,
      nama_peminjam: nama_peminjam,
      status_buku: true,
    }).then(() => {
      const gantiStatusBuku = async () => {
        await Buku.update(
          {
            status_buku: false,
          },
          {
            where: {
              nama_buku: nama_buku,
            },
          }
        );
      };

      gantiStatusBuku();
    });

    res.send({ msg: "Membuat Buku Berhasil" });
  } catch (error) {
    res.status(401).send({ msg: "Gagal membuat buku" });
  }
};

// export const updatePerpus = async (req, res) => {
//   // const checkBuku = await Buku.findAll({
//   //   where: {
//   //     nama_buku: nama_buku,
//   //   },
//   // });

//   const checkPerpus = await Perpus.findOne({
//     where: {
//       id: req.params.idBuku,
//     },
//   });

//   try {
//     await Perpus.update(req.body, {
//       where: {
//         nomor_buku: req.params.idBuku,
//       },
//     });

//     await Buku.update(
//       {
//         status_buku: true,
//       },
//       {
//         where: {
//           nama_buku: checkPerpus.nama_buku,
//         },
//       }
//     );

//     res.status(200).json({ msg: "Update Berhasil" });
//   } catch (error) {
//     res.status(401).json({ msg: "Update Gagal" });
//   }
// };

export const deletePerpus = async (req, res) => {
  // const checkBuku = await Buku.findAll();

  const checkPerpus = await Perpus.findOne({
    where: {
      id: req.params.idBuku,
    },
  });

  try {
    await Perpus.destroy({
      where: {
        id: req.params.idBuku,
      },
    });

    await Buku.update(
      {
        status_buku: true,
      },
      {
        where: {
          nama_buku: checkPerpus.nama_buku,
        },
      }
    );

    res.status(200).send({ msg: "Berhasil Menghapus Buku" });
  } catch (error) {
    res.status(401).send({ msg: "Gagal Menghapus Buku" });
  }
};
