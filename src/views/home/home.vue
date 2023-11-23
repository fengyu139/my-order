<script setup lang="ts">
import dayjs from "dayjs";
import { Order } from "@nutui/icons-vue";
import { showToast } from "@nutui/nutui";
import http from "@/http/index";
import { useHomeStore } from "@/store/homeStore";
import { Plus } from "@nutui/icons-vue";

const queryTime = reactive({
  startTime: "",
  endTime: "",
});
const currentHours = dayjs().hour();
if (currentHours < 12) {
  (queryTime.startTime = dayjs()
    .startOf("day")
    .subtract(12, "hour")
    .format("YYYY-MM-DD HH:mm:ss")),
    (queryTime.endTime = dayjs()
      .endOf("day")
      .subtract(12, "hour")
      .format("YYYY-MM-DD HH:mm:ss"));
} else {
  (queryTime.startTime = dayjs()
    .startOf("day")
    .add(12, "hour")
    .format("YYYY-MM-DD HH:mm:ss")),
    (queryTime.endTime = dayjs()
      .endOf("day")
      .add(12, "hour")
      .format("YYYY-MM-DD HH:mm:ss"));
}
const router = useRouter();
const store = useHomeStore();
store.getOrderList(queryTime);
const changeFinish = async () => {
  store.updateOrder(formData).then(() => {
    showToast.success("设置成功");
    store.getOrderList(queryTime);
    swipe.value[activeIndex.value].close();
  });
};
const visible1 = ref(false);
const visible2 = ref(false);
const orderName = ref("");
const addOrder = () => {
  if (!orderName.value) {
    showToast.fail("请输入订单名称");
    setTimeout(() => {
      visible1.value = true;
    }, 500);
    return;
  }
  http
    .post("/addOrder", {
      orderName: orderName.value,
      isPack: radioVal.value == "2" ? true : false,
      taste: Number(radioVal2.value),
      isFinish: false,
      totalMoney: 0,
      actualMoney: 0,
      desk: Number(desk.value) || "",
    })
    .then((res) => {
      if (res.code == 1) {
        showToast.success("订单创建成功,请添加菜品");
        toDetail(res.data, orderName.value);
      }
    });
};
const swipe: any = ref(null);
const orderInput: any = ref(null);
const openDialog = () => {
  let time = dayjs().format("HH:mm");
  orderName.value = time + "-" + (store.orderList.length + 1) + "号订单";
  visible1.value = true;
  nextTick(() => {
    orderInput.value.focus();
  });
};
const toDetail = (id: string, orderName: string) => {
  router.push({
    path: "/orderDetail",
    query: {
      id,
      orderName,
    },
  });
};
const radioVal = ref("1");
const radioVal2 = ref("1");
const tasteTypes = ["正常辣", "微辣", "特辣"];
const btnTypes = ["", "danger", "warning"];
const refresh = ref(false);
const refreshFun = () => {
  store.getOrderList(queryTime);
  setTimeout(() => {
    refresh.value = false;
  }, 500);
};
const formData = reactive({
  actualMoney: "",
  id: "",
  isFinish: true,
});
const activeIndex = ref(-1);
const desk = ref("");
const oName = (item: any) => {
  return item.orderName + (item.desk ? "-" + item.desk + "号桌" : "");
};
</script>

<template>
  <!-- <abPage> -->
  <div class="pb-[50px] min-h-[80vh]">
    <nut-pull-refresh v-model="refresh" @refresh="refreshFun">
      <div>
        <h2 class="flex justify-center items-center text-red-500 pt-[12px]">
          今日订单 <Order class="ml-[4px]" />
        </h2>
        <nut-swipe
          @click="toDetail(item.id, item.orderName)"
          v-for="(item, index) in store.orderList"
          ref="swipe"
          :key="item.id"
        >
          <nut-cell
            :title="oName(item)"
            :sub-title="`创建时间：${item.showTime}`"
          >
            <template #link>
              <div class="mt-[4px]">
                <nut-tag
                  type="warning"
                  v-if="!item.isFinish"
                  style="height: 26px; margin-right: 4px"
                  >进行中</nut-tag
                >
                <nut-tag
                  type="success"
                  v-else
                  style="height: 26px; margin-right: 4px"
                  >已完成</nut-tag
                >
                <nut-tag
                  type="success"
                  v-if="item.isPack"
                  style="height: 26px; margin-right: 4px"
                  >打包</nut-tag
                >
                <nut-tag
                  :type="btnTypes[item.taste] as any"
                  v-if="item.taste && item.taste != 1"
                  style="height: 26px; margin-right: 4px"
                  >{{ tasteTypes[item.taste - 1] }}</nut-tag
                >
                <nut-animate
                  v-if="item.undoneRecord"
                  type="flicker"
                  :loop="true"
                  style="
                    position: absolute;
                    left: 50%;
                    top: 0;
                    transform: translateX(-50%);
                  "
                >
                  <nut-tag type="danger" style="height: 20px">有加菜</nut-tag>
                </nut-animate>
              </div>
            </template>
          </nut-cell>
          <template #right v-if="!item.isFinish">
            <nut-button
              shape="square"
              style="height: 100%"
              type="danger"
              @click.stop="
                visible2 = true;
                formData.actualMoney = String(item.totalMoney);
                formData.id = item.id;
                activeIndex = index;
              "
            >
              设置已完成
            </nut-button>
          </template>
        </nut-swipe>
        <nut-empty
          description="今日还没有开张哦"
          v-if="store.orderList.length == 0"
        ></nut-empty>
      </div>
      <div class="p-[12px]">
        <nut-button block type="primary" @click="openDialog">
          添加订单
          <template #icon>
            <Plus />
          </template>
        </nut-button>
      </div>
    </nut-pull-refresh>
  </div>

  <nut-dialog
    teleport="#app"
    title="添加订单"
    v-model:visible="visible1"
    @ok="addOrder"
    :ok-auto-close="false"
  >
    <nut-cell>
      <nut-input
        ref="orderInput"
        v-model="orderName"
        placeholder="请输入订单名称"
        clearable
      />
    </nut-cell>
    <nut-cell>
      <nut-radio-group v-model="radioVal" direction="horizontal">
        <nut-radio label="1">在这吃</nut-radio>
        <nut-radio label="2">打包</nut-radio>
      </nut-radio-group>
    </nut-cell>
    <nut-cell>
      <nut-radio-group v-model="radioVal2" direction="horizontal">
        <nut-radio label="1">正常辣</nut-radio>
        <nut-radio label="2">微辣</nut-radio>
        <nut-radio label="3">特辣</nut-radio>
      </nut-radio-group>
    </nut-cell>
    <nut-cell>
      <nut-input
        v-model="desk"
        type="digit"
        placeholder="请输入桌号(选填)"
        clearable
      />
    </nut-cell>
  </nut-dialog>
  <nut-dialog
    teleport="#app"
    title="设置订单已完成"
    v-model:visible="visible2"
    @ok="changeFinish"
    :ok-auto-close="false"
  >
    <nut-form>
      <nut-form-item label="实收金额">
        <nut-input
          v-model="formData.actualMoney"
          class="nut-input-text"
          placeholder="请输入实收金额"
          type="text"
        />
      </nut-form-item>
    </nut-form>
  </nut-dialog>
  <!-- </abPage> -->
</template>

<style lang="scss" scoped></style>
