import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { delivery } from "../types/types";

export const useDeliveryForm = ({
  isEdit,
  setIsEdit,
  setIsOpened,
  deliveries,
  setDeliveries,
}: {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  deliveries: delivery[];
  setDeliveries: React.Dispatch<delivery[]>;
}) => {
  const formik = useFormik<delivery>({
    initialValues: {
      id: "",
      orderNumber: "",
      status: "",
    },
    validationSchema: Yup.object({
      orderNumber: Yup.string().required("Required"),
      status: Yup.string().required("Required"),
    }),

    onSubmit: (values) => {
      if (!isEdit) {
        if (deliveries) {
          const updatedDeliveries = [
            ...deliveries,
            {
              id: uuidv4(),
              orderNumber: values.orderNumber,
              status: values.status,
            },
          ];

          setDeliveries(updatedDeliveries);
          localStorage.setItem("deliveries", JSON.stringify(updatedDeliveries));
        } else {
          localStorage.setItem("deliveries", JSON.stringify([values]));
          setDeliveries([values]);
        }
      }

      if (isEdit) {
        const updatedData = deliveries?.map((delivery: delivery) =>
          delivery.id === values.id
            ? {
                ...delivery,
                orderNumber: values.orderNumber,
                status: values.status,
              }
            : delivery
        );
        localStorage.setItem("deliveries", JSON.stringify(updatedData));
        setDeliveries(updatedData);
      }

      formik.resetForm();
      setIsEdit(false);
      setIsOpened(false);
    },
  });
  return formik;
};
