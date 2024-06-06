import {
	globalTitle,
	pricings,
	pricingMoreFeatures,
	pricingTopFeatures,
} from '../config';
import { Pricing as Pricings } from '../components/Pricing';
import { useEffect, useState } from 'react';
import Faq from '../components/Faq';
import { FaCheckCircle } from 'react-icons/fa';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { BgEllipse } from '../App';

const Pricing = () => {
	const [visiblePlan, setVisiblePlan] = useState(0);

	useEffect(() => {
		document.title = 'Pricing';

		document
			.querySelectorAll('.pricing-top-feature')[0]
			?.classList.remove('hidden');

		return () => {
			document.title = globalTitle;
		};
	}, []);

	const switchPlan = () => {};

	return (
		<>
			<div className="relative">
				<BgEllipse className={'-top-40 rotate-12 -left-80'} />
				<div className="py-10"></div>
				<Pricings horizontal />
			</div>
			<div className="py-4"></div>

			<div className="px-10 md:px-20">
				<p className="font-bold text-3xl pt-40 pb-20 text-center">
					Make an Informed Decision
				</p>

				<div>
					<select
						className="md:hidden select select-bordered border-black rounded-full w-[150px] m-auto block"
						onChange={(e) => {
							setVisiblePlan(e.target.value);
						}}
					>
						{pricings.map((p, index) => (
							<option value={index} key={`option-${p.name}`}>
								{p.name}
							</option>
						))}
					</select>
					<div className="py-2"></div>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-5">
					{[{ name: '' }, ...pricings].map((p) => (
						<p className="px-4 font-bold hidden md:block">{p.name}</p>
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
								className={`p-2 border border-l-0 border-black row-span-3 pricing-top-feature ${
									index != visiblePlan && 'hidden md:block'
								}`}
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

				<div className="grid grid-cols-2 md:grid-cols-5 border-collapse">
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
								className={`p-2 border border-l-0 border-black row-span-3 pricing-more-feature ${
									index != visiblePlan && 'hidden md:block'
								}`}
							>
								{pricingMoreFeatures.map((feature) => {
									const content = p.features[feature.key];
									if (typeof content == 'boolean') {
										return (
											<p className="py-2">
												{content ? (
													<FaCheckCircle className="inline-block" />
												) : (
													<FaRegCircleXmark className="inline-block" />
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
