import mysql from 'mysql2'
import config from '../config/config.js'

let database = mysql.createConnection(config.database_connection)

database.connect(err => {
    if (err) { 
        throw (err) 
    }
    else {
        console.log('DB connection Success')
    }
});

export default database