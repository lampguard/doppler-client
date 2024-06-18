import { Link, Outlet, useNavigate } from 'react-router-dom';
import { BsPeopleFill, BsPlus, BsPlusCircleFill } from 'react-icons/bs';
import { IoLogOut } from 'react-icons/io5';
import UserContext from '../../context/Auth';
import { useGetAuthQuery } from '../../services';
import logo from '../../assets/logo.png';
import { useEffect, useState } from 'react';
import MyTeams from '../MyTeams';
import NavList from '../Navlist';
import { TeamProvider } from '../../context/TeamContext';
import { usePageContext } from '../../context/PageContext';
import TopNav from '../Topnav';
import FooterMenu from '../FooterMenu';

import { api } from '../../services';
import { useDispatch } from 'react-redux';

const AppLayout = () => {
	const { data, isError } = useGetAuthQuery();
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const pageCtx = usePageContext();

	useEffect(() => {
		if (isError) {
			navigate('/login');
		}
		if (data && data?.data.user.email_verified_at == null) {
			navigate('/verify-email');
		}
	}, [isError, data]);

	const [teamsVisible, setTeamsVisible] = useState(false);

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
								dispatch(api.util.resetApiState());
								navigate('/login');
							}}
						>
							<IoLogOut className="text-2xl" />
							Log out
						</button>
					</div>

					<div className="relative w-full">
						{/* TopNav */}
						<TopNav>
							<Link to={'/dashboard/create-app'}>
								<BsPlusCircleFill />
							</Link>
							<BsPeopleFill
								onClick={() => {
									setTeamsVisible(!teamsVisible);
								}}
							/>
						</TopNav>

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
									<MyTeams setOpen={setTeamsVisible} open={teamsVisible} />
									<Link
										to={'/dashboard/create-team'}
										className="btn btn-primary w-full rounded-full"
									>
										<BsPlus className="text-3xl" />
										New Team
									</Link>
								</div>
							</div>
						</div>
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
