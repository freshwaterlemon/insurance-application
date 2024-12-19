'use client';

import { GoogleLogin } from '../../app/actions/google';
import { FaGoogle } from 'react-icons/fa';
import { Button } from '../ui/button';

export const Social = () => {
	return (
		<div>
			<form action={GoogleLogin}>

				<Button variant="outline" className="w-full">
					<FaGoogle />
					Login with Google
				</Button>
			</form>
		</div>
	);
};
