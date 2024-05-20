import { ContextEntry } from "../../pages/Task";
import { format } from "date-fns";

const Report = ({ log }) => {
	return (
		<div className="p-4 bg-gray-100">
			<p className="text-xl">Incident Report</p>
			<div className="py-2"></div>
			<div className="text-sm">
				<p>
					Level:{' '}
					<span className="font-articulat-bold">{log.level.toUpperCase()}</span>
				</p>
				<p>Time: {format(log.createdAt, 'P HH:mm:ss a')}</p>
				<p>IP Address: {log.ip}</p>
				{/* <p>IP Address: {JSON.stringify(log)}</p> */}
				<p className="pt-3 pb-2">{log.text}</p>
				<p className="py-1">
					Tags:{' '}
					{(!log.tags || log.tags?.length < 1) && (
						<span className="font-articulat-oblique">No tags.</span>
					)}
					{log.tags?.map((tag) => (
						<>{tag}</>
					))}
				</p>
				<div className="py-1">
					{!log.context && (
						<span className="font-articulat-oblique">No context provided</span>
					)}
					{log.context && (
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
					)}
				</div>
			</div>
		</div>
	);
};

export default Report;