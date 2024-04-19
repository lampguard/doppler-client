import { Link } from 'react-router-dom';

import logo from '../assets/logo.svg';
import whiteLogo from '../assets/logo-white.png';
import Ellipse from '../assets/Ellipse 8.svg';
import DeepEllipse from '../assets/deep-ellipse.png';
import Panes from '../assets/multi-pane.png';
import Desktop from '../assets/Desktop.png';

import HeroPanes from '../components/HeroPanes';

/**
 * @type {React.FC} Landing
 */
const Landing = () => {
	return (
		<>
			<div className="md:p-[100px] pb-[40px] flex justify-between items-center w-full">
				<img src={logo} className="w-[130px]" />

				<div className="flex items-center">
					<div className="nav text-[16px]">
						<Link to={'/'} className="py-2 px-5 rounded hover:bg-gray-200">
							Home
						</Link>
						<Link
							to={'#features'}
							className="py-2 px-5 rounded hover:bg-gray-200"
						>
							Features
						</Link>
						<Link
							to={'#pricing'}
							className="py-2 px-5 rounded hover:bg-gray-200"
						>
							Pricing
						</Link>
						<Link
							to={'#contact'}
							className="py-2 px-5 rounded hover:bg-gray-200"
						>
							Contact Us
						</Link>
					</div>
					<div className="px-[20px]"></div>
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
				</div>
			</div>

			<section id="hero" className="w-full py-[50px] text-center relative">
				<img
					src={Ellipse}
					alt=""
					className="absolute top-[-20%] w-full z-[-10]"
				/>
				<img
					src={Panes}
					className="top-0 left-0 absolute"
					style={{ transform: 'rotateY(180deg)' }}
				/>
				<img src={Panes} className="top-0 right-0 absolute" />
				<p className="text-4xl font-bold">An Easier way to Manage your Apps</p>
				<div className="py-7"></div>
				<p>With Doppler you can easily manage multiple apps in one place</p>
				<div className="py-7"></div>
				<Link to={'/signup'} className="btn btn-primary w-1/4">
					Try Doppler for Free
				</Link>
				<div className="p-0 pt-[80px]"></div>
				<div className="w-full flex justify-center">
					<img src={Desktop} className="w-3/5" />
				</div>
			</section>

			<section className="w-full relative pt-[140px]">
				<p className="text-3xl text-center">
					Designed to make your life Easier
				</p>
				<div className="flex gap-3 w-full p-[100px] justify-between items-center relative">
					<img src={Ellipse} className="absolute w-3/4 left-[0] top-[-15%]" />
					<div className="w-2/5">
						<p className="text-2xl">Error Tracking</p>
						<div className="py-3"></div>
						<p>
							Gain real-time insights into app errors and potential safety
							risks. Our comprehensive tracking system empowers you to identify
							issues, prevent accidents, and ensure the well-being of your
							users.
						</p>
					</div>
					<img src={Desktop} className="w-1/2" />
				</div>
			</section>

			<section className="w-full relative">
				<div className="flex gap-3 w-full p-[100px] justify-between items-center relative">
					<img src={Desktop} className="w-1/2" />
					<div className="w-2/5">
						<p className="text-2xl">Error Tracking</p>
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
			<section className="w-full relative pt-[140px]">
				<p className="text-3xl text-center">
					Designed to make your life Easier
				</p>
				<div className="flex gap-3 w-full p-[100px] justify-between items-center relative">
					<img src={Ellipse} className="absolute w-3/4 left-[0] top-[-15%]" />
					<div className="w-2/5">
						<p className="text-2xl">Error Tracking</p>
						<div className="py-3"></div>
						<p>
							Gain real-time insights into app errors and potential safety
							risks. Our comprehensive tracking system empowers you to identify
							issues, prevent accidents, and ensure the well-being of your
							users.
						</p>
					</div>
					<img src={Desktop} className="w-1/2" />
				</div>
			</section>

			{/* Footer */}
			<div className="py-[200px]"></div>
			<div className="relative text-white w-full">
				<img
					src={Ellipse}
					className="absolute top-[-100%] z-[-1] left-[-20%] w-3/5"
					alt=""
				/>
				<div className="md:absolute w-full md:w-8/12 md:p-[40px] bg-[#4D75FF] top-[-23%] flex justify-between items-center left-[18%]">
					<p className="font-articulat text-2xl w-2/5">
						Discover the Doppler Effect Now!!!
					</p>
					<button className="btn btn-white w-1/3">Try Doppler for Free</button>
				</div>

				<div className="md:p-[120px] flex justify-between items-center w-full bg-theme font-articulat-light">
					<img src={whiteLogo} className="w-[130px]" />

					<div className="flex items-center w-2/3 justify-between">
						<Link
							to={'/'}
							className="py-2 px-5 rounded hover:underline hover:bg-[#cccccc3d]"
						>
							Home
						</Link>
						<Link
							to={'#about-us'}
							className="py-2 px-5 rounded hover:underline hover:bg-[#cccccc3d]"
						>
							About Us
						</Link>
						<Link
							to={'#features'}
							className="py-2 px-5 rounded hover:underline hover:bg-[#cccccc3d]"
						>
							Features
						</Link>
						<Link
							to={'#pricing'}
							className="py-2 px-5 rounded hover:underline hover:bg-[#cccccc3d]"
						>
							Pricing
						</Link>
						<Link
							to={'#contact'}
							className="py-2 px-5 rounded hover:underline hover:bg-[#cccccc3d]"
						>
							Contact Us
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Landing;
