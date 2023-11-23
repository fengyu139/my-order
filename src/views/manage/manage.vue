<script setup lang="ts">
import { useHomeStore } from "@/store/homeStore";
import cloneDeep from "lodash/cloneDeep";
import { Button, showToast } from "@nutui/nutui";
import { Plus } from "@nutui/icons-vue";
import { h } from "vue";
import http from "@/http/index";
const store = useHomeStore();
store.getMenu();
const columns = reactive([
  {
    title: "菜名",
    key: "name",
    align: "center",
  },
  {
    title: "价格",
    key: "price",
    align: "center",
    sorter: (row1: any, row2: any) => {
      return row2.price - row1.price;
    },
  },
  {
    title: "类型",
    key: "type",
    align: "center",
    render: (record: any) => {
      return store.selectList.find((item: any) => item.value == record.type)
        ?.text;
    },
  },
  {
    title: "操作",
    key: "render",
    align: "center",
    render: (record: any) => {
      return h(
        Button,
        {
          onClick: () => {
            Object.assign(formData, record);
            formType.value = "edit";
            isOnline.value = record.isOnline ? "1" : "0";
            formData.type = record.type + "";
            addShow.value = true;
          },
          size: "small",
          type: "primary",
        },
        () => "修改"
      );
    },
  },
]);
const show = ref(false);
const desc = ref("全部");
const typeValue = ref(0);
const confirm = (val: any) => {
  show.value = false;
  desc.value = val.selectedOptions[0].text;
  typeValue.value = val.selectedOptions[0].value;
  store.getMenu(Number(typeValue.value));
};
const ruleForm = ref<any>(null);
const addShow = ref(false);
const formData = reactive({
  id: "",
  name: "",
  price: "",
  type: "1",
  picImg: "",
  isOnline: "",
  unit: "串",
});
const cloneData = cloneDeep(formData);
const formType = ref("add");
const isOnline = ref("1");
const submit = () => {
  ruleForm.value.validate().then((msg: any) => {
    if (!msg.valid) return;
    let reqData = {
      ...formData,
      type: Number(formData.type),
      price: Number(formData.price),
      isOnline: isOnline.value == "1" ? true : false,
      picImg: formData.picImg.includes("http") ? "" : formData.picImg,
    };
    if (formType.value == "edit") {
      http.post("/updateMenu", reqData).then(() => {
        showToast.success("修改成功");
        store.getMenu(Number(typeValue.value));
        addShow.value = false;
      });
    }
    if (formType.value == "add") {
      http.post("/addMenu", reqData).then(() => {
        showToast.success("添加成功");
        store.getMenu(Number(typeValue.value));
        addShow.value = false;
      });
    }
  });
};
const customBlurValidate = (prop: string) => {
  ruleForm.value.validate(prop).then(() => {});
};
const customValidator = (val: string) => {
  if (/^\d+(\.\d+)?$/.test(val)) {
    return Promise.resolve();
  } else {
    return Promise.reject("必须输入数字");
  }
};
watch(
  () => formData.unit,
  (val) => {
    console.log(val);
  }
);
const successUpload = (res: any) => {
  formData.picImg = JSON.parse(res.responseText).data;
  showToast.success("上传成功");
};
const selectList = reactive(cloneDeep(store.selectList));
selectList.unshift({
  text: "全部",
  value: 0,
});
const deleteItem = () => {
  http.post("/deleteMenu", { id: formData.id }).then(() => {
    showToast.success("删除成功");
    store.getMenu(Number(typeValue.value));
    addShow.value = false;
  });
};
const fileToDataURL = (file: Blob): Promise<any> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = (e) => resolve((e.target as FileReader).result);
    reader.readAsDataURL(file);
  });
};
const dataURLToImage = (dataURL: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = dataURL;
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
const beforeUpload = async (file: File[]) => {
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
};
</script>

<template>
  <div class="p-2 pb-[50px]">
    <nut-cell title="请选择分类" :desc="desc" @click="show = true"></nut-cell>
    <nut-popup position="bottom" v-model:visible="show">
      <nut-picker
        threeDimensional
        :columns="selectList"
        title="请选择分类"
        @confirm="confirm"
        @cancel="show = false"
      >
      </nut-picker>
    </nut-popup>
    <nut-table :columns="columns" :data="store.productList"></nut-table>
    <div class="p-[12px]">
      <nut-button
        block
        type="primary"
        @click="
          addShow = true;
          formType = 'add';
          Object.assign(formData, cloneData);
        "
      >
        添加菜品
        <template #icon>
          <Plus />
        </template>
      </nut-button>
    </div>
    <nut-popup
      position="right"
      closeable
      close-icon-position="top-left"
      v-model:visible="addShow"
      style="height: 100%; width: 100%"
    >
      <div class="pt-[18px] px-[20px]">
        <nut-form :model-value="formData" ref="ruleForm">
          <nut-form-item
            label="菜名"
            prop="name"
            @blur="customBlurValidate('name')"
            required
            :rules="[{ required: true, message: '请填写菜名' }]"
          >
            <nut-input
              class="nut-input-text"
              :rules="[{ required: true, message: '请填写菜名' }]"
              v-model="formData.name"
              placeholder="请填写要添加的菜名"
              type="text"
            />
          </nut-form-item>
          <nut-form-item
            label="价格"
            prop="price"
            @blur="customBlurValidate('price')"
            required
            :rules="[
              { required: true, message: '请填写价格' },
              { validator: customValidator, message: '必须输入数字' },
            ]"
          >
            <nut-input
              class="nut-input-text"
              v-model="formData.price"
              placeholder="请输入单价"
              type="text"
            />
          </nut-form-item>
          <nut-form-item label="单位" prop="unit">
            <nut-radio-group direction="horizontal" v-model="formData.unit">
              <nut-radio label="串">串</nut-radio>
              <nut-radio label="份">份</nut-radio>
              <nut-radio label="瓶">瓶</nut-radio>
              <nut-radio label="件">件</nut-radio>
              <nut-radio label="个">个</nut-radio>
            </nut-radio-group>
          </nut-form-item>
          <nut-form-item label="是否上架" prop="isOnline">
            <nut-radio-group direction="horizontal" v-model="isOnline">
              <nut-radio label="1">上架</nut-radio>
              <nut-radio label="0">下架</nut-radio>
            </nut-radio-group>
          </nut-form-item>
          <nut-form-item label="所属分类" prop="type">
            <nut-radio-group direction="horizontal" v-model="formData.type">
              <nut-radio
                :label="item.value"
                v-for="item in store.selectList"
                :key="item.value"
                >{{ item.text }}</nut-radio
              >
            </nut-radio-group>
          </nut-form-item>
          <nut-form-item label="预览图片上传" prop="picImg">
            <nut-uploader
              url="/api/upload"
              accept="image/*"
              v-model="formData.picImg"
              @success="successUpload"
              :before-upload="beforeUpload"
              name="image"
            >
            </nut-uploader>
          </nut-form-item>
          <nut-cell>
            <nut-button block type="primary" @click="submit"
              >确认{{ formType == "edit" ? "修改" : "添加" }}</nut-button
            >
          </nut-cell>
          <nut-cell>
            <nut-button
              block
              type="warning"
              v-if="formType == 'edit'"
              @click="deleteItem"
            >
              删 除</nut-button
            >
          </nut-cell>
        </nut-form>
      </div>
    </nut-popup>
  </div>
</template>

<style lang="scss" scoped></style>
