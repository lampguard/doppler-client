import Pane57 from '../assets/Frame 57.png';
import Pane58 from '../assets/Frame 58.png';
import Pane59 from '../assets/Frame 59.png';

/**
 * @type {React.FC<{flipped: boolean}>}
 */
const HeroPanes = ({ flipped }) => {
	return (
		<div>
			<img
				src={Pane57}
				className="absolute right-0 top-0 opacity-[.5] z-[1] "
				style={flipped && { transform: 'rotateY(180deg)' }}
			/>
			<img
				src={Pane58}
				className="absolute right-0 top-[76px] opacity-[.5] z-[2]"
				style={flipped && { transform: 'rotateY(180deg)' }}
			/>
			<img
				src={Pane59}
				className="absolute right-0 top-[195px] opacity-[.5] z-10"
				style={flipped && { transform: 'rotateY(180deg)' }}
			/>
		</div>
	);
};

export default HeroPanes;
