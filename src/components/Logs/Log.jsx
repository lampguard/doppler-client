import { useRef, useState } from 'react';
import { useAssignTaskMutation } from '../../services/tasks';
import { useLazyAnalyseQuery } from '../../services/ai';
import Modal from '../Modal';
import { format } from 'date-fns';
import Loader from '../Loaders';
import Report from './Report';
import { FaChartLine, FaList } from 'react-icons/fa';
import { BsCaretDownFill } from 'react-icons/bs';
import { notification } from 'antd';
import { formatDate } from '../../services/util';

/**
 * @type {React.FC<{log: TLog, appteams: any[]}>} Log
 * @returns
 */
const Log = ({ log, appteams }) => {
	const [open, setOpen] = useState(false);
	// const [flag, { isLoading }] = useCreateFlagMutation();

	const [description, setDescription] = useState('');
	const [assignedTeam, setAssignTeam] = useState(undefined);
	const [assignedMember, setAssignMember] = useState(undefined);

	const [assignTask, { isLoading: assigning }] = useAssignTaskMutation();

	const submitAssignment = () => {
		return assignTask({
			log_id: log.id,
			assignment: {
				team: assignedTeam?.id,
				member: assignedMember?.id,
			},
			description: description.length == 0 ? undefined : description,
		});
	};

	const [analyse, { isLoading: isAnalysing, isSuccess: analysed }] = useLazyAnalyseQuery();
	const [analysis, setAnalysis] = useState(undefined);
	const [analysisMessage, setAnalysisMessage] = useState(0);
	const [analysing, setAnalysing] = useState(false);

	const interval = useRef(null);

	const requestAnalysis = (log) => {
		// setAnalysing(true);
		interval.current = setInterval(() => {
			setAnalysisMessage((prev) => {
				console.log(prev);
				if (prev < analysisMessages.length - 1) {
					return prev + 1;
				} else {
					return 0;
				}
			});
		}, 10 * 1000);

		// setTimeout(() => {
		// 	setAnalysing((prev) => false);
		// 	clearInterval(interval.current);
		// }, 100000);

		// return;

		analyse(log?.id)
			.unwrap()
			.then(({ response }) => {
				setAnalysis(response);
			})
			.catch((err) => {
				notification.error({
					message:
						err.status == 429
							? "You're making too many requests. Please try a bit later."
							: err.data.error || err.data.message,
					duration: 5,
				});
			})
			.finally(() => {
				setAnalysisMessage(0);
				clearInterval(interval.current);
			});
	};

	return (
		<>
			<Modal id={`log-${log.id}`} className="rounded-none min-w-[72.5%] px-10" withClose>
				<p className="font-articulat-bold text-xl py-5">{log.level.toUpperCase()}</p>
				<p className="line-clamp-2 pb-5">
					<span className="text-gray-500">Time</span>: {format(log.createdAt || log.createdat, 'P HH:mm:ss a')}
				</p>
				<p className="line-clamp-2 pb-5">
					<span className="text-gray-500">Message</span>: {log.text}
				</p>
				<div className="py-2"></div>
				<div className="md:flex items-stretch justify-start bg-[#EBEBF5]">
					<div className="md:w-[40%] md:border-r border-black px-4 py-5">
						<p className="py-2">Select a team to assign</p>
						{appteams?.map((team) => (
							<label htmlFor="" key={team.id} className="w-full flex items-center">
								<input
									type="checkbox"
									name="active-team"
									className="checkbox checkbox-xs mr-4"
									onChange={(e) => {
										if (e.target.checked) {
											setAssignTeam(team);
											setAssignMember(undefined);
										} else {
											setAssignTeam(undefined);
											setAssignMember(undefined);
										}
									}}
									checked={assignedTeam?.id == team.id}
								/>
								{team.name}
							</label>
						))}
					</div>

					<div className="w-full md:w-2/3 p-5">
						<p className="py-2">
							<strong className="font-articulat-bold">{assignedTeam?.name}</strong>
						</p>
						<div className="py-1"></div>
						{assignedTeam?.members.map((member) => (
							<label className="label" key={member.email}>
								<span>
									{member.name} <span className="hidden md:inline">({member.email})</span>
								</span>
								<input
									type="checkbox"
									className="checkbox checkbox-xs"
									name={assignedTeam?.name}
									checked={assignedMember?.id == member.id}
									onChange={(e) => {
										if (e.target.checked) {
											setAssignMember(member);
										} else {
											setAssignMember(undefined);
										}
									}}
								/>
							</label>
						))}
					</div>
				</div>

				{assignedTeam && (
					<>
						<div className="py-2"></div>
						<label className="text-sm">
							Description <span className="text-gray-500">(optional)</span>
						</label>
						<div className="py-2"></div>
						<textarea
							className="textarea w-full textarea-bordered border-[#EBEBF5] textarea-primary"
							rows={5}
							value={description}
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						/>
						<div className="py-2"></div>
						<button
							className="btn btn-primary w-full"
							onClick={() => {
								submitAssignment()
									.then((res) => {
										setAssignMember(undefined);
										setAssignTeam(undefined);
										setDescription('');
										document.getElementById(`log-${log.id}`).close();
										notification.success({
											duration: 3,
											message: 'Task was assigned successfully',
											style: { zIndex: 100000 },
										});
									})
									.catch((err) => {
										notification.error({
											duration: 3,
											message: err.data?.message || 'Unable to assign task. Please try again.',
											style: { zIndex: 100000 },
										});
									});
							}}
						>
							{assigning ? <Loader theme={false} /> : 'Assign Task'}
						</button>
					</>
				)}
			</Modal>

			{/* Report Modal with AI integration */}
			<Modal id={`log-report-${log.id}`} className="rounded-sm w-full md:min-w-[75%]">
				<>
					<Report log={log} />
					<div className="py-2"></div>
					{/* {false && ( */}
					{!(isAnalysing || analysing || analysed) && log.level != 'info' && (
						<button className="btn btn-primary btn-sm" disabled={isAnalysing} onClick={() => requestAnalysis(log)}>
							Get Suggestion
						</button>
					)}
					<div className="py-2">
						{isAnalysing || analysing ? (
							<>
								<div className="w-full grid place-items-center min-h-12">
									<span className="loading text-theme loading-dots loading-lg"></span>
									<p className="text-sm">{analysisMessages[analysisMessage]}</p>
								</div>
							</>
						) : analysed ? (
							<div className="p-2">
								<p className="font-articulat-bold">Doppler:</p>
								<p className="text-[0.8em]">{analysis}</p>
							</div>
						) : null}
					</div>
				</>
			</Modal>
			{open && (
				<>
					<div className={`log ${log.level} w-full px-[12px] py-2 rounded-lg`}>
						<div className="flex justify-between cursor-pointer" onClick={() => setOpen(false)}>
							<span>IP Address: {log.ip}</span>
							<span>{format(log.createdAt || log.createdat, 'yyyy-MM-dd hh:mm:ss a')}</span>
						</div>
						<div className="max-w-full p-[5px] bg-gray-200 rounded min-h-[100px] break-words text-sm md:text-base">
							{log.text}
						</div>
						<div className="py-1 flex justify-between">
							<button
								className="btn btn-xs glass btn-ghost relative"
								onClick={(e) => {
									document.getElementById(`log-${log.id}`).showModal();
								}}
							>
								{/* <BsCone /> */}
								<FaChartLine />
								Create Task
							</button>
							<button
								className="btn btn-xs glass btn-ghost relative"
								onClick={() => document.getElementById(`log-report-${log.id}`).showModal()}
							>
								<FaList /> View Report
							</button>
						</div>
					</div>
				</>
			)}
			{!open && (
				<div className="border rounded-md p-0">
					<span className="flex items-center px-2 text-sm" onClick={(e) => setOpen(true)}>
						{formatDate(log.createdat, true)}
					</span>
					<div className="flex max-w-[100%] items-center w-full">
						<span className={`uppercase log ${log.level}-bg text-white px-4 py-2 rounded-md w-[20%] text-center`}>
							{log.level}
						</span>
						<span className="w-[85%] pl-2 truncate overflow-hidden align-middle font-articulat-light">{log.text}</span>
						<span className="w-[5%] grid place-items-center" onClick={(e) => setOpen(true)}>
							<BsCaretDownFill />
						</span>
					</div>
				</div>
			)}
			<div className="pb-[8px]"></div>
		</>
	);
};

export default Log;
