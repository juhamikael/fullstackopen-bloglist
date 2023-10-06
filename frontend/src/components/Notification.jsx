import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
const Notification = () => {
  const notification = useSelector((state) => state.notification);
  useEffect(() => {
    if (!notification.message) return;
    const style = {
      border: "solid",
      background: "#0f0f0f",
      padding: 10,
      borderWidth: 1,
      color: notification.type === "success" ? "green" : "red",
    };

    if (notification.type === "error") {
      toast.error(notification.message, { className: style });
    } else if (notification.type === "success") {
      toast.success(notification.message);
    }
  }, [notification.message, notification.type]);

  return null;
};

export default Notification;
