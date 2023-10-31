import express from "express";
import config from "config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../../models/users/users.js";
import { userRegisterValidations, errorMiddelware } from "../../middlewares/users/index.js";
import randomString from "../../utils/randomstring.js";
import sendSMS from "../../utils/sms.js";

const router = express.Router();

router.post("/register", userRegisterValidations(), errorMiddelware, async (req, res) => {
    try {
        let userData = new userModel(req.body);

        let emailCheck = await userModel.findOne({ email: userData.email });

        if (emailCheck) {
            return res.status(409).json({ error: "Email already Exist" });
        }
        let phoneCheck = await userModel.findOne({ phone: userData.phone });

        if (phoneCheck) {
            return res.status(409).json({ error: "Phone Already Exist" });
        }
        let hashpassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashpassword;

        console.log(userData);
        console.log(userData.userverifytoken.phone);
        console.log(userData.userverifytoken.email);

        userData.userverifytoken.phone = randomString(10);

        const phoneToken = jwt.sign(
            {
                phonestore: userData.userverifytoken.phone,
            },
            config.get("JWT_KEY"),
            { expiresIn: "1d" }
        );
        sendSMS({
            body: `Hi ${userData.firstName}, Please click the given link to verify your phone ${config.get(
                "URL"
            )}/users/phone/verify/${phoneToken}`,
            to: userData.phone,
        });

        userData.userverifytoken.email = randomString(10);

        const emailToken = jwt.sign(
            {
                emailstore: userData.userverifytoken.email,
            },
            config.get("JWT_KEY"),
            { expiresIn: "1d" }
        );

        console.log(emailToken, randomString());
        console.log("\n");
        console.log(phoneToken, randomString());
        console.log("\n");
        console.log("\n");
        console.log(`http://192.168.0.104:5000/users/phone/verify/${phoneToken}`);
        console.log("\n");
        console.log(`http://192.168.0.104:5000/users/email/verify/${emailToken}`);
        console.log("\n");

        await userData.save()
        res.status(200).json({ msg: "User Added Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
);

router.get("/email/verify/:token", async (req, res) => {
    try {
        let token = req.params.token;
        let verify = jwt.verify(token, config.get("JWT_KEY"));
        console.log(verify.emailstore);
        let verifyemail = await userModel.findOne({
            "userverifytoken.email": verify.emailstore,
        })
        console.log(verifyemail);
        if (!verifyemail) {
            return res.status(401).json({msg: "Token Expired"});
        }
        verifyemail.userverified.email = true;
        await verifyemail.save()
        return res.status(200).send({msg: "Email Verified Successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/phone/verify/:token", async (req, res) => {
    try {
        let token = req.params.token;
        let verify = jwt.verify(token, config.get("JWT_KEY"));
        console.log(verify.phonestore);
      
        let verifyphone = await userModel.findOne({
            "userverifytoken.phone": verify.phonestore,
        })
        console.log(verifyphone);
        if (!verifyphone) {
            return res.status(401).json({msg: "Token Expired"});
        }
        verifyphone.userverified.phone = true;
        await verifyphone.save()
        return res.status(200).send({msg: "Phone Verified Successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;