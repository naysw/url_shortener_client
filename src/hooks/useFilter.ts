import * as React from "react";

interface Props<TData> {
  initialFilters: TData;
}

const useFilter = <TData>({ initialFilters }: Props<TData>) => {
  const [filters, setFilters] = React.useState<TData>(initialFilters);

  function changeFilters(name: keyof typeof initialFilters, value: any) {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  }

  return {
    values: filters,
    onChange: changeFilters,
  };
};

export default useFilter;
