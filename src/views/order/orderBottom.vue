<script setup lang="ts">
import dayjs from "dayjs";
import cloneDeep from "lodash/cloneDeep";
import { showDialog } from "@nutui/nutui";
import { showToast } from "@nutui/nutui";
import { useHomeStore } from "@/store/homeStore";
import { storeToRefs } from "pinia";
import addRecords from "@/views/order/addRecords.vue";
import { b } from "@/store/animationHook";
const router = useRouter();
const route = useRoute();
import http from "@/http/index";
import PayButton from "./payButton.vue";
import AbIcon from "@/components/abIcon.vue";
const props = defineProps(["id", "desk"]);
const store = useHomeStore();
const storeOrder = useStorage("storeOrder", "");
const { totalItems, totalPrice, totalCount, userProduct, detailData } =
  storeToRefs(store);
const showDetail = ref(false);
watch(showDetail, (val) => {
  val &&
    store
      .getRecordsList({ orderId: store.detailData?.id || "cccccccccc" })
      .then((res) => {
        recordsList.value = res.data;
      });
});
const columns = [
  {
    title: "菜名",
    key: "name",
    align: "center",
  },
  {
    title: "价格",
    key: "price",
    align: "center",
  },
  {
    title: "数量",
    key: "count",
    align: "center",
  },
  {
    title: "金额",
    key: "money",
    align: "center",
  },
];
const clear = () => {
  showDialog({
    title: "提示",
    content: "确定要清空已添加菜品吗？",
    onOk: () => {
      store.clearActive();
      showToast.success("菜品清空成功");
    },
  });
};
const thisDesk = ref("");
const submitOrder = () => {
  if (props.desk || JSON.stringify(props) === "{}") {
    if (submitted.value && props.desk == thisDesk.value) {
      addSubmit();
      return;
    }
    let currentHours = dayjs().format("HH:mm");
    http
      .post("/addOrder", {
        orderDetail: userProduct.value,
        totalMoney: totalPrice.value,
        totalCount: totalCount.value,
        isPack: false,
        taste: Number(radioVal2.value),
        orderName: currentHours + "-" + props.desk + "号桌",
        isFinish: false,
        desk: props.desk,
        userOperation: true,
      })
      .then((res) => {
        store.detailData.id = res.data;
        showToast.success("订单提交成功");
        btnStatus.value = false;
        if (res.orderFlag) {
          storeOrder.value = res.data;
          router.push({
            path: "/settlement",
            query: { orderFlag: res.orderFlag },
          });
        }
        socket.emit("message", {
          desk: props.desk,
          type: "submitted",
          orderId: res.data,
        });
      });
  }
  if (props.id) {
    let changeArr: any[] = [];
    store.userProduct.forEach((element) => {
      const item = store.backupData.find((i) => i.id == element.id);
      if (element.count != item.count) {
        let changeItem = cloneDeep(element);
        changeItem.count = element.count - item.count;
        changeArr.push(changeItem);
      }
    });
    store
      .updateOrder({
        id: props.id,
        orderDetail: userProduct.value.filter((i) => i.count > 0),
        totalMoney: totalPrice.value,
        totalCount: totalCount.value,
        isAdmin: true,
        recordsList: changeArr.length ? changeArr : "",
        desk: props.desk || "",
      })
      .then((res) => {
        store.backupData = cloneDeep(userProduct.value);
        showToast.success("订单提交成功");
      });
  }
};
const submitted = ref(false);
const toSubmit = () => {
  if (submitted.value && props.desk == thisDesk.value) {
    submitOrder();
    return;
  }
  if (props.desk || JSON.stringify(props) === "{}")
    return (visible1.value = true);
  submitOrder();
};
const disable = inject("disable");
const visible1 = ref(false);
const radioVal2 = ref("1");
const btnStatus = ref(false);
const isAddBtn = computed(() => {
  return props.desk && store.detailData?.id && !btnStatus.value;
});
watchEffect(() => {
  disable.value = isAddBtn.value;
});
const isAddBtn2 = computed(() => {
  return props.desk && store.detailData?.id;
});
const addFoods = () => {
  store.clearActive();
  showToast.success("已经为你把菜品清空，请选择需要添加的菜品");
  btnStatus.value = true;
};
const isSelected = computed(() => {
  return userProduct.value.some((item) => item.count > 0) && btnStatus.value;
});
const socket: any = inject("socket");
socket.on("message", (data: any) => {
  showToast.hide();
  if (route.query.desk && route.query.desk == data.desk) {
    if (data.type == "submitted") {
      thisDesk.value = data.desk;
      submitted.value = true;
      store.detailData.id = data.orderId;
      showDialog({
        title: "提示",
        content: "您的同桌已经提交了订单",
        noCancelBtn: true,
        okText: "知道了",
        onOk: () => {
          store.getOrderDetail({ id: store.detailData?.id });
        },
      });
      return;
    }
    showDialog({
      title: "来自您同桌的加菜",
      content: data.msg,
      noCancelBtn: true,
      okText: "知道了",
      onOk: () => {
        if (!isSelected.value) {
          store.getOrderDetail({ id: store.detailData?.id });
        }
      },
    });
  }
});
const disableBtn = ref(false);
// 添加菜品
const addSubmit = () => {
  let items = userProduct.value.filter((item) => item.count > 0);
  http
    .post("/addFoods", {
      orderId: store.detailData?.id,
      desk: props.desk,
      items: items,
      totalMoney: totalPrice.value,
      totalCount: totalCount.value,
    })
    .then((res) => {
      if (res.code == 0) {
        showDialog({
          title: "提示",
          content: res.msg,
          noCancelBtn: true,
          okText: "知道了",
        });
        btnStatus.value = false;
        disableBtn.value = true;
        return;
      }
      showToast.success("您的菜单已提交");
      setTimeout(() => {
        store.getOrderDetail({ id: store.detailData?.id });
      }, 3000);
      btnStatus.value = false;
      let sendMsg = ``;
      items.forEach((item) => {
        sendMsg += ` <p class="-mt-[8px] text-[14px]">${item.name} &nbsp; * &nbsp; ${item.count}<p/>`;
      });
      socket.emit("message", {
        msg: sendMsg,
        desk: props.desk,
        type: "addFoods",
      });
    });
};
// 取消
const cancel = () => {
  showDialog({
    title: "提示",
    content: "确定要取消吗",
    onOk: () => {
      btnStatus.value = false;
      store.getOrderDetail({ id: store.detailData?.id });
    },
  });
};
const recordsList = ref([]);
const priceDom: any = ref(null);
onUpdated(() => {
  nextTick(() => {
    b.x = priceDom.value.offsetLeft;
    b.y = priceDom.value.offsetTop;
  });
});
</script>

