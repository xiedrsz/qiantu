import Dexie from 'dexie'

const db = new Dexie('locDB')

// Declare tables, IDs and indexes
db.version(1).stores({
  account: '++id, code, name, isCollection, tags, note, parent'
})

export default db
