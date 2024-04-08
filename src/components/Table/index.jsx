import { flexRender } from '@tanstack/react-table';
import { useReducer } from 'react';

/**
 *
 * @type {React.FC<{table: import("@tanstack/react-table").Table}>} Table
 *
 */
const Table = ({ table }) => {
	const rerender = useReducer(() => ({}), {})[1];

	return (
		<>
			<table className="rounded-md w-full">
				<thead>
					{table.getHeaderGroups().map( (headerGroup) => (
						<tr key={headerGroup.id} className="py-4">
							{headerGroup.headers.map((header) => (
								<th key={header.id} className="py-4 font-[450] text-center">
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id} className="odd:bg-[#EBEBF5]">
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className="py-2 text-center">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
				{/* <tfoot>
					{table.getFooterGroups().map((footerGroup) => (
						<tr key={footerGroup.id}>
							{footerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.footer,
												header.getContext()
										  )}
								</th>
							))}
						</tr>
					))}
				</tfoot> */}
			</table>
		</>
	);
};

export default Table;
