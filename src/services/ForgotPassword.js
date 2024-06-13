import axios from "axios";

const ForgotPasswordFetch = async ({ email }) => {
	let result = await axios
    .post(`${process.env.REACT_APP_BASEURL}/Auth/forgotpassword`, {
      email,
    })
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      return err?.response?.data?.message || err;
    });
	return result;
};
export default ForgotPasswordFetch;
