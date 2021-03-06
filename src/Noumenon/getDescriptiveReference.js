const {randexp} = require("randexp")
const specarr = require("../utility/specarr.js") // special array functions
//const DescriptionContext = require('../DescriptionContext')

let assignments = {

  generateReference(ctx) {
    // return a noun phrase which refers to this noumenon
    /*ctx.mode = "generate"
    let reg = this.refRegex(ctx)
    let ret = randexp(reg)
    return ret*/

    // NEW VERSION::


    let numberOfAdjectives = Math.floor(Math.random()*3)
    let numberOfPrepositionPhrases = 0//Math.floor(Math.random()*2)

    // if available, use propernoun
    if(this.hasProperNouns)
      return specarr.randomString(this, this.properNouns, ctx)

    else { // otherwise use noun phrase:
      // choose article
      let article = randexp(/a|the/)
      // choose adjectives
      let adjs = specarr.randomStrings(
        this,
        this.descriptorFunctions.adj,
        ctx,
        numberOfAdjectives,
      )
      // choose noun
      let noun = specarr.randomString(this, this.nouns, ctx)

      // choose preposition phrases
      let prepositionPhrases = []
      for(var prep in this.descriptorFunctions) {
        if(prepositionPhrases.length >= numberOfPrepositionPhrases)
          break
        if(prep == 'adj')
          continue
        let str = specarr.randomString(this, this.descriptorFunctions[prep], ctx)
        if(str)
          prepositionPhrases.push(prep+' '+str)
        if(prepositionPhrases.length > numberOfPrepositionPhrases)
          break
      }

      let str = [article, ...adjs, noun, ...prepositionPhrases].join(" ")

      return str
    }
  },

  getDescriptiveReference(ctx) {

    let str
    if(ctx && ctx.it == this)
      str = 'it'
    else
      str = this.generateReference(ctx)

    if(ctx)
      ctx.log(this, str)
    else
      console.warn('generating ref without ctx:', str)

    return str
  },

  ref(ctx) {
    // quick alias for get getDescriptiveReference
    return this.getDescriptiveReference(ctx)
  },

}

module.exports = Noumenon => Object.assign(Noumenon.prototype, assignments)
