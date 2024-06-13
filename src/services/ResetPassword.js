import axios from "axios";

const ResetPasswordFetch = async ({ token, password }) => {
	let result = await axios
    .post(
      `${process.env.REACT_APP_BASEURL}/Auth/resetpassword?token=${token}`,
      {
        password,
      }
    )
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      return err?.response?.data?.message || err;
    });
	return result;
};
export default ResetPasswordFetch;
