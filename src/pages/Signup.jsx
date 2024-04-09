import { Link } from "react-router-dom";
import TextInput from "../components/Input/TextInput";

export default () => {
  return (
    <div className="text-center">
      <h1 className="text-[1.5em] font-[400] tracking-[0px]">
        Create a Free Doppler Account
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="pt-10"
      >
        <div className="text-left p-2">
          <label>E-mail Address</label>
          <p className="p-1"></p>
          <TextInput type="email" placeholder="you@example.com" name="email" />
        </div>
        <div className="text-left p-2">
          <label>Full Name</label>
          <p className="p-1"></p>
          <TextInput placeholder="John Doe" name="name" />
        </div>
        <div className="text-left p-2">
          <label>Password</label>
          <p className="p-1"></p>
          <TextInput type="password" placeholder="*********" name="password" />
        </div>
        <div className="text-left p-2">
          <label>Confirm Password</label>
          <p classN ame="p-1"></p>
          <TextInput
            type="password"
            placeholder="*********"
            name="password_confirmation"
          />
        </div>

        <div className="py-4"></div>
        <div className="p-2">
          <button className="btn-primary">
            {false ? (
              <span className="loading loading-ring loading-sm text-white"></span>
            ) : (
              "Sign up"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
