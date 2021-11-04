// Import Settings
import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

// import Redux
import { handleNavigation } from "../../actions/navigation";
import { useDispatch, useSelector } from "react-redux";

// Import Material-ui
import { Container, Grid } from "@material-ui/core";

// Import FontAwesome
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";

// Import Components
import Navbar from "../../components/Navbar/Navbar.js";
import PageTitle from "../../components/PageTitle/PageTitle.js";
import ForumGroup from "../../components/ForumGroup/ForumGroup.js";

// Import Constants
import { FORUM_GROUPS, FORUM_ICONS } from "../../constants/ForumConstants";
import { FORUM } from "../../constants/ReduxConstants";

// Import Resources
import SideDesign from "../../resources/Side-Design.png";

function Forum() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Update navigation state when user returns to this page from previous page
  useEffect(() => {
    dispatch(handleNavigation(FORUM));
  }, []);

  if (!auth.token) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <img alt="SideDesign" src={SideDesign} className={"sideDesignLeft"} />
      <img alt="SideDesign" src={SideDesign} className={"sideDesignRight"} />
      <Grid item xs={12} className="center-text">
        <PageTitle title={"Forum"} icon={faCommentAlt} />
      </Grid>
      <Container>
        <Grid container spacing={5} justifyContent="center">
          {FORUM_GROUPS.map((forum) => (
            <Grid item xs={6} md={4} key={forum.topic}>
              <ForumGroup topic={forum.topic} icon={FORUM_ICONS[forum.topic]} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Forum;
