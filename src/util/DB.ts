import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();
const config = {
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  server: process.env.DB_SERVER!,
  database: process.env.DB_DATABASE!,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};
let Pool: sql.ConnectionPool | null = null;
export async function connectDB(): Promise<sql.ConnectionPool> {
  if (Pool) return Pool;
  try {
    Pool = await sql.connect(config);
    console.log("✅ Connected to SQL Server");
    return Pool;
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    throw err;
  }
}
