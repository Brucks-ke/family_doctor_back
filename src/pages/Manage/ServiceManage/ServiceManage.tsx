import { Card } from "antd";

import React, { useState, useEffect } from "react";
import "./ServiceManage.less";

import type { ColumnsType } from "antd/es/table";
import axiosEL from "../../../utils/request";

import {
  Divider,
  Radio,
  Table,
  Input,
  Space,
  DatePicker,
  Form,
  Select,
} from "antd";
const { RangePicker } = DatePicker; //日期
const { Search } = Input; //搜索框
type SizeType = Parameters<typeof Form>[0]["size"];

export interface ApifoxModel {
  count?: string; // 指定每页展示的数据条数
  endTime?: string; //结束时间，格式为YYYY-MM-DD，小于指定时间
  organId?: string; //机构id
  page?: string; //指定页数
  searchKey?: string; //搜索关键字
  serviceId?: string; //服务包id
  startTime?: string; //开始时间，格式为YYYY-MM-DD，大于等于指定时间
  status?: string; //状态，待审核为0，待支付为1，已驳回为2，生效中为3，已过期为4，默认0
  teamId?: string; //团队id
}
const columns: ColumnsType<ApifoxModel> = [
  {
    title: "编号",
    dataIndex: "number",
    key: "number",
    align: "center",
    // render: (text: string) => <a>{text}</a>,
  },
  {
    title: "签约人姓名",
    dataIndex: "rname",
    key: "rname",
    align: "center",
  },
  {
    title: "身份证号",
    dataIndex: "IDCard",
    key: "IDCard",
    align: "center",
  },
  {
    title: "手机号码",
    dataIndex: "tel",
    key: "tel",
    align: "center",
  },
  {
    title: "签约状态",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: (status) => {
      if (status == "0") {
        return <span style={{ color: "#42d5ae" }}>待审核</span>;
      } else if (status == "1") {
        return <span style={{ color: "rgb(247, 191, 87)" }}>待支付</span>;
      } else if (status == "2") {
        return <span style={{ color: "red" }}>已驳回</span>;
      } else if (status == "3") {
        return <span style={{ color: "blue" }}>生效中</span>;
      } else if (status == "4") {
        return <span style={{ color: "red" }}>已过期</span>;
      }
    },
  },

  {
    title: "签约医生团队",
    dataIndex: "tname",
    key: "tname",
    align: "center",
  },

  {
    title: "签约服务包",
    dataIndex: "sname",
    key: "sname",
    align: "center",
  },

  {
    title: "最后修改时间",
    dataIndex: "subscribeTime",
    key: "subscribeTime",
    align: "center",
    width: 200,
    render: (subscribeTime) => {
      return subscribeTime.replaceAll("-", "/");
    },
  },

  {
    title: "操作",
    dataIndex: "address",
    width: 180,
    render: (text: string) => (
      <div>
        <a href="" style={{ marginRight: 10 }}>
          查看详情
        </a>
        <a href="">编辑</a>
      </div>
    ),
  },
];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: ApifoxModel[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};

