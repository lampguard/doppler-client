import { globalTitle, pricings, pricingMoreFeatures, pricingTopFeatures } from '../config';
import { Pricing as Pricings } from '../components/Pricing';
import { useEffect } from 'react';
import Faq from '../components/Faq';

const Pricing = () => {
	useEffect(() => {
		document.title = 'Pricing';

		return () => {
			document.title = globalTitle;
		};
	}, []);

	return (
		<>
			<Pricings />

			<div className="text-center">
				<p className="text-3xl font-articulat-bold">
					Some of your Questions, Answered
				</p>
				<div className="py-3"></div>
				<Faq />
			</div>
		</>
	);
};

export default Pricing;
