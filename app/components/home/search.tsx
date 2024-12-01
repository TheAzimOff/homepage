import Shortcuts from "./shortcuts";
import GoogleSearch from "./googleSearch";

const Search = () => {
  return (
    <>
      <div className="w-1/2 rounded-lg bg-zinc-950 p-6">
        <GoogleSearch />
        <Shortcuts />
      </div>
    </>
  );
};
export default Search;
