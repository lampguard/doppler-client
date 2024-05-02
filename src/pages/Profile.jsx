import { useContext, useState } from 'react';
import UserContext from '../context/Auth';
import {
	useLazySetup2FAQuery,
	useEnable2FAMutation,
	useLogoutMutation,
} from '../services';
import Modal from '../components/Modal';
import Loader from '../components/Loaders';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
	const [form, setForm] = useState({ title: undefined });
	const [setup, { isFetching, isLoading: settingUp }] = useLazySetup2FAQuery();
	const [enable, { isLoading }] = useEnable2FAMutation();
	const [logout] = useLogoutMutation();
	const navigate = useNavigate();

	const [twofaForm, set2FaForm] = useState({
		secret: undefined,
		qrCode: undefined,
		token: '',
	});

	const setup2fa = () => {
		setup()
			.unwrap()
			.then((res) => {
				set2FaForm(res);
				document.getElementById('enable2fa')?.showModal();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const enable2Fa = () => {
		console.log(twofaForm);
		enable({ ...twofaForm, qrCode: undefined })
			.unwrap()
			.then((res) => {
				logout()
					.unwrap()
					.then(() => {
						navigate('/login');
					})
					.catch((err) => {
						console.error(err);
					});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const user = useContext(UserContext);

	return (
		<>
			<Modal
				id={'enable2fa'}
				className="w-11/12 md:w-6/12 max-w-[100%]"
				withClose
			>
				{twofaForm.secret && (
					<div className="md:flex w-full justify-evenly items-start">
						<img src={twofaForm.qrCode} alt="" />
						<div className="p-3">
							<p>
								Scan the QR code with your authenticator app and enter the code
								below to enable 2FA.
							</p>
							<div className="py-1"></div>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									enable2Fa();
								}}
							>
								<label htmlFor="">Enter your token here</label>
								<input
									type="text"
									className="outline rounded-md block w-full p-1"
									required
									value={twofaForm.token}
									onChange={(e) =>
										set2FaForm({ ...twofaForm, token: e.target.value })
									}
								/>
								<div className="pt-1"></div>
								<button className="btn rounded btn-sm">Enable</button>
							</form>
						</div>
					</div>
				)}
			</Modal>
			<div className="w-full p-[3em] grid place-items-center">
				<div className="btn btn-circle overflow-hidden w-[8em] h-[8em]">
					<img
						src={`https://ui-avatars.com/api/?name=${user?.name}&background=003AFF&color=fff`}
						alt={user?.name}
						className="w-full"
					/>
				</div>
				<p className="pt-6 pb-3">{user?.name}</p>
				<p className="text-gray-400 text-sm pb-5">{user?.email}</p>
				<button className="btn btn-primary w-[10rem] rounded-full">
					Edit Name
				</button>
				<div className="py-1"></div>
				<button
					className="text-red-500 btn btn-ghost glass w-[10rem] rounded-full"
					onClick={() => {
						navigate('/login');
					}}
				>
					Log out
				</button>
			</div>
			<div className="w-full px-3 md:px-[3em] flex justify-between items-center">
				<span className="w-full">Two Factor Authentication</span>
				{Boolean(user?.twofactorenabled) ? (
					<>
						<span className="btn btn-sm">2FA Enabled</span>
					</>
				) : (
					<>
						{isFetching || settingUp ? (
							<span className="max-w-[13%] flex justify-end">
								<Loader />
							</span>
						) : (
							<button className="btn btn-sm" onClick={setup2fa}>
								Enable 2FA
							</button>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default Profile;
