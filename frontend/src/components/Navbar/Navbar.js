// Import Settings
import React from "react";
import { Link } from "react-router-dom";

// Import Redux
import { handleNavigation } from "../../actions/navigation";
import { handleUserLogout } from "../../actions/auth";
import { handleUnmatch } from "../../actions/match";
import { useSelector, useDispatch } from "react-redux";

// Import Material-ui
import { AppBar, IconButton, Toolbar } from "@material-ui/core";

// Import FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import {
  faCommentAlt,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";

// Import CSS
import styles from "./Navbar.module.css";

// Import constants
import {
  FINDFRIENDS,
  FORUM,
  PROFILE,
  LOGOUT,
} from "../../constants/ReduxConstants.js";

// Import Resources
import NUSociaLifeLogo from "../../resources/NUSociaLife_Navbar_Icon.png";

function Navbar() {
  const navigation = useSelector((state) => state.navigation);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navItems = [
    {
      icon: faUserFriends,
      title: "Find Friends",
      selection: FINDFRIENDS,
      link: "/findfriends",
    },
    {
      icon: faCommentAlt,
      title: "Forum",
      selection: FORUM,
      link: "/forum",
    },
    {
      icon: faUserCircle,
      title: "Profile",
      selection: PROFILE,
      link: "/profile",
    },
    {
      icon: faSignOutAlt,
      title: "Logout",
      selection: LOGOUT,
      link: "/login",
    },
  ];

  const handleNavClick = (selection) => {
    if (selection == LOGOUT) {
      dispatch(handleUserLogout(auth.token));
    }
    dispatch(handleNavigation(selection));
  };

  return (
    <AppBar position="static" className={styles.navColor}>
      <Toolbar>
        <IconButton color="inherit">
          <img
            alt="NUSociaLifeLogo"
            src={NUSociaLifeLogo}
            className={styles.logo}
          />
        </IconButton>
        <div className={styles.nav}>
          {navItems.map((item) => (
            <IconButton
              key={item.title}
              color="inherit"
              className={
                navigation.selection === item.selection ? styles.selected : null
              }
              component={Link}
              to={item.link}
              onClick={() => {
                dispatch(handleUnmatch(auth.token));
                handleNavClick(item.selection);
              }}
            >
              <div className={styles.navIcon}>
                <FontAwesomeIcon icon={item.icon} />
                <h6 className={styles.titleSpacing}>{item.title}</h6>
              </div>
            </IconButton>
          ))}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
