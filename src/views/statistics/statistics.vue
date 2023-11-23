<script setup lang="ts">
import http from "@/http/index";
import * as echarts from "echarts/core";
import { LineChart, BarChart, PieChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import dayjs from "dayjs";
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
echarts.use([
  GridComponent,
  LineChart,
  PieChart,
  BarChart,
  CanvasRenderer,
  UniversalTransition,
  TooltipComponent,
  LegendComponent,
]);
const queryTime = reactive({
  startTime: "",
  endTime: dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
});
const radioVal = ref("2");
const chartDomBar = ref(null);
const chartDomPie = ref(null);
let chartBar: any = null;
let chartPie: any = null;
const optionBar = reactive({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: ["10-01", "10-02", "10-03"],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "营业额",
      type: "line",
      barWidth: "60%",
      data: [0, 1, 2],
      showBackground: true,
      smooth: true,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#fa2c19" },
          { offset: 0.5, color: "#fa2c19" },
          { offset: 1, color: "#fa6419" },
        ]),
      },
    },
  ],
});
const optionPie = reactive({
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "2%",
    left: "center",
  },
  series: [
    {
      name: "销售数量",
      type: "pie",
      radius: ["40%", "90%"],
      top: "10%",
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
    },
  ],
});
nextTick(() => {
  chartBar = markRaw(echarts.init(chartDomBar.value));
  chartBar.setOption(optionBar);
  chartPie = markRaw(echarts.init(chartDomPie.value));
  chartPie.setOption(optionPie);
});
// setTimeout(() => {
//   optionBar.series[0].data = [12, 43, 56, 33, 56, 33, 12];
// }, 3000);
const getBarData = async () => {
  let res = await http.post("/chartBar", queryTime);
  console.log(res);
  optionBar.series[0].data = res.data.bar.values;
  optionBar.xAxis[0].data = res.data.bar.times;
  optionPie.series[0].data = res.data.pie;
  optionPie.series[0].top = res.data.pie.length * 1.8 + "%";
};
watch(optionBar, () => {
  chartBar.setOption(optionBar);
});
watch(optionPie, () => {
  chartPie.setOption(optionPie);
});
watchEffect(() => {
  queryTime.startTime = dayjs()
    .subtract(Number(radioVal.value), "day")
    .startOf("day")
    .format("YYYY-MM-DD HH:mm:ss");
  queryTime.startTime && getBarData();
});
</script>

<template>
  <div class="pb-[50px]">
    <nut-sticky>
      <nut-cell>
        <nut-radio-group v-model="radioVal" direction="horizontal">
          <nut-radio shape="button" label="2">近3天</nut-radio>
          <nut-radio shape="button" label="6">近7天</nut-radio>
          <nut-radio shape="button" label="14">近15天</nut-radio>
          <nut-radio shape="button" label="49">近一月</nut-radio>
        </nut-radio-group>
      </nut-cell>
    </nut-sticky>
    <div>
      <div ref="chartDomBar" style="height: 48vh"></div>
    </div>
    <div class="mt-[18px]">
      <h2 class="text-center">销量情况</h2>
      <div style="height: 56vh" ref="chartDomPie"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
