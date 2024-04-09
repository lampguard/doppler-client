import { Link, useNavigate } from "react-router-dom";
import TextInput from "../components/Input/TextInput";

import { useLoginMutation } from "../services";
import { useEffect, useState } from "react";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.clear();

    return () => {
      console.log("cleared session storage");
    };
  }, []);
  const [loginform, setLoginform] = useState({
    email: undefined,
    password: undefined,
  });

  const submitLogin = () => {
    login(loginform)
      .unwrap()
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="text-center">
      <h1 className="text-[2.0em] font-[400] tracking-[1px]">
        Login to Doppler
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitLogin();
        }}
        className="pt-10"
      >
        <div className="text-left p-2">
          <label>E-mail Address</label>
          <p className="p-1"></p>
          <TextInput
            type="email"
            placeholder="you@example.com"
            name="email"
            value={loginform.email}
            onChange={(e) => {
              setLoginform({
                ...loginform,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div className="text-left p-2">
          <label>Password</label>
          <p className="p-1"></p>
          <TextInput
            type="password"
            placeholder="*********"
            name="password"
            onChange={(e) => {
              setLoginform({
                ...loginform,
                password: e.target.value,
              });
            }}
            value={loginform.password}
          />
        </div>

        <div className="py-4"></div>
        <div className="p-2">
          <button className="btn-primary" type="submit">
            {isLoading ? (
              <span className="loading loading-ring loading-sm text-white"></span>
            ) : (
              "Log In"
            )}
          </button>
        </div>

        <div className="text-center px-2">
          <Link to={"/reset-password"}>
            <button className="text-theme font-[400] w-full p-2 rounded-md hover:bg-[#000] hover:bg-opacity-[0.1]">
              Reset password
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
