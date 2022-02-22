import database from './connection.js'
function finduser (keys, values) {
    return new Promise((resolve, reject) => {
        const SQLqurey = `select * from user where ${
            keys.map((element, idx) => { return `${element} = '${values[idx]}'` }).join(' AND ')};`
        database.query(SQLqurey, (error, result, fields) => {
            if(error) {
                console.log(error)
                reject('sql qurey error: ' + SQLqurey)
            }
            else {
                result.forEach(element => { delete element.password })
                resolve(result)
            }
        })
    })
}
export {
    finduser
}