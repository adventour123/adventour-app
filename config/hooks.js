import axios from "axios";
import {
  CATEGORIES_API,
  GET_USER_API,
  TOURIST_SPOTS_API,
  UPDATE_USER_API,
  USER_API,
} from "./API";

export const createAccount = async (data) => {
  try {
    // Create a user object with necessary details
    const user = {
      uid: data.uid,
      username: data.username,
      email: data.email,
      photoUrl: data.photoUrl,
      status: "active",
    };

    // Send a POST request to create a new user account in the backend
    const res = await axios.post(USER_API, user);
    console.log(res.data);

    // If the backend request is successful, return the result
    if (res.data?.success) {
      return {
        status: true,
        message: "User registered successfully",
        id: res.data?.row,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (newData, id) => {
  try {
    // const accountRef = await doc(db, "accounts", uid);
    // const res = await updateDoc(accountRef, newData);

    const updateData = {
      column_name: newData.column_name,
      value: newData.value,
    };

    const res = await axios.put(UPDATE_USER_API(id), updateData);
    console.log(res.data);

    if (res.data?.success) {
      return {
        status: "success",
        message: res.data?.result,
      };
    }
    console.log("Updated res: ", res);
  } catch (error) {
    console.log(error);
  }
};

export const isUserExist = async (uid) => {
  try {
    const { users } = await fetchAllUser();
    const userId = users.findIndex((item) => item.uid === uid);

    const res = await axios.get(GET_USER_API(userId));
    const data = res.data.result;
    console.log("Use exist: ", data);
    if (data) {
      const updateStatus = {
        column_name: "status",
        value: "active",
      };
      await updateUser(updateStatus, userId);
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllUser = async () => {
  try {
    const res = await axios.get(USER_API);
    const data = res.data.result;

    return {
      users: data,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllTouristSpots = async () => {
  try {
    const res = await axios.get(TOURIST_SPOTS_API);
    const data = res.data;

    return {
      success: data.success,
      data: data.result,
    };
  } catch (error) {
    console.log(error);
  }
};

export const addBooking = async () => {
  try {
    const res = await axios.post(BOOKING_API);
    const data = res.data;

    return {
      success: data.success,
      data: data.result,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllCategories = async () => {
  try {
    const res = await axios.get(CATEGORIES_API);
    const data = res.data;

    return {
      success: data.success,
      data: data.result,
    };
  } catch (error) {
    console.log(error);
  }
};
