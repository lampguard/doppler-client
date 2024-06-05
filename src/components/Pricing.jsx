import { Link } from "react-router-dom";
import { pricings } from "../config";
import { FaCheckCircle } from "react-icons/fa";

export const PricePane = ({
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

export const Pricing = () => {
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