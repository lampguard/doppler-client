import { Outlet, Link, useLocation } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';

import { navLinks } from '../../config';
import logo from '../../assets/logo.svg';

const DashboardLayout = () => {
	const location = useLocation();

	return (
		<div className="font-[230] md:flex">
			<div className="container max-w-[20%] flex-col items-stretch justify-between h-svh border-r border-[#ccc] px-[30px] py-[40px] hidden md:flex">
				<div>
					<img src={logo} alt="" className="w-[130px]" />
					<div className="py-10"></div>

					<ul>
						{navLinks.map((link) => (
							<li className="pb-3" key={link.slug}>
								<Link
									to={link.slug}
									target={link.blankTarget ? '_blank' : undefined}
									className={
										'py-3 px-4 rounded-full w-full text-lg flex items-center ' +
										(location.pathname == link.slug
											? 'bg-theme text-white '
											: null)
									}
								>
									{location.pathname == link.slug
										? link.activeIcon || link.icon
										: link.icon}
									<div className="px-2"></div>
									<span>{link.title}</span>
								</Link>
							</li>
						))}
					</ul>
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
			<Outlet />
		</div>
	);
};

export default DashboardLayout;
