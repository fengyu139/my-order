<script setup lang="ts">
import OrderBottom from "@/views/order/orderBottom.vue";
import ProductList from "@/views/home/productList.vue";
import { useHomeStore } from "@/store/homeStore";
import { Search2, Refresh } from "@nutui/icons-vue";
import { showDialog } from "@nutui/nutui";
import { useWindowSize } from "@vueuse/core";
const { height } = useWindowSize();
const store = useHomeStore();
const route = useRoute();
const router = useRouter();
if (route.query.id) {
  store.getOrderDetail({ id: route.query.id });
}
if (route.query.desk) {
  store.getOrderDetail({ desk: Number(route.query.desk), isFinish: false });
}
const value = ref("0");
const productList: any = ref(null);
const searchShow = ref(false);
const searchValue = ref("");
const searchData = ref<any[]>([]);
const search = () => {
  setTimeout(() => {
    if (searchValue.value) {
      searchData.value = store.userProduct.filter((i) =>
        i.name.includes(searchValue.value)
      );
      searchShow.value = true;
    }
  }, 200);
};
const backPage = () => {
  if (JSON.stringify(store.userProduct) != JSON.stringify(store.backupData)) {
    showDialog({
      title: "提示",
      content: "数据还未保存，确定返回？",
      onOk: () => {
        router.go(-1);
      },
    });
    return;
  }
  router.go(-1);
};
const planHeight = computed(() => {
  return height.value - 136;
});
const disable = ref(false);
provide("disable", disable);
const orderName = computed(() => {
  return route.query.orderName;
});
const rightClick = () => {
  router.go(0);
};
</script>

<template>
  <nut-navbar
    @click-back="backPage"
    @click-right="rightClick"
    :title="orderName || '点餐区'"
    fixed
    :left-show="!!orderName"
  >
    <template #left v-if="orderName">
      <div>返回</div>
    </template>
    <template #right v-if="!orderName">
      <Refresh width="16px" /><span class="ml-[4px]">刷新订单</span>
    </template>
  </nut-navbar>
  <nut-searchbar
    v-model="searchValue"
    @blur="search"
    placeholder="请输入关键词"
  >
    <template #leftin>
      <Search2 />
    </template>
  </nut-searchbar>
  <nut-tabs
    v-if="store.userProduct.length"
    v-model="value"
    name="tabName"
    direction="vertical"
    :style="{ height: planHeight + 'px' }"
  >
    <nut-tab-pane
      v-for="(item, index) in store.selectList"
      :title="item.text"
      :pane-key="index"
    >
      <ProductList
        ref="productList"
        :list="store.userProduct.filter((i) => i.type == Number(item.value))"
        :isFinish="store.detailData?.isFinish"
      ></ProductList>
    </nut-tab-pane>
  </nut-tabs>
  <OrderBottom :id="route.query.id" :desk="route.query.desk"></OrderBottom>
  <nut-popup position="bottom" closeable round v-model:visible="searchShow">
    <div class="p-[16px]">
      <ProductList
        ref="productList"
        :isFinish="store.detailData?.isFinish"
        :list="searchData"
      ></ProductList>
      <nut-empty
        v-if="!searchData.length"
        image="empty"
        description="没有找到相关商品哦！"
      ></nut-empty>
    </div>
  </nut-popup>
</template>

<style lang="scss" scoped>
:deep(.nut-tabs__titles.normal .nut-tabs__titles-item) {
  width: 100%;
}
</style>
