import React, { useState } from 'react'
import './SystemManage.less'
import axios from '../../../utils/request'
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Switch,
  TreeSelect,
} from 'antd';


export default function SystemManage() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values from form: ', values);
  };

  return (
    <div className='box'>
      <div className='top'>
        <span></span>
        完善档案信息
      </div>
      <div className='box'>
        <p>居民信息</p>

        <Form form={form} layout="inline" onFinish={onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>

          <div className='oneRow'>

            <Form.Item name="unumber" required label='居民编号' style={{ width: 400, }}>
              1111111111111111111
            </Form.Item>

            <Form.Item name="name" required label='姓名' style={{ width: 400 }} >
              <Input />
            </Form.Item>

            <Form.Item name="picture" label='居民头像'>
              11111111111111111111111
            </Form.Item>

          </div>

          <div className='oneRow'>

            <Form.Item name="IDCard" required label='身份证号' style={{ width: 400 }}>
              <Input />
            </Form.Item>


            <Form.Item name="tel" required label='手机号' style={{ width: 400 }}>
              <Input />
            </Form.Item>



            <Form.Item name="labelArrStr" label='居民标签' style={{ width: 300 }}>
              <Select style={{ width: 240 }}>
                <Select.Option value="demo" style={{ width: 200 }}>Demo</Select.Option>
              </Select>
            </Form.Item>

          </div>

          <div className='oneRow'>

            <Form.Item name="address" label='现居地' style={{ width: 608, marginRight: 200 }} >
              <Input style={{ width: 540 }} />
            </Form.Item>

            <Form.Item name="district" label='行政区划' style={{ width: 300 }}>
              <Input />
            </Form.Item>

          </div>

          <Form.Item name="residenceAddress" label='户籍地址' style={{ width: 560 }} >
            <Input style={{ width: 500 }} />
          </Form.Item>



          <Form.Item name="family" label='家庭成员' style={{ width: 560 }} >
            <a href="">+关联家庭成员</a>
          </Form.Item>



          <div className='line'></div>


        </Form>





      </div>


      系统设置
    </div>
  )
}
