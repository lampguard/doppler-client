import {
	AiFillBell,
	AiFillSetting,
	AiOutlineMenuFold,
	AiOutlineMenuUnfold,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IoLogOut } from 'react-icons/io5';

import { navLinks } from '../../config';
import logo from '../../assets/logo.svg';

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
				</>
			) : null}
		</>
	);
};

/**
 * @type {React.FC<{
 *  children?: React.ReactElement;
 *  title: string;
 * }>} Layout
 */
const Layout = ({ children, title }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div className="container relative font-[300]">
				{/* Topnav */}
				<div className="border-b border-[#ccc] flex flex-wrap justify-between md:items-end pt-3 md:pt-6 pb-3 px-5">
					<p className="text-lg text-black flex items-center">
						<button
							className="py-1 pl-1 pr-3 md:hidden"
							onClick={() => {
								setOpen(!open);
							}}
						>
							{open ? (
								<AiOutlineMenuFold className="text-3xl" />
							) : (
								<AiOutlineMenuUnfold className="text-3xl" />
							)}
						</button>
						{title}
					</p>

					<MdNavbar open={open}>
						<button onClick={() => setOpen(false)}>Close</button>
					</MdNavbar>

					<div className="flex w-[50%] items-center justify-end">
						<span>
							<AiFillSetting className="text-2xl" />
						</span>
						<span className="px-2 md:px-6"></span>
						<span className="relative">
							<AiFillBell className="text-2xl"></AiFillBell>
							<span className="absolute top-0 right-0">
								<span className="relative flex h-3 w-3">
									<span className="animate-[ping_2s_infinite] absolute inline-flex h-full w-full rounded-full bg-theme opacity-75 left-[-2px]  top-[-2px]"></span>
									<span className="relative rounded-full h-2 w-2 bg-theme text-white text-xs text-center"></span>
								</span>
							</span>
						</span>
						<span className="px-2 md:px-6"></span>
						<span>
							<img
								src="https://ui-avatars.com/api/?name=John+Doe&background=003AFF&color=fff"
								alt=""
								className="rounded-full w-[50px] inline"
							/>
							<span className="md:px-[6px]"></span>
							<p className="hidden md:inline">John Doe</p>
						</span>
					</div>
				</div>
				<div className="md:flex items-stretch">
					<div className="w-full">{children}</div>
					<div className="hidden md:block w-[20%] border-l h-svh"></div>
				</div>
				{/* Right Aside */}
			</div>
		</>
	);
};

export default Layout;
