import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (user) {
      navigate("/chats");
    }
  }, [user, navigate]);

  return (
    <div className="auth-page">
      <h1>{isLogin ? "Login" : "Register"}</h1>
      {isLogin ? <Login /> : <Register />}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need to register?" : "Already have an account?"}
      </button>
    </div>
  );
};

export default LoginPage;
