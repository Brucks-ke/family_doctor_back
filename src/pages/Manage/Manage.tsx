import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RouterList } from "../../router/routers";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  VideoCameraOutlined,
  DesktopOutlined 
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Header, Content } from "antd/es/layout/layout";

export default function Manage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // 设置菜单
  const [menuList, setMenuList] = useState<IMenuProps[]>([]);

  const clickJump = (values: any): void => {
    console.log(values);
    navigate(values.key);
    console.log(location);
  };

  // console.log(RouterList,"我想要展示出来的菜单");
  // 获取左边的菜单结构
  const getLeftMenu = () => {
    // 获取非空的path

    const getAllRouter = (routes: Iroutes) => {
      const leftmenus: any = routes?.flatMap((item: any) => {
        if (item.path) {
          const option: any = {
            key: item.path,
            // 图标
            icon: <DesktopOutlined></DesktopOutlined>,
            label: item?.meta.title,
          };
          if (item.children) {
            option.children = getAllRouter(item.children);
          }
          return option;
        } else {
          return [];
        }
      });
      return leftmenus;
    };

    return getAllRouter(RouterList);
  };

  // 退出登录
  const exitPage = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 刚进入的时候
  useEffect(() => {
    let menus = getLeftMenu();
    // console.log(menus);
    if (menus) {
      setMenuList(menus);
    }
  }, []);

  return (
    <div>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ height: "100vh" }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={clickJump}
            items={menuList}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Button onClick={exitPage}>退出登录</Button>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              height: "90vh",
              overflow: "scroll",
            }}
          >
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
