import { Link } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';

import logo from '../assets/logo.png'
import NavList from './Navlist';

/**
 *
 * @type {React.FC<{open: boolean}>} MdNavbar
 * @returns
 */
const MdNavbar = ({ open, children }) => {
	return (
		<>
			{open ? (
				<>
					<div className="md:hidden bg-white z-[1000] absolute left-0 top-0 w-[100%] p-3">
						<div>
							<div className="flex justify-between">
								<img src={logo} alt="" className="w-[130px]" />
								{children}
							</div>
							<div className="py-2"></div>

							<NavList />
						</div>
						<Link
							to={'/login'}
							className="flex w-full items-center py-3 px-4 border hover:bg-red-500 hover:text-white hover:border-red-500 rounded-full"
						>
							<span className="pr-5">
								<IoLogOut size={25} />
							</span>
							Log out
						</Link>
					</div>
				</>
			) : null}
		</>
	);
};

export default MdNavbar;