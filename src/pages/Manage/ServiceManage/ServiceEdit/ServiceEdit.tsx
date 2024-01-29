import React , {useEffect , useState} from 'react'
import {useLocation, useSearchParams} from "react-router-dom"
import CardEdit from '../../../../components/CardEdit/CardEdit'
import { ISearchApi } from '../../../../components/FormInput/FormTypes'
import {useImmer} from "use-immer"
import dayjs from 'dayjs';
// api
import { getServiceDetailByOrderId } from '../../../../Service/api/Services/Services'
import { logicalPropertiesLinter } from '@ant-design/cssinjs'
import { upDataInfoOfService } from '../../../../Service/api/Services/Services'

import intance from '../../../../utils/request'
import GlobalMessage from '../../../../utils/GlobalMessage'

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
        value : string | number
    }[],
    fieldNames? : string,
    required? : boolean,
}



export default function ServiceEdit() {
    const [searchParams, setSearchParams] = useSearchParams();

    const location = useLocation()
    // 找一个接受请求结果的值
    const [requestData,setRequestData] = useImmer([])


    // 最终的居民信息
    const [people,setPeople] = useState<IOptions[]>([])
    const [service,setService] = useState<IOptions[]>([])
    const [peopleAll,setPeopleAll] = useState([])

    // 接受居民信息
    const [PeopleSendOptionArr1,setPeopleSendOptionArr1] = useImmer<IOptions[]>([
        {
            label : '姓名',
            name : 'name',
            value : '李小明',
            disabled : true,
            type : 'text',
            required : true,
        },
        {
            label : '身份证号',
            name : 'IDCard',
            value : '李小明',
            disabled : false,
            type : 'text',
            required : true
        },
        {
            label : '性别',
            name : 'gender',
            value : '',
            disabled : false,
            type : 'select',
            required : true,
            optionList : [
                {
                    label : '男',
                    value : '0',
                },
                {
                    label : '女',
                    value : '1',
                },
            ]
        },
        {
            label : '出生年月',
            name : 'birthday',
            value : '',
            disabled : false,
            type : 'datePicker',
            required : true,
        },
        {
            label : '联系电话',
            name : 'tel',
            value : '',
            disabled : false,
            type : 'text',
            required : true,
        },
        {
            label : '现居地',
            name : 'address1',
            value : '',
            disabled : false,
            type : 'text',
        },
        {
            label : '居民标签',
            name : 'gender',
            value : '',
            disabled : false,
            type : 'select',
            optionList : [
                {
                    label : '男',
                    value : '0',
                },
                {
                    label : '女',
                    value : '1',
                },
            ]
        },
    ])


    // 接受服务信息
    const [ServiceSendOptionArr1,setServiceSendOptionArr1] = useImmer<IOptions[]>([
        {
            label : '编号',
            name : 'number',
            value : '202351118432',
            disabled : false,
            type : 'font',
        },
        {
            label : '服务机构',
            name : 'organId',
            value : '67e98bc0-ee1b-11ed-8459-c76f227ca777',
            disabled : false,
            type : 'select',
            required : true,
            optionApi : {
                url: "/api/getAllChcsOrgan",
                method: "post",
                data: "",
            }
        },
        {
            label : '服务团队',
            name : 'teamId',
            value : '88579930-ee50-11ed-8059-0ba99686cabb',
            disabled : false,
            type : 'select',
            required : true,
            optionApi : {
                url: "/api/searchTeamByNameNumber",
                method: "post",
                data: "",
            }
        },
        {
            label : '预约医生',
            name : 'IDCard',
            value : '李小明',
            disabled : false,
            type : 'select',
            required : true,
            optionApi : {
                url: "/api/getAllDoctor",
                method: "post",
                data: "",
            }
        },
        {
            label : '服务包',
            name : 'serviceId',
            value : '7909bde0-828b-11ed-a736-b1a95d18c716',
            disabled : false,
            type : 'select',
            required : true,
            optionApi : {
                url: "/api/getAllChcsService",
                method: "post",
                data: "",
            }
        },
        {
            label : '服务项目',
            name : 'serviceItemId',
            value : 'd49f9cb3-5c07-11ed-9450-8f19ea84b621',
            disabled : false,
            type : 'select',
            required : true,
            optionApi : {
                url: "/api/getAllServiceItem",
                method: "post",
                data: "",
            }
        },
        {
            label : '签约地点',
            name : 'address',
            value : '0',
            disabled : false,
            type : 'select',
            required : true,
            optionList : [
                {
                    label : '签约人家里',
                    value : '0',
                },
                {
                    label : '机构门诊',
                    value : '1',
                },
            ]
        },
        {
            label : '服务时间',
            name : 'authitTime',
            value : '',
            disabled : false,
            type : 'timePicker',
        },
        {
            label : '备注',
            name : 'note',
            value : '',
            disabled : false,
            type : 'textArea',
        },
    ])

    // eslint-disabled-next-line @typescript-eslint/no-unused-vars
    let PeopleSendOptionArr:IOptions[] = [
        {
            label : '姓名',
            name : 'name',
            value : '李小明',
            disabled : true,
            type : 'text',
            required : true
        },
        {
            label : '身份证号',
            name : 'IDCard',
            value : '李小明',
            disabled : false,
            type : 'text',
            required : true
        },
        {
            label : '性别',
            name : 'gender',
            value : '',
            disabled : false,
            type : 'select',
            required : true,
            optionList : [
                {
                    label : '男',
                    value : 0,
                },
                {
                    label : '女',
                    value : 1,
                },
            ]
        },
        {
            label : '出生年月',
            name : 'birthday',
            value : '',
            disabled : false,
            type : 'datePicker',
            required : true,
        },
        {
            label : '联系电话',
            name : 'tel',
            value : '',
            disabled : false,
            type : 'text',
            required : true,
        },
        {
            label : '现居地',
            name : 'district',
            value : '',
            disabled : false,
            type : 'text',
        },
        {
            label : '居民标签',
            name : 'emergencyContact',
            value : '',
            disabled : false,
            type : 'select',
            // optionList : [
            //     {
            //         label : '男',
            //         value : 0,
            //     },
            //     {
            //         label : '女',
            //         value : 1,
            //     },
            // ]
        },
    ]


    let ServiceSendOptionArr:IOptions[] = [
        {
            label : '编号',
            name : 'number',
            value : '202351118432',
            disabled : false,
            type : 'font',
        },
        {
            label : '服务机构',
            name : 'organId',
            value : '67e98bc0-ee1b-11ed-8459-c76f227ca777',
            disabled : false,
            type : 'select',
            required : true,
            optionApi : {
                url: "/api/getAllChcsOrgan",
                method: "post",
                data: "",
            }
        },
        {
            label : '服务团队',
            name : 'teamId',
            value : '88579930-ee50-11ed-8059-0ba99686cabb',
            disabled : false,
            type : 'select',
            required : true,
            optionApi : {
                url: "/api/searchTeamByNameNumber",
                method: "post",
                data: "",
            }
        },
        {
            label : '预约医生',
            name : 'doctorId',
            value : '李小明',
            disabled : false,
            type : 'select',
            required : true,
            optionApi : {
                url: "/api/getAllDoctor",
                method: "post",
                data: "",
            }
        },
        {
            label : '服务包',
            name : 'serviceId',
            value : '7909bde0-828b-11ed-a736-b1a95d18c716',
            disabled : false,
            type : 'select',
            required : true,
            optionApi : {
                url: "/api/getAllChcsService",
                method: "post",
                data: "",
            }
        },
        {
            label : '服务项目',
            name : 'serviceItemId',
            value : 'd49f9cb3-5c07-11ed-9450-8f19ea84b621',
            disabled : false,
            type : 'select',
            required : true,
            optionApi : {
                url: "/api/getAllServiceItem",
                method: "post",
                data: "",
            }
        },
        {
            label : '签约地点',
            name : 'address',
            value : '0',
            disabled : false,
            type : 'select',
            required : true,
            optionList : [
                {
                    label : '签约人家里',
                    value : 0,
                },
                {
                    label : '机构门诊',
                    value : 1,
                },
            ]
        },
        {
            label : '服务时间',
            name : 'appiintmentTime',
            value : '',
            disabled : false,
            type : 'timePicker',
        },
        {
            label : '备注',
            name : 'notes',
            value : '',
            disabled : false,
            type : 'textArea',
        },
    ]


    useEffect(()=>{
        console.log(requestData,"请求赋值成");
        
    },[requestData])

    // 格式化  数据
    const getCurrentData = async() =>{
        // console.log(,"传输过来的id");
        intance({
            url : "/api/getServiceDetailById",
            method : "post",
            data : {id:searchParams.get('id')}
        }).then(({data})=>{
            console.log(data,"````````````````````````");
            
            setRequestData((regor)=>{regor = data ;console.log(regor);})


            setServiceSendOptionArr1((result:IOptions[])=>{
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                result =  ServiceSendOptionArr.map((item:IOptions)=>{
                    for (const key in data) {
                        if(item.name==key){
                            item.value = data[key]
                            return item
                        }
                    }
                    return item
                })
                setService([...result])  //给服务所有的数据  赋值
                console.log(result,"服务信息");
            })


            setPeopleSendOptionArr1((result:IOptions[])=>{
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                console.log(data.resident,"居民信息");
                
                result =  PeopleSendOptionArr.map((item:IOptions)=>{
                    
                    for (const key in data['resident']) {
                        if(item.name==="birthday"){
                            item.value = dayjs(data['resident']['birthday'].replaceAll("-","/"))

                            console.log();
                            
                            return item
                        }
                        if(item.name==key){
                            item.value = data['resident'][key]
                            console.log(data['resident'][key],"每个传的值");
                            
                            return item
                        }
                    }
                    return item
                })
                
                setPeople([...result])   //给人民所有的数据  赋值
                console.log(result,"居民信息11111111");
            })
        
        


        })


    }

    // 审核完成按钮
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getSonData = async(values:any) =>{
        console.log(values,"得到子组件的数据");
        let res = await upDataInfoOfService(values)
        console.log(res,"更新成功");
        GlobalMessage.success("修改成功")
        setTimeout(()=>{
            window.location.reload()
        },1000)
    }







    useEffect(()=>{
        getCurrentData()
        // startFormat()

    },[])
    useEffect(()=>{
        console.log(people,"修改后");

    },[people])

    const zhale = () =>{
        console.log(11111);
        
    }
  return (
    <div>
        <CardEdit  mainTitle="编辑服务信息" upTitle="居民信息" downTitle="服务信息" sendOptionArr={people} send2OptionArr={service} returnFun={getSonData}></CardEdit>
    </div>
  )
}
