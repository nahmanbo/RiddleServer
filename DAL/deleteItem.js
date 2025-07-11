import { readFile, writeFile } from "node:fs/promises";

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
    return { success: false, error: err.message };
  }
}
