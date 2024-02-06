import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import {
  authenticatedAtom,
  authenticationStateAtom,
  signOut,
} from "@/services/authentication";
import { useRecoilState, useRecoilValue } from "recoil";

function NavigationBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isAuthenticated = useRecoilValue(authenticatedAtom);

  const [authState, setAuthState] = useRecoilState(authenticationStateAtom);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const toggleLogin = async () => {
    await signOut();
  };

  const drawer = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      style={{ width: 250 }}
    >
      <List>
        {/* Add your other navigation links here */}
        <ListItem key="Home">
          <Link href="/" passHref>
            <ListItemText primary="Home" />
          </Link>
        </ListItem>
        {isAuthenticated ? (
          <ListItem
            key="Logout"
            onClick={toggleLogin}
            sx={{ cursor: "pointer" }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <>
            <ListItem
              key="Login"
              onClick={() => setAuthState("signIn")}
              sx={{ cursor: "pointer" }}
            >
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem
              key="Signup"
              onClick={() => setAuthState("signUp")}
              sx={{ cursor: "pointer" }}
            >
              <ListItemText primary="Create Account" />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawer}
        </Drawer>
        <Link href="/" passHref>
          <Typography
            variant="h6"
            style={{
              cursor: "pointer",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            Land Tools
          </Typography>
        </Link>
        <Box ml={"auto"}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
