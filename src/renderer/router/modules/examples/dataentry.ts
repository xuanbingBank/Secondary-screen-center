import { RouteRecordRaw } from "vue-router";
import { 
  FormOutlined,
  SearchOutlined,
  ClusterOutlined,
  CheckSquareOutlined,
  CalendarOutlined,
  EditOutlined,
  StarOutlined,
  SelectOutlined,
  SlidersFilled,
  SwapOutlined,
  UploadOutlined,
  FieldTimeOutlined
} from '@ant-design/icons-vue';

export const dataentryRoute: RouteRecordRaw = {
  path: "dataentry",
  name: "dataentry",
  meta: {
    title: "数据录入",
    icon: FormOutlined,
    primary: true
  },
  children: [
    {
      path: "autocomplete",
      name: "examples-antdv-autocomplete",
      component: () => import("../../../views/examples/ant-design-vue/dataentry/autocomplete.vue"),
      meta: {
        title: "AutoComplete 自动完成",
        icon: SearchOutlined
      }
    },
    {
      path: "cascader",
      name: "examples-antdv-cascader",
      component: () => import("../../../views/examples/ant-design-vue/dataentry/cascader.vue"),
      meta: {
        title: "Cascader 级联选择",
        icon: ClusterOutlined
      }
    },
    {
      path: "checkbox",
      name: "examples-antdv-checkbox",
      component: () => import("../../../views/examples/ant-design-vue/dataentry/checkbox.vue"),
      meta: {
        title: "Checkbox 多选框",
        icon: CheckSquareOutlined
      }
    },
    {
      path: "datepicker",
      name: "examples-antdv-datepicker",
      component: () => import("../../../views/examples/ant-design-vue/dataentry/datepicker.vue"),
      meta: {
        title: "DatePicker 日期选择框",
        icon: CalendarOutlined
      }
    },
    {
      path: "form",
      name: "examples-antdv-form",
      component: () => import("../../../views/examples/ant-design-vue/dataentry/form.vue"),
      meta: {
        title: "Form 表单",
        icon: FormOutlined
      }
    },
    {
      path: "input",
      name: "examples-antdv-input",
      component: () => import("../../../views/examples/ant-design-vue/dataentry/input.vue"),
      meta: {
        title: "Input 输入框",
        icon: EditOutlined
      }
    },
    {
      path: "rate",
      name: "examples-antdv-rate",
      component: () => import("../../../views/examples/ant-design-vue/dataentry/rate.vue"),
      meta: {
        title: "Rate 评分",
        icon: StarOutlined
      }
    },
    {
      path: "select",
      name: "examples-antdv-select",
      component: () => import("../../../views/examples/ant-design-vue/dataentry/select.vue"),
      meta: {
        title: "Select 选择器",
        icon: SelectOutlined
      }
    },
    {
      path: "slider",
      name: "examples-antdv-slider",
      component: () => import("../../../views/examples/ant-design-vue/dataentry/slider.vue"),
      meta: {
        title: "Slider 滑动输入条",
        icon: SlidersFilled
      }
    },
    {
      path: "transfer",
      name: "examples-antdv-transfer",
      component: () => import("../../../views/examples/ant-design-vue/dataentry/transfer.vue"),
      meta: {
        title: "Transfer 穿梭框",
        icon: SwapOutlined
      }
    },
    {
      path: "upload",
      name: "examples-antdv-upload",
      component: () => import("../../../views/examples/ant-design-vue/dataentry/upload.vue"),
      meta: {
        title: "Upload 上传",
        icon: UploadOutlined
      }
    },
    {
      path: "timepicker",
      name: "examples-antdv-timepicker",
      component: () => import("../../../views/examples/ant-design-vue/dataentry/timepicker.vue"),
      meta: {
        title: "TimePicker 时间选择框",
        icon: FieldTimeOutlined
      }
    }
  ]
}; 