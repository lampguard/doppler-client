import { mobileNavLinks as navLinks } from '../config';
import { Link, useLocation } from 'react-router-dom';

const FooterMenu = () => {
	const location = useLocation();

	return (
		<>
			{navLinks.map((link) => (
				<span key={link.slug} className="py-4 relative">
					<Link
						to={link.slug}
						className={
							'flex flex-col align-center items-center text-xs ' +
							(link.slug == location.pathname && 'text-theme')
						}
					>
						{link.slug == location.pathname && (
							<div className="absolute p-0.5 top-0 left-0 w-full rounded-b bg-theme animate-unroll" />
						)}
						{link.slug == location.pathname ? link.activeIcon : link.icon}
						<span>{link.title}</span>
					</Link>
				</span>
			))}
		</>
	);
};

export default FooterMenu;
