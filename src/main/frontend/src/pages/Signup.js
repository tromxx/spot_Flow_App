import React, { useEffect, useState } from "react";
import PolicyModal from "../utils/PolicyModal";
import LocationPolicy from "../dataSet/LocationPolicy"
import SpotFlowPolicy from "../dataSet/SpotFlowPolicy"
import SignupContainer from "../components/SignUp/SignUpBox";


const Signup = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState();
  const [confirmFirstPolicy, setConfirmFirstPolicy] = useState(false);
  const [confirmSecondPolicy, setConfirmSecondPolicy] = useState(false);

  useEffect(() => {
    setModalOpen(true);
    setText(<LocationPolicy />);
  }, []);

  const handleConfirmFirstPolicy = () => {
    setText(<SpotFlowPolicy/>);
    setConfirmFirstPolicy(true);
  };

  const handleConfirmSecondPolicy = () => {
    setConfirmSecondPolicy(true);
    setModalOpen(false);
  };

  return (
    <>
      <SignupContainer confirmFirstPolicy={confirmFirstPolicy} confirmSecondPolicy={confirmSecondPolicy}/>
      <PolicyModal
        type={true}
        open={modalOpen}
        children={text}
        confirm={confirmFirstPolicy ? handleConfirmSecondPolicy : handleConfirmFirstPolicy}
        close={() => setModalOpen(false)}
      />
    </>
  );
};

export default Signup;