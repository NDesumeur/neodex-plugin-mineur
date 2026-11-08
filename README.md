# Mineur

Un jeu de forage : descends dans le sol avec ta foreuse, ramasse les minerais, remonte les vendre à la surface et améliore ta machine pour aller toujours plus bas. Le carburant est compté et la lave ne pardonne pas.

*English version: [README.en.md](README.en.md)*

## Commandes

- **Flèches** ou **ZQSD** : avancer et creuser à gauche, à droite ou vers le bas.
- **↑** : remonter par une galerie déjà creusée (consomme un peu de carburant). On ne creuse jamais vers le haut.
- **Souris** ou **toucher** : clique d'un côté du véhicule pour aller dans cette direction.
- **1**, **2**, **3** ou les boutons sous le jeu : acheter une amélioration (à la surface seulement).
- **Nouvelle partie** : un nouveau sous-sol, tiré au hasard.

## Le sous-sol

La mine fait 20 cases de large et 87 mètres de profondeur. On y trouve :

- de la **terre**, qui se creuse vite et coûte 1 de carburant ;
- de la **roche dure**, de plus en plus fréquente en profondeur : elle coûte 3 de carburant avec le foret de départ, 2 au niveau 2, 1 au niveau 3, et prend plus de temps ;
- de la **lave**, à partir de 30 mètres : y entrer renvoie à la surface ;
- des **poches vides**, où la foreuse tombe ;
- des **minerais**, plus précieux à mesure qu'on descend.

| Minerai | Valeur | À partir de |
|---|---|---|
| Cuivre | 5 $ | la surface |
| Fer | 12 $ | 8 m |
| Argent | 30 $ | 20 m |
| Or | 70 $ | 35 m |
| Rubis | 160 $ | 55 m |
| Saphir | 320 $ | 72 m |

## La surface

En remontant à la surface, toute la soute se vend d'un coup et le plein se fait tout seul (1 $ par unité de carburant, selon ce que tu as). Si tu n'as plus ni carburant ni argent, on te donne de quoi repartir.

## Améliorations

- **Réservoir** : +30 de carburant (départ : 60). Prix : 40 $ + 2 $ par unité de réservoir actuelle.
- **Soute** : +4 places (départ : 8). Prix : 30 $ + 6 $ par place actuelle. Une soute pleine refuse les minerais suivants.
- **Foret** : niveau 2 puis 3, pour la roche dure. Prix : 150 $ au niveau 1, 600 $ au niveau 2.

## Les secours

Toucher la lave ou tomber en panne sèche sous la surface appelle les secours : retour en haut, soute perdue et 25 $ de frais. Surveille la jauge de carburant, qui passe au rouge sous un quart.

## Statistiques

Le panneau affiche la profondeur record, la plus grosse somme jamais atteinte et la partie en cours (profondeur et argent).

## Données et synchronisation

La profondeur record et la plus grosse somme sont enregistrées par NeoDex, sauvegardées et synchronisées entre tes PC si la synchro est activée.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Mineur → Installer**.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).
