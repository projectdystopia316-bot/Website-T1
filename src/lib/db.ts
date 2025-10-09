import { get, set, del } from 'idb-keyval'

export interface WaitlistEntry {
  name: string
  email: string
  consent: boolean
  timestamp: number
  id: string
}

const WAITLIST_KEY = 'waitlist_entries'

/**
 * Add a new entry to the waitlist
 */
export async function addEntry(
  entry: Omit<WaitlistEntry, 'timestamp' | 'id'>
): Promise<WaitlistEntry> {
  const entries = await listEntries()
  
  const newEntry: WaitlistEntry = {
    ...entry,
    timestamp: Date.now(),
    id: crypto.randomUUID(),
  }
  
  entries.push(newEntry)
  await set(WAITLIST_KEY, entries)
  
  return newEntry
}

/**
 * Get all waitlist entries
 */
export async function listEntries(): Promise<WaitlistEntry[]> {
  const data = await get<WaitlistEntry[]>(WAITLIST_KEY)
  return data || []
}

/**
 * Clear all waitlist entries
 */
export async function clearEntries(): Promise<void> {
  await del(WAITLIST_KEY)
}

/**
 * Get total count of entries
 */
export async function getEntryCount(): Promise<number> {
  const entries = await listEntries()
  return entries.length
}

