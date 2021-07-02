<template>
  <div>
    <h1>图表</h1>
    <button @click="handleChangeDate">日期筛选</button>
    <div ref="myChart" :style="{width: '300px', height: '300px'}"></div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: [],
      data: []
    }
  },
  mounted(){
    this.drawLine();
  },
  created() {
    // 模拟异步请求
    this.title = ['一月','二月']
    this.data = [50,60,]

    // 在created里操作DOM
    this.$nextTick(() => {
      this.drawLine()
    }) 
    // 写在updated里最好
  },
  // 出bug了 todo
  // updated() {
  //   // 只要数据更新,就调用
  //    this.$nextTick(() => {
  //     this.drawLine()
  //   }) 
  // },
  methods: {
    handleChangeDate() {
      this.title = ['一月','二月']
      this.data = [33,100,]

      // 更新数据后,必须重新调用
      this.drawLine()
    },
    drawLine(){
        // 只要更换下dom的获取方式就行,初始化echarts实例
        let myChart = this.$echarts.init(this.$refs.myChart)
        // 绘制图表
        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                // data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                data: this.title
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                // data: [5, 20, 36, 10, 10, 20]
                data: this.data
            }]
        });
    }
  }
}
</script>

<style scoped> 

</style>
