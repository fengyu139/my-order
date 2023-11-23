<script setup lang="ts">
import { Button, showDialog, showToast } from "@nutui/nutui";
import { Search2 } from "@nutui/icons-vue";
import html2canvas from "html2canvas";
import { useHomeStore, Order } from "@/store/homeStore";
import http from "@/http/index";
import dayjs from "dayjs";
const router = useRouter();
const store = useHomeStore();
const date = ref([
  dayjs().subtract(1, "day").format("YYYY-MM-DD"),
  dayjs().format("YYYY-MM-DD"),
]);
const isVisible = ref(false);
// setTimeout(() => {
//   isVisible.value = false;
// }, 10);
const setChooseValue = (param: any) => {
  date.value = [...[param[0][3], param[1][3]]];
};
const startDate = ref(dayjs().subtract(12, "month").format("YYYY-MM-DD"));
const endDate = ref(dayjs().format("YYYY-MM-DD"));
watchEffect(() => {
  if (date.value[0] && date.value[1]) {
    store.getOrderList({
      startTime: dayjs(date.value[0])
        .startOf("day")
        .format("YYYY-MM-DD HH:mm:ss"),
      endTime: dayjs(date.value[1]).endOf("day").format("YYYY-MM-DD HH:mm:ss"),
    });
  }
});
interface OrderInfo extends Order {
  orderDetail: any[];
  totalMoney: number;
  actualMoney: number;
}
const formData = reactive<OrderInfo>({
  id: "",
  orderName: "",
  totalCount: 0,
  isFinish: false,
  showTime: "",
  isPack: false,
  taste: 0,
  orderDetail: [],
  totalMoney: 0,
  actualMoney: 0,
});
const columns = reactive([
  {
    title: "订单名",
    key: "orderName",
    align: "center",
  },
  {
    title: "金额",
    key: "totalMoney",
    align: "center",
    sorter: (row1: any, row2: any) => {
      return row2.totalMoney - row1.totalMoney;
    },
  },
  {
    title: "时间",
    key: "showTime",
    align: "center",
    render: (record: any) => {
      return dayjs(record.showTime).format("YYYY-MM-DD");
    },
  },
  {
    title: "操作",
    key: "render",
    align: "center",
    render: (record: any) => {
      return h(
        Button,
        {
          onClick: () => {
            if (record.isFinish) {
              orderShow.value = true;
              getDetail(record.id);
            } else {
              showDialog({
                title: "确定要去修改吗",
                content: "此订单为未完成状态，是否要设为已完成？",
                cancelText: "去修改",
                okText: "设为已完成",
                onOk: () => {
                  store
                    .updateOrder({
                      id: record.id,
                      isFinish: true,
                    })
                    .then(() => {
                      let index = store.orderList.findIndex(
                        (item: any) => item.id == record.id
                      );
                      showToast.success("成功设为已完成");
                      store.orderList[index].isFinish = true;
                    });
                },
                onCancel: () => {
                  router.push({
                    path: "/orderDetail",
                    query: {
                      id: record.id,
                    },
                  });
                },
              });
            }
            Object.assign(formData, record);
          },
          size: "small",
          type: record.isFinish ? "primary" : "warning",
        },
        () => (record.isFinish ? "详情" : "修改")
      );
    },
  },
]);
const getDetail = async (id: string) => {
  let res = await http.post("/orderList", { id });
  Object.assign(formData, res.data[0]);
};
const refresh = ref(false);
const refreshFun = () => {
  date.value = [
    dayjs().subtract(1, "day").format("YYYY-MM-DD"),
    dayjs().format("YYYY-MM-DD"),
  ];
  setTimeout(() => {
    refresh.value = false;
  }, 500);
};
const totalPrice = computed(() => {
  return store.orderList.reduce((pre: any, cur: any) => {
    return (pre += cur.totalMoney);
  }, 0);
});
const orderShow = ref(false);
function captureScreenshot() {
  const targetElement = document.getElementById("captureElement"); // 你要截取的元素
  html2canvas(targetElement).then((canvas) => {
    // 创建一个链接，以便用户可以下载截取的图片
    const dataURL = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = `${formData.orderName}.png`;
    a.click();
    showToast.success("图片已下载");
  });
}
const searchValue = ref("");
const search = () => {
  searchValue.value &&
    store.getOrderList({
      orderName: searchValue.value,
    });
};
</script>

