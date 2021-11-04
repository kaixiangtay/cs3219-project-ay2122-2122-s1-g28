// Import Settings
import React, { useEffect, useState } from "react";

// Import Redux
import { useDispatch } from "react-redux";
import { handleSortPost } from "../../actions/post";
import { handleSortComments } from "../../actions/comment";

// Import Material-ui
import { FormControl, MenuItem, Select } from "@material-ui/core";

// Import CSS
import styles from "./SortButton.module.css";

function SortButton(props) {
  const [sortByValue, setSortByValue] = useState("latest");

  const { type, topic, postId, sortBy } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    if (type == "Post") {
      dispatch(handleSortPost(sortByValue, topic));
    } else if (type == "Comment") {
      dispatch(handleSortComments(sortByValue, postId));
    } else {
      return;
    }
    sortBy(sortByValue);
  }, [sortByValue]);

  return (
    <div>
      <FormControl variant="outlined" size="small">
        <Select
          value={sortByValue}
          onChange={(e) => setSortByValue(e.target.value)}
          className={styles.sortButton}
        >
          <MenuItem value="latest">Latest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
          <MenuItem value="ascVote">Lowest Votes</MenuItem>
          <MenuItem value="descVote">Highest Votes</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SortButton;
