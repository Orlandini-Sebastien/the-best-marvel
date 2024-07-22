'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Home = () => {
	const router = useRouter();
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		if (router) {
			setIsReady(true);
		}
	}, [router]);

	return (
		<section>
			<div className="flex gap-4 ">
				{isReady && (
					<>
						<button onClick={() => router.push('/comics')}>
							Go to the comics
						</button>
						<button onClick={() => router.push('/characters')}>
							Go to the characters
						</button>
						<button onClick={() => router.push('/creators')}>
							Go to the creators
						</button>
						<button onClick={() => router.push('/series')}>
							Go to the series
						</button>
						<button onClick={() => router.push('/events')}>
							Go to the events
						</button>
					</>
				)}
			</div>
		</section>
	);
};

export default Home;
