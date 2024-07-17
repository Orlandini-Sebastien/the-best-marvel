'use client';

import { useRouter } from 'next/navigation';

import WaterDropCard from '@/components/water-drop-card';

const Home = () => {
	const router = useRouter();

	// Génère des données pour simuler les cartes
	const cards: number[] = Array.from({ length: 18 }, (_, index) => index + 1);

	// Fonction pour diviser les cartes en lignes de 2 et 3 colonnes
	const getRows = (cards: number[]) => {
		const rows = [];
		let i = 0;
		while (i < cards.length) {
			if (i % 5 < 3) {
				// Ajouter une ligne de 3 cartes
				rows.push(cards.slice(i, i + 3));
				i += 3;
			} else {
				// Ajouter une ligne de 2 cartes
				rows.push(cards.slice(i, i + 2));
				i += 2;
			}
		}
		return rows;
	};

	const rows = getRows(cards);

	return (
		<section>
			<div className="flex gap-4 ">
				<button onClick={() => router.push('/comics')}>Go to the comics</button>
				<button onClick={() => router.push('/characters')}>
					Go to the characters
				</button>
			</div>

			<div className="flex justify-center items-center flex-col space-y-4">
				{rows.map((row, rowIndex) => (
					<div
						key={rowIndex}
						className={`grid  ${
							row.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
						} max-xl:grid-cols-2 max-lg:grid-cols-1`}
					>
						{row.map((card) => (
							<WaterDropCard key={card} />
						))}
					</div>
				))}
			</div>
		</section>
	);
};

export default Home;
