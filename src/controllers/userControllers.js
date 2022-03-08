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

  const usernameExists = await User.exists({ $or: [{ email }] })
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
  let ok = []

  const user = await User.findOne({ username })

  if (!user) {
    return res.status(400).json({
      code: 400,
      errorMessage: "User is not found",
    })
  } else {
    ok = await bcrypt.compare(password, user.password)
  }
  if (!ok) {
    return res.status(400).json({
      code: 400,
      errorMessage: "The password is wrong.",
    })
  }

  req.session.loggedIn = true
  req.session.user = user

  return res.redirect("/")
}

export const userinfo = (req, res) => {
  if(req.session.user === undefined) {
    res.status(401)
    res.send()
    return 0
  }
  const { name, username, email } = req.session.user

  console.log(req.session)

  if (req.session.loggedIn) {
    res.status(201).json({
      name,
      username,
      email,
    })
  }
}
