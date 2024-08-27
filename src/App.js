import { useReducer } from "react";
import "./App.css";
import salesData from "./salesData.json";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Rows from "./Rows";

const reducer = (state, { payload }) => {
  return { ...state, ...payload };
};

function App() {
  const [state, dispatch] = useReducer(reducer, salesData);

  const handleParentUpdate = (label, value, updateType) => {
    let updateObj = state;
    for (let row of updateObj.rows) {
      if (row.label === label) {
        let rowValue = row.value;
        let updatedRowValue;
        if (updateType === "value") {
          updatedRowValue = Number(value);
        }
        if (updateType === "percentage") {
          updatedRowValue = rowValue * (1 + Number(value) / 100);
        }
        row.value = updatedRowValue;
        row.variance = ((updatedRowValue - rowValue) / rowValue) * 100;
        for (let child of row.children) {
          let childValue = child.value;
          let updateChildValue = updatedRowValue * (childValue / rowValue);
          child.value = updateChildValue;
          child.variance = ((updateChildValue - childValue) / childValue) * 100;
        }
      }
    }
    dispatch({ updateObj });
  };

  const handleChildUpdate = (label, value, updateType) => {
    let updateObj = state;
    for (let row of updateObj.rows) {
      for (let child of row.children) {
        if (child.label === label) {
          let rowValue = row.value;
          let childValue = child.value;
          let updateChildValue;
          let updatedRowValue;
          if (updateType === "value") {
            updateChildValue = Number(value);
          }
          if (updateType === "percentage") {
            updateChildValue = childValue * (1 + Number(value) / 100);
          }
          child.value = updateChildValue;
          child.variance = ((updateChildValue - childValue) / childValue) * 100;
          updatedRowValue = rowValue - childValue + updateChildValue;
          row.value = updatedRowValue;
          row.variance = ((updatedRowValue - rowValue) / rowValue) * 100;
        }
      }
    }
    dispatch({ updateObj });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Label</TableCell>
              <TableCell align="center">Value</TableCell>
              <TableCell align="center">Input</TableCell>
              <TableCell align="center">Allocation %</TableCell>
              <TableCell align="center">Allocation value</TableCell>
              <TableCell align="center">Variance %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.rows.map((row, index) => {
              return (
                <>
                  <Rows
                    keyVal={index}
                    label={row.label}
                    value={row.value}
                    variance={row.variance}
                    updateHandler={handleParentUpdate}
                  />
                  {row.children.map((childRow, childIndex) => {
                    return (
                      <>
                        <Rows
                          keyVal={childIndex}
                          label={childRow.label}
                          value={childRow.value}
                          variance={childRow.variance}
                          updateHandler={handleChildUpdate}
                        />
                      </>
                    );
                  })}
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default App;
