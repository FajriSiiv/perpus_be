import Users from "../model/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  try {
    const response = await Users.findAll();

    res.send(response);
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

export const register = async (req, res) => {
  const { nama_pengguna, password, confirm_password } = req.body;

  if (password !== confirm_password)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await Users.create({
      nama_pengguna,
      password: hashPassword,
      role: "admin",
    });
    res.status(200).send({ success: "User telah dibuat" });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        nama_pengguna: req.body.nama_pengguna,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Password salah" });

    const userId = user[0].id;
    const namaPengguna = user[0].nama_pengguna;
    // const email = user[0].email;
    const accessToken = jwt.sign(
      { userId, namaPengguna },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { userId, namaPengguna },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      { token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Nama tidak ditemukan" });
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.status(200).send({ msg: "Logout Berhasil" });
};

export const loginMe = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    res.status(200).json(decoded);
  } catch (error) {
    res.status(401).send({ msg: "Tidak ada data" });
  }
};
