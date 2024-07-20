import axios from 'axios';
import { NextResponse } from 'next/server';
const md5 = require('md5');

// Cache en mémoire
const cache = new Map();

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const page = searchParams.get('page');
	const title = searchParams.get('title');
	const pageNumber = page ? parseInt(page) : 1;
	const cacheKey = `stories-${pageNumber}-${title}`;

	// Vérification du cache
	if (cache.has(cacheKey)) {
		return NextResponse.json(cache.get(cacheKey));
	}

	try {
		const publicKey = process.env.NEXT_PUBLIC_API_KEY;
		const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
		const timestamp = '1';
		const hash = md5(timestamp + privateKey + publicKey);

		let params: any = {
			offset: (pageNumber - 1) * 20,
			limit: 20, // Limite le nombre de résultats à 20 par page
			apikey: publicKey,
			ts: timestamp,
			hash: hash,
		};

		// Ajouter le titre aux paramètres uniquement s'il n'est pas vide
		if (title && title !== '') {
			params.nameStartsWith = title;
		}

		const response = await axios.get(
			`https://gateway.marvel.com/v1/public/stories`,
			{
				params: params,
				headers: {
					Accept: 'application/json',
				},
			}
		);

		const { data } = response;

		// Stocker la réponse dans le cache
		cache.set(cacheKey, data);

		return NextResponse.json(data);
	} catch (error) {
		console.log('[GET_STORIES]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
