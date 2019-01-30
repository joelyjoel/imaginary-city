/*
  The Enviroment object's prime responsibility it interpretting object strings.
  That is, natural language references to objects made by the user to objects
  in the game. These will usually take the form of noun-phrases.

  This task is broken into the following parts:
  1. Maintaining a list of objects which could be referenced.
      - Objects in the Room the user is currently in.
        - including objects within objects
      - Doors leading from the room the user is currently in.
      - Objects on the user's Person
      - Other categories not yet thought of
  2. Being able to test whether a given natural language regerence, matches a
    given object
  3. Searching the list of objects which could be referenced to matches of a
    given NL-Object-reference

*/

const parseNounPhrase = require("./parseNounPhrase")
const {Person} = require("../src")

class Enviroment {
  constructor() {
    this.protagonist = new Person
  }

  find(str) {
    let parsed = parseNounPhrase(str)
    let all = this.allNoumena
    let matches = all.filter(obj => obj.matchesRef(str))
    if(matches.length == 1)
      return matches[0]
    else if(matches.length > 1) {
      if(parsed.article == "a")
        return matches[Math.floor(Math.random()*matches.length)]
      console.log("Ambiguous:\n", ...matches.map(match => "\t"+match.ref()+"\n"))
    } else if(matches.length == 0)
      return null
  }

  get location() {
    if(this.protagonist)
      return this.protagonist.location
  }

  get allNoumena() {
    let all = []

    // character
    all.push(this.protagonist)

    // the room
    if(this.location) {
      all.push(this.location)

      // items in the room
      all = all.concat(this.location.items)

      // doors in the room
      all = all.concat(this.location.exits)

      // rooms accessible by the doors
      all = all.concat(this.location.accessibleRooms)
    }



    return all
  }
}
module.exports = Enviroment