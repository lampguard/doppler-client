import React, { useEffect } from 'react';
import { useLazyGetFlagsQuery } from '../services/flags';
import { useState } from 'react';
import { BsFlag } from 'react-icons/bs';
import { format } from 'date-fns';

const Flags = () => {
	const [getFlags, { isLoading }] = useLazyGetFlagsQuery();
	const [flags, setFlags] = useState([]);

	useEffect(() => {
		getFlags()
			.unwrap()
			.then((data) => {
				console.log(data);
				setFlags(data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<>
			<h1>Tasks</h1>

			{flags.map((flag) => (
				<React.Fragment key={flag.id}>
          <div className='flex items-center justify-evenly'>
            <span><BsFlag/></span>
            <span className='truncate w-2/3'>{flag.log.text}</span>
            <span>{format(flag.createdAt,'d/M/y')}</span>
          </div>
        </React.Fragment>
			))}
		</>
	);
};

export default Flags;
