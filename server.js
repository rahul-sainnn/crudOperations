const express = require("express")
const app = express()
const dotenv = require("dotenv")
const userRouter = require("./routes/userRouter")
const {dbconnection} = require("./config/db")

dotenv.config({path:"./config/config.env"})
app.use(express.json())

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use("/api/crud",userRouter)

const PORT = process.env.PORT

app.listen(PORT, async () => {
  try {
    await dbconnection(); 
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
});

