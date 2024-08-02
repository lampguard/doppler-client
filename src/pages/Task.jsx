import { format } from 'date-fns';
import Skeleton from '../components/Loaders/Skeleton';
import { useGetTaskQuery } from '../services/tasks';
import { useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { usePageContext } from '../context/PageContext';
import Report from '../components/Logs/Report';
import { useGetAuthQuery } from '../services';

import io from 'socket.io-client';

const socket = io(__ENV__.WS_URL, {
	autoConnect: false,
});

const TaskChatMessage = ({ message }) => {
	return (
		<div className={`chat ${message.me ? 'chat-end' : 'chat-start'}`}>
			<div className="chat-header">{typeof message.sender == 'string' ? message.sender : message.sender.name}</div>
			<div className={`chat-bubble ${message.me ? 'bg-blue-100 text-black' : 'bg-green-100 text-black'}`}>
				{message.content || message.message}
			</div>
			<div className="chat-footer">
				<time className="text-xs opacity-50">{message.time || format(message.createdAt, 'y-MM-dd hh:mm:ss a')}</time>
			</div>
		</div>
	);
};

const TaskChat = ({ task }) => {
	const [messages, setMessages] = useState([]);

	const { data: user } = useGetAuthQuery();

	useEffect(() => {
		if (task) {
			setMessages(task.comments);
			socket.connect();
			socket.emit('connect-task-chat', task.id);

			socket.on('task-chat', (message) => {
				message.me = true;
				// if (message.sender_id == user?.data.user.id) {
				// }
				setMessages((prev) => [...prev, message]);
			});
		}

		() => {
			socket.disconnect();
		};
	}, [task]);

	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const form = e.currentTarget;
					socket.emit('task-chat', {
						content: form.message.value,
						sender: user?.data.user.name,
						time: format(new Date(), 'y-MM-dd hh:mm:ss aa'),
						task: task.id,
						sender_id: user?.data.user.id,
					});

					form.reset();
				}}
				className="p-2 border rounded-md"
			>
				<div id="chatArea" className="text-sm max-h-[500px] overflow-y-auto">
					{messages.map((msg, i) => {
						const message = { ...msg };
						message.me = msg.sender_id == user?.data.user.id;
						return <TaskChatMessage message={message} key={i} />;
					})}
				</div>
				<div className="p-2"></div>

				<div className="grid grid-cols-12 grid-rows-1">
					<input
						name="message"
						className="border col-span-10 w-full rounded input-sm"
						placeholder="Enter your message"
						required
					/>
					<button className="btn btn-sm col-span-2">Send</button>
				</div>
			</form>
		</>
	);
};

const Task = () => {
	const { id } = useParams();

	const { data: task, isLoading, isError, isSuccess } = useGetTaskQuery(id);

	const page = usePageContext();
	useEffect(() => {
		if (task) {
			page.updateTitle(`Task: ${task?.team.name}`);
		} else {
			page.updateTitle('Task');
		}
	}, [task]);

	return (
		<div className="p-3 flex items-stretch">
			<div className="w-1/2 p-2">
				{isLoading ? (
					<>
						<Skeleton className="w-1/2 h-10 p-4" />
						<div className="py-1"></div>
						<Skeleton className="w-2/3 h-16 p-4" />
						<div className="py-3"></div>
						<Skeleton className="w-full h-64 rounded-none p-4" />
					</>
				) : (
					<>
						{isSuccess && (
							<>
								<p className="text-2xl font-bold">
									{Boolean(task.assigned_to) == true ? 'Your task' : 'Task'} in {task.team.name}
								</p>
								<p className="text-sm pt-2">
									Assigned by:{' '}
									<span className="text-gray-500">
										{task.user.name} ({task.user.email})
									</span>{' '}
								</p>
								<p className="text-sm pt-2">
									On: <span className="text-gray-500">{format(task.createdAt, 'P HH:mm:ss a')}</span>{' '}
								</p>
								<div>
									<p className="text-sm pt-2">
										Comment: <span className="">{task.description}</span>
									</p>
								</div>
								<div className="py-3"></div>
								<Report log={task.log} />
							</>
						)}
						{isError && <></>}
					</>
				)}
			</div>
			<div className="w-1/2 p-2">
				<p className="text-3xl">Discussion</p>

				<TaskChat task={task} />
			</div>
		</div>
	);
};

export default Task;
