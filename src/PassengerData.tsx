import React, { useState, useEffect } from "react";
import { AppProvider, Page, Card, DataTable } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import SearchBox from "./SearchBox";
import Pagination from "./Pagination";
import { AirlineApi } from "./AirlineApi";

type passengerType = {
  _id: string;
  name: string;
  trips: number;
};
type passengerRowData = [string, string, number, string];

type passengerResponseType = {
  totalPassengers: number;
  totalPages: number;
  data: passengerType[];
};

function PassengerData() {
  const [rows, setRows] = useState(Array<passengerRowData>());
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPassengers, setTotalPassengers] = useState(0);
  const [searchField, setSearchField] = useState("");

  const passengerUrl =
    "https://api.instantwebtools.net/v1/passenger?page=" +
    currentPage +
    "&size=25";

  // Pagination related variables
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Search related variables
  const search = (query: string) => setSearchField(query);
  let filteredPassengers = function (): Array<passengerRowData> {
    let a = rows.filter((passenger) => {
      return passenger[1].includes(searchField.toLowerCase());
    });
    return a;
  };
  useEffect(() => {
    filteredPassengers();
  }, [searchField]);

  // Fetch passenger data
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
    const rowItem: Array<passengerRowData> = [];
    passengers.map((passenger: passengerType) => {
      const item: passengerRowData = ["", "", 0, ""];
      item[0] = passenger._id;
      item[1] = passenger.name;
      item[2] = passenger.trips;
      item[3] = (passenger.trips * 199).toLocaleString() + " €";
      rowItem.push(item);
    });
    setRows(rowItem);
  };

  return !rows.length ? (
    <div>Currently there is no comments.</div>
  ) : (
    <>
      <SearchBox onChange={search} />
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
