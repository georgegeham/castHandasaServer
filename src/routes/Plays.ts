import { connectDB } from "../util/DB";
import sql from "mssql";
import express from "express";
const router = express.Router();
router.get("/", async (req, res, next) => {
  const Pool = await connectDB();
  try {
    const response = await Pool!.query(`Select * From Plays`);
    res.status(200).json(response.recordset);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});
router.post("/", async (req, res, next) => {
  const Pool = await connectDB();
  try {
    const {
      ID,
      pname,
      pdate,
      decor,
      director_name,
      lightning,
      costumes,
      music,
      Tournaments,
      Rewards,
    } = req.body;
    console.log(ID);
    const response = await Pool.request()
      .input("ID", sql.Int, ID)
      .input("pname", pname)
      .input("pdate", sql.Date, pdate)
      .input("decor", decor)
      .input("director_name", director_name)
      .input("lightning", lightning)
      .input("costumes", costumes)
      .input("music", music).query(`
      INSERT INTO Plays (ID,pname, pdate, decor, lightning, costumes, music, director_name)
      OUTPUT INSERTED.ID
      VALUES (@ID,@pname, @pdate, @decor, @lightning, @costumes, @music, @director_name)
    `);

    const playId = response.recordset[0].ID;
    if (Array.isArray(Tournaments)) {
      for (const tournament of Tournaments) {
        console.log(tournament.ID);
        await Pool.request()
          .input("play_id", sql.Int, playId)
          .input("tournament_id", sql.Int, tournament.ID).query(`
        INSERT INTO Play_Tournaments (play_id, tournament_id)
        VALUES (@play_id, @tournament_id)
      `);
      }
    }
    if (Array.isArray(Rewards)) {
      for (const reward of Rewards) {
        console.log(reward.ID);
        await Pool.request()
          .input("play_id", sql.Int, playId)
          .input("reward_id", sql.Int, reward.ID).query(`
        INSERT INTO Play_Reward (play_id, reward_id)
        VALUES (@play_id, @reward_id)
      `);
      }
    }
    res.status(201).send("Saved");
  } catch (err) {
    console.log("Error While Creating Play", err);
    res.status(500).send("Error While Saving Play");
  }
});

export default router;
