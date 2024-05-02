import { useContext } from 'react';
import UserContext from '../context/Auth';
import { usePageContext } from '../context/PageContext';
import {
	BsBellFill,
	BsPeopleFill,
	BsPlus,
	BsPlusCircle,
	BsPlusCircleFill,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';

const TopNav = () => {
	const user = useContext(UserContext);
	const page = usePageContext();

	return (
		<div className="flex w-full pt-12 pb-4 border-b px-4 items-center justify-between">
			<div>{page.title}</div>
			<div className="hidden md:flex items-center gap-x-4">
				<Link to={'/notifications'} className="btn btn-ghost px-4">
					<BsBellFill className="text-xl" />
				</Link>
				<Link to={'/account/profile'} className="flex items-center gap-x-4">
					<img
						src={`https://ui-avatars.com/api/?name=${user?.name}&background=003AFF&color=fff`}
						className="btn-circle"
					/>
					<span>{user?.name}</span>
				</Link>
			</div>
			<div className="flex md:hidden gap-x-4 items-center text-2xl">
				<button to={'/'}>
					<BsPlusCircleFill />
				</button>
				<Link to={'/account/profile'}>
					<BsPeopleFill />
				</Link>
			</div>
		</div>
	);
};

export default TopNav;
