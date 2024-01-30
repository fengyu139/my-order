<script setup lang="ts">
import { showToast, showImagePreview, showDialog } from "@nutui/nutui";
import { HorizontalN, Refresh, Del } from "@nutui/icons-vue";
import debounce from "lodash/debounce";
import {
  useScroll,
  useClipboard,
  useDocumentVisibility,
  onClickOutside,
} from "@vueuse/core";
import "@nutui/nutui/dist/packages/imagepreview/style";
import { IconFont } from "@nutui/icons-vue";
import http from "@/http/index";
import dayjs from "dayjs";
import "@nutui/icons-vue/dist/style_iconfont.css";
import gsap from "gsap";
const chatId = useStorage("chatId", "");
chatId.value = useRoute().query.id as string;
const socket: any = inject("socket");
import loadImg from "@/assets/loading";
import AbIcon from "@/components/abIcon.vue";
import emoji from "./emoji.vue";
console.log(loadImg);
const { copy } = useClipboard({ legacy: true });
const msgForm = reactive({
  msg: "",
  name: chatId.value == "1" ? "小扈" : "老胡",
  chatId: chatId.value,
  picImg: "",
  type: "text",
  msgId: "",
});
const emojiShow = ref(false);
const docVisibility = useDocumentVisibility();
const chatBox: any = ref(null);
const myUploader = ref(null);
const msgList: any = ref([]);
const chatList: any = ref(null);
//发送消息
const sendMsg = () => {
  if (msgForm.msg == "") return showToast.fail("请输入内容");
  msgForm.type = "text";
  msgForm.msgId = new Date().getTime().toString();
  socket.emit("chat", msgForm);
  msgList.value.push(JSON.parse(JSON.stringify(msgForm)));
  msgForm.msg = "";
  animationFun(false);
};
const animationFun = (noOwn: boolean) => {
  nextTick(() => {
    gsap.to(chatBox.value, {
      scrollTop: chatBox.value?.scrollHeight,
      duration: 0.3,
    });
    let activeDiv = chatList.value[chatList.value?.length - 1];
    let x = noOwn ? -100 : 100;
    gsap.fromTo(
      activeDiv,
      {
        opacity: 0,
        x,
      },
      {
        opacity: 1,
        duration: 0.3,
        x: 0,
      }
    );
    if (noOwn) {
      observer.observe(activeDiv);
    }
  });
};
socket.on("chat", (data: any) => {
  msgList.value.push(data);
  animationFun(true);
  if (docVisibility.value != "visible" && chatId.value == "2") {
    alert("有消息了");
  }
});
socket.on("chatEnter", (data: any) => {
  enterShow.value = data.entering;
});
socket.on("chatDelete", (data: any) => {
  let msgIndex = msgList.value.findIndex((item: any) => {
    return item.msgId == data;
  });
  msgList.value.splice(msgIndex, 1);
});
socket.on("read", (data: any) => {
  data.forEach((item: any) => {
    let msgIndex = msgList.value.findIndex((item2: any) => {
      return item2.msgId == (item.msgId || item);
    });
    msgList.value[msgIndex].isRead = true;
  });
  // enterShow.value = data.entering;
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
  msgForm.msgId = new Date().getTime().toString();
  socket.emit("chat", msgForm);
  myUploader.value.clearUploadQueue();
  msgForm.picImg = "";
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
const pageSize = ref(20);
const pageNum = ref(1);
const getMsgList = async () => {
  let res = await http.get("/chatList", {
    params: { pageSize: pageSize.value, pageNum: pageNum.value },
  });
  msgList.value.unshift(...res.data);
  refresh.value = false;
  if (pageNum.value == 1) {
    setTimeout(() => {
      gsap.to(chatBox.value, {
        scrollTop: chatBox.value.scrollHeight,
        duration: 0.5,
      });
      let otherMsg = msgList.value.filter(
        (item: any) => item.chatId != chatId.value
      );
      if (otherMsg.length > 0) {
        socket.emit("read", otherMsg);
      }
      // chatBox.value.scrollTop = chatBox.value.scrollHeight;
    }, 500);
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
  let scrollHeight = chatBox.value?.scrollHeight;
  await getMsgList();
  y.value = chatBox.value?.scrollHeight - scrollHeight - 10;
  // console.log(chatBox.value?.scrollHeight);
}, 500);
const refreshFun2 = () => {
  pageNum.value = 0;
  msgList.value = [];
};
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
  }, 3000);
};
const overlayShow = ref(false);
const sheetVisible = ref(false);
const menuItems = reactive([
  { name: "删除当条消息", type: "delete" },
  { name: "复制消息", type: "copy" },
]);
const msgId = ref("");
const choose = async (item: any) => {
  if (item.type == "delete") {
    socket.emit("chatDelete", msgId.value);
    showToast.success("删除成功");
  } else {
    let msgItem = msgList.value.find((item: any) => item.msgId == msgId.value);
    console.log(msgItem);
    try {
      await copy(msgItem.msg || msgItem.picImg);
      showToast.success("复制成功");
    } catch (error) {
      showToast.fail("复制失败");
    }
  }
};
const observer = new IntersectionObserver(
  (entries) => {
    // 这个回调会在被观察元素进入或离开视窗时调用
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log(dayjs().format("YYYY-MM-DD HH:mm:ss"));
        console.log(docVisibility.value);

        if (docVisibility.value == "visible") {
          socket.emit("read", [entry.target.dataset.id]);
        }
      }

      // 这里可以处理多个被观察元素的情况
    });
  },
  {
    // 这里可以添加 Intersection Observer 的配置选项
  }
);
// 遍历每个列表项，并开始观察
// this.$refs.listItem.forEach((item, index) => {
//   observer.observe(item);
// });
const emojiClick = (item: any) => {
  msgForm.msg = msgForm.msg + item;
};
const emojiRef = ref(null);
onClickOutside(emojiRef, () => {
  if (emojiShow.value) {
    emojiShow.value = false;
  }
});
const changeShow = () => {
  if (!emojiShow.value) {
    emojiShow.value = true;
  }
};
</script>

