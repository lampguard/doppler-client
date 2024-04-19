import { Link } from 'react-router-dom';

import logo from '../assets/logo.svg';
import whiteLogo from '../assets/logo-white.png';
import Ellipse from '../assets/Ellipse 8.svg';
import Panes from '../assets/multi-pane.png';
import Desktop from '../assets/Desktop.png';

/**
 * @type {React.FC} Landing
 */
const Landing = () => {
	return (
		<>
			<div className="hidden md:p-[100px] pb-[40px] md:flex justify-between items-center w-full">
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
					className="absolute top-[-20%] w-full z-[-10] hidden"
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
				<p className="text-3xl md:text-4xl font-bold">
					An Easier way to Manage your Apps
				</p>
				<div className="py-7"></div>
				<p>With Doppler you can easily manage multiple apps in one place</p>
				<div className="py-4 md:py-7"></div>
				<Link to={'/signup'} className="btn btn-primary md:w-1/4">
					Try Doppler for Free
				</Link>
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
						<p className="text-2xl">Error Tracking</p>
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
						<p className="text-2xl">Manage Your Apps & Teams</p>
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
						<p className="text-2xl">Distribute Tasks Efficiently</p>
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

			{/* Footer */}
			<div className="py-[80px] md:py-[200px]"></div>
			<div className="relative text-white w-full">
				<img
					src={Ellipse}
					className="absolute top-[-100%] z-[-1] left-[-20%] w-3/5"
					alt=""
				/>
				<div className="p-[20px] md:absolute w-full md:w-8/12 md:p-[40px] bg-[#4D75FF] top-[-23%] md:flex justify-between items-center left-[18%]">
					<p className="font-articulat text-2xl md:w-2/5">
						Discover the Doppler Effect Now!!!
					</p>
					<div className="py-2 md:hidden"></div>

					<div className="md:w-1/3">
						<button className="btn btn-white w-full">
							Try Doppler for Free
						</button>
					</div>
				</div>

				<div className="md:p-[120px] flex justify-between items-center w-full bg-theme font-articulat-light">
					<img src={whiteLogo} className="hidden md:block w-[130px]" />

					<div className="hidden md:flex items-center w-2/3 justify-between">
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
