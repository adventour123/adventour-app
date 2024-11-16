import moment from "moment";
import { toast } from "react-toastify";

export const ToastifySuccess = (text, position) => {
  toast.success(text, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const ToastifyError = (text, position) => {
  toast.error(text, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const NotificationProcess = (notifTitle, bookTitle, datetime) => {
  const notifications = [
    {
      title: "Booking",
      description:
        notifTitle === "Booking"
          ? `Booking created for ${bookTitle} on ${moment().fromNow(datetime)}.`
          : "",
    },
    {
      title: "Bookmark",
      description:
        notifTitle === "Bookmark"
          ? `You have added a new bookmark for ${bookTitle}. Visit it anytime!`
          : "",
    },
    {
      title: "Authentication",
      description:
        notifTitle === "Authentication"
          ? `You logged in ${moment().fromNow(datetime)}.`
          : "",
    },
  ];

  // Filter the notifications array to find the one matching the notifTitle
  const notification = notifications.find(
    (notif) => notif.title === notifTitle
  );

  return notification || null; // Return the found notification or null if not found
};
