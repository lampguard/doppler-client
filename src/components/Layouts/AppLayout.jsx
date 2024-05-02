import { Link, Outlet, useNavigate } from 'react-router-dom';
import { BsPlus } from 'react-icons/bs';
import { IoLogOut } from 'react-icons/io5';

import UserContext from '../../context/Auth';
import { useGetAuthQuery } from '../../services';
// import logo from '../../assets/logo-small.svg';
import logo from '../../assets/logo.png';
import { useEffect, useState } from 'react';
import MyTeams from '../MyTeams';
import NavList from '../Navlist';
import { TeamProvider } from '../../context/TeamContext';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { usePageContext } from '../../context/PageContext';
import TopNav from '../Topnav';
import FooterMenu from '../FooterMenu';

const AppLayout = () => {
	const { data, isError } = useGetAuthQuery();
	const navigate = useNavigate();

	const pageCtx = usePageContext();
	// const [pageTitle, setPageTitle] = useState(pageCtx.title);

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

	useEffect(() => {
		document.title = pageCtx?.title;
		// setPageTitle(pageCtx.title);
	}, [pageCtx]);

	return (
		<UserContext.Provider value={data?.data.user}>
			<TeamProvider>
				<div className="md:flex">
					{/* Sidebar */}
					<div className="w-full md:w-[20%] hidden sticky top-0 h-[100vh] border-r p-5 md:flex flex-col justify-between">
						<div>
							<img src={logo} alt="" className="w-[50%] min-w-[120px]" />
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
						{/* <div className="border-b border-[#ccc] flex flex-wrap justify-between md:items-end pt-3 md:pt-6 pb-3 px-5">
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
								<span className="font-articulat">{pageTitle}</span>
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
						</div> */}
						<TopNav />

						<div className="md:flex relative items-stretch">
							<div className="w-full h-full grid grid-cols-1">
								<Outlet />
								<div className="py-8 md:hidden"></div>
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

				{/* Footer Menu */}
				<div className="fixed bottom-0 left-0 w-full px-4 border-t bg-white md:hidden flex justify-around">
					<FooterMenu />
				</div>
			</TeamProvider>
		</UserContext.Provider>
	);
};

export default AppLayout;
