import { openDb } from "./open.js";

export async function read(columns, planetName) {
  let db;
  try {
    // Open the database
    db = await openDb();

    // Construct the SQL query string with the columns directly
    const columnsString = columns.join(", ");
    const queryString = `SELECT ${columnsString} FROM exoplanet WHERE name = :planetName`;

    // Prepare the statement
    const stmt = await db.prepare(queryString);

    // Bind the named parameter
    await stmt.bind({ ":planetName": planetName });

    // Execute the statement and get the result
    const result = await stmt.get();

    // Finalize the statement
    await stmt.finalize();

    // Return the result
    return result;
  } catch (error) {
    console.error("Database read error:", error);
    throw error;
  } finally {
    // Ensure the database is closed if it was opened
    if (db) {
      db.close();
    }
  }
}
