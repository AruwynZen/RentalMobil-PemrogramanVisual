const electron = require("electron");
const uuid = require("uuid/v4");
const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = electron;

let rentalWindows;
let historyWindows;
let mobilWindows;

let allAppointment = [];

app.on("ready", () => {
    mobilWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        height: 500,
        title: "Rental Mobil"
    });
    mobilWindow.loadURL(`file://${__dirname}/rental-mobil.html`);
    mobilWindow.on("closed", () => {

        app.quit();
        mobilWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const historyWindowCreator = () => {
    historyWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        height: 500,
        title: "History Rental"
    });
    historyWindow.setMenu(null);
    historyWindow.loadURL(`file://${__dirname}/history-rental.html`);
    historyWindow.on("closed", () => (historyWindow = null));
};

const rentalWindowCreator = () => {
    rentalWindow.setMenu(null);
    rentalWindow.loadURL(`file://${__dirname}/rental.html`);
    rentalWindow.on("closed", () => (rentalWindow = null));
};

ipcMain.on("appointment:rental", (event, appointment) => {
    appointment["id"] = uuid();
    appointment["done"] = 0;
    allAppointment.push(appointment);

    console.log(allAppointment);
});

ipcMain.on("appointment:request:history", event => {
    historyWindow.webContents.send('appointment:response:history', allAppointment);
});

ipcMain.on("appointment:request:rental", event => {
    console.log("here2");
});

ipcMain.on("appointment:done", (event, id) => {
    console.log("here3")
});

const menuTemplate = [{
    label: "File",
    submenu: [{
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command + Q" : "CTRL + Q",
        click() {
            app.quit();
        }
    }
    ]
},
{
    label: "History Rental",
    click() {
        historyWindowCreator();
    }
},

{
    label: "View",
    submenu: [{ role: "reload" }, { role: "toggledevtools" }]
}
]