import React from 'react'
import "./Prompt.less"
// 校验
import proptypes from "prop-types"

export default function PromptComponent({visible , title , children , FatherC}:PromptComponent_props) {

    const closePop=()=>{
        FatherC() //回调父的函数
    }

  return (
    <>
        {visible && <div className='modal-box'>
            <div className="title">
            {title}
            </div>
            <span className="close" onClick={closePop}>
            X
            </span>
            <div className="content">
            {children}
            </div>
        </div>}
    </>
  )
}

// 接口
interface PromptComponent_props {
    visible: boolean,   //表示校验为 布尔  必选
    title: string,   //表示校验为 字符串  必选
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any    //表示校验为  任何数值
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    FatherC : any    // 给父组件回传值
}



// 默认值
PromptComponent.defaultProps = {
    visible: false,   //表示校验为 布尔  必选
    title: "编辑数据",   //表示校验为 字符串  必选
}


// 类型
PromptComponent.propTypes = {
    visible: proptypes.bool.isRequired,   //表示校验为 布尔  必选
    title: proptypes.string.isRequired,   //表示校验为 字符串  必选
    children: proptypes.any,    //表示校验为  任何数值
    FatherC : proptypes.func
}

