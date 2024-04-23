import { format } from "date-fns";
import Loader from "../components/Loaders";
import Skeleton from "../components/Loaders/Skeleton";
import { useGetTaskQuery } from "../services/tasks";
import { Link, useParams } from "react-router-dom";
import { BsCaretRight } from "react-icons/bs";
import { FaCaretDown, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import React, { useState } from "react";

const ContextEntry = ({ k, v }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-red-300 cursor-pointer" onClick={() => setOpen(!open)}>
        {open ? (
          <FaCaretDown className="text-xl inline" />
        ) : (
          <FaCaretRight className="text-xl inline" />
        )}{" "}
        <span className={"inline " + (open ? "font-articulat-bold" : "")}>
          {k}
        </span>
        {open ? null : (
          <span className="hidden md:inline truncate pl-3">{v.slice(0, 50)}...</span>
        )}
      </div>
      <div className={(open ? "block" : "hidden") + " max-w-full p-1 border"}>
        <p className="overflow-y-auto">{v}</p>
      </div>
    </>
  );
};

const Task = () => {
  const { id } = useParams();

  const { data: task, isLoading, isError, isSuccess } = useGetTaskQuery(id);

  return (
    <div className="p-3">
      {isLoading ? (
        <>
          <Skeleton className="w-1/2 h-10 p-4" />
          <div className="py-1"></div>
          <Skeleton className="w-2/3 h-16 p-4" />
          <div className="py-3"></div>
          <Skeleton className="w-full h-64 rounded-none p-4" />
        </>
      ) : (
        <>
          {isSuccess && (
            <>
              <p className="text-2xl font-bold">
                {Boolean(task.assigned_to) == true ? "Your task" : "Task"} in{" "}
                {task.team.name}
              </p>
              <p className="text-sm pt-2">
                Assigned by:{" "}
                <span className="text-gray-500">
                  {task.user.name} ({task.user.email})
                </span>{" "}
              </p>
              <p className="text-sm pt-2">
                On:{" "}
                <span className="text-gray-500">
                  {format(task.createdAt, "P HH:mm:ss a")}
                </span>{" "}
              </p>
              <div>
                <p className="text-sm pt-2">
                  Comment: <span className="">{task.description}</span>
                </p>
              </div>
              <div className="py-3"></div>
              <div className="p-4 bg-gray-100">
                <p className="text-xl">Incident Report</p>
                <div className="py-2"></div>
                <div className="text-sm">
                  <p>
                    Level:{" "}
                    <span className="font-articulat-bold">
                      {task.log.level.toUpperCase()}
                    </span>
                  </p>
                  <p>Time: {format(task.log.createdAt, "P HH:mm:ss a")}</p>
                  <p>IP Address: {task.log.ip}</p>
                  {/* <p>IP Address: {JSON.stringify(task.log)}</p> */}
                  <p className="pt-3 pb-2">{task.log.text}</p>
                  <p className="py-1">
                    Tags:{" "}
                    {(!task.log.tags || task.log.tags?.length < 1) && (
                      <span className="font-articulat-oblique">No tags.</span>
                    )}
                    {task.log.tags?.map((tag) => (
                      <>{tag}</>
                    ))}
                  </p>
                  <div className="py-1">
                    {!task.log.context && (
                      <span className="font-articulat-oblique">
                        No context provided
                      </span>
                    )}
                    {task.log.context && (
                      <div className="py-2 md:py-1">
                        {Object.entries(task.log.context).map(([k, v], index) => {
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
            </>
          )}
          {isError && <></>}
        </>
      )}
    </div>
  );
};

export default Task;
