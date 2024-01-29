import React from "react";

//分页导入
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
//分页导入
import propTypes from "prop-types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 导出
export default function PaginationSconst({
  pageNum,
  total,
  defaultCurrent,
  sendInfo,
}: PaginationSconst_props) {
  const onChange: PaginationProps["onChange"] = (page, pageNum) => {
    // 将当前第几页 page 和 一页多少条 pageNum 发送给父组件
    sendInfo(page, pageNum);
  };

  return (
    <div>
      <Pagination
        total={total}
        showSizeChanger
        showQuickJumper
        defaultCurrent={defaultCurrent}
        onChange={onChange}
        pageSize={pageNum}
        pageSizeOptions={[3, 5, 10]}
      />
    </div>
  );
}
// 接口
interface PaginationSconst_props {
  currentPage?: number;
  pageNum?: number;
  defaultCurrent?: number;
  total: number;
  sendInfo: (page: number, pageNum: number) => void;
}

// 默认值
PaginationSconst.defaultProps = {
  currentPage: 1,
  pageNum: 3,
  total: 10,
  defaultCurrent: 1,
};

// 类型
PaginationSconst.propTypes = {
  currentPage: propTypes.number,
  pageNum: propTypes.number,
  total: propTypes.number,
  defaultCurrent: propTypes.number,
  sendInfo: propTypes.func,
};
