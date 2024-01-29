import React, { useEffect, useState, useRef } from 'react'
import { Progress, Button } from 'antd';
import { useNavigate } from 'react-router-dom'
import './homePage.less'
import fetchData from '../../utils/request'
import * as echarts from "echarts";


export default function HomePage() {
  const navigate = useNavigate()

  //图标渲染
  const chartDom = useRef<any>();
  const instance = useRef<any>();

  const rendering = (element: any,data:any) => {
    
    let option = {
      title: {
        text: '数据概况',
        left: 'center',

      },
      legend: {
        data: ['居民数量', '签约量', '服务量']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          show:true,
          data: ['居民数量', '签约量', '服务量'],
          axisTick: {
            alignWithLabel: false,
            show:true
          },
          axisLabel: {
            
            show:true,
            interval:0
          }
        }
      ],
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
      },
      series: [
        {
          name: 'Direct',
          type: 'bar',
          data: [data?.total, data?.signCount, data?.finishService],
          barWidth: 30,
          itemStyle: {
            color: '#3190e8'
          }
        }
      ]
    };

    element.setOption(option)
  }

  //获取居民总数签约居民数待处理已完成服务量
  const [sTRSRSDSDed, setSTRSRSDSDed] = useState<any>()
  const getSTRSRSDSDed = async () => {
    let res = await fetchData({
      url: '/api/getSTRSRSDSDed',
      method: 'post'
    })
    res.code == 200 && setSTRSRSDSDed(res.data)
    rendering(instance.current,res.data)
  }

  //获取代办提醒数据
  const [getToDealt, setGetToDealt] = useState<{ sign: number, service: number, fService: number }>()
  const getToDeal = async () => {
    let res = await fetchData({
      url: '/api/getToDealt',
      method: 'post'
    })
    res.code == 200 && setGetToDealt(res.data)
  }

  //获取居民标签
  interface ITag {
    id: string
    name: string
    count: number
  }
  const [tag, setTag] = useState<ITag[]>()
  const getTag = async () => {
    let res = await fetchData({
      url: '/api/getResidentLabelStatistics',
      method: 'post'
    })
    res.code == 200 && setTag(res.data)
  }

  //获取指标异常的数据
  interface IAbnormal {
    age: number
    birthday: string
    bloodSugar: number
    createTime: string
    gender: number
    id: string
    name: string
    picture: string
    residentId: string
    title: string
  }
  const [abnormal, setAbnormal] = useState<IAbnormal[]>()
  const getResidentHealth = async () => {
    let res = await fetchData({
      url: '/api/getResidentHealth',
      method: 'post'
    })
    if (res.code == 200) {
      let keys = Object.keys(res.data)
      let arr: IAbnormal[] = []
      keys.forEach((item: string) => {
        arr.push(res.data[item])
      })
      setAbnormal(arr)
    }
  }

  //获取一周签约数据
  const [sign, setSign] = useState<any>()
  const [dateKey, setDateKey] = useState<string[]>()
  const [signKey, setSignKey] = useState<string[]>()
  const getSign = async () => {
    let res = await fetchData({
      url: '/api/getThisWeekSign',
      method: 'post'
    })
    if (res.code == 200) {
      for (const key in res.data) {
        let dateKey: string[] = []
        let item = res.data[key]
        item.forEach((element: any) => {
          !dateKey.includes(Object.keys(element)[0]) && dateKey.push(Object.keys(element)[0])
        });
        setDateKey(dateKey)
      }

      setSignKey(Object.keys(res.data))
      setSign(res.data)
    }
  }


  

  useEffect(() => {
    instance.current = echarts.init(chartDom.current);
    getSTRSRSDSDed()
    getToDeal()
    getTag()
    getResidentHealth()
    getResidentHealth()
    getSign()
  }, [])

  //跳转到详情页
  const toDetail = (id: string) => {
    navigate('/manage/other/detail?id=' + id)
  }

  //跳转到待审核签约  待审核服务 待完成服务页面
  const jump=(url:string)=>{
    navigate(url)
  }


  return (
    <div className='homePage'>
      <h1>早上好! </h1>
      {/* 数据统计 */}
      <div className='dataSummary'>
        <div className='data-box'>
          <div className='imgBox' style={{ background: '#2984F8' }}>
            <img src="	https://cdn7.axureshop.com/demo/1881228/images/%E5%B7%A5%E4%BD%9C%E5%8F%B0/u1268.png" alt="" />
          </div>
          <div className='data'>
            <span>居民总数量</span>
            <p style={{ color: '#2984F8' }}>{sTRSRSDSDed?.total}</p>
          </div>
        </div>
        <div className='data-box'>
          <div className='imgBox' style={{ background: 'rgba(40, 208, 148, 0.898039215686275)' }}>
            <img src="https://cdn7.axureshop.com/demo/1881228/images/%E5%B7%A5%E4%BD%9C%E5%8F%B0/u1249.png" alt="" />
          </div>
          <div className='data'>
            <span>签约居民数量</span>
            <p style={{ color: 'rgba(40, 208, 148, 0.898039215686275)' }}>{sTRSRSDSDed?.signCount}</p>
          </div>
        </div>
        <div className='data-box'>
          <div className='imgBox' style={{ background: '#FDDB78' }}>
            <img src="https://cdn7.axureshop.com/demo/1881228/images/%E5%B7%A5%E4%BD%9C%E5%8F%B0/u1256.png" alt="" />
          </div>
          <div className='data'>
            <span>待处理服务量</span>
            <p style={{ color: '#FDDB78' }}>{sTRSRSDSDed?.serviceCount}</p>
          </div>
        </div>
        <div className='data-box'>
          <div className='imgBox' style={{ background: '#FA746B' }}>
            <img src="https://cdn7.axureshop.com/demo/1881228/images/%E5%B7%A5%E4%BD%9C%E5%8F%B0/u1262.png" alt="" />
          </div>
          <div className='data'>
            <span>已完成服务量</span>
            <p style={{ color: '#FA746B' }}>{sTRSRSDSDed?.finishService}</p>
          </div>
        </div>
      </div>
      {/* 图表与代办提醒 */}
      <div className='chartAndRemind'>
        <div className='chart' ref={chartDom}>
          {/* <h3>数据概况</h3> */}
        </div>
        <div className='remind'>
          <h3>代办提醒</h3>
          <div className='remind-content' onClick={()=>{jump('/manage/sign/pendding')}}>
            <div>
              <span>{getToDealt?.sign}</span>
              <p>待审核签约申请</p>
            </div>
            <img src="https://cdn7.axureshop.com/demo/1881228/images/%E6%BC%94%E7%A4%BA%E6%A1%86%E6%9E%B6/u972.png" alt="" />
          </div>
          <div className='remind-content' onClick={()=>{jump('/manage/server/pendding')}}>
            <div>
              <span>{getToDealt?.service}</span>
              <p>待审核服务申请</p>
            </div>
            <img src="https://cdn7.axureshop.com/demo/1881228/images/%E6%BC%94%E7%A4%BA%E6%A1%86%E6%9E%B6/u972.png" alt="" />
          </div>
          <div className='remind-content' onClick={()=>{jump('/manage/server/record')}}>
            <div>
              <span>{getToDealt?.fService}</span>
              <p>待完成服务</p>
            </div>
            <img src="https://cdn7.axureshop.com/demo/1881228/images/%E6%BC%94%E7%A4%BA%E6%A1%86%E6%9E%B6/u972.png" alt="" />
          </div>

        </div>
      </div>
      {/* 居民标签与指标异常的数据 */}
      <div className='tagAndAbnormal'>
        <div className='tag'>
          <h3>居民标签</h3>
          <div className='tagBox'>
            {
              tag?.map((item: ITag) => {
                if(item.count){
                  return (<div className='tag-content' key={item.id}>
                  <div className='tag-number'>
                    <p>{item.name}</p>
                    <span>{item.count}</span>
                  </div>
                  <Progress percent={Math.floor(item.count / sTRSRSDSDed?.total * 100)} />
                </div>)
                }
                 
                
              })
            }
          </div>
        </div>
        <div className='abnormal'>
          <h3 style={{marginBottom:'20px'}}>居民指标异常</h3>
          <div className='abnormal-box'>
            {
              abnormal?.map((item: IAbnormal) => {
                return (
                  <div className='abnormal-content' key={item.id}>
                    <img src={'http://101.34.108.131:4592/' + item.picture} alt="" />
                    <div className='resdient-info' onClick={() => { toDetail(item.residentId) }}>
                      <p>{item.name} <span>{item.age}岁</span><img src="https://cdn7.axureshop.com/demo/1881228/images/%E5%B7%A5%E4%BD%9C%E5%8F%B0/u1152.png" alt="" /></p>
                      <p className='abnormal-detail'><img src="https://cdn7.axureshop.com/demo/1881228/images/%E5%B7%A5%E4%BD%9C%E5%8F%B0/error_u1155.png" alt="" /><span>{item.title}</span></p>
                      <Button type="primary">查看详情</Button>
                    </div>
                  </div>
                )
              })
            }

          </div>
        </div>
      </div>
      {/* 签约概况 */}
      <div className='signOverview'>
        <h3 style={{ marginBottom: '10px' }}>本周签约概况</h3>
        <table>
          <thead>
            <tr>
              <th>团队</th>
              {dateKey?.map((item) => {
                return (<th key={item}>{item}</th>)
              })}
            </tr>
          </thead>
          <tbody>
            {
              signKey?.map((item1, index1) => {
                return (
                  <tr key={item1}>
                    <td>{item1}</td>
                    {sign[item1].map((item2: any, index: number) => {
                      return (<td key={item2 + index1 + index}>{item2[Object.keys(item2)[0]]}</td>)
                    })}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
