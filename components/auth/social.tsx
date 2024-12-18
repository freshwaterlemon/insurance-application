'use client';

import { GoogleLogin } from '../../app/actions/google';
import { FaGoogle } from 'react-icons/fa';

export const Social = () => {
	return (
		<div>
			<form action={GoogleLogin}>
				<FaGoogle />
				<button type="submit">Sign In with Google</button>
			</form>
		</div>
	);
};
