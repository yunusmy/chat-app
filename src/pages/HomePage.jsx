import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/chats");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return null;
};

export default HomePage;
