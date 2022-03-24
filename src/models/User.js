import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  name: { type: String, required: false },
  address: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  birthDay: { type: Number, required: false },
})

const User = mongoose.model("User", userSchema)

export default User
