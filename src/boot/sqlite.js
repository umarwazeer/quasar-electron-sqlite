/*
This file use sqlite3 to connect the app to the database. Make sure that the sqlite database file
is in the root of your project, otherwise this procedure will create a new empty file/database
*/
import sqlite3 from 'sqlite3'
import { boot } from 'quasar/wrappers'

console.log(sqlite3)

const db = new sqlite3.Database('tufoDB.db', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('db opened')
    console.log(db)
  }
})


/*
I did this to use db in the components by usinf this.$db (if you plan to use it in vue components) 
and I exported db (un case you prefer to put all db related functions in another file like me) 
*/
export default boot(({ app }) => {
  app.config.globalProperties.$db = db

})

export { db }
