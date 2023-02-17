import { Button, Container, Flex, Text, Image } from "@mantine/core";
import { useState, createContext } from "react";
import { DeliveryModal } from "./components/DeliveryModal";
import { DeliveriesTable } from "./components/DeliveriesTable";
import { useDeliveryForm } from "./hooks/useDeliveryForm";
import { DeliveryForm } from "./components/DeliveryForm";
import { delivery } from "./types/types";

export const DeliveriesContext = createContext<any>([]);

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deliveries, setDeliveries] = useState<delivery[]>(
    JSON.parse(localStorage.getItem("deliveries") || "[]")
  );

  const formik = useDeliveryForm({
    isEdit,
    setIsEdit,
    setIsOpened,
    deliveries,
    setDeliveries,
  });

  const globalState = [
    isOpened,
    setIsOpened,
    isEdit,
    setIsEdit,
    deliveries,
    setDeliveries,
  ];

  return (
    <DeliveriesContext.Provider value={globalState}>
      <Container size="sm">
        <Flex gap="md" align="center" direction="column">
          <Image
            sx={{ filter: "invert(.8)" }}
            pt={50}
            width={100}
            height="auto"
            src="https://www.ehrenkind.de/wp-content/uploads/2020/02/Ehrenkind_Logo_lines_vertical_noMargin.svg"
          />

          <Text fz={30} align="center">
            Lieferungen
          </Text>

          <Button
            color="teal"
            variant="light"
            onClick={() => setIsOpened(true)}
          >
            Neue Lieferung hinzufügen
          </Button>

          <DeliveryModal formik={formik}>
            <DeliveryForm formik={formik} />
          </DeliveryModal>

          {deliveries.length > 0 ? (
            <DeliveriesTable formik={formik} />
          ) : (
            <Text> Noch keine Lieferungen vorhanden</Text>
          )}
        </Flex>
      </Container>
    </DeliveriesContext.Provider>
  );
}

export default App;
