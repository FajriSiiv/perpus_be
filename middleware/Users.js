import Users from "../model/Users.js";

export const cekNamaPengguna = async (req, res, next) => {
  const { nama_pengguna } = req.body;

  const checkPengguna = await Users.findAll({
    where: {
      nama_pengguna: nama_pengguna,
    },
  });

  if (parseInt(checkPengguna.length) == 0) {
    next();
  } else {
    res.status(401).send({ msg: "User sudah terdaftar" });
  }
};
