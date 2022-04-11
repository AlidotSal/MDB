import { createResource } from "solid-js";
import fetchAll from "../../utils/fetchAll";

export default function HomeData() {
	const fetchData = async () => {
		const urls = [
			`https://api.themoviedb.org/3/movie/upcoming?api_key=d0278f3771ae9e001fe1e92efaa54a42&region=US`,
			`https://api.themoviedb.org/3/trending/movie/day?api_key=d0278f3771ae9e001fe1e92efaa54a42`,
			`https://api.themoviedb.org/3/trending/tv/day?api_key=d0278f3771ae9e001fe1e92efaa54a42`,
			`https://api.themoviedb.org/3/trending/all/week?api_key=d0278f3771ae9e001fe1e92efaa54a42`,
			"https://movie-quote-api.herokuapp.com/v1/quote/",
		];
		const [upcoming, dailyMovies, dailyShows, weekly, quote] = await fetchAll(
			urls,
		);
		return { upcoming, dailyMovies, dailyShows, weekly, quote };
	};

	const [data] = createResource(() => `trending`, fetchData);
	return data;
}
