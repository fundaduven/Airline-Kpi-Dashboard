import React from "react";

interface paginationProps {
  totalPassengers: number;
  totalPages: number;
  currentPage: number;
  paginate: (number: number) => void;
}

const Pagination = ({
  totalPassengers,
  totalPages,
  currentPage,
  paginate,
}: paginationProps) => {
  const pageNumbers = [];

  if (currentPage < 5) {
    let i = 0;
    while (i < 10) {
      pageNumbers.push(i);
      i++;
    }
  } else if (currentPage > totalPages - 4) {
    let i: number = totalPages - 10;
    while (i < totalPages) {
      pageNumbers.push(i);
      i++;
    }
  } else {
    let i: number = currentPage - 4;
    while (i < currentPage + 6) {
      pageNumbers.push(i);
      i++;
    }
  }

  let endNumber: number = (currentPage + 1) * 25;
  if (endNumber > totalPassengers) {
    endNumber = totalPassengers;
  }

  // }

  return (
    <div className="pagination">
      <button className="pagination-button" onClick={() => paginate(0)}>
        &lt;
      </button>
      {pageNumbers.map((number, i) => {
        if (number === currentPage) {
          return (
            <button
              className="selected-button pagination-button"
              key={i}
              onClick={() => paginate(number)}
            >
              {number + 1}
            </button>
          );
        } else {
          return (
            <button
              className="pagination-button"
              key={i}
              onClick={() => paginate(number)}
            >
              {number + 1}
            </button>
          );
        }
      })}
      <button
        className="pagination-button"
        onClick={() => paginate(totalPages - 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
