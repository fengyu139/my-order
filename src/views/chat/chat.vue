<script setup lang="ts">
import { showToast } from "@nutui/nutui";
import { IconFont } from "@nutui/icons-vue";
import http from "@/http/index";
import "@nutui/icons-vue/dist/style_iconfont.css";
const chatId = useStorage("chatId", "");
chatId.value = useRoute().query.id as string;
const socket: any = inject("socket");
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
onMounted(() => {
  setTimeout(() => {
    chatBox.value.scrollTop = chatBox.value.scrollHeight;
  }, 100);
});
const pageSize = ref(10);
const pageNum = ref(1);
const getMsgList = async () => {
  let res = await http.get("/chatList", {
    params: { pageSize: pageSize.value, pageNum: pageNum.value },
  });
  msgList.value.unshift(...res.data);
  refresh.value = false;
  if (res.data.length == 0) {
  }
};
getMsgList();
const refresh = ref(false);

const refreshFun = () => {
  pageNum.value++;
  getMsgList();
};
</script>

<template>
  <nut-navbar title="聊天室" fixed class="bg-gray-300"> </nut-navbar>

  <div style="height: calc(100vh - 96px)" class="overflow-auto" ref="chatBox">
    <nut-pull-refresh v-model="refresh" @refresh="refreshFun">
      <ul>
        <li
          class="flex mt-[10px]"
          :class="{ 'flex-row-reverse': item.chatId == chatId }"
          v-for="item in msgList"
          :key="item.chatId"
        >
          <nut-avatar color="rgb(245, 106, 0)" bg-color="rgb(253, 227, 207)">{{
            item.name
          }}</nut-avatar>
          <div
            v-if="item.type == 'img'"
            :class="[item.chatId == chatId ? 'mr-[12px]' : 'ml-[12px]']"
          >
            <img :src="item.picImg" alt="" srcset="" />
          </div>
          <div
            v-else-if="item.type == 'file'"
            class="flex items-center"
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
            class="bg-gray-100 rounded-lg text-[14px] p-[4px] relative"
            :class="[item.chatId == chatId ? 'mr-[12px]' : 'ml-[12px]']"
          >
            <span>{{ item.msg }}</span>
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
    </nut-pull-refresh>
  </div>
  <div>
    <nut-input v-model="msgForm.msg" placeholder="请输入内容" clearable>
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
