import { useEffect, useState } from 'react';
import { useLazyGetTeamsQuery, useGetTeamsQuery } from '../services/teams';
import { CgMoreVerticalAlt as BsMenuApp } from 'react-icons/cg';
import { useTeamContext } from '../context/TeamContext.jsx';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

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
	const { data, refetch: getTeams } = useGetTeamsQuery();
	const [teams, setTeams] = useState([defaultActiveTeam]);

	const teamCtx = useTeamContext();
	const [activeTeam, setActiveTeam] = useState(teamCtx?.value || teams[0]);

	useEffect(() => {
		if (data) {
			setTeams([defaultActiveTeam, ...data]);
			setActiveTeam(teamCtx.value || defaultActiveTeam);
		}
	}, [data]);

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

	return (
		<div className="bg-white h-full w-full">
			<div className="flex md:block text-3xl justify-between items-center">
				<p>My Teams</p>
				<button
					className="md:hidden btn btn-ghost"
					onClick={() => setOpen(false)}
				>
					<FaTimes className="text-2xl" />
				</button>
			</div>
			<div className="py-2"></div>
			{teams.map((team) => {
				return (
					<div key={team.name} className="flex items-center justify-between">
						<label htmlFor="" className="label flex gap-x-1">
							<input
								type="radio"
								name="team"
								className="radio radio-xs border"
								checked={team.id == activeTeam.id}
								onChange={(e) => {
									selectTeam(team.id);
								}}
							/>
							{team.name}
						</label>
						{team.id !== undefined && (
							<Link
								to={`/teams/${team.id}`}
								className="btn btn-sm btn-circle btn-ghost pr-5 sm:pr-0"
							>
								<BsMenuApp />
							</Link>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default MyTeams;
