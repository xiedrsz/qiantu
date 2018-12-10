<template>
  <div>
    <div class="ui-ui">
      <x-header :left-options="{showBack: false}">
        <i slot="left" class="iconfont icon-rise c-white" @click="goBack"></i>
        <p class="c-white title">
          <a class="flex-1 underline">排行榜</a>
        </p>
      </x-header>
      <div class="ui-rank">
        <div class="item" v-if="ranking[1]">
          <div class="second">
            <div class="wrapper">
              <div class="cont">
                <div class="inner">
                  <img :src="'./static/img/' + ranking[1].icon" />
                </div>
              </div>
            </div>
          </div>
          <div class="name">{{ranking[1].name}}</div>
          <p>{{ranking[1].myield + '%'}}</p>
          <div class="no no2">
            2
          </div>
        </div>
        <div class="item" v-if="ranking[0]">
          <div class="first">
            <div class="wrapper">
              <div class="cont">
                <div class="inner">
                  <img :src="'./static/img/' + ranking[0].icon" />
                </div>
              </div>
            </div>
          </div>
          <div class="name">{{ranking[0].name}}</div>
          <p>{{ranking[0].myield + '%'}}</p>
          <div class="no no1">
            1
          </div>
        </div>
        <div class="item" v-if="ranking[2]">
          <div class="second">
            <div class="wrapper">
              <div class="cont">
                <div class="inner">
                  <img :src="'./static/img/' + ranking[2].icon" />
                </div>
              </div>
            </div>
          </div>
          <div class="name">{{ranking[2].name}}</div>
          <p>{{ranking[2].myield + '%'}}</p>
          <div class="no no3">
            3
          </div>
        </div>
      </div>
    </div>
    <scroller lock-x ref="scroller" height="-280px">
      <div class="ui-wealthes">
        <div>
          <div class="ui-rank-item" v-for="(item, index) in ranking.slice(3)">
            <div class="rank">{{index + 4}}</div>
            <img class="head" :src="'./static/img/' + item.icon" />
            <div class="flex">
              <div class="flex-1">{{item.name}}</div>
              <div class="money c-red">{{item.myield + '%'}}</div>
            </div>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
import { XHeader, Scroller } from 'vux'
import mixin from '@/libs/vue/mixin'

export default {
  name: 'Ranking',
  mixins: [mixin],
  computed: {
    ranking () {
      return this.$store.getters.get_ranking
    }
  },
  components: {
    XHeader, Scroller
  }
}
</script>
