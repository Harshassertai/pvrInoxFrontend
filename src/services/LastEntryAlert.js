import axios from "axios";
import { decryptRequest } from "../utils/crypt";
const getLastAlertsList = async () => {
	let resp = await axios
    .get("https://pispl.app-assertai.com:5002/Person/lastentry")
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return { data: JSON.parse(dataafterdecryption) };
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

export { getLastAlertsList };
