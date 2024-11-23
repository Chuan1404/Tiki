import { Select } from "antd";
import { useEffect, useState } from "react";

const SelectLoader = ({ api = "", selectField = "name", onChange = () => {} }) => {
  const [options, setOptions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleOnchange = (value) => {
    setSelectedItems(value)
    onChange(value)
  }
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(api, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }).then((res) => res.json());

      if (!response.error) {
        setOptions(response.data);
      }
    }

    fetchData(api);
  });

  return (
    <Select
      //   mode="multiple"
    //   showSearch
      placeholder="Choose one"
      value={selectedItems}
      onChange={handleOnchange}
      style={{
        width: "100%",
      }}
      options={options.map((item) => ({
        value: item.id,
        label: item[selectField],
      }))}
    />
  );
};

export default SelectLoader;
