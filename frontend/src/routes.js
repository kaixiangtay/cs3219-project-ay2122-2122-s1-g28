// Import settings
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

// Import pages
import Login from "./pages/Login/Login.js";
import Signup from "./pages/Signup/Signup.js";
import Profile from "./pages/Profile/Profile.js";
import FindFriends from "./pages/FindFriends/FindFriends.js";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail.js";
import Forum from "./pages/Forum/Forum.js";
import ForumTopic from "./pages/ForumTopic/ForumTopic.js";
import ManagePosts from "./pages/ManagePosts/ManagePosts.js";
import SingleForumPost from "./pages/SingleForumPost/SingleForumPost.js";

const Routes = () => {
  return (
    <Switch>
      {/* <Redirect from="/:url*(/+)" to={window.location.pathname.slice(0, -1)} /> */}
      <Route
        exact
        path="/"
        render={() => {
          return <Redirect to="/login/" />;
        }}
      />
      <Route exact path="/login/" component={Login} />
      <Route exact path="/signup/" component={Signup} />
      <Route exact path="/verify-email/:token/" component={VerifyEmail} />
      <Route exact path="/verify-email/" component={VerifyEmail} />
      <Route exact path="/profile/" component={Profile} />
      <Route exact path="/findfriends/" component={FindFriends} />
      <Route exact path="/forum/" component={Forum} />
      <Route exact path="/forum/:topic/" component={ForumTopic} />
      <Route exact path="/forum/:topic/manage-posts/" component={ManagePosts} />
      <Route exact path="/forum/:topic/:id/" component={SingleForumPost} />
    </Switch>
  );
};

export default Routes;
