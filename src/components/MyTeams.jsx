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

const MyTeams = () => {
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
		teamCtx.updateValue(team);
	}

	return (
		<TeamContext.Provider value={activeTeam}>
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
							<BsMenuApp />
						</div>
					);
				})}

				<Link to={'/'} className="btn btn-primary w-full rounded-full">
					<BsPlus className='text-[2.5em]' />
					New Team
				</Link>
			</div>
		</TeamContext.Provider>
	);
};

export default MyTeams;
