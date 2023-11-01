import jwt from "jsonwebtoken";
import config from "config";
import CryptoJS from "crypto-js";

let authMiddleware = (req, res, next) => {
  try {
    let token = req.headers["access-token"] || req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ msg: "Please give Token" });
    }
    let decrypt = CryptoJS.AES.decrypt(token, config.get("CRYPTO_KEY"));
    const originalText = decrypt.toString(CryptoJS.enc.Utf8);

    let verify = jwt.verify(originalText, config.get("JWT_KEY"));

    console.log(verify);
    req.user = verify;
    next();
  } catch (error) {
    res.status(500).json({ msg: "JWT Token time expired!!" });
  }
};

export default authMiddleware;
