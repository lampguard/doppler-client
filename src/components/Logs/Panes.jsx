/**
 * @typedef {{id: number,level: string}} TLog
 *
 */

import React, { useState } from 'react';
import { BsCaretDown, BsCaretDownFill } from 'react-icons/bs';

/**
 * @type {React.FC<{log: TLog}>} Log
 * @returns
 */
const Log = ({ log }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			{open && (
				<>
					<div className={`log ${log.level} w-full px-[24px] py-3 rounded-lg`}>
						<div
							className="flex justify-between text-[#ebebf5] cursor-pointer"
							onClick={() => setOpen(false)}
						>
							<span>IP Address: {log.ip}</span>
							<span>{log.createdAt}</span>
						</div>
						<div className="w-full p-[10px] bg-gray-300 rounded min-h-[100px]">
							{log.text}
						</div>
					</div>
				</>
			)}
			{!open && (
				<>
					<div className="flex max-w-[100%] items-center w-full border rounded-md p-0">
						<span
							className={`uppercase log ${log.level} text-white px-4 py-2 rounded-md w-[20%] text-center`}
						>
							{log.level}
						</span>
						<span className="w-[70%] pl-2 truncate overflow-hidden align-middle font-articulat-light">
							{log.text}
						</span>
						<span
							className="w-[10%] grid place-items-center"
							onClick={(e) => setOpen(true)}
						>
							<BsCaretDownFill />
						</span>
					</div>
				</>
			)}
			<div className="pb-[8px]"></div>
		</>
	);
};

/**
 * @type {React.FC<{data: TLog[]}>} LogPanes
 * @returns
 */
const LogPanes = ({ data }) => {
	console.log(data);
	return (
		<div className="w-full md:px-6">
			<p>Latest</p>
			{data.slice(0, 5).map((log) => {
				return (
					<React.Fragment key={log.id}>
						<Log log={log} />
					</React.Fragment>
				);
			})}
			<p>Older</p>
			{data.slice(5).map((log) => (
				<React.Fragment key={log.id}>
					<Log log={log} />
				</React.Fragment>
			))}
		</div>
	);
};

export default LogPanes;
