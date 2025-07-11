import { readFile, writeFile } from "node:fs/promises";

//------------------------------------
// Update item by ID
//------------------------------------
export async function updateItemById(filePath, idFromParams, newObj) {
  try {
    if (idFromParams !== newObj.id) {
      return { success: false, error: "ID mismatch" };
    }

    const fileData = await readFile(filePath, "utf8");
    const arr = JSON.parse(fileData);

    const index = arr.findIndex(obj => obj.id === idFromParams);
    if (index === -1) {
      return { success: false, error: "ID not found" };
    }

    arr[index] = newObj;
    await writeFile(filePath, JSON.stringify(arr, null, 2));

    return { success: true, updated: newObj };
  } catch (err) {
    console.error("Error updating item:", err.message);
    return { success: false, error: err.message };
  }
}
