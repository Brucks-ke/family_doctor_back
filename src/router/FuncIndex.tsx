import { useRoutes } from "react-router-dom"

import routes from "./routers"


// 给配置的路由设置 类型
type IRouterList = React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | null


export default function FuncIndex() {
  const routerList:IRouterList = useRoutes(routes)
  return routerList
}
