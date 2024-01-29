import React, { useState, useEffect } from 'react'
import { Table, Switch, Divider, Radio, Input, Button, Space, DatePicker, Form, Select, } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import "./peopleManage.less"
import { useNavigate } from 'react-router-dom';
import axiosEl from '../../../utils/request';
type SizeType = Parameters<typeof Form>[0]['size'];
const { RangePicker } = DatePicker; //日期
const { Search } = Input;  //搜索框


interface DataType {
  key: React.Key;
  number: string;
  name: string;
  IDCard: number;
  tel: string;
  statusMsg: string;
  labelArr?: any;
  statusMsga?: any;
  picture?: string
}

export interface ApifoxModel {
  /**
   * 指定每页展示的数据条数
   */
  count?: string;
  /**
   * 结束时间，格式为YYYY-MM-DD，小于指定时间
   */
  endTime?: string;
  /**
   * 机构id
   */
  organId?: string;
  /**
   * 指定页数
   */
  page?: string;
  /**
   * 搜索关键字
   */
  searchKey?: string;
  /**
   * 服务包id
   */
  serviceId?: string;
  /**
   * 开始时间，格式为YYYY-MM-DD，大于等于指定时间
   */
  startTime?: string;
  /**
   * 状态，待审核为0，待支付为1，已驳回为2，生效中为3，已过期为4，默认0
   */
  status?: string;
  /**
   * 团队id
   */
  teamId?: string;
}