export default function SinginListWatch() {
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox"
  );
  //未签约数据
  const [datalist, setDataList] = useState();
  //所有机构
  const [ChcsOrgan, setChcsOrgan] = useState();
  //所有服务包
  const [ChcsService, setChcsService] = useState();
  //对应机构的医生团队
  const [TeamByOrganId, setTeamByOrganId] = useState();
  // 在组件中定义seleqian状态变量，签约状态
  const [seleqian, setseleqian] = useState("");
  // 在组件中定义selectedOrgan状态变量，签约机构
  const [selectedOrgan, setSelectedOrgan] = useState("");
  // 在组件中定义selectChcsServicen状态变量,服务包
  const [selectChcsServicen, setselectChcsServicen] = useState("");
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  //获取未签约
  const getSRTSBySTOSDPage = async () => {
    const res = await axiosEL.post("/api/getSDRSSIBySOTSTSPage"); //,{status: 0 }
    console.log(res, "获取未签约");
    if (res.code == 200) {
      setDataList(res.data.result);
    }
  };

  //获取所有机构
  const getAllChcsOrgan = async () => {
    let res = await axiosEL.post("/api/getAllChcsOrgan");
    // console.log(res,'获取所有机构');
    if (res.code == 200) {
      setChcsOrgan(res.data.rows);
    }
  };
  //根据机构id获取团队信息
  const getTeamByOrganId = async (id: string) => {
    let res = await axiosEL.post("/api/getTeamByOrganId", { organId: id });
    // console.log(res,'根据机构id获取团队信息');
    if (res.code == 200) {
      setTeamByOrganId(res.data);
      // console.log(TeamByOrganId, "222222222222");//选择签约机构后才有值
    }
  };

  //获取所有服务包
  const getAllChcsService = async () => {
    let res = await axiosEL.post("/api/getAllChcsService");
    // console.log(res,'获取所有服务包');
    if (res.code == 200) {
      setChcsService(res.data.rows);
    }
  };

  //  搜索
  const onSearch = (value: string) => {
    // console.log(value);
  };

  //选中的签约机构id
  useEffect(() => {
    getTeamByOrganId(selectedOrgan);
  }, [selectedOrgan]);
  useEffect(() => {
    getSRTSBySTOSDPage();
    getAllChcsOrgan();
    getAllChcsService();
  }, []);

  return (
    <div className="box">
      <div className="top">
        <span></span>
        服务管理
      </div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      ></Radio.Group>
      <Divider />
      {/* <Radio value="checkbox">Checkbox</Radio> */}
      {/* <Radio value="radio">radio</Radio> */}

      {/* from表单 */}
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        style={{ maxWidth: 1800, display: "flex", flexWrap: "wrap" }}
      >
        <Form.Item label="签约状态" style={{ width: 280, marginBottom: 16 }}>
          <Select
            style={{ width: 200 }}
            value={seleqian}
            onChange={(value) => setseleqian(value)}
          >
            <Select.Option value="">请选择</Select.Option>
            <Select.Option value="0">待审核</Select.Option>
            <Select.Option value="1">待支付</Select.Option>
            <Select.Option value="2">已驳回</Select.Option>
            <Select.Option value="3">生效中</Select.Option>
            <Select.Option value="4">已过期</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="签约机构" style={{ width: 340, marginBottom: 16 }}>
          <Select
            style={{ width: 240 }}
            value={selectedOrgan}
            onChange={(value) => setSelectedOrgan(value)}
          >
            <Select.Option value="">请选择</Select.Option>
            {(ChcsOrgan as any)?.map((item: any) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        {selectedOrgan && (
          <Form.Item label="医生团队" style={{ width: 380, marginBottom: 16 }}>
            {TeamByOrganId && (TeamByOrganId as any).length > 0 ? (
              <Select value={(TeamByOrganId[0] as any)?.id}>
                {(TeamByOrganId as any)?.map((item: any) => {
                  return (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            ) : (
              <Select.Option value="aa1">请选择</Select.Option>
            )}
          </Form.Item>
        )}

        {/* flexBasis: '50%'表示每个元素占据一行的50%宽度，marginBottom: 16用于设置元素之间的间距。 */}
        <Form.Item label="服务包" style={{ width: 320, marginBottom: 16 }}>
          <Select
            style={{ width: 240 }}
            value={selectChcsServicen}
            onChange={(value) => setselectChcsServicen(value)}
          >
            <Select.Option value="">请选择</Select.Option>
            {(ChcsService as any)?.map((item: any) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="选择日期" style={{ marginBottom: 16 }}>
          <Space direction="vertical" size={12}>
            <RangePicker style={{ width: 300 }} />
          </Space>
        </Form.Item>

        {/* 搜索 */}
        <Form.Item label="" style={{ width: 300, marginLeft: 30 }}>
          <Search
            placeholder="请输入搜索关键字"
            onSearch={onSearch}
            style={{ width: 320 }}
          />
        </Form.Item>
      </Form>
      {/* 表格 */}
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        rowKey={"id"}
        columns={columns}
        dataSource={datalist}
      />
    </div>
  );
}
