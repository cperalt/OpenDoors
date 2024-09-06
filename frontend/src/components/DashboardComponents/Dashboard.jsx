import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
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
              width: "100%",
              height: 64,
            }}
          />
        </Header>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            backgroundColor: "#FF9800",
          }}
          onClick={({ key }) => navigate(key)}
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
  );
};
export default App;
