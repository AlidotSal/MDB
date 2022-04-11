import { createResource } from "solid-js";
import fetchAll from "../../utils/fetchAll";

export default function MovieData({ params }) {
	const fetchData = async () => {
		const urls = [
			`https://api.themoviedb.org/3/person/${params.id}?api_key=d0278f3771ae9e001fe1e92efaa54a42`,
			`https://api.themoviedb.org/3/person/${params.id}/combined_credits?api_key=d0278f3771ae9e001fe1e92efaa54a42`,
			`https://api.themoviedb.org/3/person/${params.id}/images?api_key=d0278f3771ae9e001fe1e92efaa54a42`,
			`https://api.themoviedb.org/3/person/${params.id}/external_ids?api_key=d0278f3771ae9e001fe1e92efaa54a42&language=en-US`,
		];
		const [info, credit, images, externals] = await fetchAll(urls);
		return { info, credit, images, externals };
	};

	const [data] = createResource(() => `movie/${params.id}`, fetchData);
	return data;
}
