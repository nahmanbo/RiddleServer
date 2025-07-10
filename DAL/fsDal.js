import { readFile, writeFile } from "node:fs/promises";
import { getNextIdFromArray } from "../utils/idHelper.js";

//------------------------------------
// Create new item and write to file
//------------------------------------
export async function createItemToFile(filePath, newItem) {
  try {
    const data = await readFile(filePath, "utf8");
    const arr = JSON.parse(data);

    const newId = getNextIdFromArray(arr);
    const newItemWithId = { id: newId, ...newItem };
    arr.push(newItemWithId);

    await writeFile(filePath, JSON.stringify(arr, null, 2));

    return newItemWithId;
  } catch (err) {
    console.error("Error creating data:", err.message);
    return null;
  }
}

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

//------------------------------------
// Update item by ID
//------------------------------------
export async function updateItemById(filePath, idFromParams, newObj) {
  try {
    if (idFromParams !== newObj.id) {
      console.error("ID in URL and body do not match");
      return { error: "ID mismatch" };
    }

    const fileData = await readFile(filePath, "utf8");
    const arr = JSON.parse(fileData);

    const index = arr.findIndex(obj => obj.id === idFromParams);
    if (index === -1) {
      console.error("ID not found in data");
      return { error: "ID not found" };
    }

    arr[index] = newObj;
    await writeFile(filePath, JSON.stringify(arr, null, 2));

    return { success: true, updated: newObj };
  } catch (err) {
    console.error("Error updating item:", err.message);
    return { error: err.message };
  }
}

//------------------------------------
// Delete item by ID
//------------------------------------
export async function deleteItemById(filePath, id) {
  try {
    const fileData = await readFile(filePath, "utf8");
    const arr = JSON.parse(fileData);

    const newArr = arr.filter(obj => obj.id !== id);
    await writeFile(filePath, JSON.stringify(newArr, null, 2));

    return { success: true, updatedList: newArr };
  } catch (err) {
    console.error("Error deleting item:", err.message);
    return { error: err.message };
  }
}
