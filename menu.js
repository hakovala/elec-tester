"use strict";

var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');

var template = [
	{
		label: 'App',
		submenu: [
			{
				label: 'Reload',
				accelerator: 'Ctrl+R',
				click: function() { BrowserWindow.getFocusedWindow().reloadIgnoringCache(); }
			},
			{
				label: 'Toggle DevTools',
				accelerator: 'Ctrl+Shift+J',
				click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); }
			},
			{
				label: 'Quit',
				accelerator: 'Ctrl+Q',
				click: function() { app.quit(); }
			}
		]
	}
];

module.exports = Menu.buildFromTemplate(template);
