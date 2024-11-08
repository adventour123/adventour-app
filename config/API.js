export const TOURIST_SPOTS_API = `https://api.fruitask.com/v3/tables/iWvImu3KdJD55vp/rows/?api_key=02f69d5cf6e98212a8933e7af958e129`;
export const CATEGORIES_API =
  "https://api.fruitask.com/v3/tables/doIAJ4RCypOFrIO/rows/?api_key=02f69d5cf6e98212a8933e7af958e129";
export const BOOKING_API =
  "https://api.fruitask.com/v3/tables/BDqkwTYrdbuQsoX/rows/?api_key=02f69d5cf6e98212a8933e7af958e129";
export const USER_API =
  "https://api.fruitask.com/v3/tables/jOa8w743BhrS0qI/rows/?api_key=02f69d5cf6e98212a8933e7af958e129";
export const PAYMENT_API =
  "https://api.fruitask.com/v3/tables/DMCKmGjVG6evdCz/rows/?api_key=02f69d5cf6e98212a8933e7af958e129";

export const GET_TOURIST_SPOT_API = (id) => {
  return `https://api.fruitask.com/v3/tables/iWvImu3KdJD55vp/rows/${id}/?api_key=02f69d5cf6e98212a8933e7af958e129`;
};

export const GET_USER_API = (id) => {
  return `https://api.fruitask.com/v3/tables/jOa8w743BhrS0qI/rows/${id}/?api_key=02f69d5cf6e98212a8933e7af958e129`;
};

export const UPDATE_USER_API = (id) => {
  return `https://api.fruitask.com/v3/tables/jOa8w743BhrS0qI/update/${id}/?api_key=02f69d5cf6e98212a8933e7af958e129`;
};

export const GET_BOOKING_API = (id) => {
  return `https://api.fruitask.com/v3/tables/BDqkwTYrdbuQsoX/rows/${id}/?api_key=02f69d5cf6e98212a8933e7af958e129`;
};
