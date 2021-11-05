// Import Settings
import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

// import Redux
import { handleNavigation } from "../../actions/navigation";
import { useDispatch, useSelector } from "react-redux";

// Import Material-ui
import { Container, Grid } from "@material-ui/core";

// Import FontAwesome
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

// Import Components
import Navbar from "../../components/Navbar/Navbar.js";
import PageTitle from "../../components/PageTitle/PageTitle.js";
import ProfileForm from "../../components/ProfileForm/ProfileForm.js";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture.js";

// Import Constants
import { PROFILE } from "../../constants/ReduxConstants";

// Import Resources
import SideDesign from "../../resources/Side-Design.png";

function Profile() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Update navigation state when user returns to this page from previous page
  useEffect(() => {
    dispatch(handleNavigation(PROFILE));
  }, []);

  if (!auth.token) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <img alt="SideDesign" src={SideDesign} className={"sideDesignLeft"} />
      <img alt="SideDesign" src={SideDesign} className={"sideDesignRight"} />
      <Container>
        <Grid item md={12} className="center-text">
          <PageTitle title={"Profile"} icon={faUserCircle} />
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <ProfilePicture />
          </Grid>
          <Grid item md={8}>
            <ProfileForm />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Profile;
