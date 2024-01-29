import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import propTypes from "prop-types"



function CustomModal({ visible, title, content, onClose , children }:CustomModal_props) {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    // Simulate some async action here
    setTimeout(() => {
      setConfirmLoading(false);
      onClose(true); // Return true when OK is clicked
    }, 1000);
  };

  const handleCancel = () => {
    onClose(false); // Return false when Cancel is clicked
  };

  return (
    <>
      <Modal
        title={title}
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="ok" type="primary" loading={confirmLoading} onClick={handleOk}>
            确定
          </Button>,
        ]}
      >
        { children  }
      </Modal>
    {content}
    </>

  );
}





// 接口
interface CustomModal_props {
    visible: boolean,   //表示校验为 布尔  必选
    title: string,   //表示校验为 字符串  必选
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content?: string    //表示校验为  任何数值
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClose? : any    // 给父组件回传值,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children? : any
}



// 默认值
CustomModal.defaultProps = {
    visible: false,   //表示校验为 布尔  必选
    title: "编辑数据",   //表示校验为 字符串  必选
}


// 类型
CustomModal.propTypes = {
    visible: propTypes.bool,   //表示校验为 布尔  必选
    title: propTypes.string,   //表示校验为 字符串  必选
    content: propTypes.string,    //表示校验为  任何数值
    onClose : propTypes.func,
    children : propTypes.any
}



export default CustomModal