import React from "react";
import { useState } from "react";

import NoDetails from "./services/NoDetails";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { TableRow, TableCell } from "@mui/material";


export default function ResultRow(props) {
  const [open, setOpen] = useState(false);
  /*
    Available props:  
    - name
    - icon
    - loading
    - result
    - summary
    - summary_color
    - color
    - details
  */

  if (props.loading) {
    return (
      <>
        <TableRow key={props.id + "_row"}>
          <TableCell>
            <IconButton aria-label="expand row" size="large">
              <KeyboardArrowDownIcon />
            </IconButton>
          </TableCell>
          <TableCell>
            <img
              src={require(`./icons/${props.icon}.png`)}
              alt=""
              style={{ height: "12px" }}
            />
            &nbsp;&nbsp;{props.name}
          </TableCell>
          <TableCell>
            {" "}
            <CircularProgress />{" "}
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </>
    );
  }

  if (!props.result) {
    return (
      <>
        <TableRow key={props.id + "_row"}>
          <TableCell>
            <IconButton aria-label="expand row" size="large">
              <KeyboardArrowDownIcon />
            </IconButton>
          </TableCell>
          <TableCell>
            <img
              src={require(`./icons/${props.icon}.png`)}
              alt=""
              style={{ height: "12px" }}
            />
            &nbsp;&nbsp;{props.name}
          </TableCell>
          <TableCell> Error </TableCell>
          <TableCell bgcolor="black"></TableCell>
        </TableRow>
      </>
    );
  }

  return (
    <>
      <TableRow key={props.id + "_row"}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="large"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <img
            src={require(`./icons/${props.icon}.png`)}
            alt={props.name + " logo"}
            style={{ height: "12px" }}
          />
          &nbsp;&nbsp;{props.name}
        </TableCell>
        <TableCell>
          {" "}
          <p style={props.summary_color}>{props.summary} </p>
        </TableCell>
        <TableCell bgcolor={props.color}></TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            backgroundColor: "aliceblue",
          }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {props.result["error"] ? (
                <Grid
                  xs
                  item={true}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <NoDetails />
                </Grid>
              ) : (
                <>{props.details}</>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
