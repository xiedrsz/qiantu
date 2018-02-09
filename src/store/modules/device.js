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

const state = {
  // 设备高度
  height: HEIGHT,
  // 是否在同步
  isSyn: 0
}

const getters = {
  // 获取图标
  get_icons (state, getters) {
    // Todo
    return ['shbank.png']
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
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
