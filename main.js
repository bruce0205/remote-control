// Modules to control application life and create native browser window
const mqtt = require('mqtt')
const { app, BrowserWindow } = require('electron')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

let mapping = {
  ebc: 'dxpWqjvEKaM'
}

const host = 'mqtt://mqtt.meproz.com'
let options = {
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  clean: true, // set to false to receive QoS 1 and 2 messages while offline
  keepalive: 60,
  username: 'fontrip',
  password: '42760988',
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000
}

const client = mqtt.connect(host, options)
client.on('connect', function () {
})
client.subscribe('change', (err) => {
  if (!err) {
  }
})

client.on('message', function (topic, message) {
  console.log(`${topic}: ${message}`)
  console.log(`==${message}==`)
  if (topic === 'change') {
    console.log('tttt')
    console.log(message === 'ebc')
    switch (message.toString()) {
      case 'set':
        console.log('set')
        mainWindow.loadURL(`https://www.youtube.com/tv#/watch?v=4ZVUmEUFwaY`)
        break;
      case 'tvbs':
        console.log('tbvs')
        mainWindow.loadURL(`https://www.youtube.com/tv#/watch?v=Hu1FkdAOws0`)
        break;
      case 'ebc':
        console.log('ebc')
        mainWindow.loadURL(`https://www.youtube.com/tv#/watch?v=dxpWqjvEKaM`)
        break;
      default:
        console.log('ddd')
    }
  }
})

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    // width: 800,
    // height: 600,
    fullscreen: true,
    webSecurity: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required')
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL(`https://www.youtube.com/tv#/watch?v=4ZVUmEUFwaY`)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
