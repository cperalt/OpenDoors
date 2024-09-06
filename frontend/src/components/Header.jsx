import React, { useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "./images/op-logo.png";

const { Header } = Layout;

const Slider = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect, logout, user, getAccessTokenSilently } = useAuth0();


  useEffect(() => {
    if (isAuthenticated) {
      // Fetch the token when user is authenticated
      const getTokenAndSendToBackend = async () => {
        try {
          const token = await getAccessTokenSilently();
          console.log("JWT Token:", token); // Debugging purpose

          // Send token to backend to store in database
          sendTokenToBackend(token);
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      };

      getTokenAndSendToBackend();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  const sendTokenToBackend = async (token) => {
    try {
      await fetch("http://localhost:3030/api/save-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      console.log("Token sent to backend successfully");
    } catch (error) {
      console.error("Error sending token to backend:", error);
    }
  };




  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout({ returnTo: window.location.origin });
    } else {
      loginWithRedirect();
    }
  };

  const menuItems = [
    {
      key: "1",
      label: "Home",
      onClick: () => navigate("/"),
    },
    {
      key: "2",
      label: "Career Generator",
      onClick: () => navigate("/CareerGenerator"),
    },
    {
      key: "3",
      label: "Contact Us",
      onClick: () => navigate("/Contact"),
    },
  ];

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
      <div className="logo" style={{ display: "flex", float: "left" }}>
        <img src={logo} alt="Logo" style={{ height: "40px" }} />
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
        items={menuItems}
      />

      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          type="primary"
          onClick={handleAuthAction}
          style={{
            backgroundColor: "#003314",
            borderColor: "#003314",
          }}
        >
          {isAuthenticated ? `Logout (${user?.name})` : "Login"}
        </Button>
      </div>
    </Header>
  );
};

export default Slider;