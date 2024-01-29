import React,{useState} from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Checkbox, Space, theme, DatePicker, message, Upload, Radio } from 'antd';
import "./magPeople.less"
import { useNavigate } from 'react-router-dom';
import axiosEl from '../../../utils/request';







export default function MsgPeople() {
    const [labelList, setLabelList] = useState()
    const [imgUrl, setImgUrl] = useState()
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();

    const getInfo = (url: string, data?: any) => {
        return axiosEl({
          method: 'post',
          url,
          data
        })
      }

      const selPicture = (info: any) => {
        if (info.file.status !== 'uploading') {
          setImgUrl(info.file.response.imgUrl)
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }

      //提交表单
      const submit = () => {
        let values = form.getFieldsValue()
        let data = {
          ...values,
          picture:imgUrl,
          labelArrStr: JSON.stringify(values.labelArrStr),
          expenseTypeId: JSON.stringify(values.expenseTypeId)
        }
        console.log(data);
    
        getInfo('/api/saveResident', data).then(res => {
          console.log(res);
          if (res.code == 200) {
            messageApi.open({
              type: 'success',
              content: '保存成功',
            });
            setTimeout(() => {
              navigate('/manage/resident')
            }, 500)
          }
        })
      }

      const getId = () => {
        // 427dbd20-3e70-11ee-9629-c747cef66b83
        // SearchAll.get('id')
        axiosEl.post('/api/getResidentLabelHealthById', { residentId: SearchAll.get('id') }).then((res: any) => {
            console.log(res, '根基居民id获取的信息');
            // setFormOneData(res.data)


        })
        /*    axiosEl.post('/api/getSignById', { id: '42c81e50-3e49-11ee-a7be-b9d2d92fa933' }).then((res: any) => {
               console.log(res, '签约信息');
   
   
           })
    */
    }


  return (
    <div className='addmsg'>
      <h3>完善档案信息</h3>
      <div className='main'>
        <div className='rinfo'>
          <p>居民信息</p>
          <Form name="residentmsg" labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
            layout='inline'
            // form={form}
            >
            <Form.Item
              name=''
              label='居民编号'
              style={{ width: 320 }}
            >
              <span>123456</span>
            </Form.Item>
            <Form.Item
              name='picture'
              label='居民头像'
              style={{ width: 600 }}
              rules={[
                {
                  required: true,
                  message: '请输入姓名!',
                },
              ]}
            >
              <Upload action="http://127.0.0.1:3000/api/uploadImg" listType="picture-card" onChange={selPicture}>
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>上传头像</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item
              name='name'
              label='姓名'
              style={{ width: 320 }}
            //   initialValue={state.name}
              rules={[
                {
                  required: true,
                  message: '请输入姓名!',
                },
              ]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name='IDCard'
              label='身份证号'
              style={{ width: 320 }}
            //   initialValue={state.IDCard}
              rules={[
                {
                  required: true,
                  message: 'Input something!',
                },
              ]}
            >
              <Input placeholder="请输入" />
            </Form.Item>

            <Form.Item
              name='tel'
              label='手机号码'
              style={{ width: 320 }}
            //   initialValue={state.tel}
              rules={[
                {
                  required: true,
                  message: 'Input something!',
                },
              ]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name='labelArrStr'
              label='居民标签'
              style={{ width: 320 }}
            //   initialValue={JSON.parse(state.labelArrStr)}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="请选择"
                fieldNames={{ label: 'name', value: 'id' }}
                // options={labelList}
              />
            </Form.Item>
            <Form.Item
              name='address'
              label='现居地'
              style={{ width: 320 }}
            //   initialValue={state.address}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name='district'
              label='行政区划'
              style={{ width: 320 }}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name='residenceAddress'
              label='户籍地址'
              style={{ width: 320 }}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name='gender'
              label='性别'
              style={{ width: 320 }}
            //   initialValue={state.gender}
              rules={[
                {
                  required: true,
                  message: 'Input something!',
                },
              ]}
            >
              <Select placeholder='请选择'
                options={[
                  { label: '男', value: 0 },
                  { label: '女', value: 1 }
                ]} />
            </Form.Item>
            <Form.Item
              name='birthday'
              label='出生年月'
              style={{ width: 320 }}
            //   initialValue={state.birthday}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name='nativePlace'
              label='籍贯'
              style={{ width: 320 }}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name='nationId'
              label='民族'
              style={{ width: 320 }}
            >
              <Select placeholder='请选择'
                options={[
                  { label: '汉族', value: 0 },
                  { label: '回族', value: 1 },
                  { label: '维吾尔族', value: 2 },
                  { label: '壮族', value: 3 },
                  { label: '其他少数民族', value: 4 },
                ]} />
            </Form.Item>
            <Form.Item
              name='educationId'
              label='文化程度'
              style={{ width: 320 }}
            >
              <Select placeholder='请选择'
                options={[
                  { label: '小学', value: 0 },
                  { label: '初中', value: 1 },
                  { label: '高中/中专', value: 2 },
                  { label: '大专及以上', value: 3 },
                  { label: '不详', value: 4 }
                ]} />
            </Form.Item>
            <Form.Item
              name='maritalStatusId'
              label='婚姻状况'
              style={{ width: 320 }}
            >
              <Select placeholder='请选择'
                options={[
                  { label: '未婚', value: 0 },
                  { label: '已婚', value: 1 },
                  { label: '离异', value: 2 },
                  { label: '丧偶', value: 3 },
                  { label: '不详', value: 4 },
                ]} />
            </Form.Item>
            <Form.Item
              name='career'
              label='职业'
              style={{ width: 320 }}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name='workUnit'
              label='工作单位'
              style={{ width: 320 }}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name='emergencyContact'
              label='紧急联系人'
              style={{ width: 320 }}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name='emergencyNumber'
              label='联系电话'
              style={{ width: 320 }}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name='password'
              label='登录密码'
              style={{ width: 320 }}
            //   initialValue={state.password}
              rules={[
                {
                  required: true,
                  message: 'Input something!',
                },
              ]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name='residenceId'
              label='户籍类型'
              style={{ width: 320 }}
            >
              <Select placeholder='请选择'
                options={[
                  { label: '农村', value: 0 },
                  { label: '城镇', value: 1 }
                ]} />
            </Form.Item>
            <Form.Item
              name='designatedMedicalUnits'
              label='定点医疗单位'
              style={{ width: 320 }}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name='expenseTypeId'
              label='费用类型'
              style={{ width: 700 }}
            >
              <Checkbox.Group options={[
                { label: '自费', value: 0 },
                { label: '社会医疗保险', value: 1 },
                { label: '商业保险', value: 2 },
                { label: '新农合', value: 3 },
                { label: '其他', value: 4 },
              ]} />
            </Form.Item>
          </Form>
        </div>
        <div className='hinfo'>
          <p>健康信息</p>
          <Form labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
            layout='inline'>
            <Form.Item
              label='身高'
              style={{ width: 320 }}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              label='体重'
              style={{ width: 320 }}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              label='血型'
              style={{ width: 320 }}
            >
              <Select placeholder='请选择'
                options={[
                  { label: 'A型', value: 0 },
                  { label: 'B型', value: 1 },
                  { label: 'O型', value: 2 },
                  { label: 'AB型', value: 3 },
                  { label: '不详', value: 4 },
                ]} />
            </Form.Item>
            <Form.Item
              label='RH阴性'
              style={{ width: 320 }}
            >
              <Select placeholder='请选择'
                options={[
                  { label: '是', value: 0 },
                  { label: '否', value: 1 },
                  { label: '不详', value: 2 }
                ]} />
            </Form.Item>
            <div style={{ width: '100%' }}>
              <Form.Item
                label='过敏史'
                style={{ width: 320 }}
              >
                <Radio.Group defaultValue={0}>
                  <Radio value={0}> 无 </Radio>
                  <Radio value={1}> 有 </Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div style={{ width: '100%' }}>
              <Form.Item
                label='既往史'
                style={{ width: 320 }}
              >
                <Radio.Group defaultValue={0}>
                  <Radio value={0}> 无 </Radio>
                  <Radio value={1}> 有 </Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div style={{ width: '100%' }}>
              <Form.Item
                label='就诊史'
                style={{ width: 320 }}
              >
                <Radio.Group defaultValue={0}>
                  <Radio value={0}> 无 </Radio>
                  <Radio value={1}> 有 </Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div style={{ width: '100%' }}>
              <Form.Item
                label='家族病史'
                style={{ width: 320 }}
              >
                <Radio.Group defaultValue={0}>
                  <Radio value={0}> 无 </Radio>
                  <Radio value={1}> 有 </Radio>
                </Radio.Group>
              </Form.Item>
            </div>

          </Form>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Space>
            <Button type="primary" onClick={submit}>
              保存
            </Button>
            <Button onClick={() => navigate(-1)}>
              返回
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}
