# DarwinBots.js Terminology

Bot
  : A Bot is a single entity within a simulation. Each bot has a set of sysvars
    which are available for read/write access within the bot's dna. The bot also
    contains simulation-managed state that is not accessable from within the bot's
    dna.

Dna
  : A sequence of genes describing how a bot should behave.

Gene
  : A block of code which activates once per cycle if a set of conditions is met.

Sysvars
  : The set of variables which are accessable from within a bot's dna. Currently
    recognized sysvars are:

    * nrg - The bot's current energy value, sync'd after each dna execution cycle
    * speciesId - Id uniquely identifying this bot's species in the sim

Species
  : A species is uniquely identified by its name and dna. All bots belong to a
    species.

Simulation
  : A collection of Bots and settings which can be updated via rules. Created
    with a configuration that describes what bots to spawn initially and how
    the rules should be applied.

