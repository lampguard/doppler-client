import { useEffect, useState } from 'react';
import { useLazyGetTeamsQuery } from '../services/teams';
import { CgMoreVerticalAlt as BsMenuApp } from 'react-icons/cg';
import { useTeamContext } from '../context/TeamContext.jsx';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { Popover } from 'antd';
import AddNewMemberModal from './MyTeam/AddNewMember.jsx';
import AddNewAppModal from './MyTeam/AddNewApp.jsx';

const defaultActiveTeam = {
	id: undefined,
	name: 'All Teams',
	selected: true,
};

/**
 * @type {React.FC<{open: boolean, setOpen: (state: boolean) => void}>} MyTeams
 *
 */
const MyTeams = ({ setOpen }) => {
	const [getTeams, { isLoading: teamsLoading }] = useLazyGetTeamsQuery();
	const [teams, setTeams] = useState([defaultActiveTeam]);
	const navigate = useNavigate();
	const teamCtx = useTeamContext();
	const [activeTeam, setActiveTeam] = useState(teamCtx?.value || teams[0]);
	const popoverLinksStyling = 'cursor-pointer hover:underline w-full font-400';

	useEffect(() => {
		getTeams()
			.unwrap()
			.then((response) => {
				setTeams([defaultActiveTeam, ...response]);
				setActiveTeam(teamCtx.value || defaultActiveTeam);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	function selectTeam(id) {
		const team = teams.find((team) => team.id == id);
		setTeams(
			teams.map((team) => {
				return { ...team, selected: team.id == id };
			})
		);
		setActiveTeam(team);
		setOpen(false);
		teamCtx.updateValue(team);
	}

	const [showAddNewMemberModal, setShowAddNewMemberModal] = useState(false);
	const [showAddNewAppModal, setShowAddNewAppModal] = useState(false);

	return (
		<>
			{showAddNewMemberModal && (
				<AddNewMemberModal showAddNewModal={showAddNewMemberModal} setShowAddNewModal={setShowAddNewMemberModal} />
			)}
			{showAddNewAppModal && (
				<AddNewAppModal showAddNewModal={showAddNewAppModal} setShowAddNewModal={setShowAddNewAppModal} />
			)}
			<div className="bg-white h-full w-full">
				<div className="flex md:block text-3xl justify-between items-center">
					<p>My Teams</p>
					<button className="md:hidden btn btn-ghost" onClick={() => setOpen(false)}>
						<FaTimes className="text-2xl" />
					</button>
				</div>
				<div className="py-2"></div>
				<div className="flex flex-col gap-2">
					{teamsLoading ? (
						<>
							<span>Loading...</span>
						</>
					) : (
						teams?.map((team) => {
							return (
								<div key={team.name} className="flex items-center justify-between">
									<label htmlFor="" className="label flex gap-x-1">
										<input
											type="radio"
											name="team"
											className="radio radio-xs border"
											checked={team?.id == activeTeam.id}
											onChange={(e) => {
												selectTeam(team.id);
											}}
										/>
										{team?.name}
									</label>
									{team.id !== undefined && (
										<>
											<AddNewAppModal id={team?.id} />
											<AddNewMemberModal id={team?.id} name={team.name} />
											<Popover
												placement="bottomRight"
												arrow={false}
												content={
													<div className="w-[200px] flex flex-col gap-5">
														<p onClick={() => navigate(`/teams/${team?.id}`)} className={popoverLinksStyling}>
															Team Info
														</p>
														<p
															className={popoverLinksStyling}
															onClick={() => {
																// sessionStorage.setItem('teamId', team?.id);
																// setShowAddNewAppModal(true);
																document.getElementById(`add-app-modal-${team?.id}`).showModal();
															}}
															>
															Add App
														</p>
														<p
															className={popoverLinksStyling}
															onClick={() => {
																document.getElementById(`add-member-modal-${team?.id}`).showModal();
															}}
														>
															Add Members
														</p>
														<p className={popoverLinksStyling}>Rename Team</p>
														<p className={popoverLinksStyling}>Dissolve Team</p>
													</div>
												}
												trigger="hover"
											>
												<span className="btn btn-sm btn-circle btn-ghost pr-5 sm:pr-0 cursor-pointer">
													<BsMenuApp />
												</span>
											</Popover>
										</>
									)}
								</div>
							);
						})
					)}
				</div>
			</div>
		</>
	);
};

export default MyTeams;
