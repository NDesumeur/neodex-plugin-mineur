# Mineur

Un jeu de forage : descends dans le sol avec ta foreuse, ramasse les minerais, remonte les vendre à la surface et améliore ta machine pour aller toujours plus bas. Le carburant est compté et la lave ne pardonne pas.

*English version: [README.en.md](README.en.md)*

## La boucle du mineur (nouveau en 1.2.0)

- **Cinq améliorations** (touches 1 à 5, à la surface) : réservoir, soute, foret, et maintenant **coque** (les points de vie de la foreuse) et **moteur** (on roule et on creuse plus vite, jusqu'au niveau 4).
- **Les dangers** abîment la coque : des **poches de gaz** cachées dans la terre (de petites bulles vertes les trahissent, -25), des **rochers** qui tremblent puis tombent quand on creuse dessous (-30), et les **chutes** de plus de trois cases. Coque à zéro : les secours remontent la foreuse, la soute est perdue.
- **La vente détaillée** : en remontant, un tableau donne chaque minerai vendu, le total, le bonus, et l'amélioration la moins chère à acheter ensuite (en vert si elle est à portée). Les réparations se font toutes seules, 1 $ par point.
- **La ville** grandit avec le total des ventes de toutes les parties : Pompe, Forge, Auberge, Banque, Observatoire ; chaque bâtiment donne +5 % aux ventes et se dessine à la surface.
- **Les paliers** : tous les 30 m, la première fois dans une partie, une prime (profondeur × 5 $).
- **Les reliques** (une par tranche de 40 m : vieille lampe, pioche rouillée, pièce ancienne, statuette, crâne de bête, œuf de pierre) se vendent cher et restent dans la collection.
- **La créature** dort dans une grotte tout au fond (240 m) : la trouver paie 5 000 $ et donne un **prestige** ; chaque prestige rend les minerais 30 % plus chers dans les parties suivantes, avec un peu plus de gaz et de rochers.

## Commandes

- **Flèches** ou **ZQSD** : avancer et creuser à gauche, à droite ou vers le bas.
- **↑** : remonter par une galerie déjà creusée (consomme un peu de carburant). On ne creuse jamais vers le haut.
- **Souris** ou **toucher** : clique d'un côté du véhicule pour aller dans cette direction.
- **1**, **2**, **3** ou les boutons sous le jeu : acheter une amélioration (à la surface seulement).
- **Nouvelle partie** : un nouveau sous-sol, tiré au hasard.
- **Plein écran** : le bouton du même nom ; Échap pour en sortir. Hors plein écran, la mine prend toute la place que laisse la fenêtre, aussi sur grand écran.

## Le sous-sol

La mine fait 20 cases de large et **240 mètres** de profondeur. On y trouve :

- de la **terre**, qui se creuse vite et coûte 1 de carburant ;
- de la **roche dure**, de plus en plus fréquente en profondeur : elle coûte 3 de carburant avec le foret de départ, 2 au niveau 2, 1 au niveau 3, et prend plus de temps ;
- de la **roche noire**, sous 100 mètres : il faut un foret 3 au moins pour l'attaquer (6 de carburant au niveau 3 jusqu'à 2 au niveau 5) ;
- de la **lave**, à partir de 30 mètres et de plus en plus fréquente : y entrer renvoie à la surface ;
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
| Émeraude | 600 $ | 92 m |
| Améthyste | 1 100 $ | 120 m |
| Diamant | 2 000 $ | 150 m |
| Mithril | 3 500 $ | 185 m |
| Étoilite | 6 000 $ | 215 m |

Les pierres précieuses du fond scintillent. En descendant, la terre change cinq fois, et un message annonce chaque nouvelle couche : **la terre**, **l'argile rouge** (45 m), **la pierre bleue** (90 m), **les cristaux** (150 m) et **le cœur du monde** (200 m).

## La surface

En remontant à la surface, toute la soute se vend d'un coup et le plein se fait tout seul (1 $ par unité de carburant, selon ce que tu as). Si tu n'as plus ni carburant ni argent, on te donne de quoi repartir.

## Améliorations

- **Réservoir** : +30 de carburant (départ : 60). Prix : 40 $ + 2 $ par unité de réservoir actuelle.
- **Soute** : +4 places (départ : 8, 24 au plus). Prix : 30 $ + 6 $ par place actuelle. Une soute pleine refuse les minerais suivants.
- **Foret** : du niveau 2 au niveau 5, pour la roche dure puis la roche noire. Prix : 150 $ × niveau actuel au carré (150, 600, 1 350 puis 2 400 $).

## Les sons

Le foret gratte pendant qu'il creuse, plus grave dans la roche dure ; chaque minerai ramassé tinte selon sa valeur. À la surface, une pièce sonne par minerai vendu, puis la caisse, et le plein fait glou-glou.

## Les secours

Toucher la lave ou tomber en panne sèche sous la surface appelle les secours : retour en haut, soute perdue et 25 $ de frais. Surveille la jauge de carburant, qui passe au rouge sous un quart.

## Statistiques

Le panneau affiche la profondeur record, la plus grosse somme jamais atteinte et la partie en cours (profondeur et argent).

## Données et synchronisation

La profondeur record et la plus grosse somme sont enregistrées par NeoDex, sauvegardées et synchronisées entre tes PC si la synchro est activée.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Mineur → Installer**.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).
