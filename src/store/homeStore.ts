import { ref, reactive, computed, watch } from "vue";
import * as math from "mathjs";
import cloneDeep from "lodash/cloneDeep";
import { defineStore } from "pinia";
import http from "@/http/index";
console.log(math);

interface Product {
  id: number;
  name: string;
  price: number;
  type: number;
  picImg: string;
  count?: number;
  isOnline: boolean;
  render?: any;
  unit?: string;
}
export interface Order {
  id: string;
  orderName: string;
  totalCount: number;
  isFinish: boolean;
  showTime: string;
  isPack: boolean;
  taste: number;
  totalMoney: number;
  undoneRecord: boolean;
  desk: number | string;
}
export const useHomeStore = defineStore("homeStore", () => {
  const productList = reactive<Product[]>([]);
  const userProduct = reactive<Product[]>([]);
  const chosenGoods = computed(() => {
    return userProduct.filter((item: any) => {
      return item.count;
    });
  });
  const totalPrice = computed(() => {
    return userProduct.reduce((total: number, item: any) => {
      return total + item.price * (item.count || 0);
    }, 0);
  });
  const totalItems = computed(() => {
    let arr: any = [];
    userProduct.forEach((item: any) => {
      if (Number(item.count)) {
        arr.push({
          name: item.name,
          count: item.count,
          price: item.price,
          money: math.multiply(
            math.bignumber(item.price),
            math.bignumber(item.count)
          ),
        });
      }
    });
    return arr;
  });
  const totalCount = computed(() => {
    return userProduct.reduce((total: number, item: any) => {
      return total + (Number(item.count) || 0);
    }, 0);
  });
  // 订单列表;
  const orderList = ref<Order[]>([]);
  const getMenu = async (type?: number, filter?: boolean) => {
    return new Promise((resolve, reject) => {
      http.post("/getMenu", { type, filter }).then((result) => {
        productList.length = 0;
        userProduct.length = 0;
        userProduct.push(...result.data);
        productList.push(...result.data);
        resolve(result.data);
      });
    });
  };
  const updateOrder = async (data: any) => {
    return http.post("/updateOrder", data);
  };
  const getOrderList = (data: any) => {
    http.post("/orderList", data).then((result) => {
      result.data.forEach((item: any) => {
        item.totalMoney = Number(item.totalMoney.toFixed(2));
        item.actualMoney = Number(item.actualMoney.toFixed(2));
      });
      orderList.value = result.data;
    });
  };
  const detailData: any = ref({
    id: "",
  });
  let backupData: any = ref([]);
  const getOrderDetail = (data: any) => {
    http.post("/orderList", data).then((result) => {
      clearActive();
      result.data.forEach((item: any) => {
        item.totalMoney = Number(item.totalMoney.toFixed(2));
        item.actualMoney = Number(item.actualMoney.toFixed(2));
      });
      let data = result.data[0]?.orderDetail || [];
      data.forEach((item: any) => {
        let fIndex = userProduct.findIndex((product: any) => {
          return product.id == item.id;
        });
        if (fIndex !== -1) {
          userProduct[fIndex].count = item.count;
        }
      });
      // Object.assign(backupData, cloneDeep(userProduct));
      backupData.value = cloneDeep(userProduct);
      result.data[0] && delete result.data[0].orderDetail;
      detailData.value = result.data[0] || {};
      if (data.length == 0) {
        updateOrder({
          id: detailData.value.id,
          orderDetail: userProduct,
        });
      }
    });
  };
  const clearActive = () => {
    userProduct.forEach((item: any) => {
      item.count = 0;
    });
  };
  const selectList = ref([
    { text: "推荐", value: "1" },
    { text: "肉类", value: "2" },
    { text: "素菜", value: "3" },
    { text: "海鲜/鱼类", value: "4" },
    { text: "饮料/酒水", value: "5" },
    { text: "其他", value: "6" },
  ]);
  const getRecordsList = async (data: any) => {
    return http.post("/recordsList", data);
  };
  return {
    productList,
    userProduct,
    chosenGoods,
    totalPrice,
    totalItems,
    totalCount,
    orderList,
    backupData,
    detailData,
    selectList,
    getMenu,
    updateOrder,
    getOrderList,
    getOrderDetail,
    clearActive,
    getRecordsList,
  };
});
