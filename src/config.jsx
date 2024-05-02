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
