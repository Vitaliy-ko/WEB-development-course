'use strict'

function getSumPrice (house) {
   let result;
   let isDataValid = checkDataValidation(house);
   if (isDataValid) {
      result = 0;
      let zeroPriceHouse = {};
      for (let i = 0; i < house.length; i++) {
         if (i > 0 && Object.keys(zeroPriceHouse).length === house[0].length) {
            break;
         }
         for (let j = 0; j < house[0].length; j++) {
            if (zeroPriceHouse[j] === 0) {
               continue;
            } else if (house[i][j] === 0) {
               zeroPriceHouse[j] = 0;
               continue;
            } 
            result += house[i][j];
         }
      }
   } else {
      result = 'Data validation error';
   }
   return result;
}

function checkDataValidation (houseData) {
   let result = false;
   let houseParams = getHouseParams(houseData);
   let isAcceptableFloursQuantity = checkParams(houseParams.houseFloursCount);
   let isAcceptableFlatsQuantity = checkParams(houseParams.houseFlatsCount);
   let isAcceptableFlatsPrice = checkParams(houseParams.flatsPrice);

   if (isAcceptableFloursQuantity && isAcceptableFlatsQuantity && isAcceptableFlatsPrice) {
      result = true;
   }

   return result;
}

function getHouseParams (houseData) {
   let houseParams = {
      houseFloursCount: {
         min: 1,
         max: 5,
         set current (houseData) {
            this._currentFloursCount = houseData.length 
         },
         get current () {
            return this._currentFloursCount;
         }
      },

      houseFlatsCount: {
         min: 1,
         max: 5,
         set current (houseData) {
            this._current;
            let isFlatsCountEqual = this._checkFlatsCountEquality(houseData);
            if (isFlatsCountEqual) {
               this._currentFlatsCount = houseData[0].length;
            }
         },
         get current () {
            return this._currentFlatsCount;
         },
         _checkFlatsCountEquality (houseData) {
            let result = true;
            let count = houseData[0].length;
            houseData.forEach((flat) => {
               if(count !== flat.length) {
                  result = false;
               }
            })
            return result;
         }
      },

      flatsPrice: {
         min: 1,
         max: 10,
         set current (houseData) {
            this._currentMax = 0;
            houseData.forEach((flat) => {
               flat.forEach((price) => {
                  if(this._currentMax < price) {
                     this._currentMax = price;
                  }
               });
            });
         },
         get current () {
            return this._currentMax;
         },
      }
   };

   for (let param in houseParams) {
      houseParams[param].current = houseData;
   }

   return houseParams;
}

function checkParams (value) {
   let result = false;
   if (value.current >= value.min && value.current <= value.max) {
      result = true;
   }
   return result;
}


let building = [[1, 2, 0, 1, 0], 
                [0, 1, 1, 2, 3], 
                [1, 0, 2, 0, 5], 
                [2, 0, 3, 3, 3],
                [2, 2, 2, 2, 2]]

console.log(getSumPrice(building));
