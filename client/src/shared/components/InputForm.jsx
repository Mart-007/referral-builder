import { Input, Typography } from "antd";
import React from "react";

const InputForm = ({ label, type, className, name, value, onChange }) => {
  return (
    <div className="input__form">
      <Typography.Title level={5}>{label}</Typography.Title>
      <Input
        type={type}
        className={className}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputForm;
