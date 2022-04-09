import "./videos.css";

export default (props) => {
  return (
    <div class="videos">
      <h3>VIDEOS:</h3>
      <div>
        <For each={props.videos}>
          {(video) => {
            return (
              <iframe
                src={`https://www.youtube.com/embed/${video.key}`}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            );
          }}
        </For>
      </div>
    </div>
  );
};
