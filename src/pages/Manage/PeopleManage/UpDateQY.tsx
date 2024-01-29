import React, { useEffect, useState } from 'react'
import "./upDateQY.less"
import {
    Button,
    Cascader,
    DatePicker,
    Space,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,


} from 'antd';
import type { DatePickerProps } from 'antd';
const { TextArea } = Input;
import axiosEl from '../../../utils/request';
import { useNavigate, useSearchParams } from 'react-router-dom';



export default function UpDateQY() {
    //form表单
    const [form] = Form.useForm()
    const [formTwo] = Form.useForm()
    //居民的信息
    const [useFormOneData, setFormOneData] = useState({} as any)




    const navigate = useNavigate()
    const [SearchAll] = useSearchParams()
    console.log(SearchAll.get('id'));


    //日期选择
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {

        console.log(date, dateString), '日期选择';
    };

    //居民标签
    //所有的居民标签
    const [type, setType] = useState()
    //在组件中定义selectType状态变量 ，居民标签
    const [selectType, setSelectType] = useState('');
    //性别
    const [seleqian, setseleqian] = useState('')

    //所有机构
    const [ChcsOrgan, setChcsOrgan] = useState()
    // 在组件中定义selectedOrgan状态变量，签约机构
    const [selectedOrgan, setSelectedOrgan] = useState('');
    //对应机构的医生团队
    const [TeamByOrganId, setTeamByOrganId] = useState()


    //提交表单
    const onFinish = (values: any) => {
        console.log(values);
    };




    //获取所有的居民标签
    const getAllType = () => {
        axiosEl.post('/api/getLabelBySearchPage').then((res: any) => {
            console.log(res, '获取居民标签');
            setType(res.data.result)
        })
    }
    //获取所有服务包
    //所有服务包
    const [ChcsService, setChcsService] = useState()
    // 在组件中定义selectChcsServicen状态变量,服务包
    const [selectChcsServicen, setselectChcsServicen] = useState('')
    const getAllChcsService = () => {
        axiosEl({
            url: '/api/getAllChcsService',
            method: "POST",

        }).then((res: any) => {
            // console.log(res);
            setChcsService(res.data.rows)


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

            getTeamByOrganId(res.data.rows.id)

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





    //返回
    const jumpPeople = () => {
        navigate('/manage/peoplemanage')
    }

    //根据居民id获取数据
    const getId = () => {
        // 427dbd20-3e70-11ee-9629-c747cef66b83
        // SearchAll.get('id')
        axiosEl.post('/api/getResidentLabelHealthById', { residentId: SearchAll.get('id') }).then((res: any) => {
            console.log(res, '根基居民id获取的信息');
            setFormOneData(res.data)


        })
        /*    axiosEl.post('/api/getSignById', { id: '42c81e50-3e49-11ee-a7be-b9d2d92fa933' }).then((res: any) => {
               console.log(res, '签约信息');
   
   
           })
    */
    }

    //进页面给定初始值
    useEffect(() => {
        form.setFieldsValue({
            name: useFormOneData?.name && useFormOneData?.name,
            IDCard: useFormOneData?.IDCard && useFormOneData?.IDCard,
            gender: useFormOneData?.gender && useFormOneData?.gender,
            //  birthday:useFormOneData?.birthday && useFormOneData?.birthday,
            tel: useFormOneData?.tel && useFormOneData?.tel,
            address: useFormOneData?.address && useFormOneData.address

        })


    }, [useFormOneData])



    useEffect(() => {
        getId()
        getAllType()
        getAllChcsService()
        getAllChcsOrgan()
    }, [])



    return (
        <div className='boxUpdate'>
            <div className='top'>
                <span></span>
                编辑签约信息
            </div>
            <div className='form'>
                <h3>居民信息</h3>
                <Form
                    name='form'
                    form={form}
                    layout="horizontal"
                // onFinish={onFinish}

                >
                    {/* 姓名 */}
                    <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
                        <Input placeholder='请输入' />
                    </Form.Item>
                    {/* 身份证号 */}
                    <Form.Item name="IDCard" label="身份证号" rules={[{ required: true }]}>
                        <Input placeholder='请输入' />
                    </Form.Item>
                    {/* 性别 */}
                    <Form.Item
                        name='gender'
                        label='性别'
                        // style={{ width: 320 }}
                        initialValue={useFormOneData.gender}
                        rules={[
                            {
                                required: true,
                                message: 'Input something!',
                            },
                        ]}
                    >
                        <Select placeholder='请选择' style={{ width: 240, height: 40 }}
                            options={[
                                { label: '男', value: 0 },
                                { label: '女', value: 1 }
                            ]} />
                    </Form.Item>


                    {/* 出生年月 */}
                    <Form.Item
                        name='birthday'
                        label='出生年月'
                        // style={{ width: 320 }}
                        initialValue={useFormOneData.birthday}
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>


                    {/* 手机号码 */}
                    <Form.Item name="tel" label="联系电话" rules={[{ required: true }]}>
                        <Input placeholder='居民登录账号，请正确填写' />
                    </Form.Item>
                    {/* 现居地 */}
                    <Form.Item name="address" label="现居地" >
                        <Input placeholder='请输入' />
                    </Form.Item>
                    {/* 居民标签 */}
                    <Form.Item label="居民标签" >
                        <Select style={{ width: 240, height: 40 }} value={selectType} onChange={value => setSelectType(value)}>
                            <Select.Option value="" >请选择</Select.Option>
                            {(type as any)?.map((item: any) => {
                                return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>

                            })}
                        </Select>
                    </Form.Item >




                </Form>

            </div>

            <div className='formTwo'>
                <h3>签约信息</h3>
                <Form
                    name='form'
                    layout="horizontal"
                    onFinish={onFinish}


                >
                    {/* 签约编号 */}
                    <Form.Item name="note" label="签约编号" initialValue={2403567890}>
                        <Input placeholder='请输入' />
                    </Form.Item>
                    {/* 签约状态 */}
                    <Form.Item name="note" label="签约状态" >
                        <Input placeholder='请输入' />
                    </Form.Item>
                    {/* 签约机构 */}
                    <Form.Item label="签约机构" >

                        <Select style={{ width: 240, height: 40, marginRight: 30 }} value={selectedOrgan} onChange={value => setSelectedOrgan(value)}>
                            <Select.Option value="">请选择</Select.Option>
                            {(ChcsOrgan as any)?.map((item: any) => {
                                return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>

                            })}
                        </Select>
                    </Form.Item>


                    {/* 签约团队 */}
                    <Form.Item label="签约团队" >
                        {TeamByOrganId && (TeamByOrganId as any).length > 0 ? (
                            <Select style={{ width: 240, height: 40, marginRight: 30 }} value={(TeamByOrganId[0] as any)?.id}>
                                {(TeamByOrganId as any)?.map((item: any) => {
                                    return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                })}
                            </Select>
                        ) : <Select.Option value="aa1">请选择</Select.Option>}
                    </Form.Item>

                    {/* 签约医生 */}
                    <Form.Item label="签约医生" >

                    </Form.Item>


                    {/* 服务包 */}
                    <Form.Item label="服务包" >
                        <Select style={{ width: 240, height: 40 }} value={selectChcsServicen} onChange={value => setselectChcsServicen(value)}>
                            <Select.Option value="" >请选择</Select.Option>
                            {(ChcsService as any)?.map((item: any) => {
                                return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>

                            })}

                        </Select>
                    </Form.Item >


                    {/* 签约类型 */}
                    <Form.Item name="note" label="签约类型" rules={[{ required: true }]}>
                        <Input placeholder='居民登录账号，请正确填写' />
                    </Form.Item>
                    {/* 签约周期 */}
                    <Form.Item name="note" label="签约周期" >
                        <Input placeholder='请输入' />
                    </Form.Item>
                    {/* 费用 */}
                    <Form.Item name="note" label="费用" >
                        <Input placeholder='费用' />
                    </Form.Item>
                    {/* 申请时间 */}
                    <Form.Item name="note" label="申请时间" >
                        <Input placeholder='申请时间' />
                    </Form.Item>
                    {/* 生效日期 */}
                    <Form.Item name="note" label="生效日期" rules={[{ required: true }]}>
                        <DatePicker placeholder='请选择' onChange={onChange} />
                    </Form.Item>

                    {/* 签约备注 */}
                    <Form.Item name="note" label="签约备注" >
                        <TextArea rows={6} placeholder="请输入签约备注" style={{ width: 600 }} />
                    </Form.Item>



                </Form>

            </div>

            <div className='footer'>
                <button>保存</button>
                <button style={{ background: 'white', border: '1px solid #ccc', color: '#000' }} onClick={jumpPeople}>返回</button>
            </div>
        </div>
    )
}
