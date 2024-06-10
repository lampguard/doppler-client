import { Outlet, Link } from 'react-router-dom';

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
			<div className="flex justify-center items-center py-12">
				<img src={logo} className="w-[150px]" />
			</div>
			<div className="flex justify-center relative">
				<span className="absolute h-[1px] bg-black opacity-[15%] w-full top-[200px] z-[-1] hidden md:block"></span>
				<div className="w-full md:w-[35%] bg-white md:border border-black border-opacity-[15%] md:rounded-[40px] py-[48px] min-h-[30vw] px-[12px] md:px-[24px]">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AuthPane;
