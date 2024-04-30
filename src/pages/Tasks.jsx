import { useEffect, useState } from 'react';
import { useLazyGetTasksQuery } from '../services/tasks';
import { BsCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Loader from '../components/Loaders';
import { usePageContext } from '../context/PageContext';

const Task = ({ task }) => (
	<div key={task.id} className="pb-4 flex justify-between items-start gap-x-4">
		<p className="font-articulat-light w-4/5 md:w-auto">
			<span className="text-xs align-top pr-3 m-0">
				<BsCircleFill className="inline text-theme" />
			</span>
			<span className="inline font-articulat-bold">{task.team.name}:</span>{' '}
			{Boolean(task.assigned_to)
				? `You have been assigned a new task in ${task.log.app.title}`
				: `New task assigned in ${task.log.app.title} `}
		</p>
		<div className="grid place-items-end md:min-w-[20%]">
			<Link to={`/tasks/${task.id}`} className="btn btn-sm max-w-fit">
				View Task
			</Link>
		</div>
	</div>
);

const Tasks = () => {
	const [getTasks, { isLoading }] = useLazyGetTasksQuery();
	const [tasks, setTasks] = useState([]);

	const page = usePageContext();

	useEffect(() => {
		page.updateTitle("Tasks");
		getTasks()
			.unwrap()
			.then((res) => {
				// console.log(res);
				// console.log(JSON.stringify(res));
				setTasks(res);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<>
			<div className="px-8">
				{isLoading && <Loader />}
				{!isLoading && (
					<>
						<p className="text-xl py-4">Your Tasks</p>

						{tasks.filter((task) => Boolean(task.assigned_to)).length > 0 ? (
							tasks
								.filter((task) => Boolean(task.assigned_to))
								.map((task) => {
									return (
										// <div
										// 	key={task.id}
										// 	className="pb-4 flex justify-between items-start gap-x-4"
										// >
										// 	<p className="font-articulat-light">
										// 		<span className="text-xs align-top pr-3 m-0">
										// 			<BsCircleFill className="inline text-theme" />
										// 		</span>
										// 		<span className="inline font-articulat-bold">
										// 			{task.team.name}:
										// 		</span>{' '}
										// 		{Boolean(task.assigned_to)
										// 			? `You have been assigned a new task in ${task.log.app.title}`
										// 			: `New task assigned in ${task.log.app.title} `}
										// 	</p>
										// 	<div className="grid place-items-end min-w-[20%]">
										// 		<Link
										// 			to={`/tasks/${task.id}`}
										// 			className="btn btn-sm max-w-fit"
										// 		>
										// 			View Task
										// 		</Link>
										// 	</div>
										// </div>
										<Task task={task} />
									);
								})
						) : (
							<>There are no tasks here yet.</>
						)}

						<p className="text-xl pb-4">Team Tasks</p>
						{tasks.filter((task) => Boolean(task.assigned_to) == false).length >
						0 ? (
							tasks
								.filter((task) => Boolean(task.assigned_to) == false)
								.map((task) => {
									return (
										// <div
										// 	key={task.id}
										// 	className="pb-4 flex justify-between items-start gap-x-4"
										// >
										// 	<p className="font-articulat-light">
										// 		<span className="text-xs align-top pr-3 m-0">
										// 			<BsCircleFill className="inline text-theme" />
										// 		</span>
										// 		<span className="inline font-articulat-bold">
										// 			{task.team.name}:
										// 		</span>{' '}
										// 		{Boolean(task.assigned_to)
										// 			? `You have been assigned a new task in ${task.log.app.title}`
										// 			: `New task assigned in ${task.log.app.title} `}
										// 	</p>
										// 	<div className="grid place-items-end min-w-[20%]">
										// 		<Link
										// 			to={`/tasks/${task.id}`}
										// 			className="btn btn-sm max-w-fit"
										// 		>
										// 			View Task
										// 		</Link>
										// 	</div>
										// </div>
										<Task task={task} />
									);
								})
						) : (
							<>There are no tasks here yet.</>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default Tasks;
