
import TabBar from "./TabBar";

export default (props) => {

  return (
    <div class={`app`}>
      {props.children}
      <TabBar />
    </div>
  );
};
