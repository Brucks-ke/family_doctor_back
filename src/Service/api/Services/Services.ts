import intance from "../../../utils/request";


/**@通过服务详情id查询服务信息 */
export function getServiceDetailByOrderId(OrderId="" as string | null){
    return intance.post("/api/getServiceDetailById",{id:OrderId})
}


/**
 * @更新服务状态
 * @param orderId  签约订单id
 * @param status   签约状态
 * @returns 
 */
 export function upDataStatusOfService(orderId="" as string | null,status="" as string){
    return intance.post("/api/updateStatusByServiceDetailId",{id:orderId,status:status},{
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    })
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function upDataInfoOfService(option={} as any){
    return intance.post("/api/updateChcsServicedetail",option,{
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    })
}

