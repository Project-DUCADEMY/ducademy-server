import db from '../db'
import jwt from 'jsonwebtoken'

export const joinPage = (req, res) => {
  res.render('join')
}

export const join = async (req, res) => {
  const { name, email, password } = req.body

  console.log(name)

  db.run(
    'INSERT INTO user(email, name, password) VALUES(?, ?, ?)',
    [email, name, password],
    (err) => {
      if (err) {
        return console.log(err.message)
      }
      console.log('등록 성공')
    }
  )

  res.redirect('/user/login')
}

export const loginPage = (req, res) => {
  res.render('login')
}

export const login = async (req, res) => {
  const { email, password } = req.body

  db.get(`SELECT * FROM user WHERE email = ?`, [email], (err, rows) => {
    if (err) console.error(err)

    if (rows == undefined) {
      res.end(
        "<script>alert('Email does not exist..');location.href = document.referrer;</script>"
      )
      return
    }

    if (password != rows.password) {
      res.end(
        "<script>alert('Password is different.');location.href = document.referrer;</script>"
      )
      return
    }
    const token = jwt.sign(
      {
        _id: email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
        issuer: 'sibal',
      }
    )
    res.cookie('name', rows.name)
    res.cookie('token', token)
    res.redirect('/kiosk')
    //res.json({ token })

    // res.redirect('/koisk')
  })
  
}
