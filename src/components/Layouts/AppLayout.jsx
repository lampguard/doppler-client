import {
	AiFillBell,
	AiFillSetting,
	AiOutlineMenuFold,
	AiOutlineMenuUnfold,
} from 'react-icons/ai';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { BsPlus } from 'react-icons/bs';
import { IoLogOut } from 'react-icons/io5';

import MdNavbar from '../MdNavbar';
import UserContext from '../../context/Auth';
import { useGetAuthQuery } from '../../services';
// import logo from '../../assets/logo-small.svg';
import logo from '../../assets/logo.png';
import { useEffect, useState } from 'react';
import MyTeams from '../MyTeams';
import NavList from '../Navlist';
import { TeamContext, TeamProvider } from '../../context/TeamContext';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';

const AppLayout = () => {
	const { data, isSuccess, isError } = useGetAuthQuery();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			navigate('/login');
		}
	}, [isError]);

	const [teamsVisible, setTeamsVisible] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const el = document.getElementById('right-aside');
		window.addEventListener('scroll', () => {
			const scrollPosition =
				window.scrollY || document.documentElement.scrollTop;
			if (scrollPosition > 96) {
				el.querySelector('div').classList.remove('md:min-h-[calc(100vh-6rem)]');
				el.querySelector('div').classList.add('md:h-[100%]');
				el.classList.add('md:sticky', 'md:h-[100vh]');
			} else {
				el.classList.remove('md:sticky', 'md:h-[100vh]');
				el.querySelector('div').classList.add('md:min-h-[calc(100vh-6rem)]');
				el.querySelector('div').classList.remove('md:h-[100%]');
			}
		});
	}, []);

	return (
		<UserContext.Provider value={data?.data.user}>
			<TeamProvider>
				<div className="md:flex">
					{/* Sidebar */}
					<div className="w-full md:w-[20%] hidden sticky top-0 h-[100vh] border-r p-5 md:flex flex-col justify-between">
						<div>
							<img src={logo} alt="" className="w-[50%]" />
							<div className="py-5"></div>
							<Link
								to={'/dashboard/create-app'}
								className="btn w-full font-light"
							>
								<BsPlus className="text-2xl" />
								Add New App
							</Link>
							<div className="py-5"></div>

							<NavList />
						</div>
						<button
							className="btn w-full rounded-full text-white bg-red-500 glass font-normal"
							onClick={() => {
								sessionStorage.clear('authToken');
								navigate('/login');
							}}
						>
							<IoLogOut className="text-2xl" />
							Log out
						</button>
					</div>

					<div className="relative w-full">
						{/* TopNav */}
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
								<span className="font-articulat"></span>
							</p>

							<MdNavbar open={open}>
								<button onClick={() => setOpen(false)}>Close</button>
							</MdNavbar>

							<div className="flex w-[50%] items-center justify-end">
								<span>
									<AiFillSetting className="text-2xl" />
								</span>
								<span className="px-2 md:px-6"></span>
								<Link to={'/notifications'} className="relative">
									<AiFillBell className="text-2xl"></AiFillBell>
									<span className="absolute top-0 right-0">
										<span className="relative flex h-3 w-3">
											<span className="animate-[ping_2s_infinite] absolute inline-flex h-full w-full rounded-full bg-theme opacity-75 left-[-2px]  top-[-2px]"></span>
											<span className="relative rounded-full h-2 w-2 bg-theme text-white text-xs text-center"></span>
										</span>
									</span>
								</Link>
								<span className="px-2 md:px-6"></span>
								<Link to={'/account/profile'}>
									<img
										src={`https://ui-avatars.com/api/?name=${data?.data.user?.name}&background=003AFF&color=fff`}
										alt=""
										className="rounded-full w-[50px] inline"
									/>
									<span className="md:px-[6px]"></span>
									<p className="hidden md:inline">{data?.data.user?.name}</p>
								</Link>
							</div>
						</div>

						<div className="md:flex relative items-stretch">
							<div className="w-full h-full">
								<Outlet />
							</div>
							<div
								id="right-aside"
								className={
									'border-l min-w-[200px] lg:min-w-[300px] top-0 right-0 ' +
									(teamsVisible
										? 'fixed h-full w-full bg-white'
										: 'hidden sm:block')
								}
							>
								<div
									className={
										'md:flex flex-col justify-between items-stretch w-full min-h-[calc(100vh-6rem)] p-5 '
									}
								>
									<MyTeams
										setOpen={(open) => {
											console.log(open);
											setTeamsVisible(open);
										}}
										open={teamsVisible}
									/>
									<Link className="btn btn-primary rounded-full">
										<BsPlus className="text-3xl" />
										New Team
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Floating Mobile drawer opener */}
				<div
					className="md:hidden fixed w-[35px] h-[30px] top-[20%] right-0 z-[999]"
					onClick={() => {
						setTeamsVisible(!teamsVisible);
					}}
				>
					<div className="btn btn-sm w-[100%] h-[100%] rounded-none bg-white rounded-l-md border-2 grid place-items-center">
						{!teamsVisible ? <BiSolidLeftArrow /> : <BiSolidRightArrow />}
					</div>
				</div>
			</TeamProvider>
		</UserContext.Provider>
	);
};

export default AppLayout;
