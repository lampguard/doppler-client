import { useState } from "react";
import { notification } from "antd";

import TextInput from "../components/Input/TextInput";
import { useForgotPasswordMutation } from "../services/index";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [forgot, { isLoading, isSuccess }] = useForgotPasswordMutation();

  const [showResend, setShowResend] = useState(false);

  const requestEmail = (resend = false) => {
    forgot({ body: { email }, resend })
      .unwrap()
      .then((res) => {
        console.log(res);
        notification.info({
          message: res.message,
          duration: 3,
        });
        if (resend) {
          setShowResend(false);
        } else {
          setShowResend(true);
        }
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: err.data?.message || err.message,
          duration: 3,
        });
        setShowResend(true);
      });
  };

  return (
    <div className="font-articulat">
      <h1 className="text-2xl font-[400] tracking-wide">Reset Password</h1>
      <div className="py-3"></div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestEmail();
        }}
      >
        <div>
          <label>E-mail Address</label>
          <div className="pb-2"></div>
          <TextInput
            type="email"
            placeholder="you@example.com"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="py-1"></div>
        <div>
          <button className="btn btn-primary w-full">
            {isLoading ? (
              <span className="loading loading-ring loading-sm text-white"></span>
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      </form>
      {showResend && (
        <>
          <div className="py-1"></div>
          <button
            className="btn bg-gray-100 btn-link border w-full"
            onClick={() => {
              requestEmail(true);
            }}
          >
            Resend
          </button>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
