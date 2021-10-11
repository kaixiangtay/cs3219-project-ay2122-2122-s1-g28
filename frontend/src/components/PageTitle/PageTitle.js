// Import Settings
import React from "react";
import PropTypes from "prop-types";

// Import Material-ui
import Grid from "@material-ui/core/Grid";

// Import FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PageTitle({ title, icon }) {
  return (
    <Grid item md={12} className="primary-font">
      <h1>
        {title} <FontAwesomeIcon icon={icon} />
      </h1>
    </Grid>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object,
};

export default PageTitle;
