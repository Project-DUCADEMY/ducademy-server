import db from '../db'

export const main = async (req, res) => {
  res.render('index')
}
export const admin = async (req, res) => {
  db.all('SELECT * FROM product', [], (err, rows) => {
    if (err) console.error(err)


    res.render('admin', { data: rows })
  })

}

export const choice = async (req, res) => {
  console.log(req.params)
}

export const registration = async (req, res) => {
  res.render('registration')
}

export const productRegistration = async (req, res) => {
  const { kind, name, price, number } = req.body
  const { filename } = req.file

  db.run(
    'INSERT INTO product(kind, name, price, number, img) VALUES(?, ?, ?, ?, ?)',
    [kind, name, price, number, filename],
    (err) => {
      if (err) console.error(err)
    }
  )

  res.redirect('/kiosk/admin')
}

export const deleteOne = async (req, res) => {
  const { id } = req.params

  db.run('DELETE FROM product WHERE id = (?)', id, (err) => {
    if(err) console.error(err)

    console.log('success')

    res.redirect('/kiosk/admin')
  })
}

export const updatePage = async (req, res) => {
  const { id } = req.params

  db.get('SELECT * FROM product WHERE id = ?', [id], (err, rows) => {
    if (err) console.error(err)

    res.render('update', { data: rows })
  })
}

export const updateOne = async (req, res) => {
  const { id } = req.params
  const { name, price, kind, number} = req.body
  let file


  db.get('SELECT img from product WHERE id = ?', id, (err, rows) => {
    if(err) console.error(err)

    !req.file ? file = rows.img : file =  req.file.filename 

    db.run('UPDATE product SET name = ?, price = ?, kind = ?, number = ?, img = ? WHERE id = ?', [name, price, kind, number, file, id], (err) => {
      if(err) console.error(err)
    })

    res.redirect('/kiosk/admin')
  })

}