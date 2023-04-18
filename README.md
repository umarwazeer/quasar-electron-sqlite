# Quasar-Electron-Sqlite

A very basic Quasar project, built for electron, that uses the sqlite database. It's a simple app that allows you to add users on the database and see their names shown in the page.
**NOTE**: this app is **not** production ready, and **never will be**. It's just an example made from scratch, with possible bad code design. It was made only to show how to hook up an electron app made
with Quasar with an sqlite db, since I didn't find any meaningful examples around.  
This branch creates a connection to the database on boot. A more (maybe?) correct version where the connection is opened and closed for every call can be found on the `noBoot` branch.  
It was developed and tested on Windows 10, I haven't tested it for other OS. 


## Try it out

### Install the dependencies
```bash
yarn install
```
### Rebuild sqlite3 for electron
**NOTE**: This step is **necessary**, otherwise the app wont' work. In addition, in order for this step to be successfull, you need to have Visual Studio (or the Visual Studio Tools) installed, otherwise it will give an error.

```bash
 ./node_modules/.bin/electron-builder install-app-deps
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
 quasar dev -m electron
```


### Build the app
As said above, this app is not meant to be built for a production environment. If you build it, it will not be able to find the database file. You have to tell electron to look for the file in the correct place,
which i wasn't able to do.  
For those curious, some info can be found at [this](https://quasar.dev/quasar-cli-webpack/developing-electron-apps/electron-accessing-files/) link.  
A bad fix, and the one I used to test the build, is to add the db file in the folder created by the build. It seems to work for the purpose of this example, but there's a chance it could break a more serious project.
```bash
quasar build -m electron
```

### Sources
My main sources have been [this](https://forum.quasar-framework.org/topic/335/sqlite3-in-electron-wrapper/6) old forum post on the Quasar community and [this](https://github.com/luwanquan/electron-vue-sqlite3-demo) github repository. 
In case those get deleted, I'll sum up my version of the process here.
- create a new quasar app via the cli, using yarn (I tried npm too, but wasn't able to make it work)
```
yarn create quasar
```
- enter the folder
```
cd <folder-name>
```
- add the electron stuff
```
quasar mode add electron
```
- add sqlite3 and electron builder dependencies
```
yarn add sqlite3
yarn add electron-builder
```
- rebuild the sqlite3 dependency with electron builder. **NOTE**: in order for this step to be successfull, you need to have Visual Studio (or the Visual Studio Tools) installed, otherwise it will give an error.
```
./node_modules/.bin/electron-builder install-app-deps
```
- create a new boot file
```
quasar new b sqlite
```
From here on out, my code differs from that of the post, so feel free to follow either their code or mine
- fill in the `boot/sqlite.js` like so:

```
/*
This file uses sqlite3 to connect the app to the database. Make sure that the sqlite database file
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
I did this to use db in the components by using this.$db (if you plan to use it in vue components) 
and I exported db (in case you prefer to put all db related functions in another file like me) 
*/
export default boot(({ app }) => {
  app.config.globalProperties.$db = db

})

export { db }
```
- in the `quasar.conf.js` file, make sure to add sqlite to the boot and the extendWebpack option in the build field
```
    boot: [
      'sqlite'
    ],

    build: {
      vueRouterMode: 'hash', // available values: 'hash', 'history'

      extendWebpack(cfg) {
        // externals property does not exist yet, so must be created, 
        // otherwise 'push' new item
        cfg.externals = {sqlite3: 'commonjs sqlite3'}

        // without this an error occurs !!!
        // -->>> * aws-sdk in ./node_modules/node-pre-gyp/lib/info.js, 
        //./node_modules/node-pre-gyp/lib/publish.js and 1 other
      },
    },
```
- in the `src-electron/electron-main.js` add these to the webPreferences. I'm not sure what they do, but, again, the app doesn't work without these
```
sandbox: false,
contextIsolation: false,
nodeIntegration: true,
```
Once you've done these steps, if you `quasar dev -m electron`, the application should start with an open connection to your sqlitedb. For some example usage of the
sqlite3 library, you can look at the `src/database` folder.