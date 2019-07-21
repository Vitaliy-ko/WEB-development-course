function isNumbersIncreases(sequence) {
   let result = isSequenceIncreases(sequence);

   if (result !== true) {
      for (let i = 0; i < sequence.length; i++) {
         let numbersSequence = sequence.slice();
         numbersSequence.splice(i, 1);
         
         if (isSequenceIncreases(numbersSequence)) {
            result = true;
         }
      }
   }

   return result;
}

function isSequenceIncreases(sequence) {
   let result = true;
   for (let i = 0; i < sequence.length - 1; i++) {
      if (sequence[i] >= sequence[i + 1]) {
         result = false;
         break;
      }
   }
   return result;
}


let test = [
   [1, 2, 3, 4, 99, 5, 6, 7, 8],
   [1, 2, 3, 4, 99, 101, 6, 67, 8],
   [3, 5, 67, 98, 3],
   [1, 2, 3, 4, 3, 6],
   [3, 7, 5, 8, 9, 10],
   [1, 2, 1, 2],
   [1, 1, 1, 2, 3],
   [100, 1, 2, 3, 4, 5],
   [1, 2, 500, 3, 500],
   [1, 2, 100, 3, 3, 100]
]

test.forEach((item) => {
   console.log(item, `==>`, isNumbersIncreases(item))
});