import _ from 'lodash'

/**
 * 获取 上层节点
 * @param {Object} maps 节点对应关系 _${子节点id}: 父节点id
 * @param {Number} id 查询节点id
 * @returns Array 所有上层节点id
 */
const getAncestor = (maps, id) => {
  let result = []
  let parent = maps[`_${id}`]
  if (parent) {
    result = _.union(result, [parent], getAncestor(maps, parent))
  }
  return result
}

/**
 * 计算节点关系
 * @param {Array} list 集合(如：账户集合)
 * @returns Object _${节点id}：上层节点id数组
 */
const calcRelation = list => {
  let accountIds = _.map(_.filter(list, ({ isCollection }) => !isCollection), 'id')
  let maps = _.transform(list, (result, { id, parent }) => {
    result[`_${id}`] = parent
    return result
  }, {})
  return _.transform(accountIds, (result, id) => {
    result[`_${id}`] = getAncestor(maps, id)
    return result
  }, {})
}

class Finance {
  // 单例模式
  static instance;
  /**
   * 财务
   * @param {Array} [accounts = []] 账户集合
   * @param {Array} [bills = []] 账单集合
   */
  constructor (accounts, bills) {
    if (Finance.instance) {
      return Finance.instance
    } else {
      this.accounts = accounts
      this.bills = bills
      this.relationship = calcRelation(accounts)
      Finance.instance = this
    }
  }

  /**
   * 设置 账户集合
   * @param {Array} accounts 账户集合
   * @returns this
   */
  setAccount (accounts) {
    this.accounts = accounts
    this.relationship = calcRelation(accounts)
    return this
  }

  /**
   * 设置 账单集合
   * @param {Array} bills 账单集合
   * @returns this
   */
  setBills (bills) {
    this.bills = bills
    return this
  }

  /**
   * 获取 集合账户
   * @returns accounts
   */
  getCollection () {
    return _.filter(this.accounts, 'isCollection')
  }

  /**
   * 获取 资金账户
   * @returns accounts
   */
  getCapitals () {
    return _.filter(this.accounts, ({ tags }) => tags.includes('资金账户'))
  }

  /**
   * 获取 真实账户（非集合）
   * @returns accounts
   */
  getRealAccounts () {
    return _.filter(this.accounts, ({ isCollection }) => !isCollection)
  }

  /**
   * 查找账户
   * @param {Number} [id] 账户 id
   * @returns account
   */
  findAccount (id) {
    let accounts = this.accounts
    return _.find(accounts, {
      id
    }) || accounts[0] || {}
  }

  /**
   * 获取 子孙
   * @param {Number} current id
   * @returns Array
   */
  getChildren (current) {
    let accounts = this.accounts
    return _.filter(accounts, ({ parent }) => parent === current).map(({ id, ...other }) => {
      let children = _.filter(accounts, ({ parent }) => parent === id)
      return {
        ...other,
        id,
        children
      }
    })
  }

  /**
   * 获取 子账户id
   * @param {Number} id id
   * @returns Array 子账户id
   * @todo 去 / 留
   */
  getRelationship (id) {
    let relationship = this.relationship
    return _.transform(relationship, (result, value, key) => {
      if (value.includes(id)) {
        key = +key.replace('_', '')
        result.push(key)
      }
      return result
    }, [])
  }

  /**
   * 获取 某一账户账单
   * @param {Number} id 账户id
   * @returns bills
   */
  getBillOfAccount (id) {
    return _.find(this.bills, {
      id
    })
  }

  getBillOfCollection (id) {
    // Todo
  }
}

export default Finance
