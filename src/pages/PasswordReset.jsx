import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TextInput from "../components/Input/TextInput";
import {
  useVerifyPasswordResetMutation,
  useResetPasswordMutation,
} from "../services";
import { notification } from "antd";
import Loader from "../components/Loaders";
import Skeleton from "../components/Loaders/Skeleton";
import { useEffect } from "react";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [search] = useSearchParams();

  const [verify, { isLoading }] = useVerifyPasswordResetMutation();
  const [reset, { isLoading: resetting }] = useResetPasswordMutation();

  const [mode, setMode] = useState(search.get("use"));
  const [email] = useState(search.get("email"));
  const [token] = useState(search.get("token"));
  const [code, setCode] = useState("");

  const [verified, setVerified] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  useEffect(() => {
    if (mode == "token") {
      verify({
        email,
        token,
      })
        .unwrap()
        .then(({ ok, token }) => {
          setVerified(ok);
          setResetToken(token);
        })
        .catch((err) => {
          console.error(err);
          notification.error({
            message: err.data?.message || "Unable to verify reset request",
            duration: 3,
          });
          navigate("/login");
        });
    }
  }, [mode]);

  return (
    <>
      {verified && (
        <>
          <div>
            <p className="text-2xl text-center">Choose a New Password</p>
            <div className="py-2"></div>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                reset({
                  body: {
                    password,
                    password_confirmation: confirm_password,
                  },
                  token: resetToken,
                })
                  .unwrap()
                  .then((data) => {
                    notification.success({
                      message: "Password updated successfully",
                      duration: 3,
                    });
                    navigate("/login");
                  })
                  .catch((err) => {
                    notification.error({
                      message:
                        err.data.message ||
                        "Unable to reset password. Please try again.",
                      duration: 3,
                    });
                  });
              }}
            >
              <label>Password</label>
              <TextInput
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="py-1"></div>
              <label>Confirm Password</label>
              <TextInput
                type="password"
                required
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="py-1"></div>
              <button className="btn btn-primary w-full" disabled={resetting}>
                {resetting ? <Loader /> : "Set Password"}
              </button>
            </form>
          </div>
        </>
      )}
      {!verified && mode == "code" && (
        <div>
          <p className="text-2xl text-center">Enter Reset Code</p>
          <div className="py-2"></div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              verify({
                email,
                code,
              })
                .unwrap()
                .then(({ ok, token }) => {
                  setVerified(ok);
                  setResetToken(token);
                })
                .catch((err) => {
                  console.error(err);
                  notification.error({
                    message: err.data?.message || "Error occurred",
                    duration: 3,
                  });
                });
            }}
          >
            <TextInput
              value={code}
              required
              type="text"
              onChange={(e) => setCode(e.target.value)}
              placeholder="1 2 3 4 5 6"
            />
            <div className="py-2"></div>
            <button className="btn btn-primary w-full" disabled={isLoading}>
              {isLoading ? <Loader /> : "Verify"}
            </button>
          </form>
        </div>
      )}
      {!verified && mode == "token" && (
        <>
          <Skeleton />
        </>
      )}
    </>
  );
};

export default PasswordReset;
