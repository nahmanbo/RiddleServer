import { readFile, writeFile } from "node:fs/promises";

function generateNextId(array) {
  return array.length > 0
    ? Math.max(...array.map(item => item.id)) + 1
    : 1;
}

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
