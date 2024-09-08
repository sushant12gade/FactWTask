import React from "react";
import { array, number, string, oneOfType, func } from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import {
  Create as CreateIcon,
  DeleteForever as DeleteForeverIcon,
  ExpandMore as ExpandMoreIcon,
  CancelOutlined as CancelOutlinedIcon,
  CheckCircleOutlineOutlined as CheckCircleOutlineOutlinedIcon,
} from "@material-ui/icons";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { GENDERS } from "../../Configs/gender";

import "./style.css";

export default function CelebrityData({
  first = "",
  last = "",
  gender = "",
  picture = "",
  country = "",
  description = "",
  dob = "",
  key = "",
  index = "",
  celebritiesData = [],
  setCelebritiesData = () => {},
  setConfirmationOpen = () => {},
  currentCelebrity = () => {},
}) {
  const classes = useStyles();

  const [isEdit, setEdit] = React.useState(false);
  const [newData, setData] = React.useState([...celebritiesData]);

  /**
   * @description Handling true/false state of user
   */
  const handleEdit = () => {
    setEdit(!isEdit);
  };

  /**
   * @description User editing
   *
   * @param {String} inputType
   * @param {Object} event
   */
  const handleEditUser =
    (inputType) =>
    ({ target: { value = "" } = {} }) => {
      const updatedData = { ...newData[index], [inputType]: value };
      newData[index] = updatedData;

      setData([...newData]);
      setCelebritiesData(newData);
    };

  /**
   * @description Cancel Edit state
   */
  const cancelEdit = () => {
    setEdit(!isEdit);
    setCelebritiesData(celebritiesData);
  };

  /**
   * @description Delete user
   */
  const handleDelete = () => {
    setConfirmationOpen(true);
    currentCelebrity(index);
  };

  /**
   * @description Get user age from DOB
   *
   * @param {String} dateString
   * @returns  {String} age
   */
  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Box className={classes.root} key={key}>
      <Accordion className={classes.userCard}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <img
            src={picture}
            alt={`${first}-${last}`}
            className={classes.userPicture}
          />
          {isEdit ? (
            <input
              value={`${first} ${last}`}
              type="text"
              onChange={handleEditUser("name")}
              className={classes.editUserName}
            />
          ) : (
            <Typography variant="h4" className={classes.userTitle}>
              {`${first} ${last}`}
            </Typography>
          )}
        </AccordionSummary>

        <AccordionDetails className={classes.user}>
          <Box className={classes.userDetail}>
            <Box className={classes.userData}>
              <Typography className={classes.primaryText}>Age</Typography>
              {isEdit ? (
                <input
                  value={dob}
                  type="text"
                  onChange={handleEditUser("dob")}
                  className={classes.editUser}
                />
              ) : (
                <Typography className={classes.secondaryText}>
                  {getAge(dob)}
                </Typography>
              )}
            </Box>

            <Box className={classes.userData}>
              <Typography className={classes.primaryText}>Gender</Typography>
              {isEdit ? (
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={gender}
                    onChange={handleEditUser("gender")}
                    label="Age"
                    defaultValue={Object.values(GENDERS).find(
                      ({ label }) => label == gender
                    )}
                  >
                    {Object.values(GENDERS).map(({ label, value }, index) => {
                      return (
                        <MenuItem key={`${index}-${value}`} value={value}>
                          {label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              ) : (
                <Typography className={classes.secondaryText}>
                  {gender}
                </Typography>
              )}
            </Box>

            <Box className={classes.userData}>
              <Typography className={classes.primaryText}>Country</Typography>
              {isEdit ? (
                <input
                  value={country}
                  type="text"
                  onChange={handleEditUser("country")}
                  className={classes.editUser}
                />
              ) : (
                <Typography className={classes.secondaryText}>
                  {country}
                </Typography>
              )}
            </Box>
          </Box>

          <Box className={classes.userData}>
            <Typography className={classes.primaryText}>Description</Typography>
            {isEdit ? (
              <textarea
                value={description}
                onChange={handleEditUser("description")}
                className={classes.editUserTextArea}
                rows="5"
                cols="56"
              />
            ) : (
              <Typography className={classes.secondaryText}>
                {description}
              </Typography>
            )}
          </Box>
        </AccordionDetails>

        <AccordionActions className={classes.userActions}>
          {!isEdit ? (
            <>
              <DeleteForeverIcon
                className={classes.userActionIcon}
                style={{ color: "#FF3500" }}
                onClick={handleDelete}
              />
              <CreateIcon
                className={classes.userActionIcon}
                style={{ color: "#057DFF" }}
                onClick={handleEdit}
              />
            </>
          ) : (
            <>
              <CancelOutlinedIcon
                className={classes.userActionIcon}
                style={{ color: "#FF3D0A" }}
                onClick={cancelEdit}
              />
              <CheckCircleOutlineOutlinedIcon
                className={classes.userActionIcon}
                style={{ color: "#38B000" }}
                onClick={handleEdit}
              />
            </>
          )}
        </AccordionActions>
      </Accordion>
    </Box>
  );
}

/**
 *  Default Props
 */
CelebrityData.defaultProps = {
  id: "",
  first: "",
  last: "",
  gender: "",
  email: "",
  picture: "",
  country: "",
  description: "",
  key: "",
  dob: "",
  index: "",
  celebritiesData: [],
  setCelebritiesData: () => {},
  setConfirmationOpen: () => {},
  currentCelebrity: () => {},
};

/**
 * Props validation
 */
CelebrityData.propsType = {
  id: oneOfType([string, number]),
  first: string,
  last: string,
  gender: string,
  email: string,
  picture: string,
  country: string,
  description: string,
  key: string,
  dob: string,
  index: oneOfType([number, string]),
  celebritiesData: array,
  setCelebritiesData: func,
  setConfirmationOpen: func,
  currentCelebrity: func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "4%",
  },
  userCard: {
    margin: "5% 0",
    border: "2px solid #CECECE",
    borderRadius: "20px !important",
  },
  userPicture: {
    border: "4px solid #CECECE",
    borderRadius: "50%",
  },
  userTitle: {
    margin: "2% 5%",
    fontWeight: "500",
  },
  userDetail: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },

  userData: {
    marginTop: "2%",
  },
  user: {
    display: "block",
  },
  primaryText: {
    color: "#767679",
    fontSize: "1.5rem",
  },
  secondaryText: {
    color: "#000",
    fontSize: "1.5rem",
  },

  userActionIcon: {
    fontSize: "3rem",
  },
  editUserName: {
    margin: "2% 5%",
    height: "3rem",
    width: "16rem",
    fontSize: "1.5rem",
    border: "3px solid grey",
    borderRadius: "11px",
    padding: "0 0.5rem",
  },

  editUser: {
    height: "3rem",
    width: "14.5rem",
    fontSize: "1.5rem",
    border: "3px solid grey",
    borderRadius: "11px",
    padding: "0 0.5rem",
    marginLeft: "5px",
  },

  editUserTextArea: {
    fontSize: "1.5rem",
    border: "3px solid grey",
    borderRadius: "11px",
    padding: "0 0.5rem",
  },
}));
