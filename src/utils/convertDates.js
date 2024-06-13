import moment from "moment";
const convertDate = async (date) => {
	var incomingdate = new Date(date),
		mnth = ("0" + (incomingdate.getMonth() + 1)).slice(-2),
		day = ("0" + incomingdate.getDate()).slice(-2);
	return [incomingdate.getFullYear(), mnth, day].join("-");
};

export default convertDate;
