Label: ready-for-agent

# sync-wrap: one-screen launcher for `.sync5` on the Next

## Problem Statement

I use the `.sync5` dot command on my ZX Spectrum Next to reach nexplorer (Listen mode) or to pull files from a NextSync server (Sync mode). Launching it means typing a command with options, and the Next's keyboard makes that painful: dashes and other symbols are hard to reach, and I have to remember which options exist. I also learned two things by trial that are easy to forget: switching to the D: drive before launching in Listen mode is what lets nexplorer see D:, and `-nv` makes the connection more stable. Users of nexplorer who do not want to type commands on the Next need a way to connect without knowing any of this.

## Solution

A NextBASIC program, `sync-wrap`, that runs on the Next and shows a single **Summary screen**: the **Server address**, the mode (**Listen mode** or **Sync mode**), the speed, the flow control, the **Trace**, the **Animation**, the **Retro look** and the **Drive**. Pressing ENTER **Launches** `.sync5` with exactly those settings. Pressing the key shown next to a setting changes it. Only the Server address needs real typing, and it is plain text where dots are easy to type.

When `.sync5` ends, the program clears the screen and returns to the Summary screen. The last choices are remembered in a small file next to where the program was started, so the usual case is one keypress: ENTER.

The program is developed in its own local repository as a plain-text source tokenised by `txt2bas`. It will move into nexplorer's `examples/` folder once both work.

## User Stories

1. As a nexplorer user, I want one screen that shows how `.sync5` will be launched, so that I never have to type a command on the Next.
2. As a nexplorer user, I want to press ENTER to launch with the settings shown, so that the usual case takes one keypress.
3. As a user, I want each setting changed by one key displayed on the screen, so that I do not need to remember commands or options.
4. As a user, I want the program to remember my last settings, so that I do not set them again at each start.
5. As a user, I want sensible defaults when no settings were saved, so that the first launch works without configuration.
6. As a user, I want the program to carry on with the defaults when the settings file is missing or unreadable, so that a damaged file never blocks me.
7. As a user, I want to see the current Server address on the Summary screen, so that I know which Local `.sync5` will contact.
8. As a user, I want a clear "not set" indication when no Server address is saved, so that I know why a launch would fail.
9. As a user, I want to change the Server address with free text, so that I can enter an IP address or a domain name.
10. As a user, I want the current Server address offered as the default when I change it, so that a small correction does not mean retyping everything.
11. As a user, I want an empty address refused, so that I do not erase a working address by accident.
12. As a user, I want an address starting with a dash refused, so that it is never mistaken for an option by `.sync5`.
13. As a user, I want to be told that I am responsible for typing the address correctly, so that I understand the program does not check that Local answers.
14. As a user, I want the address saved before launching, so that `.sync5` connects to what the screen shows.
15. As a nexplorer user, I want Listen mode launched with the equivalent of `-L`, so that my Next connects to nexplorer.
16. As a user of a NextSync server, I want Sync mode launched with no option, so that new files are pulled as `.sync5` normally does.
17. As a user, I want to choose the speed among default, slow and fast, so that I can adapt to my Wi-Fi module.
18. As a user, I want to keep the flow control on or turn it off, so that I can work around a board that does not support it.
19. As a nexplorer user, I want Trace off by default, so that the connection is more stable.
20. As a user, I want to turn Trace on, so that I can see the commands the Next receives when diagnosing a transfer.
21. As a user, I want to turn the Animation off, so that `.sync5` draws less.
22. As a user, I want to turn the Retro look off, so that I get the usual screen colours.
23. As a nexplorer user, I want the Drive switched to D: before a Listen launch, so that nexplorer can browse D:.
24. As a user, I want to choose C:, D: or none for the Drive, so that I can reach the drive I need or leave the current one untouched.
25. As a user, I want D: as the default Drive, so that the usual case works without a change.
26. As a user, I want the Drive applied only in Listen mode, so that Sync mode behaves exactly as `.sync5` does until its effect is known.
27. As a user, I want the screen cleared and the Summary screen shown again after `.sync5` ends, so that I can relaunch or change something without a prompt.
28. As a user, I want no "scroll?" prompt after `.sync5` has filled the screen, so that returning to the Summary screen needs no keypress.
29. As a user, I want an explicit key to leave the program, so that I can return to the BASIC prompt when I choose.
30. As a user, I want the Next to stay on the chosen Drive when I leave, so that nothing surprising is undone behind my back.
31. As a user, I want only short English text, so that the screen fits and stays readable.
32. As the developer, I want a plain-text source kept in version control, so that changes are reviewable.
33. As the developer, I want a build script that produces the tokenised `.bas`, so that I never tokenise by hand.
34. As the developer, I want the generated `.bas` ignored by git, so that the repository holds only the source.
35. As the developer, I want a check that the build produced a valid `.bas`, so that a broken file is noticed before it reaches the Next.
36. As the developer, I want written acceptance criteria for each feature, so that I can replay them on the Next after each pass.
37. As a user, I want to be told when the `.sync5` dot is missing from the card, so that I know why nothing launched.
38. As a user, I want to return to the Summary screen after that message, so that I am never left at a prompt.

## Implementation Decisions

