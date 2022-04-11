import { createResource } from "solid-js";
import fetchAll from "../../utils/fetchAll";

export default function MovieData({ params }) {
	const fetchData = async () => {
		const url = `https://api.themoviedb.org/3/find/${params.id}?api_key=d0278f3771ae9e001fe1e92efaa54a42&language=en-US&external_source=imdb_id`;
		const d = await fetch(url).then((r) => r.json());
		const tmdb_id = d.movie_results[0].id;
		const addintionalUrls = [
			`https://www.omdbapi.com/?apikey=bfd0caba&i=${params.id}`,
			`https://api.themoviedb.org/3/movie/${tmdb_id}?api_key=d0278f3771ae9e001fe1e92efaa54a42`,
			`https://api.themoviedb.org/3/movie/${tmdb_id}/videos?api_key=d0278f3771ae9e001fe1e92efaa54a42&language=en-US`,
			`https://api.themoviedb.org/3/movie/${tmdb_id}/credits?api_key=d0278f3771ae9e001fe1e92efaa54a42&language=en-US`,
			`https://api.themoviedb.org/3/movie/${tmdb_id}/recommendations?api_key=d0278f3771ae9e001fe1e92efaa54a42&language=en-US&page=1`,
		];
		const [odata, tdata, videos, crew, recommendations] = await fetchAll(
			addintionalUrls,
		);
		return { odata, tdata, videos, crew, recommendations };
	};

	const [data] = createResource(() => `movie/${params.id}`, fetchData);
	return data;
}
