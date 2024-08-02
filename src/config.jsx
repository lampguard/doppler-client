export const globalTitle = 'Doppler (Beta Preview)';

import { addDays, format, subDays } from 'date-fns';
import { AiFillHome, AiOutlineHome, AiOutlineLineChart } from 'react-icons/ai';
import { BsBell, BsBellFill, BsFillPersonFill, BsGrid3X3, BsGrid3X3GapFill, BsPerson } from 'react-icons/bs';
import { GrGrid } from 'react-icons/gr';
import { MdMap } from 'react-icons/md';

export const navLinks = [
	{
		title: 'Dashboard',
		slug: '/dashboard',
		icon: <AiOutlineHome className="text-xl inline" />,
		activeIcon: <AiFillHome className="text-xl inline" />,
	},
	{
		title: 'Apps',
		slug: '/apps',
		icon: <GrGrid className="text-xl inline" />,
		activeIcon: <GrGrid className="text-xl inline" />,
	},
	{
		title: 'Tasks',
		slug: '/tasks',
		icon: <AiOutlineLineChart className="text-xl inline" />,
		activeIcon: <AiOutlineLineChart className="text-xl inline" />,
	},
	{
		title: 'Board',
		slug: '/board',
		icon: <MdMap className="text-xl inline" />,
	},
];
export const mobileNavLinks = [
	{
		title: 'Home',
		slug: '/dashboard',
		icon: <AiOutlineHome className="text-xl inline" />,
		activeIcon: <AiFillHome className="text-xl inline" />,
	},
	{
		title: 'Apps',
		slug: '/apps',
		icon: <BsGrid3X3 className="text-xl inline" />,
		activeIcon: <BsGrid3X3GapFill className="text-xl inline" />,
	},
	{
		title: 'Tasks',
		slug: '/tasks',
		icon: <AiOutlineLineChart className="text-xl inline" />,
		activeIcon: <AiOutlineLineChart className="text-xl inline" />,
	},
	{
		title: 'Notifications',
		slug: '/notifications',
		icon: <BsBell className="text-xl inline" />,
		activeIcon: <BsBellFill className="text-xl inline" />,
	},
	{
		title: 'Profile',
		slug: '/account/profile',
		icon: <BsPerson className="text-xl inline" />,
		activeIcon: <BsFillPersonFill className="text-xl inline" />,
	},
];

export const pricings = [
	{
		amount: (
			<p>
				<span className="font-articulat-bold text-3xl">$0</span>
				<br />
				<span className="font-articulat-lighter text-xl text-[#212121B2]">/month</span>
			</p>
		),
		name: 'Free',
		description: 'Explore the product and power small or personal projects',
		points: ['Monitor up to 3 Apps'],
		recommended: false,
		link: '/',
		features: {
			teams: 0,
			apps: '1-3 apps',
			team_members: 0,
			retention: '1 day',
			download: false,
			integration: false,
			tasks: false,
			ai: false,
			server: 'Coming Soon',
			database: 'Coming Soon',
			endpoints: 'Coming Soon',
		},
	},
	{
		amount: (
			<p>
				<span className="font-articulat-bold text-3xl">$4</span>
				<br />
				<span className="font-articulat-lighter text-xl text-[#212121B2]">/month</span>
			</p>
		),
		name: 'Basic-Doppler',
		description: 'Suitable for smaller teams',
		points: ['3 Teams', '4 Team Members', '10 Apps'],
		recommended: false,
		link: '/',
		features: {
			teams: 1,
			apps: 'Unlimited',
			team_members: 'Unlimited',
			retention: '7 days',
			download: true,
			integration: false,
			tasks: true,
			ai: false,
			server: 'Coming Soon',
			database: 'Coming Soon',
			endpoints: 'Coming Soon',
		},
	},
	{
		amount: (
			<p>
				<span className="font-articulat-bold text-3xl">$10</span>
				<br />
				<span className="font-articulat-lighter text-xl text-[#212121B2]">/month/member</span>
			</p>
		),
		name: 'Pro-Doppler',
		description: 'Suitable for large teams with substantial number of projects',
		points: ['Unlimited Teams', 'Unlimited Team Member', 'Unlimited Apps', 'AI Reporter', 'Jira Integration'],
		recommended: true,
		link: '/',
		features: {
			teams: 'Unlimited',
			apps: 'Unlimited',
			team_members: 'Unlimited',
			retention: '30 days',
			download: true,
			integration: true,
			tasks: true,
			ai: true,
			server: 'Coming Soon',
			database: 'Coming Soon',
			endpoints: 'Coming Soon',
		},
	},
	{
		amount: (
			<>
				<p className="font-articulat-bold text-3xl">Custom</p>
				<br />
			</>
		),
		name: 'Custom Doppler',
		description: 'Suitable for organizations with custom needs. Schedule a session with us.',
		points: [],
		custom: true,
		link: '/',
		features: {
			teams: '',
			apps: '',
			team_members: '',
			retention: '',
			download: '',
			integration: '',
			tasks: '',
			ai: '',
			server: '',
			database: '',
			endpoints: '',
		},
	},
];

/**
 * @type {Record<string, string|number|boolean>} keys
 */
const keys = {
	teams: 0,
	apps: 0,
	team_members: 0,
	retention: 0,
	download: false,
	integration: false,
	tasks: false,
	ai: false,
	server: 'Coming Soon',
	database: 'Coming Soon',
	endpoints: 'Coming Soon',
};

export const pricingTopFeatures = [
	{ label: 'Number of teams', key: 'teams' },
	{ label: 'Number of Apps', key: 'apps' },
	{ label: 'No. of Team members', key: 'team_members' },
];
export const pricingMoreFeatures = [
	{ label: 'Data Retention', key: 'retention' },
	{ label: 'Data Download', key: 'download' },
	{ label: 'Integrations', key: 'integration' },
	{ label: 'Task Assignment', key: 'tasks' },
	{ label: 'AI Support', key: 'ai' },
	// { label: 'Server Storage Monitoring', key: 'server' },
	// { label: 'Database Monitoring', key: 'database' },
	// { label: 'Endpoint Analysis', key: 'endpoints' },
];

export const defaultDashboardParams = {
	from: format(subDays(new Date(), 4), 'yyyy-MM-dd'),
	to: format(addDays(new Date(), 1), 'yyyy-MM-dd HH:mm:00'),
	range: 'hour',
	interval: 12,
	team: undefined,
};
