var axios = require("axios");

export const serverURL = "http://localhost:5000";

export const postData = async (url, body) => {
  try {
    const result = await axios.post(serverURL + "/" + url, body);
    return result.data;
  } catch (error) {
    return { status: false };
  }
};

export const getData = async (url) => {
  try {
    const result = await axios.get(serverURL + "/" + url);
    return result.data;
  } catch (error) {
    return { status: false };
  }
};

export const putData = async (url, body) => {
  try {
    const result = await axios.put(serverURL + "/" + url, body);
    return result.data;
  } catch (error) {
    return { status: false };
  }
};

export const deleteData = async (url) => {
  try {
    const result = await axios.delete(serverURL + "/" + url);
    return result.data;
  } catch (error) {
    return { status: false };
  }
};
