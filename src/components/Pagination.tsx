import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className='flex items-center space-x-4'>
      <button
        onClick={handlePrev}
        className='p-4 rounded-lg bg-white shadow-sm text-gray-700'
        disabled={currentPage === 1}
        aria-label='Previous Page'
      >
        &lt;
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`p-4 rounded-lg shadow-sm text-gray-700 ${
            currentPage === index + 1
              ? "bg-red-600 text-white shadow-md shadow-red-600"
              : "bg-white"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={handleNext}
        className='p-4 rounded-lg bg-white shadow-sm text-gray-700'
        disabled={currentPage === totalPages}
        aria-label='Next Page'
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;