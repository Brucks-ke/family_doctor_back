import React, { useState, useEffect } from "react";
import "./SinginListWatch.less";
import axiosEL from "../../../../utils/request";
import PaginationS from "../../../../components/PaginationS/PaginationS";
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
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker; //日期
const { Search } = Input; //搜索框
/**@type */
import type { TableInterfaceType } from "./interface/SinginListWatch";
import type { ColumnsType } from "antd/es/table";
type SizeType = Parameters<typeof Form>[0]["size"];

export default function SinginListWatch() {
  const navigate = useNavigate();
  // mainContent   页面的信息
  const [pageObj, setPageObj] = useState<{
    page: number;
    count: number;
    status?: string;
    organId?: string;
    searchKey?: string;
    serviceId?: string;
  }>({
    page: 1, //当前第几页
    count: 3, //一页显示多少条，
  });

  // 表单数据
  const columns: ColumnsType<TableInterfaceType> = [
    {
      title: "编号",
      dataIndex: "number",
      key: "number",
      align: "center",
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
      width: 100,
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
      dataIndex: "takingEffectTime",
      key: "takingEffectTime",
      align: "center",
      width: 200,
      render: (subscribeTime) => {
        // return subscribeTime.replaceAll('-', '/')
        return subscribeTime;
      },
    },

    {
      title: "操作",
      key: "action",
      width: 140,
      render: (data, react) => {
        return (
          <div>
            {/* onClick={()=>jumpDetail('sig',data)} */}
            <button
              style={{
                marginRight: 10,
                border: "none",
                color: "blue",
                background: "white",
                cursor: "pointer",
              }}
              onClick={() => jumpDetail("sig", data)}
            >
              查看详情
            </button>
            <button
              style={{ border: "none", color: "blue", background: "white" }}
              onClick={() => SinginEditFun(react)}
            >
              编辑
            </button>
          </div>
        );
      },
    },
  ];

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: TableInterfaceType[]
    ) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };
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
  /**
   * @description 搜索栏的切换
   * @param val   切换值
   * @returns     void(0)
   */
  const changeStatus = (val: string): void => {
    setseleqian(val);
    // 如果为空那么就要删掉status
    if (val == "") {
      // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
      let newVal: any = {};
      for (const key in pageObj) {
        if (key == "status") {
          continue;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newVal[key] = pageObj[key];
      }
      console.log(newVal, "新的切换状态");

      setPageObj({ ...setPageObj, ...newVal });
      return;
    }
    setPageObj({ ...pageObj, status: val });
  };
  // 在组件中定义selectedOrgan状态变量，签约机构
  const [selectedOrgan, setSelectedOrgan] = useState("");
  /**
   * @description     选择签约机构之后，将选择后的值拿到，设置到页面配置当中
   * @param setValue
   * @returns
   */
  const ChangeOrgan = (setValue: string) => {
    // original  原始值
    setSelectedOrgan(setValue);
    // console.log(setValue, "再次选择的值");
    // 如果为空那么就要删掉status
    if (setValue == "") {
      // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
      // let newVal: any = {}; //控制复制
      // for (const key in pageObj) {
      //   // 这一步直接将签约机构直接删除了这个字段 organId = ""
      //   if (key == "organId") {
      //     continue;
      //   }
      //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   // @ts-ignore
      //   newVal[key] = pageObj[key];
      // }
      //
      /**@优化代码 */
      delete pageObj["organId"]; //删除键
      const newVal = { ...pageObj };
      console.log(newVal, "新的值");
      setPageObj({ ...setPageObj, ...newVal });
      return;
    }
    setPageObj({ ...pageObj, organId: setValue });
  };
  // 在组件中定义selectChcsService状态变量,服务包
  const [selectChcsService, setSelectChcsService] = useState("");
  const changeServiceId = (value: string) => {
    setSelectChcsService(value);
    console.log(value, "值");
    // 如果为空那么就要删掉status
    if (value == "") {
      // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
      // for (const key in pageObj) {
      //   if (key == "serviceId") {
      //     continue;
      //   }
      //   newVal[key] = pageObj[key];
      // }
      /**@优化代码 */
      delete pageObj["serviceId"]; //删除键
      const newVal = { ...pageObj };
      console.log(newVal);
      setPageObj({ ...setPageObj, ...newVal });
      return;
    }
    setPageObj({ ...pageObj, serviceId: value });
  };
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    console.log(size, "搜索3form表单");

    setComponentSize(size);
  };

  // 分页的数据
  const [dataTotal, setDataTotal] = useState(10); //分页条数

  // 分页函数
  const pageOfGetSingin = async () => {
    const res = await axiosEL.post("/api/getSRTSBySTOSDPage", pageObj); //,{status: 未定义 }
    setDataTotal(res.data.total);
    setDataList(res.data.result);
  };

  //获取未签约  //只是获取所有条数
  const getSRTSBySTOSDPage = async () => {
    const res = await axiosEL.post("/api/getSRTSBySTOSDPage"); //,{status: 0 }
    console.log(res, "获取未签约");
    if (res.code == 200) {
      setDataTotal(res.data.result.length);
    }
  };

  //获取所有机构
  const getAllChcsOrgan = async () => {
    const res = await axiosEL.post("/api/getAllChcsOrgan");
    // console.log(res,'获取所有机构');
    if (res.code == 200) {
      setChcsOrgan(res.data.rows);
    }
  };
  //根据机构id获取团队信息
  const getTeamByOrganId = async (id: string) => {
    const res = await axiosEL.post("/api/getTeamByOrganId", { organId: id });
    // console.log(res,'根据机构id获取团队信息');
    if (res.code == 200) {
      setTeamByOrganId(res.data);
      // console.log(TeamByOrganId, "222222222222");//选择签约机构后才有值
    }
  };

  //获取所有服务包
  const getAllChcsService = async () => {
    const res = await axiosEL.post("/api/getAllChcsService");
    // console.log(res,'获取所有服务包');
    if (res.code == 200) {
      setChcsService(res.data.rows);
    }
  };

  // 搜索  form 表单
  const onFinish = (values: unknown) => {
    console.log(values, "form表单的值");
  };

  //  搜索
  const onSearch = (value: string) => {
    if (value == "") {
      // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
      let newVal: any = {};
      for (const key in pageObj) {
        if (key == "searchKey") {
          continue;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newVal[key] = pageObj[key];
      }
      console.log(newVal);

      setPageObj({ ...setPageObj, ...newVal });
      return;
    }
    setPageObj({ ...pageObj, searchKey: value });
  };

  // 跳转详情页
  const jumpDetail = (
    kind: string,
    data: {
      id: string;
    }
  ) => {
    console.log(kind, data, "页面跳转");
    navigate("/manage/singinmange/singindetailwatch", {
      state: { id: data.id, kind: kind },
    });
  };

  //选中的签约机构id
  useEffect(() => {
    getTeamByOrganId(selectedOrgan);
  }, [selectedOrgan]);
  useEffect(() => {
    getSRTSBySTOSDPage(); //最开始获取的嘛
    getAllChcsOrgan();
    getAllChcsService();
  }, []);
  useEffect(() => {
    pageOfGetSingin(); //获取真正的分页数据
  }, [pageObj]);

  // 跳转到编辑
  const SinginEditFun = (react: unknown) => {
    console.log(react, "这一列的数据");
    navigate(
      "/manage/singinmange/singinedit?id=" + (react as { id: string }).id
    );
  };

  // 分页
  const changePagina = (currentPage: number, pageNum: number) => {
    console.log(currentPage, "当前第几页");
    console.log(pageNum, "当前一页几条");
    setPageObj({ ...pageObj, page: currentPage, count: pageNum });
  };
  return (
    <div className="box">
      <div className="top">
        <span></span>
        签约管理
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
        onFinish={onFinish}
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
            onChange={(val) => changeStatus(val)}
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
            onChange={(value) => ChangeOrgan(value)}
          >
            <Select.Option value="">请选择</Select.Option>
            {(
              ChcsOrgan as unknown as {
                id: string;
                number: string;
                name: string;
                picture: string;
                contactName: string;
                contactTel: string;
                address: string;
                description: string;
                flag: number;
              }[]
            )?.map(
              (item: {
                id: string;
                number: string;
                name: string;
                picture: string;
                contactName: string;
                contactTel: string;
                address: string;
                description: string;
                flag: number;
              }) => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                );
              }
            )}
          </Select>
        </Form.Item>
        {selectedOrgan && (
          <Form.Item label="医生团队" style={{ width: 380, marginBottom: 16 }}>
            {TeamByOrganId &&
            (
              TeamByOrganId as {
                id: string;
                number: string;
                name: string;
                picture: string;
                organId: string;
                score: number;
                shareCount: number;
                status: number;
                flag: number;
              }[]
            ).length > 0 ? (
              <Select
                value={
                  (
                    TeamByOrganId[0] as {
                      id: string;
                      number: string;
                      name: string;
                      picture: string;
                      organId: string;
                      score: number;
                      shareCount: number;
                      status: number;
                      flag: number;
                    }
                  )?.id
                }
              >
                {(
                  TeamByOrganId as {
                    id: string;
                    number: string;
                    name: string;
                    picture: string;
                    organId: string;
                    score: number;
                    shareCount: number;
                    status: number;
                    flag: number;
                  }[]
                )?.map(
                  (item: {
                    id: string;
                    number: string;
                    name: string;
                    picture: string;
                    organId: string;
                    score: number;
                    shareCount: number;
                    status: number;
                    flag: number;
                  }) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    );
                  }
                )}
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
            value={selectChcsService}
            onChange={(value) => changeServiceId(value)}
          >
            <Select.Option value="">请选择</Select.Option>
            {(
              ChcsService as unknown as {
                id: string;
                name: string;
                typeId: string;
                price: number;
                targetAudience: string;
                period: number;
                renewal: number;
                picture: string;
                description: string;
                serviceDetail: string;
                flag: number;
              }[]
            )?.map((item: { id: string; name: string }) => {
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
        pagination={false}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        rowKey={"id"}
        columns={columns}
        dataSource={datalist}
      />
      <PaginationS sendInfo={changePagina} total={dataTotal} />
    </div>
  );
}
