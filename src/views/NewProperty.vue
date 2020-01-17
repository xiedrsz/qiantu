<template>
  <div>
    <!-- 标题头 -->
    <van-nav-bar :title="title" leftArrow @click-left="goBack"></van-nav-bar>
    <!-- 表单 -->
    <van-field label="名称" inputAlign="right" placeholder="账户名称" v-model="form.name"></van-field>
    <van-field label="代码" inputAlign="right" placeholder="账户代码" v-model="form.code"></van-field>
    <van-switch-cell title="集合" v-model="form.isCollection"></van-switch-cell>
    <van-cell title="归属" isLink @click="showPicker">{{ parentName }}</van-cell>
    <!-- <van-field label="份额" inputAlign="right" placeholder="份额" v-model="form.share"></van-field> -->
    <!-- <van-field label="资产" inputAlign="right" placeholder="2000" v-model="form.capitalization"></van-field> -->
    <!-- Todo -->
    <van-row class="van-cell">标签</van-row>
    <van-row type="flex" class="van-cell tags">
      <van-tag size="large" plain round v-for="item in tags" :key="item.name" :color="item.selected ? '#1989fa' : ''" @click="onToggle(item)">{{item.name}}</van-tag>
      <span class="van-tag van-tag--plain van-tag--round van-tag--large van-tag--default van-hairline--surround">
        <input class="new-tag" type="text" placeholder="标签内容" :style="{width:width}" v-model="tag" @keyup.enter="onNewTag" @blur="onClear" />
      </span>
    </van-row>
    <van-field type="textarea" placeholder="备注" v-model="form.note"></van-field>
    <van-button type="info" size="large" round @click="confirm">确定</van-button>
    <van-popup v-model="show" position="bottom">
      <van-picker show-toolbar title="归属" :columns="collection" value-key="name" @cancel="hidePicker" @confirm="onSelect" />
    </van-popup>
    <!-- Todo -->
    <van-popup v-model="showkk" position="bottom">
      <div class="van-picker">
        <div class="van-hairline--top-bottom van-picker__toolbar">
          <button type="button" class="van-picker__cancel">取消</button>
          <div class="van-ellipsis van-picker__title">归属</div>
          <button type="button" class="van-picker__confirm">确认</button>
        </div>
        <div style="height: 220px">
          <van-icon name="home-o" />
          <van-icon class-prefix="iconfont" name="tallykkk" />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import _ from 'lodash'
import { NavBar, Icon, Cell, Field, SwitchCell, Row, Tag, Button, Picker, Popup } from 'vant'
export default {
  name: 'NewProperty',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [SwitchCell.name]: SwitchCell,
    [Row.name]: Row,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [Popup.name]: Popup
  },
  data () {
    return {
      form: {
        id: '',
        name: '',
        code: '',
        isCollection: false,
        parent: '',
        tags: '',
        note: ''
      },
      tags: [],
      tag: '',
      show: false,
      showkk: true
    }
  },
  computed: {
    collection () {
      return this.$store.getters.collection
    },
    title () {
      let { id, name } = this.form
      return id ? name : '新增资产'
    },
    parentName () {
      let collection = this.collection
      let parent = this.form.parent
      let obj = _.find(collection, ({ id }) => id === parent) || {}
      return obj.name
    },
    width () {
      let tag = this.tag
      let len = tag.length + 0.2
      return `${len}em`
    }
  },
  mounted () {
    let current = this.$store.state.accounts.current
    let id = this.$route.query.id
    let tags = ''
    if (id) {
      this.form = this.$store.getters.account
    } else {
      this.form.parent = current
    }
    tags = this.form.tags || ''
    tags = tags.split(',')
    this.$store.dispatch('get_Tags').then(list => {
      this.tags = _.map(list, name => {
        return {
          name,
          selected: tags.includes(name)
        }
      })
    })
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    showPicker () {
      this.show = true
    },
    hidePicker () {
      this.show = false
    },
    onSelect (item) {
      this.form.parent = item.id
      this.hidePicker()
    },
    onToggle (item) {
      item.selected = !item.selected
    },
    onClear () {
      this.tag = ''
    },
    onNewTag () {
      let name = this.tag
      if (!name) {
        return
      }
      this.tags.push({
        name,
        selected: true
      })
      this.tag = ''
      this.$store.dispatch('put_Tag', name)
    },
    confirm () {
      // Tag
      this.form.tags = _.map(_.filter(this.tags, 'selected'), 'name').join(',')
      this.$store.dispatch('save_account', this.form)
      this.goBack()
    }
  }
}
</script>

<style lang="less" scoped>
.new-tag {
  min-width: 4.2em;
  text-align: center;
  padding: 0;
  border: 0;
}
.tags {
  flex-wrap: wrap;
  span {
    margin: 0 6px 6px 0;
  }
}
</style>

<vvv>
{"node":"h-div","options":{},"childs":[{"node":"vant-nav-bar","options":{"ref":"cmp00"},"childs":[{"node":"vant-icon","options":{"slot":"right","ref":"cmp000"},"childs":[]}]},{"node":"vant-field","options":{"ref":"cmp01"},"childs":[]},{"node":"vant-field","options":{"ref":"cmp02"},"childs":[]},{"node":"vant-switch-cell","options":{"ref":"cmp03"},"childs":[]},{"node":"vant-cell","options":{"ref":"cmp04"},"childs":["理财通"]},{"node":"vant-field","options":{"ref":"cmp05"},"childs":[]},{"node":"vant-field","options":{"ref":"cmp06"},"childs":[]},{"node":"vant-row","options":{"ref":"cmp07"},"childs":["标签"]},{"node":"vant-row","options":{"ref":"cmp08"},"childs":[{"node":"vant-tag","options":{"ref":"cmp080"},"childs":["标签内容"]},{"node":"vant-tag","options":{"ref":"cmp081"},"childs":["标签内容"]}]},{"node":"vant-field","options":{"ref":"cmp09"},"childs":[]},{"node":"vant-button","options":{"ref":"cmp010"},"childs":["确定"]}]}
</vvv>
