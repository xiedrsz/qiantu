import Dexie from 'dexie'

const db = new Dexie('locDB')

// Declare tables, IDs and indexes
db.version(1).stores({
  account: '++id, code, name, share, isCollection, tags, note, parent'
})

export default db
