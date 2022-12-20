export const loginWithToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).send({ msg: "Login Terlebih dahulu" });
  }

  next();
};
