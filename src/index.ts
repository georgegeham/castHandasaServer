import express from "express";
import cors from "cors";
import { connectDB } from "./util/DB";
import dotenv from "dotenv";
import RewardRouter from "./routes/Reward";
import TournamentRouter from "./routes/Tournaments";
import PlayRouter from "./routes/Plays";
import ActorRouter from "./routes/Actor";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;
let Pool;
//JSON Parser
app.use(express.json());
//Cors MiddleWare
app.use(cors());

//Routes
app.use("/tournaments", TournamentRouter);
app.use("/plays", PlayRouter);
app.use("/reward", RewardRouter);
app.use("/actor", ActorRouter);
app.use("/", (req, res, next) => {
  res.send("It's Ok I'm Here");
});
(async () => {
  try {
    const Pool = await connectDB();
    if (Pool) {
      app.listen(Number(PORT), "0.0.0.0", () => {
        console.log(`Server is Runing on http://localhost:${PORT}`);
      });
    }
  } catch (err) {
    console.error("Connection failed:", JSON.stringify(err, null, 2));
  }
})();
