import { Button, Flex, Table } from "@mantine/core";
import { useContext } from "react";
import { delivery } from "../types/types";
import { FormikProps } from "formik";
import { DeliveriesContext } from "../App";

export const DeliveriesTable = ({
  formik,
}: {
  formik: FormikProps<delivery>;
}) => {
  const [isOpened, setIsOpened, isEdit, setIsEdit, deliveries, setDeliveries] =
    useContext(DeliveriesContext);

  console.log(deliveries, "Context test");
  console.log(setIsOpened, "setIsOpened test");

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Status</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {deliveries?.map((delivery: delivery) => (
          <tr key={delivery.id}>
            <td width={250}>{delivery.orderNumber}</td>
            <td>{delivery.status}</td>
            <td width={150}>
              <Flex justify="flex-end">
                <Button
                  onClick={() => {
                    setIsEdit(true);
                    setIsOpened(true);

                    // prepopulate edit form with values
                    formik.setValues({
                      id: delivery.id,
                      orderNumber: delivery.orderNumber,
                      status: delivery.status,
                    });
                  }}
                  variant="light"
                  size="xs"
                  mr={5}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    const filteredArr = deliveries.filter(
                      (elm: delivery) => elm.id !== delivery.id
                    );

                    localStorage.setItem(
                      "deliveries",
                      JSON.stringify(filteredArr)
                    );
                    setDeliveries(filteredArr);
                  }}
                  color="red"
                  variant="light"
                  size="xs"
                >
                  Delete
                </Button>
              </Flex>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