<template>
  <nut-navbar
    title="小小聊天室"
    fixed
    class="bg-gray-300"
    @click-right="overlayShow = true"
    @click-back="refreshFun2"
  >
    <template #left>
      <div class="flex items-center">
        <span> 刷新</span><Refresh width="18px" />
      </div>
    </template>
    <template #right>
      <HorizontalN class="right" width="18px"></HorizontalN>
    </template>
  </nut-navbar>

  <div
    style="height: calc(100vh - 96px)"
    class="overflow-y-auto overflow-x-hidden"
    ref="chatBox"
  >
    <!-- <nut-pull-refresh v-model="refresh" @refresh="refreshFun"> -->
    <ul>
      <li
        class="flex mt-[10px] mb-[24px]"
        :class="{ 'flex-row-reverse': item.chatId == chatId }"
        v-for="item in msgList"
        :key="item.msgId"
      >
        <nut-avatar
          @click="
            sheetVisible = true;
            msgId = item.msgId;
          "
          class="z-20 relative"
          color="rgb(245, 106, 0)"
          bg-color="rgb(253, 227, 207)"
          >{{ item.name }}</nut-avatar
        >
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
          ref="chatList"
          class="bg-gray-100 rounded-lg text-[14px] max-w-[82%] p-[4px] relative z-10"
          :data-id="item.msgId"
          :class="[
            item.chatId == chatId
              ? 'mr-[12px] ml-[12px]'
              : 'ml-[12px] mr-[12px] bg-green-500 text-white',
          ]"
        >
          <span
            class="inline-block w-full overflow-hidden"
            v-html="item.msg"
          ></span>
          <span
            v-if="item.chatId == chatId"
            class="absolute left-[-20px] top-[10px] text-[#858585]"
          >
            <AbIcon
              size="18"
              :icon="
                item.isRead
                  ? 'ion:checkmark-done-outline'
                  : 'ion:checkmark-outline'
              "
            ></AbIcon>
          </span>
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
      <!-- <li class="text-[14px]">这是小嘻嘻嘻嘻<i class="face face-1"></i></li>
      <li>
       
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
          <AbIcon
            icon="carbon:face-wink"
            size="24"
            class="mr-[10px] cursor-pointer"
            @click="changeShow"
          ></AbIcon>
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
            icon
            @click="sendMsg"
            >发送
            <template #icon>
              <AbIcon icon="ion:paper-plane-outline"></AbIcon>
            </template>
          </nut-button>
        </div>
      </template>
    </nut-input>
    <emoji
      ref="emojiRef"
      v-show="emojiShow"
      @emojiClick="emojiClick"
      class="absolute top-[-200px]"
    ></emoji>
  </div>

  <nut-overlay v-model:visible="overlayShow">
    <div class="wrapper">
      <img src="@/assets/chatBg.jpg" class="w-full" alt="" srcset="" />
    </div>
  </nut-overlay>
  <nut-action-sheet
    v-model:visible="sheetVisible"
    cancel-txt="取消"
    :menu-items="menuItems"
    @choose="choose"
  />
</template>

<style lang="scss" scoped>
.face {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("@/assets/bq.png") no-repeat;
  background-position: 10px 10px;
  background-size: 100% 100%;
  vertical-align: bottom;
}
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
