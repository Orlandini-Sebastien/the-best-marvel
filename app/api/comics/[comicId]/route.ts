import axios from 'axios';
import { NextResponse } from 'next/server';
const md5 = require('md5');

export async function GET(
	req: Request,
	{ params }: { params: { comicId: string } }
) {
	const { comicId } = params;
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
         const [charactersResponse, comicResponse] = await Promise.all([
            axios.get(`http://gateway.marvel.com/v1/public/comics/${comicId}/characters`, {
                params: params,
                headers: {
                    Accept: '*/*',
                },
            }),
            axios.get(`http://gateway.marvel.com/v1/public/comics/${comicId}`, {
                params: params,
                headers: {
                    Accept: '*/*',
                },
            })
        ]);

        const charactersData = charactersResponse.data;
        const comicData = comicResponse.data;

        // Combiner les résultats dans un seul objet
        const combinedData = {
            characters: charactersData,
            comic: comicData,
        };

        return NextResponse.json(combinedData);
	} catch (error) {
		console.log('[GET_COMIC]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
