import { readFile, writeFile } from "node:fs/promises";

export async function updateData(filePath, idFromParams, newObj) {
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
    console.error("Error:", err.message);
    return { error: err.message };
  }
}
