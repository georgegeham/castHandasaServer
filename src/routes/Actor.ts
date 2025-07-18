import { connectDB } from "../util/DB";
import sql from "mssql";
import express from "express";
const router = express.Router();
router.post("/", async (req, res, next) => {
  const Pool = await connectDB();
  try {
    const {
      name,
      mobile,
      email,
      bdate,
      DateOfEntrance,
      NoPlays,
      ImgURL,
      Plays,
      Rewards,
    } = req.body;
    const fname = name.split(" ")[0] || " ";
    const lname = name.split(" ")[1] || " ";
    const pool = await Pool.connect();
    // 1. Insert Actor
    const actorResult = await pool
      .request()
      .input("fname", sql.VarChar(50), fname)
      .input("lname", sql.VarChar(50), lname)
      .input("mobile", sql.VarChar(15), mobile)
      .input("email", sql.VarChar(100), email)
      .input("bday", sql.Date, bdate)
      .input("DateOfEntrance", sql.Date, new Date(DateOfEntrance))
      .input("NoPlays", sql.Int, Number(NoPlays))
      .input("ImgURL", sql.VarChar(500), ImgURL).query(`
        INSERT INTO Actor (fname, lname, mobile, email, bday, NoPlays, DateOfEntrance, ImgURL)
        OUTPUT INSERTED.ID
        VALUES (@fname, @lname, @mobile, @email, @bday, @NoPlays, @DateOfEntrance, @ImgURL)
      `);

    const actorId = actorResult.recordset[0].ID;
    if (Plays && Plays.length > 0) {
      for (const p of Plays) {
        await Pool.request()
          .input("ActorID", sql.Int, actorId)
          .input("PlayID", sql.Int, p.ID).query(`
            INSERT INTO Actor_Plays (actor_id, play_id)
            VALUES (@ActorID, @PlayID)
          `);
      }
    }

    if (Rewards && Rewards.length > 0) {
      for (const r of Rewards) {
        await Pool.request()
          .input("ActorID", sql.Int, actorId)
          .input("RewardID", sql.Int, r.ID).query(`
            INSERT INTO Actor_Rewards (actor_id, reward_id)
            VALUES (@ActorID, @RewardID)
          `);
      }
    }

    res.status(201).json({ message: "Actor created", actorId });
  } catch (err) {
    console.error("❌ Failed to insert Actor:", err);
    res.status(500).json({ error: "Failed to create Actor" });
  }
});
export default router;
