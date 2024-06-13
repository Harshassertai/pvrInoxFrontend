import axios from "axios";
const sendQuery = async ({ email, description, cameraSelected }) => {
	let resp = await axios
    .post(
      `${process.env.REACT_APP_BASEURL}/support/sendquery`,
      {
        email: email,
        description: description,
        camera: cameraSelected?.length > 0 ? cameraSelected : null,
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
    .then(async (res) => {
      console.log("RESPONSE OF MAIL ", res);
      return res.data;
    })
    .catch((err) => {
      return err?.response?.data?.message || err;
    });
	if (resp) {
		return resp;
	} else {
		return "No Data Found.";
	}
};

export { sendQuery };
