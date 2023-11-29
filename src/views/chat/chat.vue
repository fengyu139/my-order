<script setup lang="ts">
import { showToast, showImagePreview } from "@nutui/nutui";
import debounce from "lodash/debounce";
import { useScroll } from "@vueuse/core";
import "@nutui/nutui/dist/packages/imagepreview/style";
import { IconFont } from "@nutui/icons-vue";
import http from "@/http/index";
import dayjs from "dayjs";
import "@nutui/icons-vue/dist/style_iconfont.css";
const chatId = useStorage("chatId", "");
chatId.value = useRoute().query.id as string;
const socket: any = inject("socket");
import loadImg from "@/assets/loading";
console.log(loadImg);

const msgForm = reactive({
  msg: "",
  name: chatId.value == "1" ? "小扈" : "老胡",
  chatId: chatId.value,
  picImg: "",
  type: "text",
});
const chatBox = ref(null);
const myUploader = ref(null);
const msgList: any = ref([]);
const sendMsg = () => {
  if (msgForm.msg == "") return showToast.fail("请输入内容");
  msgForm.type = "text";
  socket.emit("chat", msgForm);
  msgList.value.push(JSON.parse(JSON.stringify(msgForm)));
  msgForm.msg = "";
  nextTick(() => {
    chatBox.value.scrollTop = chatBox.value.scrollHeight;
  });
};
socket.on("chat", (data: any) => {
  msgList.value.push(data);
  console.log(chatBox.value);

  nextTick(() => {
    chatBox.value.scrollTop = chatBox.value.scrollHeight;
  });
});
socket.on("chatEnter", (data: any) => {
  enterShow.value = data.entering;
});
const fileToDataURL = (file: Blob): Promise<any> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = (e) => resolve((e.target as FileReader).result);
    reader.readAsDataURL(file);
  });
};
const canvastoFile = (
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob | null> => {
  return new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(blob), type, quality)
  );
};
const dataURLToImage = (dataURL: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = dataURL;
  });
};
const successUpload = (res: any) => {
  msgForm.picImg = JSON.parse(res.responseText).data;
  // showToast.success("上传成功");
  socket.emit("chat", msgForm);
  myUploader.value.clearUploadQueue();
};
const failure = (err) => {
  showToast.fail(err);
};
const beforeUpload = async (file: File[]) => {
  if (isImage(file[0])) {
    msgForm.type = "img";
    let fileName = file[0].name;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    const base64 = await fileToDataURL(file[0]);
    const img = await dataURLToImage(base64);
    canvas.width = img.width;
    canvas.height = img.height;

    context.clearRect(0, 0, img.width, img.height);
    context.drawImage(img, 0, 0, img.width, img.height);

    let blob = (await canvastoFile(canvas, "image/jpeg", 0.5)) as Blob; //quality:0.5可根据实际情况计算
    const f = await new File([blob], fileName);
    return [f];
  }
  msgForm.type = "file";
  let f = await new File([file[0]], file[0].name);
  console.log(f);

  return [f];
};
function isImage(file) {
  return file.type.startsWith("image/");
}
const downloadFile = (url: string) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = url.slice(url.lastIndexOf("/"), url.length);
  a.click();
};
onMounted(() => {});
const pageSize = ref(10);
const pageNum = ref(1);
const getMsgList = async () => {
  let res = await http.get("/chatList", {
    params: { pageSize: pageSize.value, pageNum: pageNum.value },
  });
  msgList.value.unshift(...res.data);
  refresh.value = false;
  if (pageNum.value == 1) {
    setTimeout(() => {
      chatBox.value.scrollTop = chatBox.value.scrollHeight;
    }, 100);
  }
  if (res.data.length == 0) {
    stopWatching();
  }
};
getMsgList();
const refresh = ref(false);
const { y, directions } = useScroll(chatBox, {
  offset: { top: 30, bottom: 30, right: 30, left: 30 },
});
const refreshFun = debounce(async () => {
  pageNum.value++;
  await getMsgList();
  y.value = 400;
}, 500);

