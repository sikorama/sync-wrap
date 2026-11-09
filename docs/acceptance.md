# Acceptance criteria (manual, on the Next)

Format: do this, expect that. Replay after each pass. Mark each line `OK` / `KO` with the date of the run in your own notes, not here.

Prerequisite: `build/sync-wrap.bas` copied to the Next with `.sync5`, `.sync5` present in `c:/dot`.

## Summary screen

- **S1** Start with no `syncwrap.cfg`: the Summary screen shows Server address `not set` (shown on the line under `[A] Address`), Mode `Listen`, Speed `default`, Flow control `on`, Trace `off`, Animation `on`, Retro look `on`, Drive `D:`, with one key shown next to each setting, ENTER for launch and a key to exit.
- **S2** The screen fits without scrolling and uses short English text only.

## Settings file

- **C1** Change each setting with its key: the screen shows the new value; restart the program: the value is kept.
- **C2** Corrupt or delete `syncwrap.cfg`: the program starts with the defaults and no error.

## Server address

- **A1** Shown as saved by `.sync5`; shown as `not set` when no file exists.
- **A2** Pressing `A` shows the current address above the prompt. (The spec asks for it as an editable default; BASIC `INPUT` may not allow a prefilled value. Check whether the current address can be edited in place, and report.)
- **A3** Empty and `-x` are refused; the saved address is unchanged.
- **A4** A typed address is saved and appears on the screen afterwards; `.sync5` was not launched by the save.
- **A5** The screen tells the user they are responsible for typing the address correctly.
- **A6** After `.sync5 <address>` has saved it, the address appears on the Summary screen (the file has no end of line).

## Command preview

- **P1** Under `Command:` the screen shows the `.cd` line (Listen mode with Drive C: or D: only) and the `.sync5` line, updated at each key press, identical to what ENTER launches.

## Speed

- **F1** At 3.5 MHz, a setting key updates its line and the preview without visible redraw delay.

## Launch

- **L1** Listen launch, default settings: `.sync5` runs with `-L -nv`; nexplorer connects and sees D:.
- **L2** Listen launch with Drive none: nexplorer connects and D: is not offered unless the Next was already on it.
- **L3** Each switch combination: the command line built matches the setting (check with Trace on, and with `-h` swapped in during development).
- **L4** Sync launch: `.sync5` runs with no mode option and the Drive is not switched.
- **L5** After `.sync5` ends: the screen is clear, no "scroll?" prompt, the Summary screen is back and ENTER launches again.

## Dot detection

- **D1** Rename the `.sync5` file on the card, press ENTER: the message `sync5 not found in c:/dot` appears, nothing is launched, the address is not saved, the Summary screen is back. Rename it back and ENTER launches normally.

## Exit

- **E1** Leave with the exit key: the BASIC prompt appears, the Next stays on the chosen Drive.

## To verify and record

- **V1** Speed, Flow control, Animation and Retro look do not break Sync mode.
- **V2** Effect of a Drive in Sync mode.
