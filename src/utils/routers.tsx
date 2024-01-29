import Home from "../pages/Home/Home"
import Login from "../pages/Login/Login"
import Manage from "../pages/Manage/Manage"
import SinginManage from "../pages/Manage/SinginManage/SinginManage"
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


const routes = [
    {
        path : "/",
        element : <Home></Home>,
    },
    {
        path : "/login",
        element : <Login></Login>,
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
        path : "*",
        element : <div style={{fontSize:"50px"}}>404未找到</div>
    },
]

export default routes