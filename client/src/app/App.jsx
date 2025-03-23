import Form from "./components/Form";
import Details from "./components/Details";
import { useEffect, useState } from "react";
import ReferralAPI from "../shared/utils/api/referralApi";

import {
  formatPhoneNumber,
  hasEmptyField,
} from "../shared/utils/helpers/purefunctions";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "antd";

function App() {
  const [referralList, setReferralList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [referral, setReferral] = useState({
    given_name: "",
    surname: "",
    email: "",
    phone: "",
    home_name: "",
    street: "",
    suburb: "",
    state: "",
    postcode: "",
    country: "",
  });

  const referralApi = new ReferralAPI();

  useEffect(() => {
    const fetchReferralList = async () => {
      const referralApi = new ReferralAPI();
      const data = await referralApi.getAll();

      setReferralList(
        data.result.map((referralData, index) => {
          return {
            key: index,
            given_name: referralData?.givenName,
            surname: referralData?.surname,
            email: referralData?.email,
            phone: formatPhoneNumber(referralData?.phone),
            id: referralData.id,
          };
        })
      );
    };

    fetchReferralList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReferral((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setReferral({
      given_name: "",
      surname: "",
      email: "",
      phone: "",
      home_name: "",
      street: "",
      suburb: "",
      state: "",
      postcode: "",
      country: "",
    });
  };

  const handleEdit = () => {
    Modal.confirm({
      className: "edit-referral",
      okText: "Update",
      cancelText: "Cancel",
      content: "Are you sure you want save the changes?",
      onOk: async () => {
        let result;
        result = await referralApi.update(referral);

        if (!result.success)
          return toast.error("Unable to update this referral.");

        setReferralList((prevList) =>
          prevList.map((item) =>
            item.id === referral.id ? { ...item, ...referral } : item
          )
        );
        setIsEdit(false);
        handleClear();
        toast.success("Successfully updated.");
      },
      onCancel: () => {},
    });
  };

  const handleCreate = async () => {
    const { home_name, street, suburb, state, postcode, country } = referral;

    const params = {
      givenName: referral.given_name,
      surname: referral.surname,
      email: referral.email,
      phone: referral.phone,
      address: `${home_name} ${street} ${suburb}, ${state} ${postcode}, ${country}`,
    };

    if (hasEmptyField(params)) {
      return toast.error(
        `${Object.keys(params).join(", ").toString()} is required.`
      );
    }

    const result = await referralApi.create(params);

    if (!result.success) {
      return toast.error("Field to create referral.");
    }

    const newReferral = {
      key: referralList.length,
      given_name: referral.given_name,
      surname: referral.surname,
      email: referral.email,
      phone: formatPhoneNumber(referral.phone),
    };

    setReferralList((prevList) => [newReferral, ...prevList]);
    handleClear();
    toast.success("Successfully created.");
  };

  const onClickSave = () => {
    if (isEdit) {
      handleEdit();
    } else {
      handleCreate();
    }
  };

  return (
    <div className="referral__builder__container">
      <ToastContainer />
      <Form
        handleChange={handleChange}
        handleClear={handleClear}
        setReferral={setReferral}
        referral={referral}
        handleCreate={onClickSave}
        isEdit={isEdit}
      />
      <Details
        referralList={referralList}
        setReferralList={setReferralList}
        setReferral={setReferral}
        setIsEdit={setIsEdit}
      />
    </div>
  );
}

export default App;
