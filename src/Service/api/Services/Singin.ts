import intance from "../../../utils/request";

/**
 * @获取详情id
 */
export function getOneSinginDetail(OderId="" as string | null | undefined){
    return intance.post("/api/getSignById",{id:OderId},{
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    })
}


/**
 * @更新签约状态
 * @param orderId  签约订单id
 * @param status   签约状态
 * @returns 
 */
export function upDataStatusOfSingin(orderId="" as string,status="" as string){
    return intance.post("/api/updateStatusById",{id:orderId,status:status},{
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    })
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function upDataInfoOfSingin(option={} as any){
    return intance.post("/api/updateSignResidentBySid",option,{
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    })
}