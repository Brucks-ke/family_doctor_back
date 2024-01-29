/**
 * @description Antd的Table表格ts
 *
 */
export interface TableInterfaceType {
  count?: string; // 指定每页展示的数据条数
  endTime?: string; //结束时间，格式为YYYY-MM-DD，小于指定时间
  organId?: string; //机构id
  page?: string; //指定页数
  searchKey?: string; //搜索关键字
  serviceId?: string; //服务包id
  startTime?: string; //开始时间，格式为YYYY-MM-DD，大于等于指定时间
  status?: string; //状态，待审核为0，待支付为1，已驳回为2，生效中为3，已过期为4，默认0
  teamId?: string; //团队id
}
