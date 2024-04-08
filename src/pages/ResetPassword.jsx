import TextInput from '../components/Input/TextInput';

export default () => {
	return (
		<div>
			<h1 className="text-2xl font-[400] tracking-wide">Reset Password</h1>
			<div className="py-4"></div>
			<form onSubmit={(e) => {}}>
				<div>
					<label>E-mail Address</label>
					<div className="pb-2"></div>
					<TextInput type="email" placeholder="you@example.com" name='email' />
				</div>
				<div className="py-5"></div>
				<div>
					<button className="btn-primary">Reset Password</button>
				</div>
			</form>
		</div>
	);
};
