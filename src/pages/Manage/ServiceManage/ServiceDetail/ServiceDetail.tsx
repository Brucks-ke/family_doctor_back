
import React, { SetStateAction, useEffect, useState } from 'react'
import './ServiceDetail.less'
import { Divider, Space, Tag } from 'antd';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import axiosEL from '../../../../utils/request'
import getAge from '../../../../utils/age'
// 导入弹框组件
import Prompt from '../../../../components/Prompt/Prompt';
import CustomModal from '../../../../components/ModalMessage/ModalMessage';
import { upDataStatusOfService } from '../../../../Service/api/Services/Services';

export default function ServiceDetail() {
  const navigate = useNavigate()
  const [SearchParams,setSearchParams] = useSearchParams()
  
  const obj = useLocation() //接收路由参数

  
  // const id = obj.state.id || '88579930-ee50-11ed-8059-0ba99686sd93'//查询详情需要的id
  // const kind = obj.state.kind //类型 (签约 sig / 服务 ser)
  const id = SearchParams.get("id")
  // 头部标题
  const [title, setTitle] = useState('签约详情')
  // 居民详情
  const [userDetail, setUserDetail] = useState<any>()

  // 弹窗或者提示  的对象
  const [ModalObj,setModalObj] = useState({
    isflag : false,
    title : "",
    content : "",
  })


  // 关闭
  const onClose = async(falg:boolean) =>{
    setModalObj({...ModalObj,isflag:false})
    if(falg){
      console.log("炸了");
      await upDataStatusOfService(SearchParams.get("id"),"2") //驳回
      window.location.reload()
    }
  }


  // 2驳回请求
      // 驳回请求的自定义插槽内容
      const [custmerSolt,setCustmerSolt] = useState()
  const returnOrder = () =>{
    setModalObj({...ModalObj,isflag:true,title:"驳回确认"})
    setCustmerSolt(<div>
        <span>驳回原因<span style={{color:'red'}}>*</span></span>
        <textarea placeholder='请输入驳回原因' cols={50} rows={10}></textarea>
      </div> as unknown as SetStateAction<undefined>)
  }

  // 3编辑信息
  const eidtInfoFun = () =>{
    navigate("/manage/singinmange/serviceedit?id="+id)//跳转到编辑
  }



  // 头部标题
  const getRouterData = () => {
    // console.log(id, kind, '要查看详情的id');
    // if (kind == 'sig') {
    //   setTitle('签约详情')
    // } else if (kind == 'ser') {
      setTitle('服务详情')
    // }
  }

  // 获取 签约居民详情
  const getUserData = async () => {
    // console.log(title,id,'标题 和 参数 id');
    // let url = kind == 'sig' ? '/api/getSignById' : '/api/getServiceDetailById'
    let url =  '/api/getServiceDetailById'
    let res = await axiosEL.post(url, { id: id })
    console.log(res, '居民详情');
    if (res.code == 200) {
      setUserDetail(res.data)
    }



  }

  useEffect(() => {
    getRouterData() //获取路由传参
    getUserData() //获取 签约居民详情
  }, [])





  // 审核通过函数
  const reviewFun = async() =>{
    await upDataStatusOfService(id,"1")
    window.location.reload()
  }

  // 服务完成服务
  const completeService = async() =>{
    await upDataStatusOfService(id,"2") //2为完成服务
    window.location.reload()
  }

  return (
    <>
      <CustomModal 
        visible={ModalObj.isflag} 
        title={ModalObj.title}
        content={ModalObj.content}
        onClose={onClose}
        >
          {custmerSolt}
        </CustomModal>
            <div className='serverdetail'>
      {/*kind == 'sig */}
      <>
        {/* {userDetail.doctorId} */}
        {/* 头部 */}

        <div className='top' >
          <span></span>
          {title}
          {userDetail?.status==0 && <div className='icon' style={{border:"2px solid #42d5ae",color:'#42d5ae'}}>待审核</div>}
          {userDetail?.status==1 && <div className='icon' style={{border:"2px solid rgb(247, 191, 87)",color:'rgb(247, 191, 87)'}}>待服务</div>}
          {userDetail?.status==2 && <div className='icon' style={{border:"2px solid green",color:'green'}}>已完成</div>}
          {userDetail?.status==3 && <div className='icon' style={{border:"2px solid red",color:'red'}}>已驳回</div>}
          {userDetail?.status==4 && <div className='icon' style={{border:"2px solid red",color:'red'}}>已过期</div>}
        </div>
        <div className='tbox'>
          <p>居民信息</p>
          <div className='oneRow'>
            <div>
              <span className='title'>姓名</span>
              <span style={{ color: 'blue' }}>{userDetail?.resident.name}</span>
            </div>
            <div>
              <span className='title'>身份证号</span>
              <span >{userDetail?.resident.IDCard}</span>
            </div>
            <div>
              <span className='title'>性别</span>
              <span >{userDetail?.resident.gender == '1' ? '女' : '男'}</span>
            </div>
            <div>
              <span className='title'>年龄</span>
              <span >{getAge(userDetail?.resident.birthday)}</span>
            </div>
          </div>
          <div className='oneRow oneRow1'>
            <div>
              <span className='title'>联系电话</span>
              <span >{userDetail?.resident.tel}</span>
            </div>
            <div>
              <span className='title' >现居地</span>
              <span style={{width:300}}>{userDetail?.resident.address}</span>
            </div>
            <div style={{ marginLeft: 100 }}>
              <span className='title'>居民标签</span>
              {userDetail?.labelArr?.length > 0  && userDetail?.labelArr.map((e: any, i: number) => {
                return (<Tag color="magenta" key={i}>{e.name}</Tag>)
              })

              }

            </div>

          </div>
          <div className='family'>

            <span className='title'>家庭成员</span>
            <div className='one'>
              <img src="https://cdn7.axureshop.com/demo/1881228/images/%E5%BE%85%E5%AE%A1%E6%A0%B8%E7%AD%BE%E7%BA%A6%E8%AF%A6%E6%83%85/u1575.jpg" alt="" />
              <div className='oneright'>
                <div className='rtop'>
                  <span >李青</span>
                  <span className='age'>45岁</span>
                  <img src="https://cdn7.axureshop.com/demo/1881228/images/%E5%BE%85%E5%AE%A1%E6%A0%B8%E7%AD%BE%E7%BA%A6%E8%AF%A6%E6%83%85/u1576.png" alt="" />
                </div>
                <p>关系:&nbsp;父母</p>
              </div>
            </div>
          </div>
        </div>

        <div className='bbox'>
          <p>服务信息</p>
          <div className='oneRow'>
            <div>
              <span className='title' >服务编号</span>
              <span style={{width: 120}}>{userDetail?.number}</span>
            </div>
            <div>
              <span className='title'>服务状态</span>
              {userDetail?.status == 0 && <span style={{ color: '#42d5ae' }}>待审核</span>}
              {userDetail?.status == 1 && <span style={{ color: 'rgb(247, 191, 87)' }}>待服务</span>}
              {userDetail?.status == 3 && <span style={{ color: 'red' }}>已驳回</span>}
              {userDetail?.status == 2 && <span style={{ color: 'blue' }}>生效中</span>}
              {userDetail?.status == 4 && <span style={{ color: 'red' }}>已过期</span>}

            </div>
            <div>
              <span className='title'>服务机构</span>
              <span style={{width: 120}}>{userDetail?.resident.designatedMedicalUnits}</span>
            </div>
            <div>
              <span className='title'>服务团队</span>
              <span >{userDetail?.other.tname}</span>
            </div>
          </div>
          <div className='oneRow'>
            <div>
              <span className='title'>服务医生</span>
              <span >{userDetail?.other.dname}</span>
            </div>
            <div>
              <span className='title'>服务包</span>
              <span style={{width: 60}}>{userDetail?.other.sname}</span>
            </div>
            <div>
              <span className='title'>服务项目</span>
              <span >{userDetail?.other.siname}年</span>
            </div>
            <div>
              <span className='title'>服务来源</span>
              <span >{userDetail?.resident.origin}</span>
            </div>
          </div>
          <div className='oneRow'>
            <div>
              <span className='title'>服务地点</span>
              <span >机构门诊</span>
            </div>
            <div style={{width: 220}}>
              <span className='title'>预约时间</span>
              <span style={{width: 120}}>{userDetail?.appointmentTime.replaceAll('-', '/')}</span>
            </div>
            <div style={{width: 220}}>
              <span className='title'>提交时间</span>
              <span style={{width: 120}}>{userDetail?.submissionTime.replaceAll('-', '/')}</span>
            </div>

            {(userDetail?.status == 2 || userDetail?.status == 1) && <div>
              <span className='title'>审核人</span>
              <span >{userDetail?.checker}</span>
            </div>}

          </div>
          <div className='oneRow'>        
            <div >
              <span style={{width:120}} className='title'>服务备注</span>
              <span style={{width:400}}>上次要已经吃完了</span>
            </div>
          </div>

        </div>

        <div className='foot'>
              {/* 驳回 */}
        {userDetail?.status ==1 &&<><button className='edit' style={{cursor:'pointer'}} onClick={eidtInfoFun}>编辑服务信息</button>
          <button className='pass' style={{cursor:'pointer'}} onClick={completeService}>完成服务</button>
          <button className='noPass'>取消预约</button>
          <button className='back'  style={{cursor:'pointer'}} onClick={()=>navigate(-1)}>返回</button></>}
        {userDetail?.status ==0  &&  ( <><button className='edit' style={{cursor:'pointer'}} onClick={eidtInfoFun}>编辑服务信息</button>
          <button className='pass' onClick={reviewFun}>审核通过</button>
          <button className='noPass' onClick={returnOrder} style={{cursor:'pointer'}} >驳回</button>
          <button className='back'  style={{cursor:'pointer'}} onClick={()=>navigate(-1)}>返回</button></>)}
          {userDetail?.status == 2 &&  ( <> <button className='back' style={{cursor:'pointer'}} onClick={()=>navigate(-1)}>返回</button></>)}
        
          
        </div>


              
      </>

    </div>
    </>

  )
}
