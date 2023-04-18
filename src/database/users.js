/*
This is the file where i keep my db calls. It might not be necessary to yse db.serialize before the 
calls but I haven't had time to try
*/
import sqlite3 from 'sqlite3'

console.log(sqlite3)
 let db

function conn () {
    if (!db || !db.open) {
      db =new sqlite3.Database('tufoDB.db', (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('db opened')
          console.log(db)
        }
      })
    }
    return db
  }


export function queryAllUsers(){
    return new Promise((resolve, reject) => {
        let db = conn()
        db.serialize(() => {
            db.all('select id, name, surname, nickname, last_subscription from users', (err, rows) => {
                if (err) reject(err)
                console.log(rows)
                resolve(rows || [])
                db.close()
            });
        })
     })
}

export function insertUser(name, surname, nickname, last_subscription){
    return new Promise((resolve, reject) => {
        let db = conn()

        db.serialize(() => {
            db.run(`INSERT INTO users(name, surname, nickname, last_subscription) VALUES('${name}', '${surname}', '${nickname}','${last_subscription}' )`, function(err) {
                if (err) {
                    return console.log(err.message);
                }
                resolve(this.lastID);
                db.close()
            });
        });
    })
}   

