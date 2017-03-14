let option = {
  // 背景颜色
  backgroundColor: '#2c343c',
  // 提示栏
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  // 遮罩层明亮程度配置
  visualMap: {
    show: false,
    min: 1000,
    max: 4000,
    inRange: {
      colorLightness: [0, 1]
    }
  },
  // 图表配置
  series: [
    {
      name: '股市资金分布',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      // 图标数据，后面有排序
      data: [],
      roseType: 'angle',
      label: {
        normal: {
          textStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          }
        }
      },
      labelLine: {
        normal: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        }
      },
      itemStyle: {
        normal: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      // 显示动画
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
  }]
};

export default option