const stopWatching = watch(y, () => {
  if (y.value < 11 && directions.top) {
    refreshFun();
  }
});
const entering = ref(false);
const enterShow = ref(false);
let timer: any = null;
const inputFun = () => {
  clearTimeout(timer);
  if (!entering.value) {
    entering.value = true;
    socket.emit("chatEnter", { entering: true });
  }
  timer = setTimeout(() => {
    entering.value = false;
    socket.emit("chatEnter", { entering: false });
  }, 1500);
};
</script>

<template>
  <nut-navbar title="111111" fixed class="bg-gray-300"> </nut-navbar>

  <div style="height: calc(100vh - 96px)" class="overflow-auto" ref="chatBox">
    <!-- <nut-pull-refresh v-model="refresh" @refresh="refreshFun"> -->
    <ul>
      <li
        class="flex mt-[10px] mb-[24px]"
        :class="{ 'flex-row-reverse': item.chatId == chatId }"
        v-for="item in msgList"
        :key="item.chatId"
      >
        <nut-avatar color="rgb(245, 106, 0)" bg-color="rgb(253, 227, 207)">{{
          item.name
        }}</nut-avatar>
        <div
          @click="
            showImagePreview({ show: true, images: [{ src: item.picImg }] })
          "
          v-if="item.type == 'img'"
          class="mx-[12px]"
        >
          <img :src="item.picImg" alt="" srcset="" />
        </div>
        <div
          v-else-if="item.type == 'file'"
          class="flex items-center max-w-[82%] overflow-hidden"
          :class="[item.chatId == chatId ? 'mr-[12px]' : 'ml-[12px]']"
        >
          <span class="text-[12px]"
            >文件：{{
              item.picImg.slice(
                item.picImg.lastIndexOf("/"),
                item.picImg.length
              )
            }}</span
          >
          <NutButton size="small" @click="downloadFile(item.picImg)"
            >点击下载</NutButton
          >
        </div>
        <div
          v-else
          class="bg-gray-100 rounded-lg text-[14px] max-w-[82%] p-[4px] relative"
          :class="[
            item.chatId == chatId
              ? 'mr-[12px] ml-[12px]'
              : 'ml-[12px] mr-[12px] bg-green-500 text-white',
          ]"
        >
          <span class="inline-block w-full overflow-hidden">{{
            item.msg
          }}</span>
          <span
            class="absolute text-[10px] text-gray-400 bottom-[-14px] whitespace-nowrap"
            :class="[item.chatId == chatId ? 'right-0' : 'left-0']"
            >{{ dayjs(item.time).format("MM-DD HH:mm:ss") }}</span
          >
        </div>
      </li>
      <!-- <li class="flex mt-[10px] flex-row-reverse">
        <nut-avatar color="rgb(245, 106, 0)" bg-color="rgb(253, 227, 207)"
          >老胡</nut-avatar
        >
        <div
          class="bg-gray-100 mr-[12px] rounded-lg text-[14px] p-[4px] relative"
        >
          <span>这是小嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻哦行哦行哦谢谢 </span>
        </div>
      </li> -->
    </ul>
  </div>
  <div class="relative">
    <span
      v-show="enterShow"
      class="text-red-500 absolute top-[-10px] text-[12px] left-[4px] z-10 bg-white flex"
      >对方正在输入中<img src="@/assets/loading.js" alt="" srcset=""
    /></span>
    <nut-input
      v-model="msgForm.msg"
      @keyup.enter="sendMsg"
      @input="inputFun"
      placeholder="请输入内容"
      clearable
    >
      <template #right>
        <div class="flex items-center">
          <nut-uploader
            ref="myUploader"
            url="/api/upload"
            @success="successUpload"
            :before-upload="beforeUpload"
            @failure="failure"
            name="image"
          >
            <IconFont name="image" size="24"></IconFont>
          </nut-uploader>

          <nut-button
            style="margin-left: 10px"
            type="primary"
            size="small"
            @click="sendMsg"
            >发 送</nut-button
          >
        </div>
      </template>
    </nut-input>
  </div>
</template>

<style lang="scss" scoped>
:deep(.nut-pull-refresh) {
  height: auto;
}
:deep(.nut-uploader__slot) {
  display: flex;
}
.icon {
  position: absolute;
  top: 12px;
  left: 0;
}
</style>
