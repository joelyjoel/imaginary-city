const randomName = require("random-name")

module.exports = {
  buildingMaterial: require("./buildingMaterial"),
  color: require("./color.js"),
  flooring: require("./flooring.js"),
  firstName: randomName.first,
  surname: randomName.last,
  title: require("./title.js"),
  material: require("./material.js"),
}
Object.assign(module.exports, require('./pos'))
