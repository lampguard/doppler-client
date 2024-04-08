import { Outlet, Link } from 'react-router-dom';

import styles from './index.module.scss';

import logo from '../../assets/logo.svg';

const AuthPane = () => {
	return (
		<div className="font-[230]">
			<nav className="p-6 pe-10 block">
				<ul className="flex gap-5 justify-end">
					<li>
						<Link className="px-2" to={'/login'}>
							Log in
						</Link>
					</li>
					<li>
						<Link className="px-2" to={'/signup'}>
							Sign up
						</Link>
					</li>
				</ul>
			</nav>
			<div className="flex justify-center items-center">
				<img src={logo} className="w-[150px]" />
			</div>
			<div className="md:pb-[3em] hidden md:block"></div>
			<div className="flex justify-center relative">
				<span className="absolute h-[1px] block bg-black opacity-[15%] w-full top-[200px] z-[-1]"></span>
				<div className="min-w-[35%] bg-white border border-black border-opacity-[15%] rounded-[40px] py-[64px] min-h-[30vw] px-[24px] grid items-center">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AuthPane;
