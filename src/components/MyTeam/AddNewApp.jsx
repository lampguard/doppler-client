import React, { useEffect, useState } from 'react';
import { CustomModal } from '../../shared/CustomModal';
import { useGetAppsQuery } from '../../services';
import {
	useGetTeamQuery,
	useNewTeamMutation,
	useGetTeamAppsQuery,
	useAddAppToTeamMutation,
	useLazyGetTeamAppsQuery,
} from '../../services/teams';
import { notification } from 'antd';
import Modal from '../Modal';
import Loader from '../Loaders';

// const AddNewAppModal = ({ showAddNewModal, setShowAddNewModal }) => {
//   const teamId = sessionStorage.getItem("teamId");
//   const { data: apps, isLoading: appsLoading } = useGetTeamAppsQuery(teamId);
//   const [selectedApps, setSelectedApps] = useState([]);
//   const [newApp, { isLoading, isSuccess, isError, error }] =
//     useNewTeamMutation();

//   const { data: team } = useGetTeamQuery(teamId);
//   const handleAddApp = (e) => {
//     const { value } = e.target;
//     if (selectedApps.includes(Number(value))) {
//       setSelectedApps(selectedApps.filter((app) => app != value));
//     } else {
//       setSelectedApps([...selectedApps, Number(value)]);
//     }
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       setShowAddNewModal(false);
//       message.success("App Added successfully");
//     } else if (isError) {
//       message.error(error?.data?.message || error?.data?.error);
//     }
//   }, [isSuccess, setShowAddNewModal, isError]);

//   const addApp = () => {
//     newApp({
//       name: team?.name,
//       apps: selectedApps,
//     });
//   };

//   return (
//     <>
//       <CustomModal
//         isModalOpen={showAddNewModal}
//         handleOk={() => setShowAddNewModal(false)}
//         handleCancel={() => setShowAddNewModal(false)}
//       >
//         <div className="flex flex-col items-center justify-center gap-[2rem] mt-[1rem]">
//           <div className="flex flex-col w-full ">
//             <h3 className="text-center text-[20px]">Add Apps</h3>
//             <div className="flex flex-col gap-2 mt-2 overflow-auto max-h-[250px]">
//               {apps?.data?.length === 0 ? (
//                 <>
//                   <p className="text-center">
//                     You haven't created any apps yet. Why are you even creating
//                     teams?
//                   </p>
//                 </>
//               ) : appsLoading ? (
//                 "Loading..."
//               ) : (
//                 apps?.data?.map((app, i) => (
//                   <div className="label" key={i}>
//                     <span className="font-normal">{app?.title}</span>
//                     <input
//                       type="checkbox"
//                       name="apps"
//                       value={app?.id}
//                       className="check checkbox-xs"
//                       onChange={handleAddApp}
//                       checked={selectedApps.includes(Number(app.id))}
//                     />
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//           <button
//             className="p-4 rounded-md hover:bg-opacity-80 bg-[#003AFF] w-full text-white disabled:bg-opacity-80 disabled:cursor-not-allowed"
//             onClick={addApp}
//             disabled={isLoading}
//           >
//             {isLoading ? "Adding..." : "Add App"}
//           </button>
//         </div>
//       </CustomModal>
//     </>
//   );
// };

const AddNewAppModal = ({ id }) => {
	const { data: globalApps, isLoading: loadingApps } = useGetAppsQuery();
	const [getApps, { data: teamApps }] = useLazyGetTeamAppsQuery(id);
	const [addApp, { isLoading: loading }] = useAddAppToTeamMutation();

	useEffect(() => {
		if (id) {
			getApps(id);
		}
	}, [id]);

	const [addAppForm, setAddAppForm] = useState({
		app: '',
		team: id,
	});

	return (
		<Modal id={`add-app-modal-${id}`} withClose className="text-center py-[60px]">
			<p className="text-3xl">Add App</p>
			<div className="pt-[60px] pb-[30px] text-left">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						addApp(addAppForm)
							.unwrap()
							.then(() => {
								document.getElementById(`add-app-modal-${id}`).close();
								setAddAppForm({ ...addAppForm, app: '' });
								notification.success({
									message: 'App added to team',
									duration: 3,
								});
							})
							.catch((err) => {
								console.error(err);
								notification.error({
									message: err?.data.message || 'error occurred',
									duration: 3,
								});
							});
					}}
				>
					{loadingApps ? (
						<Loader />
					) : (
						globalApps?.data
							?.filter((app) => teamApps?.map((t) => t.id).includes(app.id) == false)
							.map((app) => {
								return (
									<React.Fragment key={app.id}>
										<label htmlFor="" key={app.id} className="flex justify-between py-1">
											<span>{app.title}</span>
											<input
												type="radio"
												name="app-select"
												className="radio radio-xs"
												value={app.id}
												onChange={(e) => {
													setAddAppForm({ ...addAppForm, app: e.target.value });
												}}
											/>
										</label>
									</React.Fragment>
								);
							})
					)}
					<div className="py-3"></div>
					<button className="btn btn-primary w-full" type="submit">
						{loading ? <Loader theme={false} /> : 'Add'}
					</button>
				</form>
			</div>
		</Modal>
	);
};

export default AddNewAppModal;
