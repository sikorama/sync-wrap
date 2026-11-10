# Improvements

## Questions à trancher

- `sync-wrap.txt` (touche `A`) : l'adresse actuelle est affichée au-dessus de la saisie, pas préremplie comme la spec le demande (story 10). Existe-t-il un moyen de préremplir un `INPUT` en NextBASIC ? Sinon, amender la spec.
- `sync-wrap.txt` (lancement) : `.$ sync5 $c` avec `c$` vide (Sync, réglages par défaut) laisse-t-il `.sync5` se lancer normalement ? À vérifier sur la Next.
- `sync-wrap.txt` (lancement) : le `POKE 23692,255` avant et après le lancement supprime-t-il bien le « scroll? » ? À vérifier sur la Next (L5).
- `docs/acceptance.md` V1, V2 : effets des options communes et du Drive en mode Sync, à mesurer sur la Next.

## Améliorations

- `sync-wrap.txt` : une écriture ratée de `syncwrap.cfg` est ignorée sans message. Prévenir l'utilisateur (carte en lecture seule, par exemple) ?
- `sync-wrap.txt` : après une erreur de lecture au milieu de `syncwrap.cfg`, le flux est fermé par un `CLOSE` piégé ; vérifier qu'aucun flux ne reste ouvert sur la Next.
- `test/build.test.js` : le test de build ne couvre pas la validité syntaxique du NextBASIC. Ajouter `txt2bas -t` au build ou au test.

## Notes

- `probe/probe-files.txt`, `probe/probe-sync.txt` et `probe/probe-cfg.txt` sont gardés comme exemples de syntaxe vérifiée sur la Next (fichiers, `ON ERROR`, lecture de `nextsync.cfg`).
- `nextsync.cfg` n'a pas de fin de ligne : `INPUT #n;LINE` y échoue (erreur 19) ; la lecture se fait par `DIM #n TO` puis `NEXT #n TO`. Après des programmes interrompus en pleine lecture, la Next peut rester dans un état où toute lecture échoue : un redémarrage à froid le rétablit.
