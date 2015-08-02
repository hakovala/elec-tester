"use strict";

var util = require('util');

var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');

var fs = require('fs-extra');
var path = require('path');

// ignore gpu blacklisting to enable WebGL on some platforms
app.commandLine.appendSwitch('ignore-gpu-blacklist');

app.on('window-all-closed', function() {
	app.quit();
});

var args = process.argv.slice(2);

var filepath = args[0];
if (!filepath) {
	console.error('Missing HTML filepath');
	process.exit(1);
}
filepath = path.resolve(filepath);
if (!fs.existsSync(filepath) || !fs.lstatSync(filepath).isFile()) {
	console.error("Target '" + filepath + "' is not a file.");
	process.exit(1);
}

var windowStateFile = filepath + '.state.json';

var mainWindow = null;

app.on('ready', function() {
	Menu.setApplicationMenu(require('./menu.js'));

	var options = util._extend({
		width: 640, height: 480,
	}, loadWindowState(windowStateFile));

	mainWindow = new BrowserWindow(options);
	if (options['dev-tools-open']) {
		mainWindow.openDevTools();
	}

	mainWindow.loadUrl('file://' + filepath);
	mainWindow.on('close', function() {
		saveWindowState(windowStateFile, mainWindow);
	});
	mainWindow.on('closed', function() {
		mainWindow = null;
	});
});

function saveWindowState(filename, win) {
	var options = win.getBounds();

	options.fullscreen = win.isFullScreen();
	options['always-on-top'] = win.isAlwaysOnTop();
	options['dev-tools-open'] = win.isDevToolsOpened();

	fs.outputJsonSync(filename, options);
	console.log('Saved window state: ' + filename);
}

function loadWindowState(filename) {
	console.log('Loading window state: ' + filename);
	return fs.readJsonSync(filename, { throws: false }) || {};
}
