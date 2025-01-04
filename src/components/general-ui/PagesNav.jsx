export default function PagesNav({ currentPage, morePagesExists, changePage }) {
  return (
    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse p-3">
      {currentPage !== 1 && (
        <button
          onClick={() => changePage(1)}
          className="relative w-6 h-6 text-xs p-1 text-center rounded-md border border-gray-300 "
        >
          1
        </button>
      )}
      {currentPage > 3 && (
        <span className="relative w-6 h-6 text-xs p-1 text-center rounded-md border border-gray-300 ">
          ...
        </span>
      )}
      {currentPage > 2 && (
        <button
          onClick={() => changePage(currentPage - 1)}
          className="relative w-6 h-6 text-xs p-1 text-center rounded-md border border-gray-300 "
        >
          {currentPage - 1}
        </button>
      )}
      {
        <button
          disabled
          className="relative w-6 h-6 text-xs p-1 text-center rounded-md  bg-logoOrange"
        >
          <span>{currentPage}</span>
        </button>
      }
      {morePagesExists && (
        <button
          onClick={() => changePage(currentPage + 1)}
          className="relative w-6 h-6 text-xs p-1 text-center rounded-md border border-gray-300 "
        >
          {currentPage + 1}
        </button>
      )}
      {/* {currentPage + 2 < totalPages && (
        <span className="relative w-6 h-6 text-xs p-1 text-center rounded-md border border-gray-300 ">
          ...
        </span>
      )}
      {currentPage !== totalPages && (
        <button
          onClick={() => changePage(totalPages)}
          className="relative w-6 h-6 text-xs p-1 text-center rounded-md border border-gray-300 "
        >
          {totalPages}
        </button> */}
      {/* )} */}
    </div>
  );
}
