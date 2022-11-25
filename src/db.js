import sqlite3 from 'sqlite3'
import path from 'path'

const db_nmae = path.join(__dirname, 'data', 'apptest.db')

const db = new sqlite3.Database(db_nmae, (err) => {
  if (err) {
    return console.error(err.message)
  }
  console.log('Successs')
})

// db.run(
//   'CREATE TABLE user(email text primary key, name text not null, password text not null)',
//   (err) => {
//     if (err) {
//       return console.error(err)
//     }
//     console.log('test')
//   }
// )

// db.run(
//   'CREATE TABLE product(id integer primary key AUTOINCREMENT, kind text not null, name text not null, price integer not null, number integer not null,img text not null)'
// )
export default db
