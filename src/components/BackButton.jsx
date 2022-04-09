import backArrowLight from "../assets/images/back-arrow-light.svg";
import backArrowDark from "../assets/images/back-arrow-dark.svg";
import "./back-button.css";

export default () => {

  return (
    <button
      class='button-back'
      onClick={() => window.history.back()}
    >
      <img
        src={backArrowLight}
        alt="Go back"
      />
    </button>
  );
};
