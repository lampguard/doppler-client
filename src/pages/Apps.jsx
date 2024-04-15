import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useGetAppsQuery, useLazyGetAppsQuery } from '../services';
import Table from '../components/Table';
import { Link } from 'react-router-dom';
import Loader from '../components/Loaders';
import { BsPlus } from 'react-icons/bs';
import { useTeamContext } from '../context/TeamContext';
import { useEffect, useState } from 'react';

const columnHelper = createColumnHelper();

const columns = [
	columnHelper.accessor('sn', {
		header: () => 'S/N',
		cell: (info) => {
			return info.row.index + 1;
		},
	}),
	columnHelper.accessor('title', {
		header: (info) => 'Name',
		cell: ({ row }) => {
			return (
				<Link
					to={`/apps/${row.original.id}`}
					className="text-theme hover:underline"
				>
					{row.original.title}
				</Link>
			);
		},
	}),
	columnHelper.accessor('createdat', {
		header: (info) => 'Created',
		cell: (info) => {
			const value = info.getValue();
			if (typeof value == 'string') {
				return new Date(value).toLocaleDateString();
			}

			return info.getValue()?.toISOString();
		},
	}),
	columnHelper.accessor('token', {
		header: (info) => 'Status',
		cell: (info) => (Boolean(info.getValue()) == true ? 'Active' : 'Inactive'),
	}),
];

const Apps = () => {
	const { value: team } = useTeamContext();
	const [apps, setApps] = useState([]);

	const [getApps, { isLoading, isFetching, isUninitialized, isError, error }] =
		useLazyGetAppsQuery();

	useEffect(() => {
		if (team) {
			getApps(team?.id)
				.unwrap()
				.then(({ data }) => {
					setApps(data);
				})
				.catch((err) => {
					console.error(err);
					setApps([]);
				});
		}
	}, [team]);

	const table = useReactTable({
		columns,
		data: apps || [{ title: '', token: '', createdat: new Date() }],
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			{isLoading || isUninitialized ? (
				<Loader />
			) : isError ? (
				<>{error.data.message || <>An error occurred</>}</>
			) : (
				<div className="md:p-6">
					<Link className="btn btn-sm md:hidden" to={'/dashboard/create-app'}>
						<BsPlus className="text-2xl" /> Add a new app
					</Link>
					<div className="md:border-[1px] border-[#ccc] rounded-lg">
						<Table table={table} />
					</div>
				</div>
			)}
		</>
	);
	// return <div className="container p-4">{table.getAllColumns()}</div>;
};

export default Apps;