- The program runs on the Next in NextBASIC and does not depend on ZX-Next-Unite.
- **Summary screen**: one screen listing Server address, Mode, Speed, Flow control, Trace, Animation, Retro look and Drive. ENTER launches. Each setting has one key shown on the screen. A key leaves the program.
- **Defaults**: Listen mode, default speed, flow control on, Trace off, Animation on, Retro look on, Drive D:.
- **Switch meaning**: Trace off sends `-nv`. Animation off sends `-na`. Retro look off sends `-nr`. Flow control off sends `-nfc`. Speed sends `-s` (slow), `-f` (fast) or nothing for the default. Listen mode sends `-L`; Sync mode sends no mode option.
- **Scope of each setting**: Trace and Drive apply to Listen mode only. Speed, Flow control, Animation and Retro look are sent in both modes; that none of them breaks Sync mode is a point to verify on the Next.
- **Dot command calls**: a dot command cannot take a BASIC variable directly. The program builds the whole argument string in a BASIC variable and launches `.sync5` through the `.$` dot, which was verified to work with `.sync5` and with several options in one string. No generated template or per-combination lines are needed.
- **Server address**: read by BASIC from the saved `.sync5` configuration file, which holds only the server name, to display it. Changed by running `.sync5` with the address as its only argument, which only saves it and starts no session. The program saves the address first, then launches in a second call. The program never writes the `.sync5` configuration file itself.
- **Address validation**: empty and leading `-` are refused. Nothing else is checked, including whether the address is an IP or a domain name, or whether Local answers.
- **Drive**: C:, D: or none. A Listen launch with a Drive runs the `.cd` dot with the drive in quotes before `.sync5`. Because the argument must be literal, there is one literal `.cd` line per drive, selected by branching. Do not put a dot command after `THEN` or follow it with `:` on the same line. The program does not restore the previous drive on exit.
- **Dot detection**: at each Launch, before anything else, the program checks that the `.sync5` dot file exists on the system drive, by opening it for input under an error trap (opening a missing file is a BASIC error that can be trapped). If it is missing, the program shows a short message ("sync5 not found in c:/dot") and returns to the Summary screen without launching or saving the address. The version is not checked; nexplorer handles the minimum version on its side.
- **Back to the Summary screen**: `.sync5` returns to BASIC when its session ends. The program then clears the screen and sets the scroll counter so that no "scroll?" prompt appears, then shows the Summary screen again.
- **Settings file**: a text file named `syncwrap.cfg`, one value per line (Mode, Speed, Flow control, Trace, Animation, Retro look, Drive), created in the current folder when the program was started. It is rewritten when a setting changes. A missing or unreadable file means the defaults, with no error message. The Server address is not stored here.
- **Language**: English only, very short strings, with the vocabulary of `GLOSSARY.md`. No translation mechanism.
- **Build**: the plain-text source is the versioned reference. `txt2bas` is a local npm dependency of the repository, with no global install. A build script produces the `.bas`, which git ignores.
- **Transfer to the Next**: done by the user with `.sync5`; not part of this program.

## Testing Decisions

- A good test checks behaviour the user can see on the Next, never how the program is written.
- There are two seams only. The **build seam** is automated on the PC. The **behaviour seam** is manual on the real Next, because there is no emulator and no BASIC test framework.
- **Build seam (automatic)**: the build succeeds, produces a non-empty `.bas`, and the file carries a valid +3DOS header. It does not check behaviour.
- **Behaviour seam (manual, on the Next)**: written before the code, replayed by the user after each pass. Acceptance criteria, each in the form "do this, expect that":
  - Start with no `syncwrap.cfg`: the Summary screen shows the defaults.
  - Change each setting with its key: the screen shows the new value; restart the program: the value is kept.
  - Corrupt or delete `syncwrap.cfg`: the program starts with the defaults and no error.
  - Server address: shown as saved; shown as "not set" when no file exists; empty and `-x` are refused; a typed address is saved and appears on the screen afterwards; `.sync5` was not launched by the save.
  - Listen launch, default settings: `.sync5` runs with `-L -nv`; nexplorer connects and sees D:.
  - Listen launch with Drive none: nexplorer connects and D: is not offered unless the Next was already on it.
  - Dot detection: temporarily rename the `.sync5` file on the card, press ENTER: the message appears, nothing is launched, the Summary screen is back; rename it back and ENTER launches normally.
  - Each switch combination: the command line built matches the setting (check with Trace on, and with `-h` swapped in during development).
  - Sync launch: `.sync5` runs with no mode option and the Drive is not switched.
  - After `.sync5` ends: the screen is clear, no "scroll?" prompt, the Summary screen is back and ENTER launches again.
  - Leave with the exit key: the BASIC prompt appears, the Next stays on the chosen Drive.
- To verify on the Next and record in the criteria: Speed, Flow control, Animation and Retro look do not break Sync mode; the effect of a Drive in Sync mode.
- Prior art: nexplorer asks for real-hardware tests in its `improvements.md`; the same read-only-first caution applies, here to nothing that writes to the SD card except what the user chooses to sync.

## Out of Scope

- `.sync5 -send`.
- Choosing a folder: the working directory idea was dropped in favour of the Drive.
- Applying the Drive in Sync mode, until its effect is tested.
- Restoring the previous drive when leaving the program.
- Checking that Local answers, or validating an IP address beyond refusing an empty one and a leading dash.
- Checking the version of the `.sync5` dot, or telling the user where to download it.
- Any translation mechanism.
- An emulator or a simulator of the program on the PC; automatic tests of the BASIC behaviour.
- Writing the `.sync5` configuration file directly.
- Updating nexplorer's documents (see Further Notes).
- Publishing the repository.

## Further Notes

- The program is meant to become a launcher example in nexplorer's `examples/` folder (its ticket 15). Until then it lives in its own local repository.
- The observation that D: only shows in nexplorer after `.cd "D:"` answers a question in nexplorer's `improvements.md` and may change nexplorer's waiting screen. Those files are not touched by this spec; the owner decides when.
- Facts about `.sync5` (options, saved address file, return to BASIC) come from the ZX-Next-Unite sources and from trials on the owner's Next, not from a published specification of the dot. A newer `.sync5` could change them.
