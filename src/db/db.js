import Dexie from 'dexie'

const db = new Dexie('locDB')

// Declare tables, IDs and indexes
db.version(1).stores({
  account: '++id, code, name, isCollection, tags, note, parent',
  bill: '++id, consumption, capital, share, money, date, type, note'
})

export default db
