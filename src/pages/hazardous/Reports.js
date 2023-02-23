import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import ExportExcel from "../../components/exportExcel";
import axios from "../../api/axios";

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    returnReports();
  }, []);

  function useExport() {
    ExportExcel(reports);
  }

  function returnReports() {
    try {
      axios.get(process.env.REACT_APP_GET_REPORT).then((response) => {
        setReports(response.data);
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <Box>
        <Button
          color="secondary"
          size="small"
          variant="contained"
          onClick={useExport}
        >
          Export to Excel
        </Button>
      </Box>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow>
            {/*<TableCell sx={{ background: "black", color: 'white' }}>Delete</TableCell> */}
            <TableCell sx={{ background: "black", color: "white" }}>
              Date
            </TableCell>
            <TableCell sx={{ background: "black", color: "white" }}>
              Observer
            </TableCell>
            <TableCell sx={{ background: "black", color: "white" }}>
              Supervisor
            </TableCell>
            <TableCell sx={{ background: "black", color: "white" }}>
              Type
            </TableCell>
            <TableCell sx={{ background: "black", color: "white" }}>
              Observation Type
            </TableCell>
            <TableCell sx={{ background: "black", color: "white" }}>
              Feedback
            </TableCell>
            <TableCell sx={{ background: "black", color: "white" }}>
              actions
            </TableCell>
          </TableRow>

          {reports ? (
            <>
              {reports.map((rows, index) => {
                return (
                  <TableRow key={{ index }}>
                    <TableCell
                      sx={{ background: "white", border: "1px solid black" }}
                    >
                      {rows.date}
                    </TableCell>
                    <TableCell
                      sx={{ background: "white", border: "1px solid black" }}
                    >
                      {rows.observer}
                    </TableCell>
                    <TableCell
                      sx={{ background: "white", border: "1px solid black" }}
                    >
                      {rows.supervisor}
                    </TableCell>
                    <TableCell
                      sx={{ background: "white", border: "1px solid black" }}
                    >
                      {rows.type}
                    </TableCell>
                    <TableCell
                      sx={{ background: "white", border: "1px solid black" }}
                    >
                      {rows.observationType}
                    </TableCell>
                    <TableCell
                      sx={{ background: "white", border: "1px solid black" }}
                    >
                      {rows.feedback}
                    </TableCell>
                    <TableCell
                      sx={{ background: "white", border: "1px solid black" }}
                    >
                      {rows.actions}
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          ) : (
            <> no data</>
          )}
        </TableBody>
      </Table>
    </>
  );
}
