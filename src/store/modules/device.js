/**
 * @Description 设备信息
 */
import _ from 'lodash'
import db from '@/locDB/db'
import {trDefault} from '@/config/config.json'

const HEIGHT = document.documentElement.clientHeight
const Props = {
  treasure: ['id', 'mgdbId', 'name', 'short', 'code', 'icon', 'note', 'iscollection', 'amount'],
  bill: ['id', 'mgdbId', 'trId', 'trMgdbId', 'money', 'date', 'recorded', 'note']
}
const Icons = ['defaultw.png', 'jj.png', 'gp.png', 'wallet.png', 'wh.png', 'jd.png', 'gshbank.png', 'shbank.png', 'zhgbank.png', 'zhshbank.png', 'chxbank.png', 'zhxbank.png', 'zhfb.png', 'thsh.png', 'zhsh.png', 'pa.png', 'lct.png', 'lq.png', 'lqt.png']
const Tables = ['treasure', 'bill']

const state = {
  // 设备高度
  height: HEIGHT,
  // 是否在同步
  isSyn: 0,
  // 菜单
  mode: ''
}

const getters = {
  // 获取图标
  get_icons (state, getters) {
    // Todo
    return Icons
  }
}

const mutations = {
  // 设置同步状态
  dv_set_issyn (state, status) {
    if (status !== undefined) {
      state.isSyn = status
    } else {
      state.isSyn = !state.isSyn
    }
  },
  // 设置菜单
  dv_toggle_mode (state, mode) {
    if (mode === undefined) {
      state.mode = state.mode === 'out' ? 'in' : 'out'
    } else {
      state.mode = mode
    }
  }
}

const actions = {
  // 初始化
  async dv_init_loc ({
    commit,
    state
  }) {
    let tList = await db.treasure.toArray()
    let blist = await db.bill.toArray()
    let tlen = tList.length
    let blen = blist.length
    if (!tlen) {
      tList.push(trDefault)
    }
    commit('init_treasure', tList)
    if (blen) {
      commit('init_bill', blist)
    }
  },
  // 保存到本地
  async dv_syn_dev ({
    commit,
    state
  }, option) {
    let { todoList } = option
    let saveList = _.filter(todoList, {
      operate: 'save'
    })
    let delList = _.filter(todoList, {
      operate: 'del'
    })
    let i = 0
    let len
    let flag = (todoList[0] || {}).flag
    // 增、改
    len = saveList.length
    for (; i < len; i++) {
      let item = saveList[i]
      let temp = _.pick(item, Props[flag])
      if (temp.id === '') {
        delete temp.id
      }
      item.id = await db[flag].put(temp)
    }
    if (flag) {
      commit(`save_${flag}`, saveList)
    }
    // 删
    _.forEach(delList, item => {
      let id = item.id
      db[flag].delete(id)
    })
  },
  // 备份
  async dv_import_db ({
    commit,
    state
  }, option) {
    let {data, cb} = option
    data = JSON.parse(data)
    data = _.pick(data, Tables)
    _.forEach(data, async (list, table) => {
      await db[table].clear()
      await db[table].bulkPut(list)
    })
    cb && cb()
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
