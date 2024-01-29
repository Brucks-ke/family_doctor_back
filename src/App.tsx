import { useState } from 'react'


// 国际化
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import { BrowserRouter } from "react-router-dom"


import './App.less'

import FuncIndex from "./router/FuncIndex"
function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: 'blue',
          // 派生变量，影响范围小
        },
      }}
      locale={zhCN}
    >
      <BrowserRouter>
        <FuncIndex></FuncIndex>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
