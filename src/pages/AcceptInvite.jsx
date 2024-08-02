import { useEffect } from 'react';
import Loader from '../components/Loaders';
import { useAcceptInviteMutation } from '../services/teams';
import { useSearchParams } from 'react-router-dom';
import { notification } from 'antd';

const AcceptInvite = () => {
	const [params] = useSearchParams();
	const [accept, { isLoading, isUninitialized }] = useAcceptInviteMutation();

	useEffect(() => {
		accept({
			email: params.get('email'),
			token: params.get('token'),
		})
			.then((result) => {
				notification.success({
					message: 'Success',
					duration: 3,
				});
			})
			.catch((err) => {
				notification.error({
					message: 'An error occurred',
					duration: 3,
				});
			});
	}, []);

	return <div>{isLoading || (isUninitialized && <Loader />)}</div>;
};

export default AcceptInvite;
