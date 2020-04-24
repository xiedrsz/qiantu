import _ from 'lodash'
import moment from 'moment'

window.moment = moment

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
  constructor (accounts = [], bills = []) {
    if (Finance.instance) {
      Finance.instance.setAccounts(accounts)
      Finance.instance.setBills(bills)
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
  setAccounts (accounts) {
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
   * @param {Number} [depth] 深度
   * @returns Array 子账户id
   * @todo 去 / 留
   */
  getRelationship (id, depth) {
    let relationship = this.relationship
    // 暂留
    /* if (depth) {
      relationship = _.mapValues(relationship, parents => parents.slice(0, depth))
    } */
    return _.transform(relationship, (result, value, key) => {
      if (value.includes(id)) {
        key = +key.replace('_', '')
        result.push(key)
      }
      return result
    }, [])
  }

  /**
   * 获取 某一账单
   * @param {Number} id 账单id
   * @returns Object bill
   */
  getBill (id) {
    return _.find(this.bills, {
      id
    })
  }

  /**
   * 获取 某一账户的账单
   * @param {Number} id 账户 id
   * @returns Array 按月汇总的账单
   */
  getBills (id) {
    let posterity = this.getRelationship(id)
    let list = this.bills
    posterity = _.union(posterity, [id])
    list = _.filter(list, ({ consumption, capital }) => {
      return posterity.includes(consumption) || posterity.includes(capital)
    })
    list = _.groupBy(list, ({ date }) => {
      return +/(\d{2})月/.exec(date)[1]
    })
    list = _.map(list, collection => {
      let month = collection[0].date
      let inflow = 0
      let outflow = 0
      month = +/(\d{2})月/.exec(month)[1]
      collection = _.map(collection, ({ date, capital, consumption, money, ...other }) => {
        let day = +/(\d{2})日/.exec(date)[1]
        let total = 0
        total += posterity.includes(consumption) ? +money : 0
        total += posterity.includes(capital) ? -money : 0
        money = capital === id ? -money : money
        inflow += total > 0 ? total : 0
        outflow += total < 0 ? total : 0
        return {
          ...other,
          date,
          capital,
          money,
          day,
          flag: total / money
        }
      })
      return {
        month,
        inflow,
        outflow,
        bills: collection
      }
    })
    return list
  }

  /**
   * 获取 子级资产
   * @param {Number} id 账户 id
   * @returns Array
   */
  getChildProperty (id) {
    let accounts = this.accounts
    let children = _.filter(accounts, ({ parent }) => parent === id)
    children = _.map(children, ({ id, name, icon }) => {
      let bills = this.getBills(id)
      let amount = _.sumBy(bills, ({ inflow, outflow }) => inflow + outflow)
      return {
        id,
        name,
        icon,
        amount
      }
    })
    children = _.sortBy(children, ({ amount }) => -amount)
    return children
  }

  /**
   * 获取资产日账单
   * @param {Number} id 账户 id
   * @param {String} from 起期
   * @param {String} to 止期
   */
  getDailyAmount (id, from, to) {
    let mbills = []
    // let amount = 0
    // let before = []
    to && (to = to.replace(/[年月]/g, '-').replace('日', ''))
    this.getBills(id).forEach(({ bills }) => {
      mbills = mbills.concat(bills)
    })
    if (from) {
      from = from.replace(/[年月]/g, '-').replace('日', '')
      /* before = _.filter(mbills, ({ date }) => {
        return moment(date, 'YYYY年MM月DD日').isBefore(from, 'day')
      }) */
    }
    // amount = _.sumBy(before, ({ money, flag }) => money * flag)
    to = moment(to)
    mbills = _.filter(mbills, ({ date }) => {
      if (from) {
        return moment(date, 'YYYY年MM月DD日').isBetween(from, to, 'day', '[]')
      } else {
        return moment(date, 'YYYY年MM月DD日').isSameOrBefore(to, 'day')
      }
    })
    mbills = _.groupBy(mbills, 'date')
    // console.log(amount)
    // console.log(mbills)
    return mbills
  }
}

export default Finance
