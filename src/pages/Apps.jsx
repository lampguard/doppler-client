import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useGetAppsQuery } from "../services";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import Loader from "../components/Loaders";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("sn", {
    header: () => "S/N",
    cell: (info) => {
      return info.row.index + 1;
    },
  }),
  columnHelper.accessor("title", {
    header: (info) => "Name",
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
  columnHelper.accessor("createdat", {
    header: (info) => "Created",
    cell: (info) => {
      const value = info.getValue();
      if (typeof value == "string") {
        return new Date(value).toLocaleDateString();
      }

      return info.getValue().toISOString();
    },
  }),
  columnHelper.accessor("token", {
    header: (info) => "Status",
    cell: (info) => (Boolean(info.getValue()) == true ? "Active" : "Inactive"),
  }),
];

const Apps = () => {
  const { data, isLoading, isUninitialized, isError, error, isSuccess } =
    useGetAppsQuery();

  const table = useReactTable({
    columns,
    data: data?.data || [{ title: "", token: "", createdat: new Date() }],
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
