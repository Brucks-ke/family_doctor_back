import React, { useEffect, useState } from 'react'
import "./addPeople.less"
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
    message,

} from 'antd';
import type { DatePickerProps } from 'antd';
import axiosEl from '../../../utils/request';
import { useNavigate } from 'react-router-dom';
export default function AddPeopleManage() {
    const navigate = useNavigate()


    //日期选择
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString, '日期选择');
        setFormData({...formData,birthday:dateString})
    };

    //居民标签
    //所有的居民标签
    const [type, setType] = useState()
    //在组件中定义selectType状态变量 ，居民标签
    const [selectType, setSelectType] = useState('');

    //性别
    const [seleqian, setseleqian] = useState('')





    //返回
    const jumpPeople = () => {
        navigate('/manage/peoplemanage')
    }

    //完善居民档案


    //立即签约
    const jumpUpdateQY = () => {
        // addAxios()
        setTimeout(()=>{
            navigate('/manage/updateQY?id='+useRid)
        },2000)
       
    }

    //完善居民信息
    const jumpMsg=()=>{
        setTimeout(()=>{
            navigate('/manage/msgPeople?id='+useRid)
        },2000)
       
    }


    //获取所有的居民标签
    const getAllType = () => {
        axiosEl.post('/api/getLabelBySearchPage').then((res: any) => {
            console.log(res, '获取居民标签');
            setType(res.data.result)
        })
    }

    useEffect(() => {
        getAllType()
    }, [])

    //提交表单
    const [formData, setFormData] = useState({})
    const onFinish = (values: any) => {
        console.log(values, '信息');
        setFormData({...formData,...values })
     
         //发送添加的请求
         addAxios()
    };

     //新增请求
     //把id携带到立即签约页面
     const [useRid,setRid] = useState()
     const addAxios = ()=>{
         axiosEl.post('/api/saveResident',formData).then((res:any)=>{
            console.log(res,'新增请求');
            if(res.code==200){
               setRid(res.data.rid)
               message.success(res.msg)
            }
         })
     }

    //检测表单数据
    useEffect(()=>{
        console.log(formData,'表单数据');
       
        
    },[formData])




    return (
        <div className='addBox'>
            <div className='top'>
                <span></span>
                新建居民档案
            </div>
            <div className='form'>
                <h3>居民信息</h3>
                <Form
                    name='form'
                    layout="horizontal"
                    onFinish={onFinish}

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
                    <Form.Item label="性别" name='gender' >
                        <Select style={{ width: 240, height: 40, marginRight: 30 }} value={seleqian} onChange={value => setseleqian(value)}>
                            <Select.Option value="">请选择</Select.Option>
                            <Select.Option value="0">男</Select.Option>
                            <Select.Option value="1">女</Select.Option>

                        </Select>
                    </Form.Item>


                    {/* 出生年月 */}
                    <Form.Item  label="出生年月" rules={[{ required: true }]}>
                        <DatePicker onChange={onChange} />
                    </Form.Item>


                    {/* 手机号码 */}
                    <Form.Item name="tel" label="手机号码" rules={[{ required: true }]}>
                        <Input placeholder='居民登录账号，请正确填写' />
                    </Form.Item>
                    {/* 现居地 */}
                    <Form.Item name="address" label="现居地" >
                        <Input placeholder='请输入' />
                    </Form.Item>
                    {/* 居民标签 */}
                    <Form.Item label="居民标签"   >
                        <Select style={{ width: 240, height: 40, marginRight: '30px' }} value={selectType} onChange={value => setSelectType(value)}>
                            <Select.Option value="" >请选择</Select.Option>
                            {(type as any)?.map((item: any) => {
                                return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>

                            })}
                        </Select>
                    </Form.Item >


                    {/* 家庭成员 */}
                    <Form.Item label="家庭成员" >
                        <p style={{ color: '#2984e8' }}>+关联家庭成员</p>
                    </Form.Item>
                    {/* 登录密码 */}
                    <Form.Item name="password" label="登录密码" >
                        <Input placeholder='8位以上的数字和字母组合' />
                    </Form.Item>


                

                    <Form.Item style={{width:'240px'}}>
                        <Button type="primary" htmlType="submit" style={{ height: '50px', backgroundColor: '#2984e8' }}>
                            保存
                        </Button>
                    </Form.Item>

                </Form>

            </div>

            <div className='footer'>
         
                {/* <button >保存</button> */}
                <button onClick={jumpMsg}>完善居民档案</button>
                <button style={{ backgroundColor: '#45d5b1' }} onClick={jumpUpdateQY}>立即签约</button>
                <button style={{ background: 'white', border: '1px solid #ccc', color: '#000' }} onClick={jumpPeople}>返回</button>
            </div>
        </div>
    )
}
