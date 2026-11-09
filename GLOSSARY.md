# sync-wrap

A NextBASIC program that runs on a ZX Spectrum Next and launches the `.sync5` dot command from a single screen, so that a user never has to type the command.

## Language

**Next**:
The ZX Spectrum Next machine the program runs on.
_Avoid_: device, host

**Local**:
The PC that `.sync5` talks to.
_Avoid_: PC (in the interface), server

**Listen mode**:
The mode in which the Next connects to nexplorer's Listener so that Local drives the Next's files.
_Avoid_: remote mode

**Sync mode**:
The classic NextSync mode in which the Next pulls new files from a NextSync server running on Local.
_Avoid_: update, download

**Launch**:
Starting `.sync5` with the settings shown on the summary screen. The program returns to the summary screen when `.sync5` ends.
_Avoid_: run, start

**Summary screen**:
The single screen showing the server address, the mode, the speed and the flow control, from which one key launches `.sync5` and one key per setting changes it.
_Avoid_: menu, main screen

**Drive**:
The Next drive (C: or D:) the program switches to before launching in Listen mode, so that nexplorer can reach it. It can also be none, in which case the program does not switch.
_Avoid_: folder, working directory

**Trace**:
The on-screen echo of each command received in Listen mode. Turned off by default because it improves stability.
_Avoid_: log, verbose

**Animation**:
The sprite animation `.sync5` shows while it runs. On by default in `.sync5`, switchable from the summary screen.
_Avoid_: sprite

**Retro look**:
The green-on-black look of `.sync5`. On by default in `.sync5`, switchable from the summary screen.
_Avoid_: theme, dark mode

**Server address**:
The Local IP address or domain name that `.sync5` connects to, saved by `.sync5` itself. The user is responsible for entering it correctly.
_Avoid_: IP (when a domain name is allowed)
