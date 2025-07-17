import { connectDB } from "../util/DB";
import express from "express";
const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const Pool = await connectDB();
    const response = await Pool!.query(`Select * From Reward`);
    res.status(200).json(response.recordset);
  } catch (err) {
    console.log(err);
    res.send(500).send("Server Error");
  }
});
router.post("/", async (req, res, next) => {
  try {
    const Pool = await connectDB();
    const { rname } = req.body;
    const response = await Pool!
      .request()
      .input("rname", rname)
      .query(
        "INSERT INTO Reward (rname) OUTPUT INSERTED.ID, INSERTED.rname VALUES (@rname)"
      );
    const inserted = response.recordset[0];
    console.log(inserted);
    res.status(201).json(inserted);
  } catch (err) {
    console.log("Error while Saving Reward", err);
    res.status(500).send("Failed");
  }
});
export default router;
