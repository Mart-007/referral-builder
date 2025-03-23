import { Button, Input } from "antd";
import React from "react";
import InputForm from "../../shared/components/InputForm";

const Form = ({ handleChange, referral, handleCreate, isEdit }) => {
  const title = isEdit ? "Edit Referral" : "Referral Builder";

  return (
    <div className="form__container">
      <div className="title">{title}</div>
      <div className="content">
        <div className="header personal-details">PERSONAL DETAILS</div>
        <div className="fields">
          <InputForm
            label="GIVEN NAME"
            type="text"
            name="given_name"
            className="given-name"
            value={referral.given_name}
            onChange={(e) => handleChange(e)}
          />
          <InputForm
            label="SURNAME"
            type="text"
            name="surname"
            className="surname"
            value={referral.surname}
            onChange={(e) => handleChange(e)}
          />
          <InputForm
            label="EMAIL"
            type="email"
            name="email"
            className="email"
            value={referral.email}
            onChange={(e) => handleChange(e)}
          />
          <InputForm
            label="PHONE"
            type="number"
            name="phone"
            className="phone"
            value={referral.phone}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="header address">ADDRESS</div>
        <div className="fields">
          <InputForm
            label="HOME NAME OR #"
            type="text"
            name="home_name"
            className="home-name"
            value={referral.home_name}
            onChange={(e) => handleChange(e)}
          />
          <InputForm
            label="STREET"
            type="text"
            name="street"
            className="street"
            value={referral.street}
            onChange={(e) => handleChange(e)}
          />
          <InputForm
            label="SUBURB"
            type="text"
            name="suburb"
            className="suburb"
            value={referral.suburb}
            onChange={(e) => handleChange(e)}
          />
          <InputForm
            label="STATE"
            type="text"
            name="state"
            className="state"
            value={referral.state}
            onChange={(e) => handleChange(e)}
          />
          <InputForm
            label="POSTCODE"
            type="text"
            name="postcode"
            className="postcode"
            value={referral.postcode}
            onChange={(e) => handleChange(e)}
          />
          <InputForm
            label="COUNTRY"
            type="text"
            name="country"
            className="country"
            value={referral.country}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className="buttons">
        <Button className="upload">UPLOAD AVATAR</Button>
        <Button className="create" onClick={handleCreate}>
          CREATE REFERRAL
        </Button>
      </div>
    </div>
  );
};

export default Form;
