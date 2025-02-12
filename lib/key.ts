import db from "./db";

export async function getApiKeyFromDB(): Promise<string | null> {
    const apiKeyRecord = await db.apiKey.findFirst();
    return apiKeyRecord ? apiKeyRecord.key : null;
}
