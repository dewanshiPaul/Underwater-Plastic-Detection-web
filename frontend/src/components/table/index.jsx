import { Paper, styled, TableContainer, Table, TableBody, TableCell, tableCellClasses, TableHead, TableRow } from "@mui/material";
// import tableCellClasses from "@mui/material";

export function Predictiontable({ pred }) {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
    }));
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="center">Serial No</StyledTableCell>
                        <StyledTableCell align="center">Prediction</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {
                        pred.map((d,k) => {
                            return <StyledTableRow
                                key={k}
                            >
                                <StyledTableCell component="th" scope="row" align="center">{d.img}</StyledTableCell>
                                <StyledTableCell align="center">{d.statement}</StyledTableCell>
                            </StyledTableRow>
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}