import HomePage from "../pages/Home/HomePage"
import Login from "../pages/Login/Login"
import Manage from "../pages/Manage/Manage"
import SinginManage from "../pages/Manage/SinginManage/SinginManage"
import ServiceEdit from "../pages/Manage/ServiceManage/ServiceEdit/ServiceEdit"


import SinginListWatch from "../pages/Manage/SinginManage/SinginListWatch/SinginListWatch"
import SinginDetailWatch from "../pages/Manage/SinginManage/SinginDetailWatch/SinginDetailWatch"
import SinginStatusUpdate from "../pages/Manage/SinginManage/SinginStatusUpdate/SinginStatusUpdate"
import SinginEdit from "../pages/Manage/SinginManage/SinginEdit/SinginEdit"
import ServiceManage from "../pages/Manage/ServiceManage/ServiceManage"
import PeopleManage from "../pages/Manage/PeopleManage/PeopleManage"
import MessageManage from "../pages/Manage/MessageManage/MessageManage"
import BookManage from "../pages/Manage/BookManage/BookManage"
import DataTongJi from "../pages/Manage/DataTongJi/DataTongJi"
import SystemManage from "../pages/Manage/SystemManage/SystemManage"
import JigouManage from "../pages/Manage/BookManage/JigouManage/JigouManage"
import TeamManage from "../pages/Manage/BookManage/TeamManage/TeamManage"
import AddPeopleManage from "../pages/Manage/PeopleManage/AddPeopleManage"
import UpDateQY from "../pages/Manage/PeopleManage/UpDateQY"
import MsgPeople from "../pages/Manage/PeopleManage/MsgPeople"

import ServiceDetail from "../pages/Manage/ServiceManage/ServiceDetail/ServiceDetail"

import {
    HomeOutlined,
    EditOutlined,
    DiffOutlined,
    SettingOutlined,
    TeamOutlined,
  } from '@ant-design/icons'


