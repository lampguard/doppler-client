import React, { useEffect, useState } from "react";
import { CustomModal } from "../../shared/CustomModal";
import { useAddMemberMutation } from "../../services/teams";
import { message } from "antd";

const AddNewMemberModal = ({ showAddNewModal, setShowAddNewModal }) => {
  const [teamMember, setTeamMember] = useState("");
  const [addMember, { isLoading: addMemberLoading, isSuccess, isError }] =
    useAddMemberMutation();

  const handleAddMember = async () => {
    await addMember({
      email: teamMember,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Team Member Added successfully");
      setShowAddNewModal(false);
    } else if (isError) {
      message.error("Something went wrong");
    }
  }, [isSuccess, setShowAddNewModal, isError]);
  return (
    <>
      <CustomModal
        title=""
        isModalOpen={showAddNewModal}
        handleOk={() => setShowAddNewModal(false)}
        handleCancel={() => setShowAddNewModal(false)}
        closeIcon={false}
      >
        <div className="flex flex-col items-center justify-center gap-[2rem] mt-[1rem]">
          <h3 className="text-center text-[20px]"> Add New Team</h3>
          <div className="flex flex-col w-full gap-2">
            <span>Add New Member</span>
            <input
              type="text"
              value={teamMember}
              onChange={(e) => setTeamMember(e.target.value)}
              className="input focus:outline-none border-1 border-[#21212180] w-full placeholder:font-thin placeholder:text-[14px]"
              placeholder="Team Name"
            />
          </div>

          <button
            className="btn bg-[#003AFF] w-full text-white disabled:bg-opacity-10 disabled:cursor-not-allowed"
            onClick={handleAddMember}
            disabled={addMemberLoading}
          >
            {addMemberLoading ? "Loading..." : "Add Member"}
          </button>
        </div>
      </CustomModal>
    </>
  );
};

export default AddNewMemberModal;
