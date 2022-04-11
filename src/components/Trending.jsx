import List from "./List";

export default (props) => {

  return (
    <main class="home-lists">
      <div class="upcoming">
        <h3>Coming Soon To Theaters:</h3>
        {props.data.upcoming && <List list={props.data.upcoming.results} />}
      </div>
      <div class="trending">
        <h3 class="mt-8">Trending</h3>
        <h4 class="mt-4">Movies:</h4>
        {props.data.dailyMovies && <List list={props.data.dailyMovies.results} lazy={false} />}
        <h4 class="mt-4">TV Shows:</h4>
        {props.data.dailyShows && <List list={props.data.dailyShows.results} lazy={false} />}
        <h4 class="mt-4">Weekly:</h4>
        {props.data.weekly && <List list={props.data.weekly.results} />}
      </div>
    </main>
  );
};
