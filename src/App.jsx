import { Link } from 'react-router-dom';

import logo from './assets/logo.svg';
import hilogo from './assets/biglogo.png';
import blackLogo from './assets/black-logo.svg';
import Ellipse from './assets/Ellipse 8.svg';
import Panes from './assets/multi-pane.png';
import Desktop from './assets/Desktop.png';
import DesktopTasks from './assets/Tasks.png';
import Faq from './components/Faq';
import Twitter from './assets/twitter-logo.svg';
import Github from './assets/github-icon-logo.svg';
import Linkedin from './assets/linkedin-logo.svg';
import { FaCheck, FaGithub } from 'react-icons/fa6';

import TextInput from './components/Input/TextInput';
import Loader from './components/Loaders';

import { notification } from 'antd';

import { useJoinWaitlistMutation } from './services';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

const pricings = [
	{
		amount: (
			<p>
				<span className="font-articulat-bold text-3xl">$0</span>
				<span className="font-articulat-lighter text-xl text-[#212121B2]">
					/month
				</span>
			</p>
		),
		name: 'Free',
		description: 'Explore the product and power small or personal projects',
		points: ['1 Team', 'Monitor 3 Apps'],
		recommended: false,
		link: '/',
	},
	{
		amount: (
			<p>
				<span className="font-articulat-bold text-3xl">$3</span>
				<span className="font-articulat-lighter text-xl text-[#212121B2]">
					/month
				</span>
			</p>
		),
		name: 'Basic',
		description: 'Suitable for smaller teams',
		points: ['3 Teams', 'Unlimited Team Members', 'Unlimited Apps'],
		recommended: false,
		link: '/',
	},
	{
		amount: (
			<p>
				<span className="font-articulat-bold text-3xl">$5</span>
				<span className="font-articulat-lighter text-xl text-[#212121B2]">
					/month
				</span>
			</p>
		),
		name: 'Pro-Doppler',
		description:
			'Suitable for large teams with substantial number of services or applications',
		points: [
			'Unlimited Teams',
			'Unlimited Team Member',
			'Unlimited Apps',
			'AI Reporter',
			'Jira Integration',
		],
		recommended: true,
		link: '/',
	},
	{
		amount: <p className="font-articulat-bold text-3xl">Custom</p>,
		name: <>&nbsp;</>,
		description:
			'Suitable for organizations with custom needs. Schedule a session with us.',
		points: [],
		custom: true,
		link: '/',
	},
];

const BgEllipse = ({ className }) => {
	return (
		<img
			src={Ellipse}
			alt=""
			className={'absolute w-full z-[-10] ' + className}
		/>
	);
};

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

const PricePane = ({
	amount,
	name,
	description,
	points,
	recommended,
	custom,
}) => (
	<div className="bg-white py-6 px-3 border rounded-md md:min-h-[500px] flex flex-col justify-between">
		<div>
			{amount}
			<div className="py-1"></div>
			<p className="font-bold text-xl">{name}</p>
			<div className="py-1"></div>
			<p className="text-sm text-[#212121B2] min-h-12">{description}</p>
			<div className="py-2"></div>
			<hr className="h-[.1em] bg-[#21212180] border-0" />
			<div className="py-2"></div>
			<ul className="list">
				{points?.map((point, index) => (
					<li className="flex items-center gap-x-4 py-1" key={index}>
						<FaCheckCircle />
						{point}
					</li>
				))}
			</ul>
		</div>
		<div className="py-4"></div>
		{__ENV__.WAITLISTING == 'off' &&
			(!custom ? (
				<Link
					className={
						'btn rounded-full w-full ' +
						(recommended ? 'btn-primary' : 'hover:btn-primary')
					}
				>
					Get Started
				</Link>
			) : (
				<button className="btn rounded-full bg-black text-white">
					Contact Us
				</button>
			))}
	</div>
);

const Pricing = () => {
	return (
		<div className="text-center" id="pricing">
			<p className="text-3xl font-bold">Pricing</p>
			<div className="py-6"></div>
			<p className="md:w-1/2 m-auto">
				Use Doppler for free and feel free to upgrade to enable more freedom and
				all our other exciting features
			</p>
			<div className="py-4"></div>

			<div className="px-10 md:px-40 grid md:grid-cols-4 grid-rows-1 gap-x-8 gap-y-4 text-left">
				{pricings.map((pricing, index) => (
					<PricePane {...pricing} key={index} />
				))}
			</div>
		</div>
	);
};

/**
 * @type {React.FC} Landing
 */
