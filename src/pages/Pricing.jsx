import {
	globalTitle,
	pricings,
	pricingMoreFeatures,
	pricingTopFeatures,
} from '../config';
import { Pricing as Pricings } from '../components/Pricing';
import { useEffect } from 'react';
import Faq from '../components/Faq';
import { FaCheckCircle } from 'react-icons/fa';
import { FaCircleXmark } from 'react-icons/fa6';
import { BgEllipse } from '../App';

const Pricing = () => {
	useEffect(() => {
		document.title = 'Pricing';

		return () => {
			document.title = globalTitle;
		};
	}, []);

	return (
		<>
			<div className="relative">
				<BgEllipse className={'-top-40 rotate-12 -left-80'} />
				<div className="py-10"></div>
				<Pricings />
			</div>
			<div className="py-4"></div>

			<div className="md:px-20">
				<p className="font-bold text-3xl pt-40 pb-20 text-center">
					Make an Informed Decision
				</p>
				<div className="grid grid-cols-5">
					{[{ name: '' }, ...pricings].map((p) => (
						<p className="px-4 font-bold py-4">{p.name}</p>
					))}

					<p className="font-bold px-4 col-span-5">Top Features</p>
					<div className="py-1 col-span-5"></div>

					<div className="p-2 border border-black row-span-3">
						{pricingTopFeatures.map((feature) => (
							<p className="py-2">{feature.label}</p>
						))}
					</div>

					{pricings.map((p, index) => {
						return (
							<div
								key={`pricing-${index}`}
								className={`p-2 border border-l-0 border-black row-span-3`}
							>
								{pricingTopFeatures.map((feature) => {
									const content = p.features[feature.key];
									return <p className="py-2">{content}</p>;
								})}
							</div>
						);
					})}
				</div>

				<div className="py-5"></div>

				<div className="grid grid-cols-5 border-collapse">
					<p className="font-bold px-4 col-span-5">Product Capabilities</p>
					<div className="py-1 col-span-5"></div>

					<div className="p-2 border border-black">
						{pricingMoreFeatures.map((feature) => (
							<p className="py-2">{feature.label}</p>
						))}
					</div>

					{pricings.map((p, index) => {
						return (
							<div
								key={`pricing-${index}`}
								className={`p-2 border border-l-0 border-black row-span-3`}
							>
								{pricingMoreFeatures.map((feature) => {
									const content = p.features[feature.key];
									if (typeof content == 'boolean') {
										return (
											<p className="py-2">
												{content ? (
													<FaCheckCircle className="inline-block" />
												) : (
													<FaCircleXmark className="inline-block" />
												)}
											</p>
										);
									}
									return <p className="py-2">{content}</p>;
								})}
							</div>
						);
					})}
				</div>
			</div>

			<div className="py-8"></div>

			<div className="">
				<p className="text-center text-3xl font-articulat-bold">
					Some of your Questions, Answered
				</p>
				<div className="py-3"></div>
				<Faq />
			</div>
		</>
	);
};

export default Pricing;
