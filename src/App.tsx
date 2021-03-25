import React, { useState } from "react";
import PassengerData from "./PassengerData";
import Cards from "./Cards";

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
          <Cards />
          <PassengerData />
        </div>
      )}
    </div>
  );
}
export default App;
