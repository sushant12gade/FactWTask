import React from "react";
import {
  makeStyles,
  Box,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

import CelebritiesData from "../../Data/celebrities.json";

import CelebrityData from "../../Components/CelebrityData";
import ConfirmationModal from "../../Components/ConfirmationBox";

import "./style.css";

const Homepage = () => {
  const classes = useStyle();

  const [open, setOpen] = React.useState(false);
  const [currentCelebIndex, setCurrentCelebIndex] = React.useState(null);
  const [celebritiesData, setCelebritiesData] = React.useState(CelebritiesData);

  /**
   * @description Handling search of user and updating list
   *
   * @param {Object} event
   */
  const handleSearch = ({ target: { value = "" } = {} }) => {
    const searchedText = value.toLowerCase();

    const newData = celebritiesData.filter(
      ({ first, last, description, email }) =>
        first.toLowerCase().includes(searchedText) ||
        last.toLowerCase().includes(searchedText) ||
        email.toLowerCase().includes(searchedText) ||
        description.toLowerCase().includes(searchedText)
    );

    setCelebritiesData(newData);
  };

  /**
   * @description Deleting User from list
   */
  const handleDelete = () => {
    celebritiesData.splice(currentCelebIndex, 1);
    setOpen(false);
  };

  /**
   * @description Getting current index value of celebrity
   * @param {Number} index
   */
  const getCurrentCelebrity = (index) => {
    setCurrentCelebIndex(index);
  };

  return (
    <>
      <Box className={`${classes.main_container} main_container`}>
        <Box className={`${classes.celebrity_container} celebrity_container`}>
          <ConfirmationModal
            open={open}
            setOpen={setOpen}
            celebritiesData={celebritiesData}
            setCelebritiesData={setCelebritiesData}
            onDelete={handleDelete}
          />

          <Box className={classes.margin}>
            <Grid
              container
              spacing={1}
              alignItems="flex-end"
              className={`${classes.searchField} searchField`}
            >
              <Grid item>
                <Search className={`${classes.searchIcon} searchIcon`} />
              </Grid>
              <Grid item className={`${classes.searchField} searchField`}>
                <TextField
                  variant="outlined"
                  id="input-with-icon-grid"
                  label="Search User"
                  className={`${classes.searchField} searchField`}
                  onChange={handleSearch}
                />
              </Grid>
            </Grid>
          </Box>

          {celebritiesData.length === 0 ? (
            <Typography variant="h2" className={`${classes.notFound} notFound`}>
              No user found !!
            </Typography>
          ) : (
            celebritiesData.map(
              (
                {
                  first = "",
                  last = "",
                  gender = "",
                  picture = "",
                  country = "",
                  description = "",
                  dob = "",
                  id = "",
                },
                index
              ) => {
                return (
                  <CelebrityData
                    key={`${id}-${first}-${index}`}
                    first={first}
                    last={last}
                    gender={gender}
                    picture={picture}
                    country={country}
                    description={description}
                    dob={dob}
                    index={index}
                    celebritiesData={celebritiesData}
                    setCelebritiesData={setCelebritiesData}
                    setConfirmationOpen={setOpen}
                    currentCelebrity={getCurrentCelebrity}
                  />
                );
              }
            )
          )}
        </Box>
      </Box>
    </>
  );
};

export default Homepage;

const useStyle = makeStyles((theme) => ({
  margin: {
    // margin: theme.spacing(1),
    position: "relative",
  },
  main_container: {
    display: "flex",
  },

  celebrity_container: {
    width: "40%",
    margin: "5% auto",
  },
  searchIcon: {
    position: "absolute",
    left: "1.5%",
    top: "40%",
    color: "#79797c",
  },
  searchField: {
    width: "100%",
    padding: "0 !important",
  },

  notFound: {
    color: "Black",
    margin: "24% auto",
    width: "80%",
    fontWeight: "700",
  },
}));
