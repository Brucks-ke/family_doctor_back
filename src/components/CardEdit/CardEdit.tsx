import React , { useEffect } from 'react'
import "./CardEdit.less"
import propTypes from "prop-types"
import FormInput from '../FormInput/FormInput'




import { useForm } from "antd/es/form/Form";
import {  useNavigate, useSearchParams } from "react-router-dom"
import {
  Button,
  Space,
  Form,

} from "antd";

import {useImmer} from "use-immer"


// 传输过来的格式化表单的东西
import { ISearchApi } from '../FormInput/FormTypes';






export function CardEdit({mainTitle,send2OptionArr,sendOptionArr,returnFun}:IProps,props)  {

  const [SearchParams,setSearchParams] = useSearchParams()
  // 路由跳转相关
  const navigate = useNavigate()
  
  

    const [form] = useForm()


    // 设置编辑的值
    const [allSetValues,setAllSetValues] = useImmer([])

    const onFinish = (values:any) =>{
      // 格式化时间
      for (const key in values) {
        console.log( Object.prototype.toString.call( values[key] ),key);
        if(Object.prototype.toString.call( values[key] )=="[object Object]"){
          values[key] = values[key].format('YYYY-MM-DD')
        }
      }
      values.id = SearchParams.get("id")
      // 格式化时间
      console.log(values,"格式化完成了，编辑--------------edit");
      // console.log(form,"拿到这个所有的form表单");
      // console.log(form.getFieldsValue(),"拿到这个所有的form表单");

      
      returnFun(values)

      
      
    }

    useEffect(()=>{
      if(send2OptionArr.length>0 &&sendOptionArr.length > 0){
        setAllSetValues((dreft)=>{
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          dreft = send2OptionArr.concat(sendOptionArr)
          console.log(dreft,"更新后的数值");
          
          dreft.forEach((item:any)=>{
            form.setFieldValue(item.name, item.value);
          })
        })
        

      }
      

      console.log(sendOptionArr,"传过来的配置1,居民信息");
      console.log(send2OptionArr,"传过来的配置2,服务信息");
    },[send2OptionArr,sendOptionArr])


  return (
    <div className='cardComponent'>
      <div className='top'>
        <span></span>
        {mainTitle}
      </div>


      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 14 }}
        layout="inline"
        form={form}
        onFinish={onFinish}
        // style={{ maxWidth: 1200, display: 'flex', flexWrap: 'wrap' }}
      >


            <Space direction="vertical" size="middle" style={{ display: 'block' }}>
              <div className="upBox" >
                <div className='title'>居民信息</div>
                <FormInput FormOptionData={sendOptionArr}></FormInput>
              </div>



              
              <div className="downBox" >
                <div className='title'>服务信息</div>
                <FormInput FormOptionData={send2OptionArr}></FormInput>
              </div>
            </Space>


    

          <Space>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  提交审核
                </Button>

              </Form.Item>
              <Form.Item>
                <Button onClick={()=>{navigate(-1)}}>
                  返回
                </Button>
              </Form.Item>
          </Space>
      </Form>

    </div>
  )
}


interface IOptions {
  label : string,
  name? : string,
  value : string,
  disabled? : boolean,
  optionApi? : ISearchApi,
  type : string,
  mode ? : string,
  optionList? : {
      label : string,
      value : string
  }[],
  fieldNames? : string,
  required? : boolean,
}



// 定义默认值

// props类型
CardEdit.propTypes = {
  mainTitle : propTypes.string,
  upTitle : propTypes.string,
  downTitle : propTypes.string,
  sendOptionArr : propTypes.object,
  send2OptionArr : propTypes.object,
  returnFun : propTypes.func
}


// Props的接口
interface IProps {
  mainTitle : string,
  upTitle : string,
  downTitle : string,
  sendOptionArr : IOptions[],
  send2OptionArr : IOptions[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  returnFun : (value:any)=>void
}




export default CardEdit