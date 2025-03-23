import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import ReferralAPI from "../../shared/utils/api/referralApi";
import { toast } from "react-toastify";

const Details = ({ referralList, setReferralList, setReferral, setIsEdit }) => {
  const referralApi = new ReferralAPI();

  const handleDelete = (data) => {
    Modal.confirm({
      className: "delete-referral",
      okText: "Delete",
      cancelText: "Cancel",
      content: "Are you sure you want to delete this referral?",
      onOk: async () => {
        let result;
        result = await referralApi.delete(data.id);

        if (!result.success)
          return toast.error("Unable to delete this referral.");

        setReferralList((prevList) =>
          prevList.filter((item) => item.id !== data.id)
        );

        toast.success("Successfully deleted.");
      },
      onCancel: () => {},
    });
  };

  const handleEdit = async (data) => {
    setIsEdit(true);
    setReferral({
      id: data.id,
      given_name: data.given_name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
    });
  };

  const columns = [
    {
      title: "GIVEN NAME",
      dataIndex: "given_name",
    },
    {
      title: "SURNAME",
      dataIndex: "surname",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
    },
    {
      title: "PHONE",
      dataIndex: "phone",
    },
    {
      title: "ACTIONS",
      key: "action",
      render: (_, data) => (
        <Space size="middle">
          <EditOutlined onClick={() => handleEdit(data)} />
          <DeleteOutlined onClick={() => handleDelete(data)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="details__container">
      <Table
        columns={columns}
        dataSource={referralList}
        size="small"
        pagination={false}
        style={{ minHeight: "100%" }}
      />
    </div>
  );
};

export default Details;
