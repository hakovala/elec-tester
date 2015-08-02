# Electron Tester App

Tiny [Electron](https://github.com/atom/electron) application for quickly launching web pages in Electron.

Browser windows state is saved to '<html file>.state.json' file when window. closed.

Application has basic menu items:
 - Reload (Ctrl+R)
 - Toggle DevTools (Ctrl+Shift+J)
 - Quit (Ctrl+Q)

## Installation

```
npm install -g elec-tester
```

## Usage

Pass html file as a command line argument to open it in Electron.

```
elec-tester <html file>
```
