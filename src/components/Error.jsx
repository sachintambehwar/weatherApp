import "../css/Error.css";

const Error = ({
  message = "Something went wrong. Please try again later.",
}) => {
  return (
    <div className="fullpage-error">
      <div className="error-box">
        <div className="error-icon">⚠️</div>
        <p className="error-message">{message}</p>
      </div>
    </div>
  );
};

export default Error;
