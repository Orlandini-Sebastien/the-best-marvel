'use client';

import { useRouter } from 'next/navigation';

const Home = () => {
	const router = useRouter();

	return (
		<section>
			<div className="flex gap-4 ">
				<button onClick={() => router.push('/comics')}>Go to the comics</button>
				<button onClick={() => router.push('/characters')}>
					Go to the characters
				</button>
				<button onClick={() => router.push('/creators')}>
					Go to the creators
				</button>
				<button onClick={() => router.push('/series')}>Go to the series</button>
				<button onClick={() => router.push('/events')}>Go to the events</button>
			</div>
		</section>
	);
};

export default Home;
