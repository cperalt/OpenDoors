import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const Slider = () => {
  const navigate = useNavigate(); // Move the hook inside the component

  return (
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
        items={[
          {
            key: "1",
            label: "Home",
            onClick: () => {
              navigate("/");
            },
          },
          {
            key: "2",
            label: "Career Generator",
            onClick: () => {
              navigate("/CareerGenerator");
            },
          },
          {
            key: "3",
            label: "Contact",
            onClick: () => {
              navigate("/contact");
            },
          },

          {
            key: "5",
            label: "Login",
            onClick: () => {
              navigate("/login");
            },
          },
        ]}
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          justifyContent: "flex-end",
        }}
      />
    </Header>
  );
};

export default Slider;
