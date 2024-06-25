import React, { useState } from "react";
import { CustomModal } from "../../shared/CustomModal";
import { useGetAppsQuery } from "../../services";
import { useEffect } from "react";
import { useNewTeamMutation } from "../../services/teams";
import { message } from "antd";

const AddNewTeamModal = ({ showAddNewModal, setShowAddNewModal }) => {
  const { data: apps, isLoading: appsLoading } = useGetAppsQuery();
  const [selectedApps, setSelectedApps] = useState([]);
  const [appName, setAppName] = useState("");
  const [newApp, { isLoading, isSuccess, isError, error }] =
    useNewTeamMutation();

  const handleAddApp = (e) => {
    const { value } = e.target;
    if (selectedApps.includes(Number(value))) {
      setSelectedApps(selectedApps.filter((app) => app != value));
    } else {
      setSelectedApps([...selectedApps, Number(value)]);
    }
  };

  const addApp = () => {
    newApp({
      name: appName,
      apps: selectedApps,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setShowAddNewModal(false);
      message.success("Team Created Successfully");
    } else if (isError) {
      message.error(error?.data?.message || error?.data?.error);
    }
  }, [isSuccess, setShowAddNewModal, isError]);
  return (
    <>
      <CustomModal
        title=""
        isModalOpen={showAddNewModal}
        handleOk={() => setShowAddNewModal(false)}
        handleCancel={() => setShowAddNewModal(false)}
      >
        <div className="flex flex-col items-center justify-center gap-[2rem] mt-[1rem]">
          <h3 className="text-center text-[20px]"> Add New Team</h3>
          <div className="flex flex-col w-full gap-2">
            <span>Team Name</span>
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="input focus:outline-none border-1 border-[#21212180] w-full placeholder:font-thin placeholder:text-[14px]"
              placeholder="Team Name"
            />
          </div>
          <div className="flex flex-col w-full ">
            <h3 className="text-center text-[20px]">Add Apps</h3>
            <div className="flex flex-col gap-2 mt-2 overflow-auto max-h-[250px]">
              {appsLoading
                ? "Loading..."
                : apps?.data?.map((app, i) => (
                    <div className="label" key={i}>
                      <span className="font-normal">{app?.title}</span>
                      <input
                        value={app?.id}
                        type="checkbox"
                        className="check checkbox-xs"
                        onChange={handleAddApp}
                        checked={selectedApps.includes(Number(app.id))}
                      />
                    </div>
                  ))}
            </div>
          </div>
          <button
            className="p-4 rounded-md hover:bg-opacity-80 bg-[#003AFF] w-full text-white disabled:bg-opacity-80 disabled:cursor-not-allowed"
            onClick={addApp}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Create Team"}
          </button>
        </div>
      </CustomModal>
    </>
  );
};

export default AddNewTeamModal;
