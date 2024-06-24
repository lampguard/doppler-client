import React, { useEffect, useState } from "react";
import { CustomModal } from "../../shared/CustomModal";
import { useGetAppsQuery } from "../../services";
import { useGetTeamQuery, useNewTeamMutation } from "../../services/teams";
import { message } from "antd";

const AddNewAppModal = ({ showAddNewModal, setShowAddNewModal }) => {
  const { data: apps, isLoading: appsLoading } = useGetAppsQuery();
  const [selectedApps, setSelectedApps] = useState([]);
  const [newApp, { isLoading, isSuccess, isError, error }] =
    useNewTeamMutation();
  const teamId = sessionStorage.getItem("teamId");

  const { data: team } = useGetTeamQuery(teamId);
  const handleAddApp = (e) => {
    const { value } = e.target;
    if (selectedApps.includes(Number(value))) {
      setSelectedApps(selectedApps.filter((app) => app != value));
    } else {
      setSelectedApps([...selectedApps, Number(value)]);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setShowAddNewModal(false);
      message.success("App Added successfully");
    } else if (isError) {
      message.error(error?.data?.message || error?.data?.error);
    }
  }, [isSuccess, setShowAddNewModal, isError]);

  const addApp = () => {
    newApp({
      name: team?.name,
      apps: selectedApps,
    });
  };

  return (
    <>
      <CustomModal
        isModalOpen={showAddNewModal}
        handleOk={() => setShowAddNewModal(false)}
        handleCancel={() => setShowAddNewModal(false)}
      >
        <div className="flex flex-col items-center justify-center gap-[2rem] mt-[1rem]">
          <div className="flex flex-col w-full ">
            <h3 className="text-center text-[20px]">Add Apps</h3>
            <div className="flex flex-col gap-2 mt-2">
              {apps?.data?.length === 0 ? (
                <>
                  <p className="text-center">
                    You haven't created any apps yet. Why are you even creating
                    teams?
                  </p>
                </>
              ) : appsLoading ? (
                "Loading..."
              ) : (
                apps?.data?.map((app, i) => (
                  <div className="label" key={i}>
                    <span className="font-normal">{app?.title}</span>
                    <input
                      type="checkbox"
                      name="apps"
                      value={app?.id}
                      className="check checkbox-xs"
                      onChange={handleAddApp}
                      checked={selectedApps.includes(Number(app.id))}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
          <button
            className="p-4 rounded-md hover:bg-opacity-80 bg-[#003AFF] w-full text-white disabled:bg-opacity-80 disabled:cursor-not-allowed"
            onClick={addApp}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add App"}
          </button>
        </div>
      </CustomModal>
    </>
  );
};

export default AddNewAppModal;
