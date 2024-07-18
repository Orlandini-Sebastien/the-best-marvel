import axios from 'axios';
import { NextResponse } from 'next/server';
const md5 = require('md5');

export async function GET(
	req: Request,
	{ params }: { params: { characterId: string } }
) {
	const { characterId } = params;
	try {
		const publicKey = process.env.NEXT_PUBLIC_API_KEY;
		const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
		const timestamp = '1';
		const hash = md5(timestamp + privateKey + publicKey);

		let params: any = {
			apikey: publicKey,
			ts: timestamp,
			hash: hash,
		};

		// Effectuer les deux requêtes en parallèle
		const [characterResponse, comicsResponse] = await Promise.all([
			axios.get(
				`http://gateway.marvel.com/v1/public/characters/${characterId}/comics`,
				{
					params: params,
					headers: {
						Accept: '*/*',
					},
				}
			),
			axios.get(
				`http://gateway.marvel.com/v1/public/characters/${characterId}`,
				{
					params: params,
					headers: {
						Accept: '*/*',
					},
				}
			),
		]);

		const comicsData = comicsResponse.data;
		const characterData = characterResponse.data;

		// Combiner les résultats dans un seul objet
		const combinedData = {
			characters: comicsData,
			comic: characterData,
		};

		return NextResponse.json(combinedData);
	} catch (error) {
		console.log('[GET_CHARACTER]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