const Landing = () => {
	const [email, setEmail] = useState('');
	const [navOpen, setNavOpen] = useState(false);
	const [waitlist, { isLoading }] = useJoinWaitlistMutation();

	const joinWaitlist = (input) => {
		waitlist({ email: input || email })
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
					{__ENV__.WAITLISTING == 'off' && (
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
					<img src={Desktop} className="w-3/4 md:w-3/5 z-[1]" />
				</div>
			</section>

			<section className="w-full px-[30px] md:px-[50px]">
				<div className="py-[10px] md:hidden"></div>
				<p className="text-center text-2xl md:text-4xl">
					But first, What is DOPPLER?
				</p>
				<div className="pb-[30px] md:pb-[80px]"></div>
				<div className="md:flex justify-center gap-10 items-center relative max-w-full overflow-x-clip">
					<div className="w-full md:w-2/5 grid place-items-center relative py-10 md:py-0">
						<BgEllipse className={'scale-y-[4] scale-x-[1.3] blur-[40px]'} />
						<img src={hilogo} className="w-3/5" />
					</div>
					<div className="w-full md:w-3/5 flex flex-col p-2 justify-between items-start gap-y-10">
						<p className="w-full text-center md:text-left md:max-w-[80%] font-articulat-light leading-loose md:leading-snug">
							Doppler is an app tracking platform provides comprehensive
							insights into app behavior, allowing developers and organizations
							to identify errors, prevent fatalities, and ensure user safety. We
							believe in the power of data-driven insights to revolutionize app
							development and create a more reliable digital experience for
							everyone. We believe that by working together, we can prevent
							app-related accidents and fatalities. Join us in building a future
							where apps are a source of trust and innovation.
						</p>
						{__ENV__.WAITLISTING != 'off' ? (
							<>
								<div className="w-full md:w-2/3 outline outline-1 rounded-full overflow-clip">
									<form
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
						) : (
							<Link
								to={'/signup'}
								className="py-3 w-full md:w-1/2 px-4 rounded-lg btn-primary text-sm text-center"
							>
								Try Doppler for Free
							</Link>
						)}
					</div>
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
						<p className="text-2xl font-bold text-center md:text-left font-articulat-light">
							Error Tracking
						</p>
						<div className="py-1.5 md:py-3"></div>
						<p className="text-gray-700 leading-relaxed font-articulat-light text-center md:text-left">
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
						<p className="text-2xl text-center md:text-left font-bold">
							Manage Your Apps & Teams
						</p>
						<div className="py-3"></div>
						<p className="text-gray-700 leading-relaxed font-articulat-light text-center md:text-left">
							Our platform brings all your apps under one roof. Easily manage
							access, track app performance, and receive real-time alerts. This
							centralized system fosters collaboration, empowers your team to
							identify and address issues quickly, and ultimately ensures the
							smooth operation of your apps.
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
						<p className="text-2xl text-center md:text-left font-bold">
							Distribute Tasks Efficiently
						</p>
						<div className="py-3"></div>
						<p className="text-gray-700 leading-relaxed font-articulat-light text-center md:text-left">
							Don't waste time assigning tasks manually. Our platform leverages
							smart algorithms to distribute error and fatality tracking tasks
							based on team member expertise and workload. This ensures a
							balanced workload, reduces bottlenecks, and empowers your team to
							focus on what matters most - preventing future incidents and
							ensuring app safety.
						</p>
					</div>
					<div className="py-3 md:hidden"></div>
					<img
						src={DesktopTasks}
						className="w-full md:block md:w-1/2 rounded-lg border-[.25em] md:border-4 border-black"
					/>
				</div>
			</section>

			<div className="py-8 relative">
				<BgEllipse className={' translate-y-40 translate-x-[-45em]'} />
				<Pricing />
			</div>

			<section className="relative">
				<p className="text-xl md:text-3xl font-bold p-[80px_0_60px]  md:p-[40px_0] text-center w-full">
					Some of your Questions, Answered!
				</p>
				<div className="w-full md:py-[40px]">
					<Faq />
				</div>
				<div className="w-full text-center py-[80px] px-4 relative overflow-x-clip">
					<BgEllipse className={'scale-[4] md:scale-[1] md:-top-[10em]'} />
					<p className="text-2xl">Newsletter</p>
					<div className="pt-[80px]"></div>
					<p className="px-1.5 text-gray-600">
						Get all the latest updates about Doppler by subscribing to our
						Newsletters
					</p>

					<form
						className="w-full pt-10 relative"
						onSubmit={(e) => {
							e.preventDefault();
							const email = e.target.email;
							joinWaitlist(email.value);
						}}
					>
						<div className="pt-0 md:pt-[4rem]"></div>
						<div className="relative md:w-[50%] m-auto px-4 py-1">
							<input
								type="text"
								className="p-[.5em_0] border-b border-[#33333388] focus:outline-none bg-transparent md:absolute bottom-0 w-full left-0"
								placeholder="E-mail address"
								// value={email}
								name="email"
								required
								// onChange={(e) => setEmail(e.target.value)}
							/>
							<div className="py-2 md:hidden"></div>
							<button
								className="btn-primary py-1.5 rounded-md w-2/3 md:absolute right-0 bottom-2 md:w-[30%] disabled:bg-gray-500"
								disabled={isLoading}
							>
								Subscribe
							</button>
						</div>
					</form>
				</div>
			</section>

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
						{__ENV__.WAITLISTING == 'off' ? (
							<Link className="btn w-full">Try Doppler for Free</Link>
						) : (
							<div className="m-auto text-black outline outline-1">
								<form
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
								</form>
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

export default Landing;
