import axios from "axios";
const FilterForAlert = async () => {
  let AlertFilterList = await axios(
    `${process.env.REACT_APP_BASEURL}/Filters/alerts`
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return AlertFilterList;
};

const FilterForCamera = async () => {
  let CameraFilterList = await axios(
    `${process.env.REACT_APP_BASEURL}/Filters/cameras`
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return CameraFilterList;
};

const FilterForByPassCamera = async () => {
  let CameraFilterList = await axios(
    `${process.env.REACT_APP_BASEURL}/Filters/byPassCameraList`
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return CameraFilterList;
};
const FilterForZones = async () => {
  let ZonesFilterList = await axios(
    `${process.env.REACT_APP_BASEURL}/Filters/zones`
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return ZonesFilterList;
};
const FilterForUsersAssigned = async () => {
  let UsersAssignedFilterList = await axios(
    `${process.env.REACT_APP_BASEURL}/Filters/usersassigned`
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return UsersAssignedFilterList;
};
const FilterForStatus = async () => {
  let StatusFilterList = await axios(
    `${process.env.REACT_APP_BASEURL}/Filters/status`
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return StatusFilterList;
};

export {
	FilterForAlert,
	FilterForCamera,
	FilterForZones,
	FilterForUsersAssigned,
	FilterForStatus,
	FilterForByPassCamera,
};
