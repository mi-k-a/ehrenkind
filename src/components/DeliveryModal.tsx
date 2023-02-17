import { Modal } from "@mantine/core";
import { ReactElement, useContext } from "react";
import { FormikProps } from "formik";
import { delivery } from "../types/types";
import { DeliveriesContext } from "../App";

export const DeliveryModal = ({
  formik,
  children,
}: {
  formik: FormikProps<delivery>;
  children: ReactElement;
}) => {
  const [isOpened, setIsOpened, isEdit, setIsEdit] =
    useContext<any>(DeliveriesContext);

  return (
    <>
      <Modal
        opened={isOpened}
        onClose={() => {
          setIsOpened(false);
          setIsEdit(false);
          formik.resetForm();
        }}
        title={isEdit ? "Lieferung bearbeiten" : "Neue Lieferung erstellen"}
      >
        {children}
      </Modal>
    </>
  );
};
