# Mineur (Miner)

A drilling game: dig down into the ground with your drill rig, collect ores, bring them back up to sell at the surface and upgrade your machine to go ever deeper. Fuel is limited and lava is unforgiving.

*Version française : [README.md](README.md)*

## Controls

- **Arrows** or **ZQSD** (WASD on QWERTY): move and dig left, right or down.
- **↑**: climb back up through an already dug tunnel (uses a little fuel). You never dig upwards.
- **Mouse** or **touch**: click on one side of the rig to go that way.
- **1**, **2**, **3** or the buttons below the game: buy an upgrade (at the surface only).
- **New game**: a new, randomly generated underground.

## The underground

The mine is 20 tiles wide and 87 metres deep. It contains:

- **dirt**, quick to dig, costing 1 fuel;
- **hard rock**, more common the deeper you go: it costs 3 fuel with the starting drill, 2 at level 2, 1 at level 3, and takes longer;
- **lava**, from 30 metres down: entering it sends you back to the surface;
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

## The surface

When you get back to the surface, the whole hold is sold at once and the tank refills automatically ($1 per fuel unit, as far as your money goes). If you have neither fuel nor money left, you get enough to set off again.

## Upgrades

- **Tank**: +30 fuel (start: 60). Price: $40 + $2 per current tank unit.
- **Hold**: +4 slots (start: 8). Price: $30 + $6 per current slot. A full hold refuses further ores.
- **Drill**: level 2 then 3, for hard rock. Price: $150 at level 1, $600 at level 2.

## Rescue

Touching lava or running out of fuel below the surface calls the rescue team: back to the top, hold lost and a $25 fee. Watch the fuel gauge, which turns red below a quarter.

## Statistics

The panel shows the depth record, the largest sum ever reached and the current game (depth and money).

## Data and sync

The depth record and largest sum are stored by NeoDex, backed up and synced between your PCs when sync is on.

## Install

In NeoDex: **NeoStore → Discover → Mineur → Install**.

Building a plugin: see the [NeoDex SDK](https://github.com/NDesumeur/neodex-sdk).
