import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
// api
import { getOneSinginDetail } from "../../../../Service/api/Services/Singin";
import { useImmer } from "use-immer";

import { ISearchApi } from "../../../../components/FormInput/FormTypes";
import dayjs from "dayjs";
//接口
//组件
import CardEdit from "../../../../components/CardEdit/CardEdit";
interface IOptions {
  label: string;
  name?: string;
  value: string;
  disabled?: boolean;
  optionApi?: ISearchApi;
  type: string;
  mode?: string;
  optionList?: {
    label: string;
    value: string | number;
  }[];
  fieldNames?: string;
  required?: boolean;
}

//api
import { upDataInfoOfSingin } from "../../../../Service/api/Services/Singin";

// 全局弹窗
import GlobalMessage from "../../../../utils/GlobalMessage";

export default function SinginEdit() {
  const location = useLocation(); //实例化$route
  const [searchParams, setSearchParams] = useSearchParams();

  // 接受居民id
  const [residentId, setResidentId] = useState("0" as string);

  // 最终的居民信息
  const [people, setPeople] = useState<IOptions[]>([]);
  const [service, setService] = useState<IOptions[]>([]);

  // 找一个接受请求结果的值
  const [requestData, setRequestData] = useImmer([]);

  /**@格式化配置 */
  // eslint-disabled-next-line @typescript-eslint/no-unused-vars
  let PeopleSendOptionArr: IOptions[] = [
    {
      label: "姓名",
      name: "name",
      value: "李小明",
      disabled: true,
      type: "text",
      required: true,
    },
    {
      label: "身份证号",
      name: "IDCard",
      value: "李小明",
      disabled: false,
      type: "text",
      required: true,
    },
    {
      label: "性别",
      name: "gender",
      value: "",
      disabled: false,
      type: "select",
      required: true,
      optionList: [
        {
          label: "男",
          value: 0,
        },
        {
          label: "女",
          value: 1,
        },
      ],
    },
    {
      label: "出生年月",
      name: "birthday",
      value: "",
      disabled: false,
      type: "datePicker",
      required: true,
    },
    {
      label: "联系电话",
      name: "tel",
      value: "",
      disabled: false,
      type: "text",
      required: true,
    },
    {
      label: "现居地",
      name: "district",
      value: "",
      disabled: false,
      type: "text",
    },
    {
      label: "居民标签",
      name: "emergencyContact",
      value: "",
      disabled: false,
      type: "select",
      // optionList : [
      //     {
      //         label : '男',
      //         value : 0,
      //     },
      //     {
      //         label : '女',
      //         value : 1,
      //     },
      // ]
    },
  ];

  let ServiceSendOptionArr: IOptions[] = [
    {
      label: "签约编号",
      name: "number",
      value: "202351118432",
      disabled: false,
      type: "font",
    },
    {
      label: "签约状态",
      name: "status",
      value: "202351118432",
      disabled: false,
      type: "font",
    },
    {
      label: "签约机构",
      name: "organId",
      value: "67e98bc0-ee1b-11ed-8459-c76f227ca777",
      disabled: false,
      type: "select",
      required: true,
      optionApi: {
        url: "/api/getAllChcsOrgan",
        method: "post",
        data: "",
      },
    },
    {
      label: "签约团队",
      name: "teamId",
      value: "88579930-ee50-11ed-8059-0ba99686cabb",
      disabled: false,
      type: "select",
      required: true,
      optionApi: {
        url: "/api/searchTeamByNameNumber",
        method: "post",
        data: "",
      },
    },
    {
      label: "签约医生",
      name: "doctorId",
      value: "李小明",
      disabled: false,
      type: "select",
      required: true,
      optionApi: {
        url: "/api/getAllDoctor",
        method: "post",
        data: "",
      },
    },
    {
      label: "服务包",
      name: "serviceId",
      value: "7909bde0-828b-11ed-a736-b1a95d18c716",
      disabled: false,
      type: "select",
      required: true,
      optionApi: {
        url: "/api/getAllChcsService",
        method: "post",
        data: "",
      },
    },
    {
      label: "签约类型",
      name: "status",
      value: "202351118432",
      disabled: false,
      type: "font",
    },
    {
      label: "签约周期",
      name: "period",
      value: "202351118432",
      disabled: false,
      qiantao: "service|period",
      type: "font",
    },
    {
      label: "费用",
      name: "price",
      value: "202351118432",
      disabled: false,
      qiantao: "service|price",
      type: "font",
    },
    {
      label: "服务项目",
      name: "serviceItemId",
      value: "d49f9cb3-5c07-11ed-9450-8f19ea84b621",
      disabled: false,
      type: "select",
      required: true,
      optionApi: {
        url: "/api/getAllServiceItem",
        method: "post",
        data: "",
      },
    },
    {
      label: "申请时间",
      name: "takingEffectTime",
      value: "202351118432",
      disabled: false,
      type: "font",
    },
    {
      label: "生效时间",
      name: "takingEffectTime1",
      value: "",
      disabled: false,
      type: "timePicker",
    },
    {
      label: "备注",
      name: "notes",
      value: "",
      disabled: false,
      type: "textArea",
    },
  ];
  /**@格式化配置 */

  useEffect(() => {
    getCurrentData();
  }, []);
  const getCurrentData = async () => {
    // eslint-disable-next-line prefer-const
    let { data } = await getOneSinginDetail(searchParams.get("id"));
    console.log(data, "获取到的详情");
    setResidentId(data.residentId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setRequestData((regor) => (regor = data));
    const result = ServiceSendOptionArr.map((item: IOptions) => {
      for (const key in data) {
        if (
          item.qiantao &&
          item.qiantao &&
          typeof item.qiantao == "string" &&
          item.qiantao.split("|")[0] == key
        ) {
          let arrs = item.qiantao.split("|");
          console.log(arrs, "不知道什么东西");

          let values = data;
          for (let i = 0; i < arrs.length; i++) {
            values = values ? values[arrs[i]] : "";
          }
          console.log(values, "嵌套值的处理");
          item.value = values; //嵌套值处理完成
          continue;
        } else if (item.name == key) {
          item.value = data[key];
          return item;
        }
      }
      return item;
    });
    setService([...result]); //给服务所有的数据  赋值
    console.log(result, "服务信息");

    const result1 = PeopleSendOptionArr.map((item: IOptions) => {
      for (const key in data["resident"]) {
        if (item.name == "takingEffectTime") {
          item.value = "";
        } else if (item.name === "birthday") {
          // item.value = (dayjs(data['resident'][item.name as string]) as unknown as string)
          // console.log(item,"事件类型",data['resident'][item.name as string].replaceAll("-","/"));

          item.value = dayjs(
            data["resident"]["birthday"].replaceAll("-", "/")
          ) as unknown as string;

          return item;
        } else if (item.name == key) {
          item.value = data["resident"][key];
          console.log(data["resident"][key], "每个传的值");

          return item;
        }
      }
      return item;
    });

    setPeople([...result1]); //给人民所有的数据  赋值
    console.log(result1, "居民信息11111111");
  };
  //   拿到子的数值
  const getSonFun = async (value: any) => {
    console.log(value);
    value.labelArrStr = [];
    console.log(requestData, "具名id");

    value.residentId = requestData.residentId;

    let res = await upDataInfoOfSingin(value);

    if (res.code == 200) {
      GlobalMessage.success("修改成功");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  return (
    <div>
      <CardEdit
        returnFun={getSonFun}
        mainTitle="编辑签约"
        upTitle="居民信息"
        downTitle="签约信息"
        sendOptionArr={people}
        send2OptionArr={service}
      ></CardEdit>
    </div>
  );
}
