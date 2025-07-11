import { readFile } from "node:fs/promises";

//------------------------------------
// Read all items from file (with optional filter)
//------------------------------------
export async function readItemsFromFile(filePath, filterObj = null) {
  try {
    const fileData = await readFile(filePath, "utf8");
    const arr = JSON.parse(fileData);

    if (filterObj) {
      const key = Object.keys(filterObj)[0];
      const value = filterObj[key];
      return arr.filter(obj => obj[key] === value);
    }

    return arr;
  } catch (err) {
    console.error("Error reading file:", err.message);
    return [];
  }
}
