import { useContext, useEffect, useState } from 'react';
import PageContext, { usePageContext } from '../context/PageContext';
import { BsCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { notification as AntdNotification } from 'antd';
import {
	useLazyGetNotificationsQuery,
	useMarkAsReadMutation,
} from '../services/notifications';
import Skeleton from '../components/Loaders/Skeleton';

const Notification = ({ notification }) => {
	const meta = JSON.parse(notification.meta || '');
	const [markAsRead] = useMarkAsReadMutation();

	return (
		<div className="pb-4 flex items-center gap-4">
			<div className="max-w-[20px]">
				<BsCircleFill
					className={`text-[12px] ${
						notification.is_read == 1 ? 'text-gray-400' : 'text-theme'
					}`}
				/>
			</div>
			<div className="min-w-[70%]">
				<p>{notification.message}</p>
				<div className="py-1"></div>
				<p className="text-sm text-gray-400 md:flex items-center gap-x-2">
					<span className="block sm:inline">
						{format(notification.createdAt, 'P pp')}
					</span>
				</p>
			</div>
			{meta.href && (
				<div className="text-right w-full max-w-[30%]">
					<Link
						to={meta.href}
						className="btn btn-sm "
						onClick={(e) => {
							markAsRead({ id: notification.id }).catch((err) => {
								AntdNotification.error({
									message: err.data?.message || err.message,
									duration: 3,
								});
							});
						}}
					>
						View
					</Link>
				</div>
			)}
		</div>
	);
};

const Notifications = () => {
	const pageContext = usePageContext();

	const [userNotifications, setUserNotifications] = useState([]);

	const [getNotifications, { isLoading, isFetching }] =
		useLazyGetNotificationsQuery();

	const [meta, setMeta] = useState({});

	const [notifs, setNotifs] = useState(userNotifications);
	const [type, setType] = useState(undefined);

	useEffect(() => {
		pageContext.updateTitle('Notifications');
	}, []);

	useEffect(() => {
		getNotifications({
			page: 1,
			count: 20,
		})
			.then(({ data }) => {
				setUserNotifications(data.data);
				setNotifs(data.data);
				setMeta(data.meta);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const filterNotifications = (fn) => {
		setNotifs(
			userNotifications?.filter((n) => {
				if (fn == undefined) return true;
				if (typeof fn == 'function') {
					return fn(n);
				}

				return fn == n.type;
			})
		);
		setType(fn);
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
						(typeof type == 'function'
							? 'text-black'
							: 'btn-ghost text-gray-500 hover:text-black')
					}
					onClick={() => filterNotifications((n) => n?.is_read == 0)}
				>
					Unread
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
			{isLoading || isFetching ? (
				<>
					<Skeleton className="w-full h-12 rounded" />
					<div className="py-2"></div>
					<Skeleton className="w-full h-12 rounded" />
					<div className="py-2"></div>
					<Skeleton className="w-full h-12 rounded" />
				</>
			) : notifs?.length > 0 ? (
				notifs.map((n) => <Notification notification={n} key={n.id} />)
			) : (
				<div className="px-4 text-gray-500">No new notifications for you.</div>
			)}
		</div>
	);
};

export default Notifications;
