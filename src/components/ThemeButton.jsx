import { useTheme } from "../contexts/theme-context";

export default () => {
  const [data, { toggleTheme }] = useTheme();

  return (
    <button
      class="theme-btn"
      style={`position: absolute; right: 10px;`}
      onClick={toggleTheme}
    >
      {data.theme}
    </button>
  );
};
