import Dexie from 'dexie'

const db = new Dexie('locDB')
db.version(1).stores({
  treasure: '++id, mgdbId, name, short, code, icon, note, iscollection, amount',
  bill: '++id, mgdbId, trId, trMgdbId, money, date, recorded, note'
})

export default db
