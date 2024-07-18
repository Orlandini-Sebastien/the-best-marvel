import axios from 'axios';
import { NextResponse } from 'next/server';
const md5 = require('md5');

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const page = searchParams.get('page');
	const title = searchParams.get('title');
	const pageNumber = page ? parseInt(page) : 1;
	try {
		const publicKey = process.env.NEXT_PUBLIC_API_KEY;
		const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
		const timestamp = '1';
		const hash = md5(timestamp + privateKey + publicKey);

		let params: any = {
			offset: (pageNumber - 1) * 20,
			apikey: publicKey,
			ts: timestamp,
			hash: hash,
		};

		// Ajouter le titre aux paramètres uniquement s'il n'est pas vide
		if (title && title !== '') {
			params.titleStartsWith = title;
		}

		const response = await axios.get(
			`http://gateway.marvel.com/v1/public/series`,
			{
				params: params,
				headers: {
					Accept: '*/*',
				},
			}
		);

		const { data } = response;

		return NextResponse.json(data);
	} catch (error) {
		console.log('[GET_STORIES]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
