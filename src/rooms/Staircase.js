/*
  Staircase is a generative subclass of Room
*/

const InteriorRoom = require("./InteriorRoom.js")

class Staircase extends InteriorRoom {
  // TODO
}
Staircase.prototype.isStaircase = true
Staircase.prototype.roomType = "staircase"

Staircase.prototype.addNouns("staircase")

module.exports = Staircase
