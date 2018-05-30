<template>
  <div class="page">
    <div class="ui-ui">
      <!--<div class="sound">
        <i class="iconfont icon-heng"></i>
        <i class="iconfont icon-dian"></i>
      </div>-->
      <x-header :left-options="{showBack: false}">
        <i slot="left" class="iconfont icon-rise c-white" @click="goBack"></i>
        <p class="c-white title">
          <a class="flex-1 underline">財富</a>
        </p>
      </x-header>
      <swiper :show-dots="false" height="100px">
        <swiper-item>
          <div class="ui-wname">
            <img :src="'./static/img/'+treasure.icon" />
            <input type="text" v-model="treasure.name" />
          </div>
        </swiper-item>
      </swiper>
    </div>
    <scroller lock-x ref="scroller" height="162px" class="bg-white">
      <div class="ui-wls">
        <div class="item" v-for="item in icons" :key="item" @click="setIcon(item)" :class="{'selected': treasure.icon === item}">
          <img :src="'./static/img/'+item" />
        </div>
      </div>
    </scroller>
    <group>
      <selector title="归属：" v-model="treasure.parent" :options="collection" direction="rtl"></selector>
      <x-input title="简称：" v-model="treasure.short" text-align="right"></x-input>
      <x-switch title="集合：" v-model="treasure.iscollection"></x-switch>
      <!--<cell title="标签：" value="看看" is-link></cell>-->
      <x-textarea v-model="treasure.note" placeholder="备注" :max="20"></x-textarea>
    </group>
    <div class="ui-add" @click="save">
      <i class="iconfont icon-add c-white"></i>
      <div class="heng"></div>
    </div>
  </div>
</template>
<script>
import { XHeader, Group, XInput, Selector, Swiper, SwiperItem, Scroller, XSwitch, XTextarea, Cell } from 'vux'
import _ from 'lodash'
import { Check } from '@/libs/check'
import { compareObj } from '@/libs/util'
import mixin from '@/libs/vue/mixin'

export default {
  name: 'Info',
  mixins: [mixin],
  data () {
    return {
      treasure: {
        name: '',
        icon: 'defaultw.png',
        parent: '',
        iscollection: false,
        short: '',
        note: ''
      }
    }
  },
  computed: {
    icons () {
      return this.$store.getters.get_icons
    },
    collection () {
      return this.$store.getters.get_collection
    }
  },
  activated () {
    let isCurrent = this.$route.params.isCurrent
    if (+isCurrent) {
      _.assign(this.treasure, this.$store.getters.get_treasure)
      let code = this.treasure.code.slice(0, -3)
      this.treasure.parent = code
    } else {
      this.treasure.parent = this.$store.state.treasure.current
    }
  },
  methods: {
    // 设置图标
    setIcon (icon) {
      this.treasure.icon = icon
    },
    // 保存
    save () {
      let self = this
      let treasure = _.assign({}, this.treasure)
      // 校验
      let flag = new Check(treasure, {
        name: {
          auth: ['NotNull'],
          mess: ['请输入财富名称']
        }
      }).then((message) => {
        this.$prompt(message)
      })
      if (!flag) {
        return
      }
      // 比较
      if (treasure.id) {
        let old = _.assign({}, this.$store.getters.get_treasure)
        let code = old.code.slice(0, -3)
        old.parent = code
        let changes = compareObj(treasure, old)
        treasure.changes = changes
      }
      this.$store.dispatch('save_treasure', {
        treasure,
        handle () {
          console.log('保存成功')
          self.treasure = {
            name: '',
            icon: 'defaultw.png',
            parent: '',
            iscollection: false,
            short: '',
            note: ''
          }
          self.goBack()
        }
      })
    }
  },
  components: {
    XHeader, Group, XInput, Selector, Swiper, SwiperItem, Scroller, XSwitch, XTextarea, Cell
  }
}
</script>
