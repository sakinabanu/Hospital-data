import express from "express";
import config from "config";
import "./utils/dbconnect.js";

// controllers
import userRouter from "./controllers/users/index.js"
// import adminRouter from "./controllers/admins/index.js"

const app = express();
const PORT = config.get("PORT") || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`SERVER IS RUNNING AT ${PORT}`);
});

// modeles
app.use("/users", userRouter)
// app.use("/admins", adminRouter)

//Error handler
app.use((req,res)=>{
    res.status(404).send("Invalid Route")
});

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT ${PORT}`);
}); 