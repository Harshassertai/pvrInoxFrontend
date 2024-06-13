import moment from "moment";
const convertTime = async (date) => {
	let formatedTime = moment(date).format("LTS");
	let modifiedtime = convertTime12to24(formatedTime);
	return modifiedtime;
};

const convertTime12to24 = (time12h) => {
	const [time, modifier] = time12h.split(" ");

	let [hours, minutes, second] = time.split(":");

	if (hours === "12") {
		hours = "00";
	}

	if (modifier === "PM") {
		hours = parseInt(hours, 10) + 12;
	}
	if (modifier === "AM") {
		if (hours === "00") {
			return `${hours}:${minutes}:${second}`;
		}
		if (hours < 10) {
			return `0${hours}:${minutes}:${second}`;
		}
		return `${hours}:${minutes}:${second}`;
	} else {
		return `${hours}:${minutes}:${second}`;
	}
};

export default convertTime;