const routes = [
    {
        path: "/",
        element: <Login></Login>,
    },
    {
        path: "/login",
        element: <Login></Login>,
    },

    {
        path: "/manage",
        element: <Manage></Manage>,
        children: [
            {
                path: "/manage",
                meta: {
                    title: "工作台"
                },
                element: <HomePage></HomePage>,
            },
            {
                path: "/manage/singinmange",
                meta: {
                    title: "签约管理"
                },
                element: <SinginManage></SinginManage>,
                children: [
                    {
                        path: "/manage/singinmange/singinlistwatch",
                        meta: {
                            title: "签约列表查看"
                        },
                        element: <SinginListWatch></SinginListWatch>,
                    },
                    {
                        path: "/manage/singinmange/singindetailwatch",
                        meta: {
                            title: "签约详情查看"
                        },
                        element: <SinginDetailWatch></SinginDetailWatch>,
                    },
                    {
                        path: "/manage/singinmange/singinstatusupdate",
                        meta: {
                            title: "签约状态更新"
                        },
                        element: <SinginStatusUpdate></SinginStatusUpdate>,
                    },
                    {
                        path: "/manage/singinmange/singinedit",
                        meta: {
                            title: "签约编辑"
                        },
                        element: <SinginEdit></SinginEdit>,
                    },
                ]
            },
            {
                path: "/manage/servicemanage",
                meta: {
                    title: "服务管理"
                },
                element: <ServiceManage></ServiceManage>,
            },
            {
                path: "/manage/peoplemanage",
                meta: {
                    title: "居民管理"
                },
                element: <PeopleManage></PeopleManage>,
                
            },
            {
                path: "/manage/messagemanage",
                meta: {
                    title: "消息管理"
                },
                element: <MessageManage></MessageManage>,
            },
            {
                path: "/manage/bookmanage",
                meta: {
                    title: "资料管理"
                },
                element: <BookManage></BookManage>,
                children: [
                    {
                        path: "/manage/bookmanage/jigoumanage",
                        meta: {
                            title: "机构管理"
                        },
                        element: <JigouManage></JigouManage>,
                    },
                    {
                        path: "/manage/bookmanage/teammanage",
                        meta: {
                            title: "团队管理"
                        },
                        element: <TeamManage></TeamManage>,
                    },
                    {
                        path: "/manage/bookmanage/doctormanage",
                        meta: {
                            title: "医生管理"
                        },
                        element: <BookManage></BookManage>,
                    },
                    {
                        path: "/manage/bookmanage/servicebaomanage",
                        meta: {
                            title: "服务包管理"
                        },
                        element: <BookManage></BookManage>,
                    },
                    {
                        path: "/manage/bookmanage/projectmanage",
                        meta: {
                            title: "服务项目管理"
                        },
                        element: <BookManage></BookManage>,
                    },
                ]
            },
            {
                path: "/manage/datatongJi",
                meta: {
                    title: "数据统计"
                },
                element: <DataTongJi></DataTongJi>,
            },
            {
                path: "/manage/systemmanage",
                meta: {
                    title: "系统设置"
                },
                element: <SystemManage></SystemManage>,
            },
            {
                path:'/manage/addpeoplemanage',
                meta: {
                    title: "新建居民档案"
                },
                element:<AddPeopleManage></AddPeopleManage>

                
            },
            {
                path:'/manage/updateQY',
                meta: {
                    title: "编辑签约信息"
                },
                element:<UpDateQY></UpDateQY>

                
            },
            {
                path:'/manage/msgPeople',
                meta: {
                    title: "完善居民档案"
                },
                element:<MsgPeople></MsgPeople>

                
            }
        ],
    },

    {
        path : "/manage",
        element : <Manage></Manage>,
        children:[
            {
                path : "/manage/singinmange",
                meta : {
                    title : "签约管理"
                },
                element : <SinginManage></SinginManage>,
                children : [
                    {
                        path : "/manage/singinmange/singinlistwatch",
                        meta : {
                            title : "签约列表查看"
                        },
                        element : <SinginListWatch></SinginListWatch>,
                    },
                    {
                        path : "/manage/singinmange/singindetailwatch",
                        meta : {
                            title : "签约详情查看"
                        },
                        element : <SinginDetailWatch></SinginDetailWatch>,
                    },
                    {
                        path : "/manage/singinmange/singinstatusupdate",
                        meta : {
                            title : "签约状态更新"
                        },
                        element : <SinginStatusUpdate></SinginStatusUpdate>,
                    },
                    {
                        path : "/manage/singinmange/singinedit",
                        meta : {
                            title : "签约编辑"
                        },
                        element : <SinginEdit></SinginEdit>,
                    },
                    {
                        path : "/manage/singinmange/serviceedit",
                        meta : {
                            title : "服务编辑"
                        },
                        element : <ServiceEdit></ServiceEdit>
                    },
                    {
                        path : "/manage/singinmange/servicesetail",
                        meta : {
                            title : "服务编辑"
                        },
                        element : <ServiceDetail></ServiceDetail>
                    }

                ]
            },
            {
                path : "/manage/servicemanage",
                meta : {
                    title : "服务管理"
                },
                element : <ServiceManage></ServiceManage>,
            },
            {
                path : "/manage/peoplemanage",
                meta : {
                    title : "居民管理"
                },
                element : <PeopleManage></PeopleManage>,
            },
            {
                path : "/manage/messagemanage",
                meta : {
                    title : "消息管理"
                },
                element : <MessageManage></MessageManage>,
            },
            {
                path : "/manage/bookmanage",
                meta : {
                    title : "资料管理"
                },
                element : <BookManage></BookManage>,
                children : [
                    {
                        path : "/manage/bookmanage/jigoumanage",
                        meta : {
                            title : "机构管理"
                        },
                        element : <JigouManage></JigouManage>,
                    },
                    {
                        path : "/manage/bookmanage/teammanage",
                        meta : {
                            title : "团队管理"
                        },
                        element : <TeamManage></TeamManage>,
                    },
                    {
                        path : "/manage/bookmanage/doctormanage",
                        meta : {
                            title : "医生管理"
                        },
                        element : <BookManage></BookManage>,
                    },
                    {
                        path : "/manage/bookmanage/servicebaomanage",
                        meta : {
                            title : "服务包管理"
                        },
                        element : <BookManage></BookManage>,
                    },
                    {
                        path : "/manage/bookmanage/projectmanage",
                        meta : {
                            title : "服务项目管理"
                        },
                        element : <BookManage></BookManage>,
                    },
                ]
            },
            {
                path : "/manage/datatongJi",
                meta : {
                    title : "数据统计"
                },
                element : <DataTongJi></DataTongJi>,
            },
            {
                path : "/manage/systemmanage",
                meta : {
                    title : "系统设置"
                },
                element : <SystemManage></SystemManage>,
            },
        ],
    },
    // {
    //     path : "/news",
    //     element : <News></News>
    // },
    // {
    //     path : "/layout",
    //     element : <Layout></Layout>
    // },
    // {
    //     path : "/manage",
    //     element : <Manage></Manage>,
    //     children:[
    //         {
    //             path : "role",
    //             element : <Role></Role>,
    //         },{
    //             path : "user",
    //             element : <User></User>,
    //         }
    //     ]
    // },
    {
        path: "*",
        element: <div style={{ fontSize: "50px" }}>404未找到</div>
    },
]



