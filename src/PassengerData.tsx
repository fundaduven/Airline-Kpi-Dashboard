import React, { useState, useEffect } from "react";
import { AppProvider, Page, Card, DataTable } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

import Pagination from "./Pagination";
import { AirlineApi } from "./AirlineApi";

type passengerType = {
  _id: string;
  name: string;
  trips: number;
};
type rowsArray = [string, string, number, string];

type passengerResponseType = {
  totalPassengers: number;
  totalPages: number;
  data: passengerType[];
};

function PassengerData() {
  const [rows, setRows] = useState(Array<rowsArray>());
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPassengers, setTotalPassengers] = useState(0);

  const passengerUrl =
    "https://api.instantwebtools.net/v1/passenger?page=" +
    currentPage +
    "&size=25";

  // Pagination related variables
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchPassengerData = async () => {
      setHasError(false);
      setIsLoading(true);
      try {
        const result: passengerResponseType = await AirlineApi(passengerUrl);
        setTotalPassengers(result.totalPassengers);
        setTotalPages(result.totalPages);
        passengerData(result.data);
      } catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    };
    fetchPassengerData();
  }, [currentPage]);

  const passengerData = (passengers: Array<passengerType>) => {
    const rowItem: Array<rowsArray> = [];
    passengers.map((f: passengerType) => {
      const item: rowsArray = ["", "", 0, ""];
      item[0] = f._id;
      item[1] = f.name;
      item[2] = f.trips;
      item[3] = (f.trips * 199).toLocaleString() + " €";
      rowItem.push(item);
    });
    setRows(rowItem);
  };

  return !rows.length ? (
    <div>Currently there is no comments.</div>
  ) : (
    <>
      <AppProvider i18n={enTranslations}>
        <Page title="Passenger Data">
          <Card>
            <DataTable
              columnContentTypes={["text", "text", "numeric", "numeric"]}
              headings={[
                "ID",
                "Name",
                "Number of trips",
                "Total amount paid for flights",
              ]}
              rows={rows}
            />
          </Card>
        </Page>
      </AppProvider>
      <Pagination
        totalPages={totalPages}
        paginate={paginate}
        currentPage={currentPage}
        totalPassengers={totalPassengers}
      />
    </>
  );
}

export default PassengerData;
