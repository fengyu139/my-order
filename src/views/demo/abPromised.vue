<script setup lang="ts">
import http from "@/http/index";
import { Promised } from "vue-promised";
import withPromise from "./hoc";
const getList = async (id?: number) => {
  return http.post("/getMenu", { id });
};
console.log(typeof Promised);

const useHttp = ref(getList());
// setTimeout(() => {
//   useHttp.value = http.post("/getMenus");
// }, 1000);
const view = {
  template: `
        <div>
            <p>{{result}}</p>
        </div>
    `,
  props: ["result", "loading"],
};
const abHoc = withPromise(view, getList);
</script>

<template>
  <div>
    <!-- <Promised :promise="useHttp">
      <template v-slot:pending>
        <p>Loading...</p>
      </template>
      <template v-slot="data">
        <ul>
          <li v-for="item in data.data">{{ item.name }}</li>
        </ul>
      </template>
      <template v-slot:rejected="error">
        <p>Error: {{ error.message }}</p>
      </template>
    </Promised> -->
    <abHoc></abHoc>
  </div>
</template>

<style lang="scss" scoped></style>
