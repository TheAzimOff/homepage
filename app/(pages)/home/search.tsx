import ShortcutsContainer from "./shortcutsContainer";
import GoogleSearch from "./googleSearch";

const Search = () => {
  return (
    <>
      <div className="w-1/2 rounded-lg bg-zinc-950/50 p-6 backdrop-blur-sm">
        <GoogleSearch />
        <ShortcutsContainer />
      </div>
    </>
  );
};
export default Search;
