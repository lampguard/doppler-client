import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../config';

const NavList = () => {
  const location = useLocation();

	return (
		<>
			<ul>
				{navLinks.map((link) => (
					<li className="pb-3" key={link.slug}>
						<Link
							to={link.slug}
							target={link.blankTarget ? '_blank' : undefined}
							className={
								'py-3 px-4 rounded-full w-full text-sm flex items-center ' +
								(location.pathname == link.slug ? 'bg-theme text-white ' : null)
							}
						>
							{location.pathname == link.slug
								? link.activeIcon || link.icon
								: link.icon}
							<div className="px-2"></div>
							<span>{link.title}</span>
						</Link>
					</li>
				))}
			</ul>
		</>
	);
};

export default NavList;