<template>
  <div>
    <div>
      <img src="@/assets/login.png" alt="" srcset="" />
    </div>
    <h2 class="text-center pt-[10px] text-[#fa2c19]">请登录</h2>
    <nut-form :model-value="formData" ref="ruleForm">
      <nut-form-item
        label="账户名"
        prop="userName"
        required
        :rules="[{ required: true, message: '请填写账户名' }]"
      >
        <nut-input
          class="nut-input-text"
          v-model="formData.userName"
          placeholder="请输入账户名"
          type="text"
          clearable
        />
      </nut-form-item>
      <nut-form-item
        label="密码"
        prop="password"
        required
        :rules="[
          { required: true, message: '请填写密码' },
          { regex: /^\w{6,12}$/, message: '密码是6-12位' },
        ]"
      >
        <nut-input
          class="nut-input-text"
          v-model="formData.password"
          placeholder="请输入密码"
          clearable
          type="password"
        />
      </nut-form-item>

      <nut-cell>
        <nut-button
          type="primary"
          block
          style="margin-right: 10px"
          @click="submit"
          >登 录</nut-button
        >
      </nut-cell>
      <div class="pl-[6%] pb-[12px]">
        <nut-checkbox v-model="checkbox" label="1">记住密码</nut-checkbox>
      </div>
    </nut-form>
  </div>
</template>
<script lang="ts" setup>
import useLoginStore from "@/store/loginStore";
import { ref, reactive } from "vue";
const userForm = useStorage("userForm", {});
const loginStore = useLoginStore();
const formData = reactive({
  userName: "",
  password: "",
});
Object.assign(formData, userForm.value);
const ruleForm = ref<any>(null);
const checkbox = ref(false);
if (userForm.value.userName && userForm.value.password) {
  checkbox.value = true;
}
const submit = () => {
  ruleForm.value.validate().then(({ valid }: any) => {
    if (valid) {
      loginStore.loginApi(formData, checkbox.value);
    }
  });
};
</script>

<style lang="scss" scoped></style>
