import { useContext, useEffect, useState } from 'react';
import { useLazyGetTeamsQuery } from '../services/teams';
import { BsMenuApp, BsPlus } from 'react-icons/bs';
import { TeamContext, useTeamContext } from '../context/TeamContext.jsx';
import { Link } from 'react-router-dom';

const defaultActiveTeam = {
	id: undefined,
	name: 'All Teams',
	selected: true,
};

/**
 * @type {React.FC<{open: boolean, setOpen: (state: boolean) => void}>} MyTeams
 *
 */
const MyTeams = ({ open, setOpen }) => {
	const [getTeams] = useLazyGetTeamsQuery();
	const [teams, setTeams] = useState([defaultActiveTeam]);

	const teamCtx = useTeamContext();
	const [activeTeam, setActiveTeam] = useState(teamCtx?.value || teams[0]);

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

	return (
		<div className="bg-white h-full w-full">
			<p className="text-3xl">My Teams</p>
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
							<Link to={`/teams/${team.id}`}>
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
