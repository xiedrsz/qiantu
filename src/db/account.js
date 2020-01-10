import _ from 'lodash'
import db from './db'

const table = db.account
const props = ['id', 'code', 'name', 'share', 'isCollection', 'tags', 'note', 'parent']
const defAccount = {
  code: '',
  name: '总资产',
  share: '',
  isCollection: true,
  tags: '',
  note: '',
  parent: ''
}

// 清洗数据
const clean = account => {
  account = _.pick(account, props)
  if (!account.id) {
    delete account.id
  }
  return account
}

// 查询账户列表
const getAccountList = () => {
  return table.toArray().then(list => {
    if (!list.length) {
      return putAccount(defAccount).then(id => {
        defAccount.id = id
        return [defAccount]
      })
    } else {
      return list
    }
  })
}

// 保存账户信息
const putAccount = account => {
  account = clean(account)
  return table.put(account).then(id => {
    console.log(id)
    return id
  })
}

export { getAccountList, putAccount }
