import Gmail from "./gmail";
import Search from "./search";
import Weather from "./weather";
import Welcome from "./welcome";
const HomeIndex = () => {
  return (
    <div className="flex h-full w-full flex-col gap-8 p-4">
      <div className="flex w-full flex-[1] flex-row justify-between">
        <Welcome />
        <Weather />
      </div>
      <div className="flex w-full flex-[4] flex-row justify-between">
        <Gmail />
        <Search />
      </div>
    </div>
  );
};

export default HomeIndex;
