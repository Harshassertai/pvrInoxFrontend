import axios from "axios";
import { decryptRequest } from "../utils/crypt";

const Tables = async ({
	startingDateValue,
	startingTimeValue,
	endingDateValue,
	endingTimeValue,
	TabNo,
	alert,
}) => {
	let resp = await axios
    .post(`${process.env.REACT_APP_BASEURL}/Person/table`, {
      startDate: startingDateValue,
      startTime: startingTimeValue,
      endDate: endingDateValue,
      endTime: endingTimeValue,
      TabNo,
      alert,
    })
    .then(async (res) => {
      let dataafterdecryption = await decryptRequest(res.data.data);
      return { data: JSON.parse(dataafterdecryption) };
    })
    .catch((err) => {
      return err?.response?.data?.message || err;
    });
	return resp;
};

export { Tables };
