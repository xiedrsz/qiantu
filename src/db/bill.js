import db from './db'

const table = db.bill

// 查询账单列表
const getBillList = () => {
  return table.toArray()
}

// 保存账单信息
const putBill = bill => {
  if (!bill.id) {
    delete bill.id
  }
  return table.put(bill).then(id => {
    return id
  })
}

export { getBillList, putBill }