<template>
  <!-- -->
  <div class="px-[8px] pb-[50px]">
    <nut-pull-refresh v-model="refresh" @refresh="refreshFun">
      <nut-cell
        :showIcon="true"
        title="选择日期范围"
        @click="isVisible = true"
        :desc="date && date[0] ? `${date[0]}至${date[1]}` : '请选择'"
      >
      </nut-cell>
      <nut-searchbar
        v-model="searchValue"
        @blur="search"
        placeholder="请输入订单名称模糊查询"
      >
        <template #leftin>
          <Search2 />
        </template>
      </nut-searchbar>
      <div class="flex justify-center mb-[8px]">
        <span class="mr-[10px]"
          >总计：<span class="text-red-400">{{ store.orderList.length }}</span>
          单</span
        >
        <span
          >总计金额：<span class="text-red-400">{{
            totalPrice.toFixed(2)
          }}</span>
          元</span
        >
      </div>
      <nut-table :columns="columns" :data="store.orderList"></nut-table>
    </nut-pull-refresh>
  </div>

  <nut-backtop :distance="200" :bottom="58"></nut-backtop>
  <nut-calendar
    v-model:visible="isVisible"
    :default-value="date"
    :start-date="startDate"
    :end-date="endDate"
    type="range"
    @choose="setChooseValue"
  >
  </nut-calendar>

  <nut-popup
    position="right"
    closeable
    close-icon-position="top-left"
    v-model:visible="orderShow"
    style="height: 100%; width: 100%"
  >
    <div id="captureElement" class="px-[12px] pb-[12px] text-[14px]">
      <h2 class="mt-[20px] text-center text-[16px]">订单详情</h2>
      <div class="flex flex-col justify-between">
        <span class="pb-[8px]">订单号:{{ formData.id }}</span>
        <span>创建时间：{{ formData.showTime }}</span>
      </div>
      <div class="flex justify-between mt-[8px]">
        <span
          >订单名称: <span class="text-red-500">{{ formData.orderName }}</span>
        </span>
        <span
          >订单状态：<span class="text-green-500">{{
            formData.isFinish ? "已完成" : "未完成"
          }}</span>
        </span>
      </div>
      <div class="mt-[12px] grid grid-cols-4 text-center border-b py-[4px]">
        <span>商品</span>
        <span>单价</span>
        <span>数量</span>
        <span>小计</span>
      </div>
      <ul>
        <li
          class="grid grid-cols-4 text-center border-b py-[4px] text-[#595757]"
          v-for="item in formData.orderDetail.filter(
            (item: any) => item.count > 0
          )"
          :key="item.id"
        >
          <span>{{ item.name }}</span>
          <span>{{ item.price }}</span>
          <span>{{ item.count }}</span>
          <span>{{ item.price * item.count }}</span>
        </li>
      </ul>
      <div class="mt-[12px] flex justify-between">
        <span
          >总计数量：<span
            ><span class="text-red-500">{{ formData.totalCount }}</span></span
          ></span
        >
        <span
          >总计金额：
          <nut-price :price="formData.totalMoney" symbol="¥" />
        </span>
      </div>
      <div class="mt-[12px] flex justify-between">
        <span
          >优惠金额：<nut-price
            :price="Number(formData.totalMoney) - Number(formData.actualMoney)"
            symbol="¥"
            size="normal" />
          <span></span
        ></span>
        <span
          >实收金额：
          <nut-price :price="Number(formData.actualMoney)" symbol="¥" />
        </span>
      </div>
    </div>
    <div class="p-[12px]">
      <nut-button block type="primary" @click="captureScreenshot"
        >下载订单图片</nut-button
      >
    </div>
  </nut-popup>
</template>

<style lang="scss" scoped>
:deep(.nut-cell__value) {
  flex: 2;
}
</style>
