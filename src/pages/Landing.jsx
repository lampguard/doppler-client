import { Link } from 'react-router-dom';

import logo from '../assets/logo.svg';
import blackLogo from '../assets/black-logo.svg';
import Ellipse from '../assets/Ellipse 8.svg';
import Panes from '../assets/multi-pane.png';
import Desktop from '../assets/Desktop.png';
import Faq from '../components/Faq';
import Twitter from '../assets/twitter-logo.svg';
import Github from '../assets/github-icon-logo.svg';
import Linkedin from '../assets/linkedin-logo.svg';
import { FaBurger, FaGithub } from 'react-icons/fa6';

import TextInput from '../components/Input/TextInput';
import Loader from '../components/Loaders';

import { notification } from 'antd';

import { useJoinWaitlistMutation } from '../services';
import { useState } from 'react';

const navLinks = [
	{ title: 'Home', to: '/' },
	{ title: 'Features', to: '/#features' },
	{
		title: `Developer Guide`,
		to: 'https://doppler.gitbook.io/guide',
		_blank: true,
	},
];

/**
 * @type {React.FC} Landing
 */
const Landing = () => {
	const [email, setEmail] = useState('');
	const [waitlist, { isLoading }] = useJoinWaitlistMutation();

	const joinWaitlist = () => {
		waitlist({ email })
			.unwrap()
			.then((data) => {
				notification.info({
					message: data.message || 'Success!',
					duration: 3,
				});
			})
			.catch((err) => {
				notification.error({
					message: err.data?.message || 'An error occurred',
					duration: 3,
					className: 'bg-red-200 text-white',
				});
			});
	};

	return (
		<>
			{/* Top Nav & Header */}
			<div className="px-[2em] md:px-[4em] py-[1.7em] md:py-[2em] flex justify-between items-center w-full">
				<div className="w-[130px] md:w-[12.5%]">
					<img src={logo} className="w-full" />
				</div>

				<div className="hidden md:flex items-center">
					<div className="nav">
						{navLinks.map((link) => {
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
					{__ENV__.WAITLISTING == 'off' && (
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
						className="btn btn-outline btn-square btn-sm"
						onClick={() => {
							document.querySelector('#mobileNav').classList.toggle('hidden');
						}}
					>
						<FaBurger />
					</button>
				</div>
			</div>

			<div className="border-t hidden md:hidden" id="mobileNav">
				<div className="nav text-[16px] flex flex-col justify-center px-4">
					{navLinks.map((nav, index) => (
						<Link
							key={index}
							to={nav.to}
							className="py-2.5 px-8 w-full rounded hover:bg-gray-200"
							target={nav._blank ? '_blank' : undefined}
						>
							{nav.title}
						</Link>
					))}
					{__ENV__.WAITLISTING == 'off' && (
						<>
							<Link
								to={'/login'}
								className="py-2.5 px-8 btn-ghost rounded-lg w-full"
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

			{/* Hero */}
			<section id="hero" className="w-full py-[50px] text-center relative">
				<img
					src={Ellipse}
					alt=""
					className="absolute top-[-20%] w-full z-[-10]"
				/>
				<img
					src={Panes}
					className="top-0 left-0 absolute hidden md:block z-[-1]"
					style={{ transform: 'rotateY(180deg)' }}
				/>
				<img
					src={Panes}
					className="top-0 right-0 absolute hidden md:block z-[-1]"
				/>
				<p className="px-[20px] text-3xl md:text-4xl font-bold">
					An Easier way to Manage your Apps
				</p>
				<div className="py-7"></div>
				<p className="px-[20px] md:px-0">
					With Doppler you can easily manage multiple apps in one place
				</p>
				<div className="py-4 md:py-7"></div>
				{__ENV__.WAITLISTING == 'off' ? (
					<Link to={'/signup'} className="btn btn-primary md:w-1/4">
						Try Doppler for Free
					</Link>
				) : (
					<>
						<div className="w-[90%] md:w-1/4 outline outline-1 m-auto rounded-full overflow-clip">
							<form
								className="flex"
								onSubmit={(e) => {
									e.preventDefault();
									joinWaitlist({ email });
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
								<button className="btn btn-primary rounded-none min-w-[100px] border-0">
									{isLoading ? (
										<Loader className="text-white" theme={false} />
									) : (
										'Join Waitlist'
									)}
								</button>
							</form>
						</div>
					</>
				)}
				{/* <Link to={'/signup'} className="btn btn-primary md:w-1/4">
					Try Doppler for Free
				</Link> */}

				<div className="p-0 pt-[20px] md:pt-[80px]"></div>
				<div className="w-full flex justify-center">
					<img src={Desktop} className="w-3/4 md:w-3/5" />
				</div>
			</section>

			<section className="w-full relative pt-[80px] md:pt-[140px]">
				<p className="text-3xl text-center">
					Designed to make your life Easier
				</p>
				<div className="md:flex gap-3 w-full p-[24px] md:p-[100px] justify-between items-center relative">
					<img
						src={Ellipse}
						className="hidden md:block absolute w-3/4 left-[0] top-[-15%] z-[-1]"
					/>
					<div className="md:w-2/5">
						<p className="text-2xl font-bold">Error Tracking</p>
						<div className="py-1.5 md:py-3"></div>
						<p>
							Gain real-time insights into app errors and potential safety
							risks. Our comprehensive tracking system empowers you to identify
							issues, prevent accidents, and ensure the well-being of your
							users.
						</p>
					</div>
					<img src={Desktop} className="pt-[12px] md:pt-0 md:w-1/2" />
				</div>
			</section>

			<section className="w-full relative">
				<div className="md:flex gap-3 w-full px-[24px] md:px-[100px] py-[50px] justify-between items-center relative">
					<img src={Desktop} className="hidden md:block md:w-1/2" />
					<div className="md:w-2/5">
						<p className="text-2xl font-bold">Manage Your Apps & Teams</p>
						<div className="py-3"></div>
						<p>
							Gain real-time insights into app errors and potential safety
							risks. Our comprehensive tracking system empowers you to identify
							issues, prevent accidents, and ensure the well-being of your
							users.
						</p>
					</div>
				</div>
			</section>

			<section className="w-full relative">
				<div className="md:flex gap-3 w-full px-[24px] md:px-[100px] md:py-[50px] justify-between items-center relative">
					<img
						src={Ellipse}
						className="absolute w-3/4 right-[0] top-[-15%] z-[-1]"
					/>
					<div className="md:w-2/5">
						<p className="text-2xl font-bold">Distribute Tasks Efficiently</p>
						<div className="py-3"></div>
						<p>
							Gain real-time insights into app errors and potential safety
							risks. Our comprehensive tracking system empowers you to identify
							issues, prevent accidents, and ensure the well-being of your
							users.
						</p>
					</div>
					<img src={Desktop} className="hidden md:block w-1/2" />
				</div>
			</section>

			<section className="">
				<p className="text-xl md:text-3xl font-bold py-[40px] text-center w-full">
					Some of your Questions, Answered!
				</p>
				<div className="w-full md:py-[40px]">
					<Faq />
				</div>
			</section>

			{/* Footer */}
			<div className="py-[80px]"></div>
			<div className="relative w-full">
				<img
					src={Ellipse}
					className="absolute top-[-100%] z-[-1] left-[-20%] w-3/5"
					alt=""
				/>
				<div className="px-[25px] py-[40px] md:absolute w-full md:w-8/12 md:p-[40px] bg-theme top-[-23%] md:flex justify-between items-center left-[18%]">
					<p className="font-articulat text-2xl md:w-2/5">
						Discover the Doppler Effect Now!!!
					</p>
					<div className="py-2 md:hidden"></div>

					<div className="md:w-2/5">
						{__ENV__.WAITLISTING == 'off' ? (
							<Link className="btn btn-white w-full">Try Doppler for Free</Link>
						) : (
							<div className="m-auto text-black outline outline-1">
								<form
									className="flex"
									onSubmit={(e) => {
										e.preventDefault();
										joinWaitlist({ email });
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
								</form>
							</div>
						)}
					</div>
				</div>

				<div className="md:p-[120px] w-full bg-white font-articulat-light">
					<div className="flex justify-between items-center">
						<img src={blackLogo} className="hidden md:block w-[130px]" />
						<div className="hidden md:flex items-center w-2/3 justify-end">
							{navLinks.map((link) => (
								<Link
									key={link.to}
									to={link.to}
									className="py-2 pl-5 rounded hover:underline hover:bg-[#cccccc3d]"
									target={link._blank ? '_blank' : undefined}
								>
									{link.title}
								</Link>
							))}
						</div>
					</div>

					<div className="px-3 pb-3 md:p-0 gap-x-[24px] flex items-center justify-end w-full bg-theme md:bg-white">
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

export default Landing;
