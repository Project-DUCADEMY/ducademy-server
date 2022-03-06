import bcrypt from "bcrypt"
import User from "../models/User"

export const join = async (req, res) => {
  const { name, username, email, password, passwordCh } = req.body

  if (password !== passwordCh) {
    return res.status(400).json({
      code: 400,
      errorMessage: "The passwords are different.",
    })
  }

  const nameExists = await User.exists({ $or: [{ name }] })
  if (nameExists) {
    return res.status(400).json({
      code: 400,
      errorMessage: "This name already exists.",
    })
  }

  const usernameExists = await User.exists({ $or: [{ username }] })
  if (usernameExists) {
    return res.status(400).json({
      code: 400,
      errorMessage: "This username already exists.",
    })
  }

  const emailExists = await User.exists({ $or: [{ username }] })
  if (emailExists) {
    return res.status(400).json({
      code: 400,
      errorMessage: "This email already exists",
    })
  }

  const passwordHash = bcrypt.hashSync(password, 5)

  try {
    await User.create({
      name,
      username,
      email,
      password: passwordHash,
    })
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: "DB error",
    })
  }

  return res.redirect("/login")
}

export const login = async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  if (!user) {
    res.status(400).join({
      code: 400,
      errorMessage: "User is not found",
    })
  }

  const pass = await bcrypt.compare(password, user.password)

  if (!pass) {
    res.status(400).json({
      code: 400,
      errorMessage: "The password is wrong.",
    })
  }

  req.session.loggedIn = true
  req.session.user = user

  return res.redirect("/")
}
