import React, { useEffect } from "react";
import axiosEl from "../../utils/request";

import "./login.less";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  type FieldType = {
    account?: string;
    pwd?: string;
    remember?: string;
  };

  //提交表单
  const onFinish = (values: any) => {
    if (values.remember) {
      axiosEl.post("/api/chcsLogin", values).then((res: any) => {
        // 添加token 和添加用户id
        dispatch({
          type: "user/addToken",
          payload: res.data.token,
        });
        dispatch({
          type: "user/addUserId",
          payload: res.data.id,
        });
        if (res.data.token) {
          message.success(res.msg);
          navigate("/manage", {
            replace: true, //不能回退
          });
        } else {
          message.error(res.msg);
        }
      });
    } else {
      message.info("请勾选阅读");
    }
    // console.log('Success:', values);
  };

  useEffect(() => {}, []);

  return (
    <div className="box">
      <div className="logingbox">
        <div className="left">
          <h2>家庭医生后台管理系统</h2>
          <img
            src="https://cdn7.axureshop.com/demo/1881228/images/%E7%99%BB%E5%BD%95/u1111.png"
            alt=""
          />
        </div>
        <div className="right">
          <img
            src="https://cdn7.axureshop.com/demo/1881228/images/%E7%BB%84%E4%BB%B6_%E8%A7%84%E8%8C%83/u408.jpg"
            alt=""
          />
          <h1>欢迎登录</h1>

          <Form
            name="basic"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="account"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                placeholder="请输入手机号码"
                style={{
                  width: "300px",
                  height: "44px",
                  background: "#f7fafd",
                }}
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="pwd"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                style={{
                  width: "300px",
                  height: "44px",
                  background: "#f7fafd",
                }}
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              style={{ width: "300px" }}
            >
              <Checkbox style={{ color: "#ccc" }}>
                我已阅读并同意
                <span style={{ color: "#2984e8", width: "240px" }}>
                  《用户隐私政策》
                </span>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                style={{ width: "100%", height: "40px" }}
                type="primary"
                htmlType="submit"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