export default function PeopleManage() {
   const navigate = useNavigate()


  //所有机构
  const [ChcsOrgan, setChcsOrgan] = useState()
  //所有服务包
  const [ChcsService, setChcsService] = useState()
  //所有的居民标签
  const [type,setType] = useState()
  //对应机构的医生团队
  const [TeamByOrganId, setTeamByOrganId] = useState()

  // 在组件中定义seleqian状态变量，签约状态
  const [seleqian, setseleqian] = useState('')
  // 在组件中定义selectedOrgan状态变量，签约机构
  const [selectedOrgan, setSelectedOrgan] = useState('');
  // 在组件中定义selectChcsServicen状态变量,服务包
  const [selectChcsServicen, setselectChcsServicen] = useState('')
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
  //在组件中定义selectType状态变量 ，居民标签
  const [selectType,setSelectType]= useState('');
 
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  //表格信息
  const columns: ColumnsType<DataType> = [
    {
      title: '编号',
      dataIndex: 'number',
      key: 'number'
    },
    {
      title: '姓名',
      dataIndex: 'name',

      key: 'name',
      render: (e, row) => {
        return <div style={{ display: "flex", alignItems: 'center' }}>
          {
            row.picture ? <img
              width={"30px"}
              height={"30px"}
              src={'http://101.34.108.131:3000/' + row.picture} alt="" /> : <img
              src='https://cdn7.axureshop.com/demo/1881228/images/%E5%B1%85%E6%B0%91%E7%AE%A1%E7%90%86/u3991.png' alt="" />
          }

          <span>{e}</span>
        </div>
      }
    },
    {
      title: '身份证',
      dataIndex: 'IDCard',
      key: 'IDCard'
    },
    {
      title: '手机号码',
      key: 'tel',
      dataIndex: 'tel',
    },
    {
      title: '签约状态',
      dataIndex: 'statusMsg',
      key: 'statusMsg',
      render: (test) => {
        return <span style={{ color: '#45d585' }}>{test}</span>
      }
    },
    {
      title: '用户标签',
      dataIndex: 'labelArr',
      key: 'labelArr',
      render: (test) => {
        return test.map((e: any) => {
          if (e.name == '高血糖') {
            return <span key={e.id} className='gxt'>高血糖</span>
          } else if (e.name == '阿尔茨海默症') {
            return <span className='gxb' key={e.id}>阿尔茨</span>
          } else if (e.name == '心脏病') {
            return <span className='gxy' key={e.id}>心脏病</span>
          } else if (e.name == '高血压') {
            return <span className='gxt' key={e.id}>高血压</span>
          } else if (e.name == '冠心病') {
            return <span className='gxy' key={e.id}>冠心病</span>
          } else if (e.name == '高血脂') {
            return <span className='gxb' key={e.id}>高血脂</span>
          }

        })
      }
    },
    {
      title: '居民状态',
      dataIndex: 'flag',
      width: 120,
      key: 'flag',
      render: () => {

        return <Switch  defaultChecked />;
      },
    }, {
      title: '操作',
      dataIndex: 'operate',
      width: 300,
      align: 'center',
      key: 'operate',
      render: () => {

        return <>
          <span style={{ color: '#1877f2' }}>查看详情</span>
          <span style={{ color: '#1877f2', margin: '10px' }}>编辑</span>
          <span style={{ color: '#1877f2' }}>发消息</span>
          <span style={{ color: '#1877f2', margin: '10px' }}>添加服务</span>
          <span style={{ color: 'red' }}>删除</span>

        </>
      },
    }

  ];

  //复选框
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  //  搜索
  const onSearch = (value: string) => {
    console.log(value);
  }



  const [useDataList, setDataList] = useState([] as any)
  // const [datalist,setDtaList] = useImmer([])


  //全选的头部
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,


    ],
  };


  //跳转新增居民档
  const jumpAdd=()=>{
    navigate('/manage/addpeoplemanage')
  }










  //发请求拿数据
  const getData = () => {
    axiosEl.post('/api/getResidentBySOTSLByPage').then((res: any) => {
      console.log(res, '居民信息');

      setDataList([...res.data.result])
    })
  }

  //获取所有机构
  const getAllChcsOrgan = () => {

    axiosEl({
      url: '/api/getAllChcsOrgan',
      method: "POST",

    }).then((res: any) => {
      console.log(res, '获取所有的机构');
      setChcsOrgan(res.data.rows)

      // getTeamByOrganId(res.data.rows.id)

    })
  }
  
  //根据机构id获取团队信息
  const getTeamByOrganId = (id: string) => {
    axiosEl({
      url: '/api/getTeamByOrganId',
      method: "POST",
      data: { organId: id }

    }).then((res: any) => {

      setTeamByOrganId(res.data)
      console.log(TeamByOrganId, "222222222222");


    })
  }

  //获取所有服务包
  const getAllChcsService = () => {
    axiosEl({
      url: '/api/getAllChcsService',
      method: "POST",

    }).then((res: any) => {
      // console.log(res);
      setChcsService(res.data.rows)


    })
  }

  //获取所有的居民标签
  const getAllType = () => {
    axiosEl.post('/api/getLabelBySearchPage').then((res: any) => {
      console.log(res, '获取居民标签');
      setType(res.data.result)
    })
  }


  //选中的签约机构id
  useEffect(() => {
    getTeamByOrganId(selectedOrgan)

  }, [selectedOrgan])

  //发请求拿数据
  useEffect(() => {
    getData()
    getAllChcsOrgan()
    getAllChcsService()
    getAllType()

  }, [])


  return (
    <div className='box'>


      <div className='top'>
        <span></span>
        签约管理
      </div>
      {/* 表单 */}
      {/* from表单 */}
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        style={{ maxWidth: 1800, display: 'flex', flexWrap: 'wrap' }}
      >


        <Form.Item label="签约状态" style={{ width: 280, marginBottom: 16 }}>
          <Select style={{ width: 200 }} value={seleqian} onChange={value => setseleqian(value)}>
            <Select.Option value="">请选择</Select.Option>
            <Select.Option value="0">待审核</Select.Option>
            <Select.Option value="1">待支付</Select.Option>
            <Select.Option value="2">已驳回</Select.Option>
            <Select.Option value="3">生效中</Select.Option>
            <Select.Option value="4">已过期</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="签约机构" style={{ width: 340, marginBottom: 16 }}>
          <Select style={{ width: 240 }} value={selectedOrgan} onChange={value => setSelectedOrgan(value)}>
            <Select.Option value="">请选择</Select.Option>
            {(ChcsOrgan as any)?.map((item: any) => {
              return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>

            })}
          </Select>
        </Form.Item>
        {selectedOrgan && <Form.Item label="医生团队" style={{ width: 380, marginBottom: 16 }}>
          {TeamByOrganId && (TeamByOrganId as any).length > 0 ? (
            <Select value={(TeamByOrganId[0] as any)?.id}>
              {(TeamByOrganId as any)?.map((item: any) => {
                return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
              })}
            </Select>
          ) : <Select.Option value="aa1">请选择</Select.Option>}
        </Form.Item>}





        {/* flexBasis: '50%'表示每个元素占据一行的50%宽度，marginBottom: 16用于设置元素之间的间距。 */}
        <Form.Item label="服务包" style={{ width: 320, marginBottom: 16 }}>
          <Select style={{ width: 240 }} value={selectChcsServicen} onChange={value => setselectChcsServicen(value)}>
            <Select.Option value="" >请选择</Select.Option>
            {(ChcsService as any)?.map((item: any) => {
              return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>

            })}

          </Select>
        </Form.Item >
        <Form.Item label="居民标签" style={{ width: 320, marginBottom: 16 }}>
          <Select style={{ width: 240 }} value={selectType} onChange={value => setSelectType(value)}>
            <Select.Option value="" >请选择</Select.Option>
            {(type as any)?.map((item: any) => {
              return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>

            })}

          </Select>
        </Form.Item >



        {/* 搜索 */}
        <Form.Item label="" style={{ width: 300, marginLeft: 30 }}>
          <Search placeholder="请输入搜索关键字" onSearch={onSearch} style={{ width: 320 }} />
        </Form.Item>

   
      <div className='topBox' style={{display:'flex',marginLeft:'40px'}}>
      <Button type="primary" style={{width:'120px',textAlign:'center',marginRight:'20px'}} onClick={jumpAdd}>新增居民档案</Button>
        <Button >导出</Button>
      </div>

      </Form>

 

      {/*表格  */}
      <Table style={{ width: '100vw', height: '100vh' }} rowKey={"id"} rowSelection={rowSelection} columns={columns} dataSource={useDataList} />
    </div>
  )
}
