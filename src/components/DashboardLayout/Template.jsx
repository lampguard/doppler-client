import {
	AiFillBell,
	AiFillSetting,
	AiOutlineMenuFold,
	AiOutlineMenuUnfold,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { IoLogOut } from 'react-icons/io5';

import logo from '../../assets/logo.svg';
import UserContext from '../../context/Auth';
import NavList from '../Navlist';
import MyTeams from '../MyTeams';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { useTeamContext } from '../../context/TeamContext';

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

/**
 * @type {React.FC<{
 *  children?: React.ReactElement;
 *  title: string;
 * }>} Layout
 */
const Template = ({ children, title }) => {
	const [open, setOpen] = useState(false);
	const [asideOpen, setAsideOpe] = useState(false);
	const user = useContext(UserContext);
	const { value: team } = useTeamContext();

	useEffect(() => {
		document.title = title;
	}, []);

	function openAside() {
		const el = document.getElementById('right-aside'); //.classList.toggle('hidden')
		el.classList.add('fixed');
		el.classList.add('top-0');
		el.classList.remove('hidden');
		// el.classList.add('z-1000');
		setAsideOpe(true);
	}

	function closeAside() {
		const el = document.getElementById('right-aside'); //.classList.toggle('hidden')
		el.classList.remove('fixed');
		el.classList.remove('top-0');
		el.classList.add('hidden');
		// el.classList.remove('z-1000');
		setAsideOpe(false);
	}

	function toggleAside() {
		const el = document.getElementById('right-aside'); //.classList.toggle('hidden')
		el.classList.toggle('fixed');
		el.classList.toggle('top-0');
		el.classList.toggle('hidden');
		el.classList.toggle('z-0');
		setAsideOpe(!asideOpen);
	}

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
						<span className="font-articulat">{title}</span>
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
						<Link to={'/account/profile'}>
							<img
								src={`https://ui-avatars.com/api/?name=${user?.name}&background=003AFF&color=fff`}
								alt=""
								className="rounded-full w-[50px] inline"
							/>
							<span className="md:px-[6px]"></span>
							<p className="hidden md:inline">{user?.name}</p>
						</Link>
					</div>
				</div>
				<div className="md:flex w-full items-stretch relative">
					<div className="w-full md:max-w-[75%] border-r">{children}</div>

					{/* Right Aside */}
					<div
						className="bg-white hidden md:block w-[100%] md:w-[25%] h-svh border-b px-6 py-7"
						id="right-aside"
					>
						<MyTeams open={asideOpen} setOpen={closeAside} />
					</div>
				</div>
			</div>

			<div
				className="md:hidden fixed w-[35px] h-[30px] top-[20%] right-0 z-[999]"
				onClick={toggleAside}
			>
				<div className="btn btn-sm w-[100%] h-[100%] rounded-none bg-white rounded-l-md border-2 grid place-items-center">
					{!asideOpen ? <BiSolidLeftArrow /> : <BiSolidRightArrow />}
				</div>
			</div>
		</>
	);
};

export default Template;
