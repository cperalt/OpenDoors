import React, { useEffect } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const { Header } = Layout;

const Slider = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const { getIdTokenClaims } = useAuth0();

  const fetchToken = async () => {
    try {
      const claims = await getIdTokenClaims();
      const idToken = claims.__raw; // This is the actual ID token

      console.log('ID Token:', idToken);

      // Pass this token to your backend
      // Example:
      // await fetch('/api/your-backend-endpoint', {
      //   method: 'POST',
      //   headers: {
      //     Authorization: `Bearer ${idToken}`,
      //   },
      // });
    } catch (error) {
      console.error('Error fetching ID token:', error);
    }
  };

  useEffect(() => {
    console.log("Auth state changed:", { isAuthenticated, user });
  }, [isAuthenticated, user]);




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
      label: "Contact",
      onClick: () => navigate("/contact"),
    },
    {
      key: "5",
      label: isAuthenticated ? `Logout (${user?.name})` : "Login",
      onClick: handleAuthAction,
    },
  ];


  

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
        items={menuItems}
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