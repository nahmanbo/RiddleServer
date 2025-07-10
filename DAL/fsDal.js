
import { readFile, writeFile } from "node:fs/promises";

export async function createData(filePath, newItem) {
  try {
    const data = await readFile(filePath, "utf8");
    const arr = JSON.parse(data);

    const newId = generateNextId(arr);
    const newItemWithId = { id: newId, ...newItem };
    arr.push(newItemWithId);

    await writeFile(filePath, JSON.stringify(arr, null, 2));

    return newItemWithId;
  } catch (err) {
    console.error("Error creating data:", err.message);
    return null;
  }
}

export async function deleteData(filePath, id) {
    try {
        const fileData = await readFile(filePath, "utf8");
        const arr = JSON.parse(fileData);

        const newArr = arr.filter(obj => obj.id !== id);

        await writeFile(filePath, JSON.stringify(newArr, null, 2));
    } catch (err) {
        console.error("Error:", err.message);
    }
}