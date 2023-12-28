import express from "express";
import { Pool } from "pg";

const app = express();
const port = 5173;

const pool = new Pool({
  user: "root",
  host: "bun-postgres", //container name postgre
  database: "db",
  password: "root",
  port: 5432, // Default PostgreSQL port
});

async function connectToPostgreSQL() {
  try {
    // Kiểm tra trạng thái của pool
    if (pool.totalCount === 0 || pool.idleCount === 0) {
      console.log("Connecting to PostgreSQL...");
      await pool.connect(); // Kết nối nếu không có kết nối nào tồn tại
      const name = await pool.query("SELECT * from name");
      console.log(name.rows);
      
      console.log("Connected to PostgreSQL!");
    } else {
      console.log("Already connected to PostgreSQL.");
    }

    // Thực hiện các truy vấn hoặc công việc khác ở đây
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
  }
}

app.get("/", async (req, res) => {
  await connectToPostgreSQL();
  res.send("Hello World!!!!!!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
