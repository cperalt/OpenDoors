import "../CSS/Dashboard.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, ConfigProvider } from "antd";
const { Header, Sider } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#003314",
        },
      }}
    >
      <Layout style={{ maxWidth: "fit-content" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Header
            style={{
              padding: 0,
              backgroundColor: "#FF9800",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: "100%",
                height: 64,
                backgroundColor: "#003314",
              }}
            />
          </Header>
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={({ key }) => navigate(key)}
            style={{
              backgroundColor: "#FF9800", // Orange for the sidebar
            }}
            items={[
              {
                key: "/dashboard-profile",
                icon: <UserOutlined />,
                label: "Profile",
              },
              {
                key: "/dashboard-history",
                icon: <VideoCameraOutlined />,
                label: "History",
              },
              {
                key: "/dashboard-settings",
                icon: <UploadOutlined />,
                label: "Settings",
              },
            ]}
          />
        </Sider>
      </Layout>
    </ConfigProvider>
  );
};
export default App;
