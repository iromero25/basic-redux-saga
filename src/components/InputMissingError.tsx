import React from "react";

const InputMissingError: React.FC = () => {
  return (
    <>
      <br />
      <div style={{ marginTop: 5, marginBottom: -10 }}>
        <span style={{ color: "red" }}>
          Either the title or the content are missing, make sure both are specifed.
        </span>
      </div>
      <br />
    </>
  );
};

export default InputMissingError;
