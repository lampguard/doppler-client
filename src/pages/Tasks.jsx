import { useEffect, useState } from 'react';
import { useLazyGetTasksQuery } from '../services/tasks';
import { BsCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Loader from '../components/Loaders';

/*
type App = {
  createdAt: string;
  updatedAt: string;
  id: number;
  title: string;
  token: string;
};

type Log = {s
  createdAt: string;
  updatedAt: string;
  id: number;
  level: string;
  text: string;
  ip: string;
  tags: Array<never>;
  context: any;
  saved: boolean;
  app: App;
};

type Team = {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
};

type AssignedTo = {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

type Task = {
  createdAt: string;
  updatedAt: string;
  id: string;
  team_id: number;
  user_id: number;
  log_id: number;
  assigned_to: number;
  description: string;
  status: number;
  log: Log;
  team: Team;
  assignedTo: AssignedTo;
};
*/

const Tasks = () => {
	const [getTasks, { isLoading }] = useLazyGetTasksQuery();
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
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
										<div
											key={task.id}
											className="pb-4 flex justify-between items-start gap-x-4"
										>
											<p className="font-articulat-light">
												<span className="text-xs align-top pr-3 m-0">
													<BsCircleFill className="inline text-theme" />
												</span>
												<span className="inline font-articulat-bold">
													{task.team.name}:
												</span>{' '}
												{Boolean(task.assigned_to)
													? `You have been assigned a new task in ${task.log.app.title}`
													: `New task assigned in ${task.log.app.title} `}
											</p>
											<div className="grid place-items-end min-w-[20%]">
												<Link
													to={`/tasks/${task.id}`}
													className="btn btn-sm max-w-fit"
												>
													View Task
												</Link>
											</div>
										</div>
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
										<div
											key={task.id}
											className="pb-4 flex justify-between items-start gap-x-4"
										>
											<p className="font-articulat-light">
												<span className="text-xs align-top pr-3 m-0">
													<BsCircleFill className="inline text-theme" />
												</span>
												<span className="inline font-articulat-bold">
													{task.team.name}:
												</span>{' '}
												{Boolean(task.assigned_to)
													? `You have been assigned a new task in ${task.log.app.title}`
													: `New task assigned in ${task.log.app.title} `}
											</p>
											<div className="grid place-items-end min-w-[20%]">
												<Link
													to={`/tasks/${task.id}`}
													className="btn btn-sm max-w-fit"
												>
													View Task
												</Link>
											</div>
										</div>
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