type IRouterList = {
    path: string;
    meta: {
        title: string;
    };
    element: JSX.Element;
    children: {
        path: string;
        meta: {
            title: string;
        };
        element: JSX.Element;
    }[];
} | {
    path: string;
    meta: {
        title: string;
    };
    element: JSX.Element;
    children?: undefined;
}


// eslint-disable-next-line react-refresh/only-export-components
const RouterList:IRouterList[] = [
    {
        path: "/manage",
        meta: {
            title: "工作台"
        },
        element: <HomePage></HomePage>,
    },
    {
        path : "/manage/singinmange",
        meta : {
            title : "签约管理"
        },
        element : <SinginManage></SinginManage>,
        children : [
            {
                path: "/manage/singinmange/singinlistwatch",
                meta: {
                    title: "待签约记录"
                },
                element: <SinginListWatch></SinginListWatch>,
            },
            {
                path : "/manage/singinmange/singinlistwatch",
                meta : {
                    title : "签约记录"
                },
                element : <SinginListWatch></SinginListWatch>,
            },
        ]
    },
    {
        path: "/manage/servicemanage",
        meta: {
            title: "服务管理"
        },
        element: <ServiceManage></ServiceManage>,
        children: [
            {
                path: "/manage/singinmange/singinstatusupdate",
                meta : {
                    title : "待处理服务"
                },
                element: <SinginStatusUpdate></SinginStatusUpdate>,
            },
            {
                path: "/manage/singinmange/singinedit",
                meta: {
                    title: "签约编辑"
                },
                element: <SinginEdit></SinginEdit>,
            },
        ]
    },
    {
        path: "/manage/peoplemanage",
        meta: {
            title: "居民管理"
        },
        element: <PeopleManage></PeopleManage>,
    },
    {
        path: "/manage/messagemanage",
        meta: {
            title: "消息管理"
        },
        element: <MessageManage></MessageManage>,
    },
    {
        path: "/manage/bookmanage",
        meta: {
            title: "资料管理"
        },
        element: <BookManage></BookManage>,
        children: [
            {
                path: "/manage/bookmanage/jigoumanage",
                meta: {
                    title: "机构管理"
                },
                element: <JigouManage></JigouManage>,
            },
            {
                path: "/manage/bookmanage/teammanage",
                meta: {
                    title: "团队管理"
                },
                element: <TeamManage></TeamManage>,
            },
            {
                path: "/manage/bookmanage/doctormanage",
                meta: {
                    title: "医生管理"
                },
                element: <BookManage></BookManage>,
            },
            {
                path: "/manage/bookmanage/servicebaomanage",
                meta: {
                    title: "服务包管理"
                },
                element: <BookManage></BookManage>,
            },
            {
                path: "/manage/bookmanage/projectmanage",
                meta: {
                    title: "服务项目管理"
                },
                element: <BookManage></BookManage>,
            },
        ]
    },
    {
        path: "/manage/datatongJi",
        meta: {
            title: "数据统计"
        },
        element: <DataTongJi></DataTongJi>,
    },
    {
        path: "/manage/systemmanage",
        meta: {
            title: "系统设置"
        },
        element: <SystemManage></SystemManage>,
    },
]



export default routes

export {RouterList}
