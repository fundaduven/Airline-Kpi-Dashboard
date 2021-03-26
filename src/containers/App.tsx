import React, { useState } from "react";
import PassengerData from "../components/PassengerData";
import Cards from "../components/Cards";
import Header from "../components/Header";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div>
      {isLoading ? (
        <div> Loading ... </div>
      ) : hasError ? (
        <div> Something went wrong. </div>
      ) : (
        <div>
          <Header />
          <Cards />
          <PassengerData />
        </div>
      )}
    </div>
  );
}
export default App;
