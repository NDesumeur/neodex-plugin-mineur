# Mineur (Miner)

A drilling game: dig down into the ground with your drill rig, collect ores, bring them back up to sell at the surface and upgrade your machine to go ever deeper. Fuel is limited and lava is unforgiving.

*Version française : [README.md](README.md)*

## Controls

- **Arrows** or **ZQSD** (WASD on QWERTY): move and dig left, right or down.
- **↑**: climb back up through an already dug tunnel (uses a little fuel). You never dig upwards.
- **Mouse** or **touch**: click on one side of the rig to go that way.
- **1**, **2**, **3** or the buttons below the game: buy an upgrade (at the surface only).
- **New game**: a new, randomly generated underground.
- **Full screen**: the button of the same name; Escape to leave it. Otherwise the mine takes all the room the window leaves, big screens included.

## The underground

The mine is 20 tiles wide and **240 metres** deep. It contains:

- **dirt**, quick to dig, costing 1 fuel;
- **hard rock**, more common the deeper you go: it costs 3 fuel with the starting drill, 2 at level 2, 1 at level 3, and takes longer;
- **black rock**, below 100 metres: you need at least a level 3 drill to break it (6 fuel at level 3 down to 2 at level 5);
- **lava**, from 30 metres down and more and more common: entering it sends you back to the surface;
- **empty pockets**, where the rig falls;
- **ores**, more valuable the deeper you go.

| Ore | Value | From |
|---|---|---|
| Copper | $5 | the surface |
| Iron | $12 | 8 m |
| Silver | $30 | 20 m |
| Gold | $70 | 35 m |
| Ruby | $160 | 55 m |
| Sapphire | $320 | 72 m |
| Emerald | $600 | 92 m |
| Amethyst | $1,100 | 120 m |
| Diamond | $2,000 | 150 m |
| Mithril | $3,500 | 185 m |
| Starstone | $6,000 | 215 m |

The precious stones at the bottom twinkle. On the way down the earth changes five times, and a message announces each new layer: **the earth**, **the red clay** (45 m), **the blue stone** (90 m), **the crystals** (150 m) and **the heart of the world** (200 m).

## The surface

When you get back to the surface, the whole hold is sold at once and the tank refills automatically ($1 per fuel unit, as far as your money goes). If you have neither fuel nor money left, you get enough to set off again.

## Upgrades

- **Tank**: +30 fuel (start: 60). Price: $40 + $2 per current tank unit.
- **Hold**: +4 slots (start: 8, 24 at most). Price: $30 + $6 per current slot. A full hold refuses further ores.
- **Drill**: from level 2 to level 5, for hard rock then black rock. Price: $150 × current level squared ($150, $600, $1,350 then $2,400).

## Sounds

The drill grinds while it digs, deeper in hard rock; each ore you pick up chimes by its value. At the surface, a coin rings for each ore sold, then the cash register, and the refill goes glug-glug.

## Rescue

Touching lava or running out of fuel below the surface calls the rescue team: back to the top, hold lost and a $25 fee. Watch the fuel gauge, which turns red below a quarter.

## Statistics

The panel shows the depth record, the largest sum ever reached and the current game (depth and money).

## Data and sync

The depth record and largest sum are stored by NeoDex, backed up and synced between your PCs when sync is on.

## Install

In NeoDex: **NeoStore → Discover → Mineur → Install**.

Building a plugin: see the [NeoDex SDK](https://github.com/NDesumeur/neodex-sdk).
