import { useEffect, useState } from "react";

const EditedToast = ({ show, txt }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className="toast show position-fixed top-0 start-50 translate-middle-x mt-3 bg-success text-white"
      role="alert"
      style={{ zIndex: 9999, minWidth: "200px" }}
    >
      <div className="toast-body text-center">
        {txt}
      </div>
    </div>
  );
};

export default EditedToast;
