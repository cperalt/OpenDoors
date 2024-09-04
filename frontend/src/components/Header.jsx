import React from "react";
import { Layout, Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Slider = () => {
  const navigate = useNavigate();

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",  
        backgroundColor: "#fffdf5", 
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" 
      }}
    >
      <div className="logo" style={{ display: "flex", alignItems: "center" }}>
        <img src="/path/to/your/logo.png" alt="Logo" style={{ height: "40px" }} />
      </div>
      
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          justifyContent: "center",
          fontSize: "16px",
          backgroundColor: "#fffdf5"
        }}
        items={[
          {
            key: "1",
            label: "Home",
            onClick: () => {
              navigate("/Home");
            },
          },
          {
            key: "2",
            label: "Career Generator",
            onClick: () => {
              navigate("/Career-Generator");
            },
          },
          {
            key: "3",
            label: "Contact Us",
            onClick: () => {
              navigate("/Contact");
            },
          },
        ]}
      />

      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          icon={<SearchOutlined />}
          type="text"
          style={{
            marginRight: "16px",
            fontSize: "18px",
            color: "#004d40",
            border: "none",
          }}
        />
        <Button
          type="default"
          style={{
            marginRight: "8px",
            borderColor: "#003314",
            color: "#004d40",
            backgroundColor: "#fffdf5"
          }}
          onClick={() => navigate("/login")}
        >
          Log In
        </Button>
        <Button
          type="primary"
          style={{
            backgroundColor: "#003314",
            borderColor: "#003314",
          }}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </Button>
      </div>
    </Header>
  );
};

export default Slider;

