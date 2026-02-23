import React, {useState} from 'react';
import { format } from 'date-fns';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';

const RenderContextValue = ({ value, open = false, nested = false }) => {
	const type = typeof value;
	if (!open) {
		return (
			<span className="hidden md:inline truncate pl-3">
				{type == 'string' || type == 'number'
					? String(value).slice(0, 50)
					: null}
			</span>
		);
	} else {
		return (
			<div
				className={
					(open ? 'block' : 'hidden') + ' bg-white max-w-full p-1 border'
				}
			>
				{type == 'string' || type == 'number' ? (
					<p className="p-1 overflow-y-auto text-pretty break-words">
						{String(value).slice(0, 512)}
					</p>
				) : (
					Object.entries(value).map(([k, v], index) => (
						<div key={`context-entry-nest-${index}`} className="pt-1 px-1.5">
							<ContextEntry
								k={k}
								v={
									// nested && (typeof v != 'string' || typeof v != 'number')
									// 	? JSON.stringify(v)
									// 	: v
									v
								}
								nested
							/>
							<div className="pb-1 md:pb-2"></div>
						</div>
					))
				)}
			</div>
		);
	}
};

export const ContextEntry = ({ k, v, nested = false }) => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<div
				className={`${nested ? 'bg-blue-200' : 'bg-red-300'} cursor-pointer`}
				onClick={(e) => {
					e.stopPropagation();
					setOpen(!open);
				}}
			>
				{open ? (
					<FaCaretDown className="text-xl inline" />
				) : (
					<FaCaretRight className="text-xl inline" />
				)}{' '}
				<span className={'inline ' + (open ? 'font-articulat-bold' : '')}>
					{k}
				</span>
				<RenderContextValue value={v} open={open} nested />
			</div>
		</>
	);
};

const Report = ({ log }) => {
	return (
		<div className="p-4 bg-gray-100">
			<p className="text-xl">Incident Report</p>
			<p className="font-articulat-bold">#{log.id}</p>
			<div className="py-2"></div>
			<div className="text-sm">
				<p>
					Level:{' '}
					<span className="font-articulat-bold">{log.level.toUpperCase()}</span>
				</p>
				<p>Time: {format(log.createdat, 'P HH:mm:ss a')}</p>
				<p>IP Address: {log.ip}</p>
				{/* <p>IP Address: {JSON.stringify(log)}</p> */}
				<p className="pt-3 pb-2 text-wrap break-words">{log.text}</p>
				<p className="py-1">
					Tags:{' '}
					{(!log.tags || log.tags?.length < 1) && (
						<span className="font-articulat-oblique">No tags.</span>
					)}
				<span className="font-bold text-blue-500">	{log.tags?.join(", ")}</span>
				</p>
				<div className="py-1">
					{!log.context ? (
						<span className="p-1 font-articulat-bold block w-full cursor-pointer">
							No context provided
						</span>
					) : (
						log.context && (
							<div className="py-2 md:py-1">
								{Object.entries(log.context).map(([k, v], index) => {
									return (
										<React.Fragment key={index}>
											<ContextEntry k={k} v={v} />
											<div className="pb-1 md:pb-2"></div>
										</React.Fragment>
									);
								})}
							</div>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default Report;
