import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";
import { ChangeEvent } from "react";

interface Props<T> {
  searchBarValue: string;
  setSearchBarValue: React.Dispatch<React.SetStateAction<string>>;
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredData: React.Dispatch<React.SetStateAction<T[]>>;
  data: T[];
  filterFn: (item: T, query: string) => boolean;
}

function SearchBar<T>({
  searchBarValue,
  setSearchBarValue,
  setIsFiltered,
  setFilteredData,
  data,
  filterFn,
}: Props<T>) {
  const handleSearchBarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setIsFiltered(false);
    } else {
      setFilteredData(data.filter((item) => filterFn(item, e.target.value)));
      setIsFiltered(true);
    }
    setSearchBarValue(e.target.value);
  };
    return (
      <div className="flex flex-row">
        <Input
          value={searchBarValue}
          onChange={handleSearchBarChange}
          type="text"
          className="bg-gray-200"
          placeholder="Enter a name"
        ></Input>
        <button
          onClick={() => {
            setSearchBarValue("");
            setIsFiltered(false);
          }}
        >
          <XIcon className="w-5" />
        </button>
      </div>
    );
}

export default SearchBar;
