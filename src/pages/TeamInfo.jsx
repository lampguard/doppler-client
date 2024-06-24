import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "date-fns";
import { FaTrashAlt } from "react-icons/fa";

import {
  useGetTeamQuery,
  useLazyGetTeamAppsQuery,
  useAddMemberMutation,
  useAddAppToTeamMutation,
} from "../services/teams";
import { useLazyGetAppsQuery } from "../services";

import Loader from "../components/Loaders";
import Skeleton from "../components/Loaders/Skeleton";
import Modal from "../components/Modal";
import TextInput from "../components/Input/TextInput";
import { usePageContext } from "../context/PageContext";

/**
 * @type {React.FC}
 * @returns {React.ReactElement}
 */
const TeamInfo = () => {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess, isFetching } =
    useGetTeamQuery(id);
  const [getTeamApps, { isLoading: taLoading }] = useLazyGetTeamAppsQuery();
  const [getApps] = useLazyGetAppsQuery();

  const page = usePageContext();
  useEffect(() => {
    page.updateTitle(data?.name);
  }, [data]);

  const [teamApps, setTeamApps] = useState([]);
  const [apps, setApps] = useState([]);

  const [addMember, { isLoading: addMemberLoading }] = useAddMemberMutation();
  const [addApp, { isLoading: addAppLoading }] = useAddAppToTeamMutation();

  const [addMemberForm, setAddMemberForm] = useState({
    email: "",
    team: id,
  });
  const [addAppForm, setAddAppForm] = useState({
    app: "",
    team: id,
  });

  const getAllApps = () => {
    // getAllApps();
  };

  useEffect(() => {
    if (data) {
      getTeamApps(id)
        .unwrap()
        .then((response) => {
          setTeamApps(response);
        })
        .catch((err) => {
          console.error(err);
        });
      getApps()
        .unwrap()
        .then((response) => {
          setApps(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isSuccess]);

  return (
    <>
      <div className="p-4">
        {(isLoading || isFetching) && <Skeleton className="w-full h-72" />}
        {isError && <div>Error</div>}
        {!isLoading && !isFetching && !isError && (
          <div>
            <p>Team Name</p>
            <div className="flex justify-between text-gray-500 py-4">
              <p>{data.name}</p>
              <p className="underline">Rename</p>
            </div>
            <div className="py-3"></div>
            <p>Created</p>
            <div className="pt-3"></div>
            <p className="text-gray-500">
              {formatDate(data.createdat, "dd/MM/yyyy")}
            </p>
            <div className="pt-6">Members ( {data?.members.length} )</div>
            <div className="text-gray-500">
              {data?.members.map((member) => {
                return (
                  <div className="flex justify-between py-2" key={member.name}>
                    <span>{member.name}</span>
                    <span className="hidden md:block">{member.email}</span>
                    <span className="flex items-center gap-x-2 text-red-600">
                      <FaTrashAlt /> <span>Remove</span>
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="py-5">
              {/* <Link to={`/teams/${id}/members/add`}> */}
              <button
                className="btn btn-primary w-full md:w-1/4 rounded-full"
                onClick={() => {
                  document.getElementById("add-member-modal").showModal();
                }}
              >
                Add New Member
              </button>
              {/* </Link> */}
            </div>

            <div className="pt-4"></div>
            <p>Apps ( {teamApps.length} )</p>
            {taLoading && (
              <>
                <Skeleton className="w-full h-8 rounded-md" />
                <div className="py-1"></div>
                <Skeleton className="w-full h-8 rounded-md" />
                <div className="py-1"></div>
                <Skeleton className="w-full h-8 rounded-md" />
              </>
            )}
            {teamApps?.map((app) => {
              return (
                <>
                  <div
                    key={app.id}
                    className="flex justify-between text-gray-500 py-2"
                  >
                    <span>{app.title}</span>
                    <span>{formatDate(app.createdat, "dd/MM/yyyy")}</span>
                    <span className="flex items-center gap-x-2 text-red-600 cursor-pointer">
                      <FaTrashAlt /> <span>Remove</span>
                    </span>
                  </div>
                  <div className="py-3"></div>
                </>
              );
            })}

            <button
              className="btn btn-primary w-full md:w-1/4 rounded-full"
              onClick={() => {
                document.getElementById("add-app-modal").showModal();
              }}
            >
              Add New App
            </button>
          </div>
        )}
      </div>

      <Modal id="add-member-modal" withClose className="text-center py-[60px]">
        <p className="text-3xl">Add New Member</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addMember(addMemberForm)
              .unwrap()
              .then((response) => {
                document.getElementById("add-member-modal").close();
                setAddMemberForm({ ...addMemberForm, email: "" });
              })
              .catch((err) => {
                console.error(err);
              })
              .finally(() => {
                setAddMemberForm({ ...addMemberForm, email: "" });
              });
          }}
        >
          <div className="pt-[60px] pb-[30px] text-left">
            <p className="pb-2">E-mail Address</p>
            <TextInput
              type="email"
              placeholder="myfriend@home.com"
              required
              value={addMemberForm.email}
              onChange={(e) =>
                setAddMemberForm({ ...addMemberForm, email: e.target.value })
              }
            />
          </div>
          <button
            className="btn btn-primary w-full"
            disabled={addMemberLoading}
            type="submit"
          >
            {addMemberLoading ? <Loader theme={false} /> : "Submit"}
          </button>
        </form>
      </Modal>

      {/* Add App modal */}
      <Modal id="add-app-modal" withClose className="text-center py-[60px]">
        <p className="text-3xl">Add App</p>
        <div className="pt-[60px] pb-[30px] text-left">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addApp(addAppForm)
                .unwrap()
                .then((response) => {
                  document.getElementById("add-app-modal").close();
                  setAddAppForm({ ...addAppForm, app: "" });
                  // getAllApps();
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
          >
            {apps
              .filter(
                (app) => teamApps.map((t) => t.id).includes(app.id) == false
              )
              .map((app) => {
                return (
                  <>
                    <label
                      htmlFor=""
                      key={app.id}
                      className="flex justify-between"
                    >
                      <span>{app.title}</span>
                      <input
                        type="radio"
                        name="app-select"
                        className="radio"
                        value={app.id}
                        onChange={(e) => {
                          setAddAppForm({ ...addAppForm, app: e.target.value });
                        }}
                      />
                    </label>
                  </>
                );
              })}
            <div className="pt-6"></div>
            <button className="btn btn-primary w-full" type="submit">
              {addAppLoading ? <Loader theme={false} /> : "Add"}
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default TeamInfo;
