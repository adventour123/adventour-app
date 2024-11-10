import axios from "axios";
import moment from "moment";
import {
  BOOKING_API,
  CATEGORIES_API,
  GET_USER_API,
  NOTIFICATION_API,
  REVIEWS_API,
  TOURIST_SPOTS_API,
  UPDATE_TOURIST_SPOT_API,
  UPDATE_USER_API,
  USER_API,
} from "./API";
import api from "./axios";

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

export const isUserExist = async (email) => {
  try {
    const { users } = await fetchAllUser();
    const userId = users.findIndex((item) => item.email === email);

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

export const insertImgUrl = async (imgUrl, id) => {
  try {
    const img = {
      column_name: "photoUrl",
      value: imgUrl,
    };
    const res = await updateUser(img, id);

    return {
      success: res.data.success,
      message: "Profile uploaded",
    };
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

export const addBooking = async (formdata) => {
  try {
    const res = await axios.post(BOOKING_API, formdata);
    const data = res.data;

    return {
      success: data.success,
      data: data.result,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserBookings = async () => {
  try {
    const res = await axios.get(BOOKING_API);
    const data = res.data;

    return {
      success: data.success,
      data: data.result,
    };
  } catch (error) {
    console.log(error);
  }
};

export const setNotification = async (notif) => {
  try {
    const res = await axios.post(NOTIFICATION_API, notif);
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

export const insertReview = async (data) => {
  try {
    const review = {
      id: new Date().getTime().toString(),
      travelId: data.travelId,
      userId: data.userId,
      name: data.name,
      message: data.message,
      ratings: data.ratings,
      datetime: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    const res = await axios.post(REVIEWS_API, review);

    if (res.data?.success) {
      return {
        status: "success",
        message: res.data?.result,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllReviews = async () => {
  try {
    const res = await axios.get(REVIEWS_API);
    const data = res.data;

    return {
      success: data.success,
      data: data.result,
    };
  } catch (error) {
    console.log(error);
  }
};

export const toggleBookmarking = async (id, bookmark) => {
  try {
    const bookmarked = {
      column_name: "bookmarked",
      value: bookmark,
    };

    const res = await api.put(UPDATE_TOURIST_SPOT_API(id), bookmarked);
    const data = res.data;

    return {
      success: data.success,
      data: data.result,
    };
  } catch (error) {
    console.log(error);
  }
};
