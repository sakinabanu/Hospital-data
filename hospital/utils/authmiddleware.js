// import jwt from "jsonwebtoken";
// import config from "config";
// import cryptoJS from "crypto-js";

// function auth(req, res, next) {
//   try {
//     let cryptokey = config.get("CRYPTO_KEY");
//     let token = req.headers["auth-token"];
//     console.log(token);
//     let decrypt = cryptoJS.AES.decrypt(token, cryptokey);
//       let originaltoken = decrypt.toString(CryptoJS.enc.Utf8);
//       console.log(originaltoken)
//     let payload = jwt.verify(originaltoken, config.get("JWT_KEY"));
//     console.log(payload);
//       req.payload = payload;
//     return next();
//   } catch {
//     return res
//       .status(401)
//       .json({ error: "Access Denied. Invalid Token/Token Expired" });
//   }
// }
// export default auth;
