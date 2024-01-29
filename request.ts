import axios from "axios"
import type {AxiosResponse, AxiosRequestConfig} from "axios"
// 解决报错问题
declare module "axios" {
    interface AxiosResponse<T = any> {
      errorinfo: null;
      // 这里追加你的参数  追加了就不会报错
      rows : any,
      total : number,
      message : any,
      roles : any,
      permissions : any,
      token : string,
      code : number,
      msg : string
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}
// 解决报错问题


const provUrl = import.meta.env.VITE_APP_BASE_URL

const intance = axios.create({
    baseURL : 'http://101.34.108.131:3000',
    timeout : 2000
})





intance.interceptors.request.use((config)=>{

    


    return config
},
(err)=>{
    return Promise.reject(err)
}
)



intance.interceptors.response.use((res)=>{
    

    return res.data
},
    (err)=>{
        return Promise.reject(err)
    }
)



export default intance