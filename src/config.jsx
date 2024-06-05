export const globalTitle = 'Doppler (Beta Preview)';

import { AiFillHome, AiOutlineHome, AiOutlineLineChart } from 'react-icons/ai';
import {
	BsBell,
	BsBellFill,
	BsFillPersonFill,
	BsGrid3X3,
	BsGrid3X3GapFill,
	BsPerson,
} from 'react-icons/bs';
import { GrGrid } from 'react-icons/gr';

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
				<span className="font-articulat-lighter text-xl text-[#212121B2]">
					/month
				</span>
			</p>
		),
		name: 'Free',
		description: 'Explore the product and power small or personal projects',
		points: ['1 Team', 'Monitor 3 Apps'],
		recommended: false,
		link: '/',
		features: {
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
		},
	},
	{
		amount: (
			<p>
				<span className="font-articulat-bold text-3xl">$3</span>
				<span className="font-articulat-lighter text-xl text-[#212121B2]">
					/month
				</span>
			</p>
		),
		name: 'Basic',
		description: 'Suitable for smaller teams',
		points: ['3 Teams', 'Unlimited Team Members', 'Unlimited Apps'],
		recommended: false,
		link: '/',
		features: {
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
		},
	},
	{
		amount: (
			<p>
				<span className="font-articulat-bold text-3xl">$5</span>
				<span className="font-articulat-lighter text-xl text-[#212121B2]">
					/month
				</span>
			</p>
		),
		name: 'Pro-Doppler',
		description:
			'Suitable for large teams with substantial number of services or applications',
		points: [
			'Unlimited Teams',
			'Unlimited Team Member',
			'Unlimited Apps',
			'AI Reporter',
			'Jira Integration',
		],
		recommended: true,
		link: '/',
		features: {
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
		},
	},
	{
		amount: <p className="font-articulat-bold text-3xl">Custom</p>,
		name: <>&nbsp;</>,
		description:
			'Suitable for organizations with custom needs. Schedule a session with us.',
		points: [],
		custom: true,
		link: '/',
		features: {
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
	{ label: 'Server Storage Monitoring', key: 'server' },
	{ label: 'Database Monitoring', key: 'database' },
	{ label: 'Endpoint Analysis', key: 'endpoints' },
];
