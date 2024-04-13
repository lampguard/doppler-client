import { useContext, useState } from 'react';
import UserContext from '../context/Auth';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';

const Profile = () => {
	const [form, setForm] = useState({ title: undefined });

	const user = useContext(UserContext);

	return (
		<>
			<div className="w-full p-[3em] grid place-items-center">
				<div className="btn btn-circle overflow-hidden w-[8em] h-[8em]">
					<img
						src={`https://ui-avatars.com/api/?name=${user.name}&background=003AFF&color=fff`}
						alt={user.name}
						className="w-full"
					/>
				</div>
				<p className="pt-6 pb-3">{user.name}</p>
				<p className="text-gray-400 text-sm pb-5">{user.email}</p>
				<button className="btn btn-primary w-[10rem] rounded-full">
					Edit Name
				</button>
			</div>
			<div className="w-full px-3 md:px-[3em] flex justify-between items-center">
				<span>Two Factor Authentication</span>

				{/* {user.twofactorsecret ? (
						<span className="w-[15px] absolute top-[1.7px] right-[1.7px] block rounded-full h-[15px] bg-blue-600"></span>
					) : (
						<span className="w-[15px] absolute top-[1.7px] left-[1.7px] block rounded-full h-[15px] bg-blue-600"></span>
					)} */}
				<input
					type="checkbox"
					className="toggle hover:bg-[#003AFF] bg-[#003AFF] [--tglbg:#000/30]"
					// checked={user.twofactorsecret | false}
				/>
			</div>
		</>
	);
};

export default Profile;
