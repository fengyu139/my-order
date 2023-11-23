import { defineStore } from "pinia";
import { showToast, showNotify } from "@nutui/nutui";
import { useStorage } from "@vueuse/core";
import http from "@/http/index";
const useLoginStore = defineStore("loginStore", () => {
  const router = useRouter();
  const token = useStorage("token", "");
  const userForm = useStorage("userForm", {});
  const isLogin = computed(() => {
    return !!token.value;
  });
  const loginApi = async (data: any, flag: boolean) => {
    let res: any = await http.post("/login", data);
    if (res.code == 1) {
      showNotify.success("登录成功");
      if (flag) {
        userForm.value = data;
      } else {
        userForm.value = { userName: "", password: "" };
      }
      token.value = res.token;
      router.push("/");
    }
  };

  return {
    isLogin,
    token,
    loginApi,
  };
});
export default useLoginStore;
