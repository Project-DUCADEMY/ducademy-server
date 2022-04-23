import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import User from '../models/User'

export const join = async (req, res) => {
  const { username, email, password, passwordCh } = req.body

  if (password !== passwordCh) {
    return res.status(400).json({
      code: 400,
      errorMessage: 'The passwords are different.',
    })
  }

  const usernameExists = await User.exists({ $or: [{ email }] })
  if (usernameExists) {
    return res.status(400).json({
      code: 400,
      errorMessage: 'This username already exists.',
    })
  }

  const emailExists = await User.exists({ $or: [{ username }] })
  if (emailExists) {
    return res.status(400).json({
      code: 400,
      errorMessage: 'This email already exists',
    })
  }

  const passwordHash = bcrypt.hashSync(password, 5)

  try {
    await User.create({
      username,
      email,
      password: passwordHash,
    })
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error : User',
    })
  }

  return res.redirect('/login')
}

export const login = async (req, res) => {
  const { email, password } = req.body
  let ok = []

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(400).json({
      code: 400,
      errorMessage: 'User is not found',
    })
  } else {
    ok = await bcrypt.compare(password, user.password)
  }
  if (!ok) {
    return res.status(400).json({
      code: 400,
      errorMessage: 'The password is wrong.',
    })
  }

  req.session.loggedIn = true
  req.session.user = user

  return res.status(200).json({
    code: 200,
    message: 'success',
  })
}

export const userinfo = (req, res) => {
  if (req.session.user === undefined) {
    res.status(401)
    res.send()
    return 0
  }
  const { name, username, email } = req.session.user


  if (req.session.loggedIn) {
    res.status(201).json({
      username,
      email,
    })
  }
}

export const logout = (req, res) => {
  req.session.destroy()

  console.log(req.session)

  res.redirect('/')
}
