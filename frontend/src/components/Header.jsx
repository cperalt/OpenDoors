import React from "react";
import { Layout, Menu } from "antd";
import { useAuth0 } from "@auth0/auth0-react"; 
const { Header } = Layout;
const items = [
  {
    key: "1",
    label: "Home",
    onClick: () => {
      //path to home
      window.location.href = "/";
    },
  },
  {
    key: "2",
    label: "Career Generator",
    onClick: () => {
      //path to career generator
      window.location.href = "/career-generator";
    },
  },
  {
    key: "3",
    label: "Contact",
  },
  {
    key: "4",
    label: "Dashboard",
  },
  {
    key: "5",
    label: "Login",
  },
];
const App = () => {
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            justifyContent: "flex-end",
          }}
        />
      </Header>
      {/* <Content
        style={{
          padding: "0 48px",
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </div>
      </Content> */}
      hello world
    </Layout>
  );
};
export default App;
