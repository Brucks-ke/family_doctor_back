import React, { useState , useRef , useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import propTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import intance from "../../utils/request";
import {useImmer} from "use-immer"

// 传入接口
import type { IForm } from "./FormTypes";

interface IProps {}
import {
  Button,
  TimePicker ,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Space,
} from "antd";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};



const FormInput: React.FC = (props: IProps) => {
  // center


  // 找个东西接受接收过来的数据
  // const [propsOptioData,setPropsOptioData] = useImmer([...props.FormOptionData])
  
  const [propsOptioData, setPropsOptioData] = useState(props.FormOptionData);

  const [sendSearchData, setSendSearchData] = useState<IForm>({});
  /**@1.1前置1   定义一个存储格式化后的数组 */
  const [FormProps, setFormProps] = useState<any>([]);




  //时间改变事件
  const timeChangeFun = (dateString: any, name: string) => {
    // console.log(dateString,"左边是格式化后的",name,"右边是key");
    //这个时候要搞一个中间值来合并所有的参数 center
    setSendSearchData({ ...sendSearchData, [name]: dateString });
  };
  


   /**给form表单设置初始值 */ const [form] = useForm();

     //@1.1获取到了父组件传输过来到值，一进来就获取接口
  //@1.1.1 用ref定义一个开关值  来确定接口发送完毕
  const lenNum = useRef(0);
  //一进入执行一次就够了
  useEffect(() => {
    console.log(propsOptioData,"得到了传过来的值没有");
    
    const fetchData = async () => {
      const updatedFormProps = await Promise.all(
        props.FormOptionData.map(async (item, index) => {
          if (!item.optionApi) return item;

          const { url, method = "get", data } = item.optionApi;
          const { data: res } = await intance({
            url: url,
            method: method,
            data: data,
            params: data,
          });

          const updatedItem = {
            ...item,
            optionList: (Array.isArray(res) ? res : res.rows).map((item) => ({
              label: item?.name,
              value: item?.id,
            })),
          };
          
          
          return updatedItem;
        })
      );
      console.log(updatedFormProps,"格式化后端");
      setFormProps([...updatedFormProps]);
    };

    fetchData();
  }, [props.FormOptionData]);  //传一次改一次







  return (
    <div>

        {FormProps?.map((item: IForm, index: number) => {
          return (
            <Space key={index}>
              <Form.Item
                label={item.label}
                name={item.name}
                key={index}
                style={{ width: 400 , marginBottom : 20}}
                // rules={ruleMap}
                required = {item.required}

              >
                {item.type == "text" && (
                  <Input
                    placeholder={"请输入" + item.label}
                    disabled={item.disabled}
                    style={{ height: "40px" }}
                  ></Input>
                )}
                {
                  item.type=="font" && (
                    <Radio.Group>
                      <Radio value={item.value}>{item.value}</Radio>
                    </Radio.Group>
                  )
                }
                {item.type == "number" && (
                  <InputNumber
                    placeholder={"请输入" + item.label}
                    style={{ height: "40px" }}
                  ></InputNumber>
                )}
                {/* {item.type == "radio" && (
                  <Radio.Group
                    style={{ height: "40px" }}
                    options={item.optionList}
                  />
                )} */}
                {item.type == "password" && (
                  <Input.Password
                    placeholder={"请输入" + item.label}
                    style={{ height: "40px" }}
                  ></Input.Password>
                )}
                {item.type === "select" && (
                  <Select
                    placeholder={"请输入" + item.label}
                    style={{ height: "40px" }}
                    // mode={item.mode} //让这个角色成为多选框
                    options={item.optionList}
                    // fieldNames={item.fieldNames}
                  ></Select>
                )}
                {/* {item.type == "treeSelect" && (
                  <TreeSelect
                    placeholder={"请输入" + item.label}
                    style={{ width: "200px" }}
                    treeData={item.optionList}
                    style={{ height: "40px" }}
                  />
                )} */}
                {item.type == "datePicker" && (
                  <DatePicker
                    placeholder={"请输入" + item.label}
                    format={"YYYY-MM-DD"}
                    // onChange={(dates: any, dateStrings: any) =>
                    //   timeChangeFun(dateStrings, item.name)
                    // }
                    style={{ height: "40px" }}
                  />
                )}

                {item.type == "timePicker" && (
                  <DatePicker
                  placeholder={"请输入" + item.label}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  // onChange={handleDateChange}
                  // value={selectedDateTime}
                />
                )}
                {item.type == "textArea" && (
                  <Space.Compact key={index} block={true} direction="vertical">
                      <TextArea rows={4}  placeholder={"请输入" + "签约"+item.label}/>
                  </Space.Compact>
                )}
              </Form.Item>
            </Space>
          );
        })}
    </div>
  );
};

// 传输的选项

interface IProps {
  FormOptionData: IForm[];
}

FormInput.defaultProps = {
  FormOptionData: [
    {
      label: "姓名",
      value: "李小明",
      disable: false,
      type: "text",
    },
  ],
};

export default FormInput;
