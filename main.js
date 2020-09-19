const { app, BrowserWindow } = require('electron');

const path = require('path');
const url  = require('url');

function createWindow() {

	let mainWindow;

	//create the browser window
	mainWindow = new BrowserWindow({
		width: 1300,
		height: 760,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: true
		}
	});

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, 'frontend/dist/ng-newsapp/index.html'),
			protocol: 'file',
			slashes: true
		})
	);

	mainWindow.on('closed', function () {
		mainWindow = null
	});
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
	if (mainWindow === null) createWindow()
});