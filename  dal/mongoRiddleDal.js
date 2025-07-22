import { client } from "../lib/mongoClient.js";

const db = client.db("Riddles");
const riddlesCollection = db.collection("riddles");

//====================================
// GET all riddles
//====================================
export async function getAllRiddles() {
  try {
    return await riddlesCollection.find().toArray();
  } catch (err) {
    console.error("Failed to get riddles:", err.message);
    throw new Error("Could not fetch riddles");
  }
}

//====================================
// CREATE a new riddle
//====================================
export async function createRiddle(riddle) {
  try {
    await riddlesCollection.insertOne(riddle);
    return riddle;
  } catch (err) {
    console.error("Failed to create riddle:", err.message);
    throw new Error("Could not create riddle");
  }
}

//====================================
// UPDATE a riddle by id
//====================================
export async function updateRiddle(id, newData) {
  try {
    const result = await riddlesCollection.findOneAndUpdate(
      { id },
      { $set: newData },
      { returnDocument: "after" }
    );

    return result.value;
  } catch (err) {
    console.error("Failed to update riddle:", err.message);
    throw new Error("Could not update riddle");
  }
}

//====================================
// DELETE a riddle by id
//====================================
export async function deleteRiddle(id) {
  try {
    const result = await riddlesCollection.deleteOne({ id });
    if (result.deletedCount === 0) {
      throw new Error("Riddle not found");
    }
    return { deletedCount: result.deletedCount };
  } catch (err) {
    console.error("Failed to delete riddle:", err.message);
    throw new Error("Could not delete riddle");
  }
}
