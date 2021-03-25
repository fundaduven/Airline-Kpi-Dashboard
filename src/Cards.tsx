import React, { useState, useEffect } from "react";
import { AppProvider, Page, Card } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import axios from "axios";

type airline = {
  id: number;
  name: string;
  country: string;
  logo: string;
  slogan: string;
  head_quaters: string;
  website: string;
  established: string;
};
type rowsArray = [string, string, number, string];

type passengerType = {
  _id: string;
  name: string;
  trips: number;
};

type DTState = {
  totalPassengers: number;
  totalPages: number;
  data: passengerType[];
  rows: Array<rowsArray>;
  selectedPage: number;
  pagination: number[];
  showStart: number;
  showEnd: number;
};

function Cards() {
  const [airlines, setAirlines] = useState(Array<airline>());
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [oldestAirline, setOldestAirline] = useState("");
  const [rows, setRows] = useState(Array<rowsArray>());
  const [totalTrips, setTotalTrips] = useState(0);
  const [sales, setSales] = useState(0);

  const passengerUrl = "https://api.instantwebtools.net/v1/passenger";

  const airlanesUrl = "https://api.instantwebtools.net/v1/airlines";

  useEffect(() => {
    const fetchAirlineData = async () => {
      setHasError(false);
      setIsLoading(true);
      try {
        const result = await axios(passengerUrl);
        passengerData(result.data.data);
        const airlinesResult = await axios(airlanesUrl);
        setAirlines(airlinesResult.data);
        airlineData(airlinesResult.data);
      } catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    };
    fetchAirlineData();
  }, [currentPage]);

  const passengerData = (passengers: Array<passengerType>) => {
    const rowItem: Array<rowsArray> = [];
    const pagination: number[] = [];
    passengers.map((f: passengerType) => {
      const item: rowsArray = ["", "", 0, ""];
      item[0] = f._id;
      item[1] = f.name;
      item[2] = f.trips;
      item[3] = (f.trips * 199).toLocaleString() + " €";
      rowItem.push(item);
    });
    setRows(rowItem);

    let totalTrips = 0;
    passengers.forEach((f: { trips: number }) => {
      if (typeof f.trips === "number") {
        totalTrips += f.trips;
      }
    });
    setTotalTrips(totalTrips);
    setSales(totalTrips * 199);
  };

  const airlineData = (airlines: Array<airline>) => {
    let oldestAirline = 2021;
    airlines.forEach(function (item: airline) {
      if (Number(item.established) < oldestAirline) {
        oldestAirline = Number(item.established);
      }
    });
    setOldestAirline(String(oldestAirline));
  };

  return (
    <AppProvider i18n={enTranslations}>
      <Page title="Airline Data">
        <div id="cards">
          <Card title="Total Number of Trips" sectioned>
            <p className="card">{totalTrips.toLocaleString()}</p>
          </Card>
          <Card title="Total Number of Airlines" sectioned>
            <p className="card">{airlines.length}</p>
          </Card>
          <Card title="Overall Sales in Euro" sectioned>
            <p className="card">{sales.toLocaleString()} € </p>
          </Card>
          <Card title="Establishing year of the oldest airline" sectioned>
            <p className="card"> {oldestAirline}</p>
          </Card>
        </div>
      </Page>
    </AppProvider>
  );
}

export default Cards;
