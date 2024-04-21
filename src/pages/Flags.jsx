import { useEffect } from "react";
import { useLazyGetFlagsQuery } from "../services/flags";
import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [columnHelper.accessor()];

const Flags = () => {
  const [getFlags, { isLoading }] = useLazyGetFlagsQuery();
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    getFlags()
      .unwrap()
      .then((data) => {
        // console.log(data);
        setFlags(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <h1>Tasks</h1>
    </>
  );
};

export default Flags;
