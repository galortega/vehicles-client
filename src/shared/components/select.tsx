import React from "react";
import AsyncSelect from "react-select/async";
import api from "../api/fetch";
import { Driver } from "../types/drivers.interface";
import { Option } from "../types/option.interface";

const labelFormatter: (i: any) => Option = (i) => {
  return {
    label: `${i.firstName} ${i.lastName}`,
    value: i.id,
  };
};

const loadOptions = async (inputValue: string): Promise<Option[]> =>
  api<Driver[]>(`drivers?firstName=${inputValue}`, "GET").then((response) =>
    response.map((result) => labelFormatter(result))
  );

const ArrayObjectSelect: React.FC<{
  setSelectedDriver: (value: string) => void;
  className?: string;
}> = ({ setSelectedDriver, className }) => {
  return (
    <AsyncSelect
      className={`${className}`}
      onChange={(selectedDriver) =>
        !selectedDriver
          ? setSelectedDriver("")
          : setSelectedDriver(selectedDriver.value)
      }
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions
      placeholder={"Search for a driver"}
      isClearable
    />
  );
};

export default ArrayObjectSelect;
