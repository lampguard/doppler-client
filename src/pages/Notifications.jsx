import { useContext, useEffect, useState } from 'react';
import PageContext, { usePageContext } from '../context/PageContext';
import { BsCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const Notification = ({ notification }) => (
	<div className="pb-4 flex items-center gap-4">
		<div className="max-w-[20px]">
			<BsCircleFill className="text-[12px] text-theme" />
		</div>
		<div className="min-w-[70%]">
			<p>{notification.message}</p>
			<div className="py-1"></div>
			<p className="text-sm text-gray-400 md:flex items-center gap-x-2">
				<span className='block sm:inline'>{notification.app}</span>
				<BsCircleFill className="hidden sm:inline text-[8px] text-gray-300" />
				<span className="hidden sm:inline">{notification.app}</span>
				<BsCircleFill className="hidden sm:inline text-[8px] text-gray-300" />
				<span className='block sm:inline'>{format(notification.createdat, 'P pp')}</span>
			</p>
		</div>
		{notification.meta?.href && (
			<div className="text-right w-full max-w-[30%]">
				<Link to={notification.meta.href} className="btn btn-sm ">
					View
				</Link>
			</div>
		)}
	</div>
);

const Notifications = () => {
	const pageContext = usePageContext();

	const userNotifications = [
		{
			message: "You've been added to a new team",
			app: 'Express Backend',
			meta: {
				href: '/apps/1',
			},
			type: 'team',
			createdat: new Date(),
		},
	];

	const [notifs, setNotifs] = useState(userNotifications);
	const [type, setType] = useState(undefined);

	useEffect(() => {
		pageContext.updateTitle('Notifications');
	}, []);

	const filterNotifications = (type) => {
		setNotifs(
			userNotifications.filter((n) => {
				if (type == undefined) return true;

				return type == n.type;
			})
		);
		setType(type);
	};

	return (
		<div className="px-[30px]">
			<div className="py-[30px]">
				<input
					type="search"
					className="w-full font-articulat-light border rounded-md py-1 bg-[#EAEAEA] px-3"
					placeholder="Search Notifications"
				/>
			</div>
			<div className="flex gap-x-5">
				<button
					className={
						'btn btn-sm ' +
						(type == undefined
							? 'text-black'
							: 'btn-ghost text-gray-500 hover:text-black')
					}
					onClick={() => filterNotifications(undefined)}
				>
					All
				</button>
				<button
					className={
						'btn btn-sm ' +
						(type == 'app'
							? 'text-black'
							: 'btn-ghost text-gray-500 hover:text-black')
					}
					onClick={() => filterNotifications('app')}
				>
					Apps
				</button>
				<button
					className={
						'btn btn-sm ' +
						(type == 'task'
							? 'text-black'
							: 'btn-ghost text-gray-500 hover:text-black')
					}
					onClick={() => filterNotifications('task')}
				>
					Tasks
				</button>
				<button
					className={
						'btn btn-sm ' +
						(type == 'team'
							? 'text-black'
							: 'btn-ghost text-gray-500 hover:text-black')
					}
					onClick={() => filterNotifications('team')}
				>
					Teams
				</button>
			</div>
			<div className="pb-[36px]"></div>
			{notifs.length > 0 ? (
				notifs.map((n) => <Notification notification={n} />)
			) : (
				<div className="px-4 text-gray-500">No new notifications for you.</div>
			)}
		</div>
	);
};

export default Notifications;
