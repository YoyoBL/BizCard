export function filterEmptyKeys(obj) {
   let filteredValues = {};

   for (let key in obj) {
      if (typeof obj[key] === "object") {
         filteredValues = {
            ...filteredValues,
            [key]: filterEmptyKeys(obj[key]),
         };
      } else {
         if (obj[key]) {
            filteredValues = { ...filteredValues, [key]: obj[key] };
         }
      }
   }
   return filteredValues;
}
