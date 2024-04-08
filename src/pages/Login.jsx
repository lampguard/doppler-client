import { Link } from "react-router-dom";
import TextInput from "../components/Input/TextInput";

const Login = () => {
	return (
		<div className="text-center">
			<h1 className="text-[2.0em] font-[400] tracking-[1px]">
				Login to Doppler
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
					<TextInput
						type="email"
						placeholder="you@example.com"
            name="email"
					/>
				</div>
				<div className="text-left p-2">
					<label>Password</label>
					<p className="p-1"></p>
					<TextInput
						type="password"
						placeholder="*********"
            name="password"
					/>
				</div>

				<div className="py-4"></div>
				<div className="p-2">
					<button className="btn-primary">Log In</button>
				</div>

				<div className="text-center px-2">
					<Link to={'/reset-password'}>
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
