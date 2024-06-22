import { Link, Outlet } from 'react-router-dom';

import logo from '../assets/logo.svg';
import blackLogo from '../assets/black-logo.svg';
import Twitter from '../assets/twitter-logo.svg';
import Github from '../assets/github-icon-logo.svg';
import Linkedin from '../assets/linkedin-logo.svg';
import Ellipse from '../assets/Ellipse 8.svg';

import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTimes } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa6';
import TextInput from './Input/TextInput';
import Loader from './Loaders';
import { useGetConfigQuery, useJoinWaitlistMutation } from '../services';
import { isWaitlistOpen, isOnboarding, isOpen, useSystemConfig } from '../context/ConfigHook';
import WaitlistForm from './WaitlistForm';

const navLinks = [
	{ title: 'Home', to: '/' },
	{ title: 'Features', to: '/#features' },
	{ title: 'Pricing', to: '/#pricing' },
	{
		title: `Developer Guide`,
		to: 'https://doppler.gitbook.io/guide',
		_blank: true,
	},
];

const GuestLayout = () => {
	const [navOpen, setNavOpen] = useState(false);
	const config = useSystemConfig();

	// const [email, setEmail] = useState('');
	// const [waitlist, { isLoading }] = useJoinWaitlistMutation();

	// const joinWaitlist = (input) => {
	// 	waitlist({ email: input || email })
	// 		.unwrap()
	// 		.then((data) => {
	// 			notification.info({
	// 				message: data.message || 'Success!',
	// 				duration: 3,
	// 			});
	// 		})
	// 		.catch((err) => {
	// 			notification.error({
	// 				message: err.data?.message || 'An error occurred',
	// 				duration: 3,
	// 				className: 'bg-red-200 text-white',
	// 			});
	// 		});
	// };

	return (
		<>
			{/* Top Nav & Header */}
			<div className="px-[2em] md:px-[4em] py-[1.7em] md:py-[2em] flex justify-between items-center w-full">
				<div className="w-[130px] md:w-[12.5%]">
					<img src={logo} className={'w-full ' + (navOpen && 'hidden')} />
				</div>

				<div className="hidden md:flex items-center">
					<div className="nav">
						{navLinks.map((link) => {
							if (link.to.startsWith('/#')) {
								return (
									<a
										key={link.to}
										href={link.to}
										className="py-2 px-5 rounded hover:bg-gray-200"
										target={link._blank ? '_blank' : undefined}
									>
										{link.title}
									</a>
								);
							}
							return (
								<Link
									key={link.to}
									to={link.to}
									className="py-2 px-5 rounded hover:bg-gray-200"
									target={link._blank ? '_blank' : undefined}
								>
									{link.title}
								</Link>
							);
						})}
					</div>
					<div className="lg:px-[1.25rem]"></div>
					{config?.open == '1' && (
						<div>
							<Link
								to={'/login'}
								className="py-2.5 px-8 btn-ghost rounded-lg w-[100px] h-[30px]"
							>
								Sign In
							</Link>
							<Link
								to={'/signup'}
								className="py-2.5 px-8 btn-primary btn-md rounded-lg w-[150px]"
							>
								Get Started
							</Link>
						</div>
					)}
				</div>
				<div className="md:hidden">
					<button
						className="btn btn-ghost btn-sm"
						onClick={() => {
							document.querySelector('#mobileNav').classList.toggle('hidden');
							setNavOpen(!navOpen);
						}}
					>
						{!navOpen ? (
							<GiHamburgerMenu className="text-xl" />
						) : (
							<FaTimes className="text-xl" />
						)}
					</button>
				</div>
			</div>

			<div className="hidden md:hidden" id="mobileNav">
				<div className="nav text-[16px] flex flex-col items-center justify-center px-10 gap-y-4">
					{navLinks.map((nav, index) => (
						<Link
							key={index}
							to={nav.to}
							className="py-2.5 px-8 w-full rounded hover:bg-gray-200 text-center"
							target={nav._blank ? '_blank' : undefined}
						>
							{nav.title}
						</Link>
					))}
					{isOpen() && (
						<>
							<Link
								to={'/login'}
								className="py-2.5 px-8 btn-ghost rounded-lg w-full text-center"
							>
								Sign In
							</Link>
							<Link
								to={'/signup'}
								className="btn btn-primary rounded-lg w-full"
							>
								Get Started
							</Link>
						</>
					)}
				</div>
			</div>

			<Outlet />

			{/* Footer */}
			<div className="py-[40px] md:py-[80px]"></div>
			<div className="relative w-full">
				<img
					src={Ellipse}
					className="absolute top-[-100%] z-[-1] left-[-20%] w-3/5"
					alt=""
				/>
				<div className="px-[25px] py-[40px] md:absolute w-[94%] m-auto md:w-8/12 md:p-[40px] bg-theme top-[-23%] flex flex-col md:flex-row justify-between items-stretch md:items-center left-[18%]">
					<p className="font-articulat text-2xl md:w-2/5 text-center">
						Discover the Doppler Effect Now!!!
					</p>
					<div className="pt-[64px] md:hidden"></div>

					<div className="md:w-2/5">
						{!isWaitlistOpen() ? (
							<Link className="btn w-full" to={'/signup'}>
								Try Doppler for Free
							</Link>
						) : (
							<div className="m-auto text-black outline outline-1">
								{/* <form
									className="flex"
									onSubmit={(e) => {
										e.preventDefault();
										joinWaitlist(email);
									}}
								>
									<TextInput
										type="email"
										required
										className="rounded-none border-0 focus:outline-none"
										placeholder="you@beautiful.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
									<button className="btn rounded-none min-w-[100px] border-0">
										{isLoading ? (
											<Loader className="text-white" theme={false} />
										) : (
											'Join Waitlist'
										)}
									</button>
								</form> */}
								<WaitlistForm />
							</div>
						)}
					</div>
				</div>

				<div className="border-b w-full border-black"></div>

				<div className="py-[32px] md:p-[120px] w-full font-articulat-light relative overflow-hidden">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<img src={blackLogo} className="py-[32px] md:py-0 w-[130px]" />
						<div className="gap-y-[30px] md:gap-y-0 flex flex-col md:flex-row items-center w-2/3 justify-end pb-[64px] md:pb-0">
							<img
								src={Ellipse}
								alt=""
								className="md:hidden scale-[3] -rotate-45 absolute top-[0] -z-[1]"
							/>
							{navLinks.map((link) => (
								<Link
									key={link.to}
									to={link.to}
									className="py-2 px-5 md:px-0 md:pl-5 rounded hover:underline hover:bg-[#cccccc3d] md:hover:bg-transparent"
									target={link._blank ? '_blank' : undefined}
								>
									{link.title}
								</Link>
							))}
						</div>
					</div>

					<div className="px-3 pb-[32px] md:p-0 gap-x-[24px] flex items-center justify-center md:justify-end w-full">
						<a
							href={'https://linkedin.com/u/peter-adeojo'}
							target="_blank"
							className="w-[35px]"
						>
							<img src={Linkedin} className="w-full" />
						</a>
						<a
							href={'https://twitter.com/usedopple'}
							target="_blank"
							className="w-[35px]"
						>
							<img src={Twitter} className="w-full" />
						</a>
						<a
							href={'https://github.com/lampguard/'}
							target="_blank"
							className="w-[35px]"
						>
							<img src={Github} className="w-full hidden md:block" />
							<FaGithub className="w-full h-full md:hidden" />
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default GuestLayout;
