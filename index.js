reg = [
    [/^\d+$/, {type: "number"}],
    [/^[*\/]$/, {type: "op", precedence: 0}],
    [/^[+-]$/, {type: "op", precedence: 1}]
]
// Note that if a certain string matches two RegExps,
// We will pick the one with a lower index in the array.

// If we have two strings that match, we will use the longest one.

function separate(str) {
   let lexeme = ""
   let lexemes = []
   let data = ""
   for(let i = 0; i < str.length; ++i) {
      lexeme += str[i]
      if(data = reg.find(d => d[0].test(lexeme))) { // if we have a match
         if(i + 1 === str.length || !reg.some(d => d[0].test(lexeme + str[i + 1]))) {
               lexemes.push(Object.assign({...data[1]}, {value: lexeme}))
               lexeme = data = ""
         }
      } else {
		 lexeme = data = ""
      }
   }
   return lexemes
}

function solve(str) {
  return calculate(separate(str))[0].value
}

function calculate(lexemes) {
  // This code WILL crash if you give it a malformed expression. So please don't do that :)
  let ops = {
     "*": (a, b) => a * b,
     "/": (a, b) => a / b,
     "+": (a, b) => a + b,
     "-": (a, b) => a - b
  }
  let prio = 0
  let indx
  while(lexemes.length !== 1) {
      prio += lexemes.every(n => n.type !== "op" || n.precedence !== prio)
      indx = lexemes.findIndex(n => n.type === "op" && n.precedence === prio)
      if(indx !== undefined) {
          lexemes.splice(indx - 1, 3, {type: "number", value: ops[lexemes[indx].value](+lexemes[indx - 1].value, +lexemes[indx + 1].value)})
      }
  }
  return lexemes
}
