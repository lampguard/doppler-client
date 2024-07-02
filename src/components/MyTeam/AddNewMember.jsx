import React, { useEffect, useState } from 'react';
import { CustomModal } from '../../shared/CustomModal';
import { useAddMemberMutation } from '../../services/teams';
import Modal from '../Modal';
import TextInput from '../Input/TextInput';
import Loader from '../Loaders';
import { notification } from 'antd';

// const AddNewMemberModal = ({ showAddNewModal, setShowAddNewModal }) => {
//   const [teamMember, setTeamMember] = useState("");
//   const [addMember, { isLoading: addMemberLoading, isSuccess, isError }] =
//     useAddMemberMutation();

//   const handleAddMember = async () => {
//     await addMember({
//       email: teamMember,
//     });
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       message.success("Team Member Added successfully");
//       setShowAddNewModal(false);
//     } else if (isError) {
//       message.error("Something went wrong");
//     }
//   }, [isSuccess, setShowAddNewModal, isError]);
//   return (
//     <>
//       <CustomModal
//         title=""
//         isModalOpen={showAddNewModal}
//         handleOk={() => setShowAddNewModal(false)}
//         handleCancel={() => setShowAddNewModal(false)}
//         closeIcon={false}
//       >
//         <div className="flex flex-col items-center justify-center gap-[2rem] mt-[1rem]">
//           <h3 className="text-center text-[20px]"> Add New Team</h3>
//           <div className="flex flex-col w-full gap-2">
//             <span>Add New Member</span>
//             <input
//               type="text"
//               value={teamMember}
//               onChange={(e) => setTeamMember(e.target.value)}
//               className="input focus:outline-none border-1 border-[#21212180] w-full placeholder:font-thin placeholder:text-[14px]"
//               placeholder="Team Name"
//             />
//           </div>

//           <button
//             className="btn bg-[#003AFF] w-full text-white disabled:bg-opacity-10 disabled:cursor-not-allowed"
//             onClick={handleAddMember}
//             disabled={addMemberLoading}
//           >
//             {addMemberLoading ? "Loading..." : "Add Member"}
//           </button>
//         </div>
//       </CustomModal>
//     </>
//   );
// };

const AddNewMemberModal = ({ id, name }) => {
	const [addMemberForm, setAddMemberForm] = useState({
		team: id,
	});

	const [addMember, { isLoading: addMemberLoading }] = useAddMemberMutation();

	return (
		<>
			<Modal id={`add-member-modal-${id}`} withClose className="text-center py-[60px]">
				<p className="text-3xl">Add New Member to {name}</p>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						addMember(addMemberForm)
							.unwrap()
							.then((response) => {
								document.getElementById(`add-member-modal-${id}`).close();
								notification.success({
									message: 'Invite sent',
									duration: 3,
								});
							})
							.catch((err) => {
								console.error(err);
								notification.error({
									message: err.data?.message || err.message || 'An error occurred',
									duration: 3,
								});
							})
							.finally(() => {
								setAddMemberForm({ ...addMemberForm, email: '' });
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
							onChange={(e) => setAddMemberForm({ ...addMemberForm, email: e.target.value })}
						/>
					</div>
					<button className="btn btn-primary w-full" disabled={addMemberLoading} type="submit">
						{addMemberLoading ? <Loader theme={false} /> : 'Submit'}
					</button>
				</form>
			</Modal>
		</>
	);
};

export default AddNewMemberModal;
