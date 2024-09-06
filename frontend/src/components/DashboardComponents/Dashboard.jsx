import React, { useState } from "react";
import CareerGenerator from "../Pages/CareerGenerator";
import Login from "../Pages/Login";
import Homepage from "../Pages/HomePage";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ maxWidth: "fit-content" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
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
          IMAGE GOES HERE FOR LOGO
        </Header>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            backgroundColor: "#FF9800"
          }}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Profile",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "History",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Settings",
            },
          ]}
        />
      </Sider>
    </Layout>
  );
};
export default App;
