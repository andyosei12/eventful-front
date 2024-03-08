const FetchError = ({ title }: { title: string }) => {
  const refreshPageHandler = () => {
    window.location.reload();
  };
  return (
    <div className="flex flex-col  sm:flex-row sm:justify-center sm:items-center gap-2 mt-3 p-2 sm:p-0 mb-5">
      <h1 className="text-2xl">Loading {title} failed</h1>
      <button
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={refreshPageHandler}
      >
        Try again
      </button>
    </div>
  );
};

export default FetchError;
