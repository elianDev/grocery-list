import React from "react";

interface Props extends Alert {
  list: Item[];
  showAlert: () => void;
}

const Alert = ({ type, msg, showAlert, list }: Props) => {
  React.useEffect(() => {
    const timeout = setTimeout(() => showAlert(), 2000);
    return () => clearTimeout(timeout);
  }, [list]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
