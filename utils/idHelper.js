//====================================
// Returns the next unique ID in array
//====================================
export function getNextIdFromArray(arr) {
    return arr.length > 0 ? Math.max(...arr.map(item => item.id)) + 1 : 1;
  }
  