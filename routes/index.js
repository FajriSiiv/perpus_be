import express from "express";
import {
  createBuku,
  deleteBuku,
  getBuku,
  getBukuById,
  updateBuku,
} from "../controller/Buku.js";
import {
  createPerpus,
  deletePerpus,
  getPerpus,
  getPerpusAll,
  getPerpusById,
} from "../controller/Perpus.js";
import { refreshToken } from "../controller/RefreshToken.js";
import {
  getUser,
  login,
  loginMe,
  logout,
  register,
} from "../controller/Users.js";
import {
  cekAdaBuku,
  cekBukuTerdaftar,
  cekStatusBuku,
} from "../middleware/Perpus.js";
import { loginWithToken } from "../middleware/Token.js";
import { cekNamaPengguna } from "../middleware/Users.js";

const router = express.Router();

// Perpustakaan API
router.get("/perpus", loginWithToken, getPerpus);
router.get("/perpusAll", loginWithToken, getPerpusAll);
router.get("/perpus/:idBuku", loginWithToken, getPerpusById);
router.post("/perpus", loginWithToken, cekStatusBuku, cekAdaBuku, createPerpus);
router.delete("/perpus/:idBuku", loginWithToken, deletePerpus);
// router.patch("/perpus/:idBuku", updatePerpus);

// Buku Detail (Untuk Public)
router.get("/buku", loginWithToken, getBuku);
router.get("/buku/:id", loginWithToken, getBukuById);
router.post("/buku", loginWithToken, cekBukuTerdaftar, createBuku);
router.patch("/buku/:id", loginWithToken, updateBuku);
router.delete("/buku/:id", loginWithToken, deleteBuku);

// User admin routes
router.get("/users", loginWithToken, getUser);

// Login Logout User
router.get("/me", loginWithToken, loginMe);
router.post("/register", cekNamaPengguna, register);
router.post("/login", login);
router.delete("/logout", loginWithToken, logout);

router.get("/token", refreshToken);

export default router;
