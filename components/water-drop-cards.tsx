import React from 'react';
import WaterDropCard from './water-drop-card';
import { Character } from '@/type';

interface WaterDropCardsProps {
	items: Character[];
}

const WaterDropCards: React.FC<WaterDropCardsProps> = ({ items }) => {
	// Fonction pour diviser les éléments en lignes de 2 et 3 colonnes
	const getRows = (items: Character[]) => {
		const rows: Character[][] = [];
		let i = 0;
		while (i < items.length) {
			if (i % 5 < 3) {
				// Ajouter une ligne de 3 éléments
				rows.push(items.slice(i, i + 3));
				i += 3;
			} else {
				// Ajouter une ligne de 2 éléments
				rows.push(items.slice(i, i + 2));
				i += 2;
			}
		}
		return rows;
	};

	const rows = getRows(items);

	return (
		<div className="flex justify-center items-center flex-col space-y-4">
			{rows.map((row, rowIndex) => (
				<div
					key={rowIndex}
					className={`grid gap-4 ${
						row.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
					} max-xl:grid-cols-2 max-lg:grid-cols-1`}
				>
					{row.map((item) => (
						<WaterDropCard item={item} key={item.id} />
					))}
				</div>
			))}
		</div>
	);
};

export default WaterDropCards;
