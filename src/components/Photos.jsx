import "./photos.css";

export default (props) => {
  return (
    <div class="photos">
      <h3>Photos:</h3>
      <div>
        <For each={props.photos}>
          {(photo) => {
            return (
              <img
                src={`https://image.tmdb.org/t/p/w200${photo.file_path}`}
                alt=""
              />
            );
          }}
        </For>
      </div>
    </div>
  );
};
