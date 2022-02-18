import database from './connection.js'
import convertpassword from '../config/convertpassword.js'

function signup(datas) {
    return new Promise((resolve, reject) => {
    convertpassword(datas.password).then(password => { 
            const SQLqurey = `insert into user (email, password, name, info)values`
                + `('${datas.email}', '${password}', '${datas.name}', '${JSON.stringify(datas.info)}');`;
            database.query(SQLqurey, (error, result, fields) => {
                if(error) {
                    reject('sql qurey error: ' + SQLqurey)
                }
                else {
                    resolve({
                        result: result,
                        email: datas.email
                    })
                }
            })
        })
    })
} 


export {
    signup
}