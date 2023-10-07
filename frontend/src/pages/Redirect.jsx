import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
const Redirect = () => {
  const navigate = useNavigate();
  // When user is not logged in, redirect user back to landing page
  // This route is only accessible when user is not logged in
  
  useEffect(() => {
    navigate("/");
  }, []);

  return null;
};

export default Redirect;
