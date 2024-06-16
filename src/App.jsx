import { Link } from 'react-router-dom';

import hilogo from './assets/biglogo.png';
import Ellipse from './assets/Ellipse 8.svg';
import Panes from './assets/multi-pane.png';
import Desktop from './assets/Desktop.png';
import DesktopTasks from './assets/Tasks.png';
import Faq from './components/Faq';

import TextInput from './components/Input/TextInput';
import Loader from './components/Loaders';

import { notification } from 'antd';

import { useGetConfigQuery, useJoinWaitlistMutation } from './services';
import { useState } from 'react';
import { Pricing } from './components/Pricing';
import { isOpen, isWaitlistOpen } from './context/ConfigHook';
import WaitlistForm from './components/WaitlistForm';

export const BgEllipse = ({ className }) => {
	return (
		<img
			src={Ellipse}
			alt=""
			className={'absolute w-full z-[-10] ' + className}
		/>
	);
};

/**
 * @type {React.FC} Landing
 */
const Landing = () => {
	const [email, setEmail] = useState('');
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
				{!isWaitlistOpen() ? (
					<Link to={'/signup'} className="btn btn-primary md:w-1/4">
						Try Doppler for Free
					</Link>
				) : (
					<>
						<div className="w-[90%] md:w-1/4 outline outline-1 m-auto rounded-full overflow-clip">
							<WaitlistForm btnClass="btn rounded-none bg-theme border-0 min-w-[100px]" />
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
						{isWaitlistOpen() ? (
							<>
								<div className="w-full md:w-2/3 outline outline-1 rounded-full overflow-clip">
									<WaitlistForm btnClass="btn rounded-none bg-theme border-0 min-w-[100px]" />
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
				<div className="py-4"></div>
				<div className="text-center w-10/12 md:w-3/12 m-auto">
					<Link to="/pricing" className="btn btn-primary w-full rounded-md">
						Compare All Plans
					</Link>
				</div>
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
		</>
	);
};

export default Landing;
