import mongoose from "mongoose"

mongoose.connect(process.env.DB_URL)

const db = mongoose.connection

db.once("open", () => {
  console.log("✅ DB Connected")
})

db.on("error", () => {
  console.log("❌ DB error")
})