<template>
  <div class="h-[38px] flex items-center px-[6px]">
    <div class="text-gray-400" ref="priceDom">
      总计：<nut-price :price="totalPrice" symbol="¥" />
    </div>
    <div class="ml-auto">
      <nut-button
        type="warning"
        style="margin-right: 10px"
        size="small"
        @click="clear"
        v-if="!detailData?.isFinish && !isAddBtn2"
        >清空</nut-button
      >
      <nut-button
        type="info"
        @click="showDetail = true"
        style="margin-right: 10px"
        size="small"
        >查看明细</nut-button
      >
      <nut-button
        v-if="!detailData?.isFinish && !isAddBtn2"
        type="primary"
        size="small"
        @click="toSubmit"
        >提交
        <template #icon>
          <AbIcon icon="ion:cart-outline"></AbIcon>
        </template>
      </nut-button>
      <nut-button
        v-if="isAddBtn"
        type="primary"
        :disabled="disableBtn"
        size="small"
        @click="addFoods"
        >我要加菜</nut-button
      >
      <nut-button
        v-if="btnStatus"
        type="warning"
        size="small"
        style="margin-right: 10px"
        @click="cancel"
        >取消</nut-button
      >
      <nut-button
        v-if="isSelected"
        type="primary"
        size="small"
        @click="addSubmit"
        >选好了</nut-button
      >
      <PayButton></PayButton>
    </div>
  </div>
  <nut-popup
    style="padding-top: 30px; padding-left: 10px; padding-right: 10px"
    v-model:visible="showDetail"
    position="bottom"
    :closeable="true"
  >
    <nut-table :columns="columns" :data="totalItems"></nut-table>
    <div class="flex justify-center py-[8px]">
      <p class="mr-[10px]">
        总计数量：<span class="text-red-400">{{ totalCount }}</span>
      </p>
      <p>
        总计金额：<nut-price :price="totalPrice" symbol="¥" size="normal" />
      </p>
    </div>
    <div v-if="recordsList.length > 1 && !isSelected">
      <h2 class="text-center my-[6px] text-orange-500">加菜纪录</h2>
      <addRecords
        :recordsList="recordsList"
        :showBtn="!!route.query.id"
      ></addRecords>
    </div>
  </nut-popup>
  <nut-dialog
    teleport="#app"
    title="添加订单"
    v-model:visible="visible1"
    @ok="submitOrder"
    :ok-auto-close="false"
  >
    <nut-form>
      <nut-form-item label="选择口味">
        <nut-radio-group v-model="radioVal2" direction="horizontal">
          <nut-radio label="1">正常辣</nut-radio>
          <nut-radio label="2">微辣</nut-radio>
          <nut-radio label="3">特辣</nut-radio>
        </nut-radio-group>
      </nut-form-item>
    </nut-form>
  </nut-dialog>
</template>

<style lang="scss" scoped></style>
