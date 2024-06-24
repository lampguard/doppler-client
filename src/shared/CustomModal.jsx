import { Modal } from "antd";

export const CustomModal = ({
  children,
  isModalOpen,
  handleOk,
  handleCancel,
  title,
  ...props
}) => {
  return (
    <Modal
      style={{
        border: "1px solid #000",
        borderRadius: "10px",
      }}
      okButtonProps={{
        style: {
          display: "none",
        },
      }}
      cancelButtonProps={{
        style: {
          display: "none",
        },
      }}
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      {...props}
    >
      {children}
    </Modal>
  );
};
