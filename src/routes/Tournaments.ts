import { connectDB } from "../util/DB";
import express from "express";
const router = express.Router();
router.get("/", async (req, res, next) => {
  const Pool = await connectDB();
  try {
    const response = await Pool!.query(`Select * From Tournaments`);
    res.status(200).json(response.recordset);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});
router.post("/", async (req, res, next) => {
  const Pool = await connectDB();
  const { tname } = req.body;
  try {
    const result = await Pool.request()
      .input("tname", tname)
      .query(
        `INSERT INTO Tournaments (tname) OUTPUT INSERTED.ID, INSERTED.tname VALUES (@tname)`
      );
    const inserted = result.recordset[0];
    console.log(inserted);
    res.status(201).json(inserted);
  } catch (err) {
    console.log("Error While Creating Tournament", err);
    res.status(500).send("Failed");
  }
});
export default router;
