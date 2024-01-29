import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import {ISearchListOption} from "../../interface/user"
import Item from 'antd/es/list/Item';
import axiosEL from '../../utils/axios';
import { useForm } from 'antd/es/form/Form';
interface ISearchList {
    searchList: ISearchListOption[],
    sendData : any,
    resetData : ()=>void
}
export default function FormSearchBar(props:ISearchList) {
    const [form] = useForm()
/**@1.1前置1   定义一个存储格式化后的数组 */
    const [FormProps,setFormProps] = useState<any>([])

//@1.1获取到了父组件传输过来到值，一进来就获取接口
    //@1.1.1 用ref定义一个开关值  来确定接口发送完毕
    let lenNum = useRef(0)
    //一进入执行一次就够了
    useEffect(()=>{

        props.searchList.forEach(async(item,index)=>{
            if(item.optionApi){
                const {url,method="get"} = item.optionApi
                let {rows} = await axiosEL({
                    url : url,
                    method : method
                })
                item.optionList = rows.children
            }
            // 用ref定义的变量可以修改编辑 但是不会引起模板变化
            lenNum.current = lenNum.current + 1
            if(lenNum.current=props.searchList.length){
                setFormProps([...props.searchList])
            }
        })
    },[])



    // center
    const [sendSearchData,setSendSearchData] = useState<any>({})

    /**@按钮触发获取表单数据 */
    const submitFun = (values:any) =>{
        console.log(values);
        let datas = {...values,...sendSearchData}  //顺序，后面的时间格式覆盖后面的
        ///values
        props.sendData(datas)
    }

    //时间改变事件
    const timeChangeFun = (dateString:any,name:string) =>{
        // console.log(dateString,"左边是格式化后的",name,"右边是key");
        //这个时候要搞一个中间值来合并所有的参数 center
        setSendSearchData({...sendSearchData,[name]:dateString})
    }


    /**@重置事件 */
    const resetFun = () =>{
        form.resetFields()  //1.先重置表单
        props.resetData()   //2.在合并表单
        
    }
  return (
    <Form layout='inline' className='form-search' onFinish={submitFun} form={form}>
        {FormProps.map((item:any,index:number)=>{
            return  <Form.Item label={item.label} name={item.name} key={index}>
                {item.type=="text" && <Input allowClear></Input>}
                {item.type=="treeSelect" && <TreeSelect allowClear style={{width:"200px"}}
                    treeData={item.optionList}
                />}
                {item.type==="select" && <Select allowClear placeholder={"请输入"+item.label} 
                mode={item.mode} //让这个角色成为多选框
                options={item.optionList}
                fieldNames={item.fieldNames}
                ></Select>}
                {item.type=="datePicker" && <DatePicker allowClear format={"YYYY-MM-DD"} onChange={(dates:any, dateStrings:any)=>timeChangeFun(dateStrings,item.name)}/>}
            </Form.Item>
        })}
        <Form.Item >
            <Button type="primary" htmlType="submit">搜索</Button>
        </Form.Item>
        <Form.Item >
            <Button onClick={resetFun}>重置</Button>
        </Form.Item>
    </Form>
  )

 
  
}
