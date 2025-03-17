# Dice Rolls

Throughout the game we employ six types of dice rolls in total: three **simple rolls** and three **exploded rolls**

## Simple dice rolls

Simple dice rolls, as can be suspected from the name, are simple. We woll a single die and the result is however many we rolled plus or minus occasional fixed modifiers. So for example `d100+28` instructs us to roll a hundred-sided die and add 28 to the result.

**Simple dice rolls** are used in two scenarios:
- During character creation the [abilities](character:abilities) of the character are rolled as `1d5+2`.
- When [levelling up](character:level) the character's [pain tolerance](character:fp) increases by `2d10` (plus some fixed value depending on skills).
- In [combat](rule:combat) the success of an attack or defence against it is determined via a `d100` roll (plus modifiers coming from combat situation, skill, the properties of the weapon used, etc.): if the attacking roll is bigger than the defensive roll, the attack was successful.

# Exploded dice rolls

When rolling **exploding dice** we roll the dice like normal and add up the numbers but whenever a die rolls a maximum, it is rerolled and the new value is added to the total too. 

If the reroll is a maximum too, we repeat the process, and so on. The symbol for exploding dice used in this game is **!**, so `3d10!` means roll a 10 sided die 3 times, and reroll the ones that roll a 10.

**Exploded dice rolls** are used in three scenarios:

- In the case of a [skill check](rule:skill_check) or [casting a spell](rule:magic) we roll with as many `d10!` as the rank of the relevant skill.
- On success of an attack or damage-dealing spell damage is rolled with `d5!` dice.
- At the start of a [combat round](rule:combat) we determine the **action points** available to a character in that round by rolling `1d10!+10`.

`DiceRoller|{"roll": "3d10!"}`
