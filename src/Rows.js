import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useState } from "react";

const Rows = ({ keyVal, label, value, variance = 0, updateHandler }) => {
  const [input, setInput] = useState(0);
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    updateHandler(label, input, e.target.value);
  };

  return (
    <TableRow key={keyVal}>
      <TableCell align="center">{label}</TableCell>
      <TableCell align="center">{value}</TableCell>
      <TableCell align="center">
        <input type="number" value={input} onChange={handleChange}></input>
      </TableCell>
      <TableCell align="center">
        <button value="percentage" onClick={handleUpdate}>
          Update by %
        </button>
      </TableCell>
      <TableCell align="center">
        <button value="value" onClick={handleUpdate}>
          Update by value
        </button>
      </TableCell>
      <TableCell align="center">{variance} %</TableCell>
    </TableRow>
  );
};

export default Rows;
