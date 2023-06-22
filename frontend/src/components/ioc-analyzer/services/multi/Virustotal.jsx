import React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LanIcon from "@mui/icons-material/Lan";
import PeopleIcon from "@mui/icons-material/People";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import RouterOutlinedIcon from "@mui/icons-material/RouterOutlined";
import StarIcon from "@mui/icons-material/Star";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

import NoDetails from "../NoDetails";
import ResultRow from "../../ResultRow";

export default function Virustotal(props) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [malCount, setMalCount] = useState(null);
  const [totalEngines, setTotalEngines] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useTheme();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#6AAB8E",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "red",
    },
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          "http://localhost:8000/api/" +
          props.type +
          "/virustotal?ioc=" +
          encodeURIComponent(props.ioc);
        const response = await axios.get(url);
        setResult(response.data);
        setMalCount(
          response.data.data.attributes.last_analysis_stats.malicious
        );
        setTotalEngines(
          response.data.data.attributes.last_analysis_stats.harmless +
            response.data.data.attributes.last_analysis_stats.malicious +
            response.data.data.attributes.last_analysis_stats.suspicious +
            response.data.data.attributes.last_analysis_stats.timeout +
            response.data.data.attributes.last_analysis_stats.undetected
        );
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const details = (
    <>
      {result ? (
        result.data ? (
          <Box sx={{ margin: 1 }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "stretch",
                height: "100%",
              }}
            >
              <Card
                variant="outlined"
                sx={{
                  mb: 1,
                  mr: 1,
                  p: 2,
                  borderRadius: 5,
                  boxShadow: 0,
                  width: "calc(50% - 10px)",
                }}
              >
                <Typography variant="h5" component="h2" gutterBottom>
                  Details
                </Typography>
                <List>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <GppMaybeOutlinedIcon
                        color={malCount > 0 ? "error" : "primary"}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Detected as malicious by ${malCount} engine(s)`}
                    />
                  </ListItem>
                  {result["data"]["attributes"][
                    "regional_internet_registry"
                  ] && (
                    <ListItem alignItems="flex-start">
                      <ListItemIcon>
                        <RouterOutlinedIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Internet registry"
                        secondary={
                          result["data"]["attributes"][
                            "regional_internet_registry"
                          ]
                        }
                      />
                    </ListItem>
                  )}
                  {result["data"]["attributes"]["network"] && (
                    <ListItem alignItems="flex-start">
                      <ListItemIcon>
                        <LanIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Network"
                        secondary={result["data"]["attributes"]["network"]}
                      />
                    </ListItem>
                  )}
                  {result["data"]["attributes"]["country"] && (
                    <ListItem alignItems="flex-start">
                      <ListItemIcon>
                        <LanguageOutlinedIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Country"
                        secondary={result["data"]["attributes"]["country"]}
                      />
                    </ListItem>
                  )}
                  {result["data"]["attributes"]["as_owner"] && (
                    <ListItem alignItems="flex-start">
                      <ListItemIcon>
                        <BusinessIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="AS owner"
                        secondary={result["data"]["attributes"]["as_owner"]}
                      />
                    </ListItem>
                  )}
                  {result["data"]["attributes"]["type_extension"] && (
                    <ListItem alignItems="flex-start">
                      <ListItemIcon>
                        <ExtensionOutlinedIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Type extension"
                        secondary={
                          result["data"]["attributes"]["type_extension"]
                        }
                      />
                    </ListItem>
                  )}
                  {result["data"]["attributes"]["magic"] && (
                    <ListItem alignItems="flex-start">
                      <ListItemIcon>
                        <AutoFixHighIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Magic"
                        secondary={result["data"]["attributes"]["magic"]}
                      />
                    </ListItem>
                  )}
                  {result["data"]["attributes"]["md5"] && (
                    <ListItem alignItems="flex-start">
                      <ListItemIcon>
                        <InsertDriveFileOutlinedIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="MD5"
                        secondary={result["data"]["attributes"]["md5"]}
                        style={{ wordBreak: "break-all" }}
                      />
                    </ListItem>
                  )}
                  {result["data"]["attributes"]["sha1"] && (
                    <ListItem alignItems="flex-start">
                      <ListItemIcon>
                        <InsertDriveFileOutlinedIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="SHA1"
                        secondary={result["data"]["attributes"]["sha1"]}
                        style={{ wordBreak: "break-all" }}
                      />
                    </ListItem>
                  )}
                  {result["data"]["attributes"]["sha256"] && (
                    <ListItem alignItems="flex-start">
                      <ListItemIcon>
                        <InsertDriveFileOutlinedIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="SHA256"
                        secondary={result["data"]["attributes"]["sha256"]}
                        style={{ wordBreak: "break-all" }}
                      />
                    </ListItem>
                  )}
                  {result["data"]["attributes"]["ssdeep"] && (
                    <ListItem alignItems="flex-start">
                      <ListItemIcon>
                        <InsertDriveFileOutlinedIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="ssdeep"
                        secondary={result["data"]["attributes"]["ssdeep"]}
                        style={{ wordBreak: "break-all" }}
                      />
                    </ListItem>
                  )}
                  {result["data"]["attributes"]["tlsh"] && (
                    <ListItem alignItems="flex-start">
                      <ListItemIcon>
                        <InsertDriveFileOutlinedIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="TLSH"
                        secondary={result["data"]["attributes"]["tlsh"]}
                        style={{ wordBreak: "break-all" }}
                      />
                    </ListItem>
                  )}
                  {result["data"]["attributes"]["vhash"] && (
                    <ListItem alignItems="flex-start">
                      <ListItemIcon>
                        <InsertDriveFileOutlinedIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="vhash"
                        secondary={result["data"]["attributes"]["vhash"]}
                        style={{ wordBreak: "break-all" }}
                      />
                    </ListItem>
                  )}
                  {result["data"]["attributes"]["unique_sources"] && (
                    <ListItem alignItems="flex-start">
                      <ListItemIcon>
                        <CategoryOutlinedIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Unique sources"
                        secondary={
                          result["data"]["attributes"]["unique_sources"]
                        }
                      />
                    </ListItem>
                  )}
                </List>
              </Card>

              <Card
                key={"statistics_card"}
                variant="outlined"
                sx={{
                  mb: 1,
                  p: 2,
                  borderRadius: 5,
                  boxShadow: 0,
                  width: "calc(50% - 10px)",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="h5" component="h2" gutterBottom>
                      Analysis statistics
                    </Typography>
                    <List>
                      <ListItem disablePadding>
                        <ListItemAvatar>
                          <Avatar sx={{ backgroundColor: "#6AAB8E" }}>
                            <CheckCircleOutlineIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Harmless"
                          secondary={
                            result["data"]["attributes"]["last_analysis_stats"][
                              "harmless"
                            ]
                          }
                        />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemAvatar>
                          <Avatar sx={{ backgroundColor: "red" }}>
                            <HighlightOffIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Malicious"
                          secondary={
                            result["data"]["attributes"]["last_analysis_stats"][
                              "malicious"
                            ]
                          }
                        />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemAvatar>
                          <Avatar sx={{ backgroundColor: "#F5BB00" }}>
                            <ReportProblemIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Suspicious"
                          secondary={
                            result["data"]["attributes"]["last_analysis_stats"][
                              "suspicious"
                            ]
                          }
                        />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemAvatar>
                          <Avatar>
                            <QuestionMarkIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Undetected"
                          secondary={
                            result["data"]["attributes"]["last_analysis_stats"][
                              "undetected"
                            ]
                          }
                        />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemAvatar>
                          <Avatar>
                            <AccessTimeIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Timeout"
                          secondary={
                            result["data"]["attributes"]["last_analysis_stats"][
                              "timeout"
                            ]
                          }
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <ResponsiveContainer width="80%" height="80%">
                      <PieChart width={250} height={250}>
                        <Pie
                          data={[
                            { name: "malcount", value: malCount },
                            {
                              name: "suspicious",
                              value:
                                result["data"]["attributes"][
                                  "last_analysis_stats"
                                ]["suspicious"],
                              fill: "#F5BB00",
                            },
                            {
                              name: "harmless",
                              value:
                                result["data"]["attributes"][
                                  "last_analysis_stats"
                                ]["harmless"],
                              fill: "#6AAB8E",
                            },
                            {
                              name: "undetected",
                              value:
                                result["data"]["attributes"][
                                  "last_analysis_stats"
                                ]["undetected"],
                              fill: "grey",
                            },
                            {
                              name: "timeout",
                              value:
                                result["data"]["attributes"][
                                  "last_analysis_stats"
                                ]["timeout"],
                              fill: "grey",
                            },
                            {
                              name: "Remaining",
                              value:
                                totalEngines -
                                (malCount +
                                  result["data"]["attributes"][
                                    "last_analysis_stats"
                                  ]["harmless"] +
                                  result["data"]["attributes"][
                                    "last_analysis_stats"
                                  ]["suspicious"] +
                                  result["data"]["attributes"][
                                    "last_analysis_stats"
                                  ]["undetected"] +
                                  result["data"]["attributes"][
                                    "last_analysis_stats"
                                  ]["timeout"]),
                              fill: "#d3d3d3",
                            },
                          ]}
                          dataKey="value"
                          startAngle={90}
                          endAngle={-270}
                          innerRadius="80%"
                          outerRadius="100%"
                          minAngle={1}
                          domain={[0, totalEngines]}
                          stroke="none"
                          strokeWidth={0}
                          fill="red"
                        />
                        <foreignObject
                          width="100%"
                          height="100%"
                          style={{ textAlign: "center" }}
                        >
                          <div
                            style={{
                              display: "inline-block",
                              position: "relative",
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                          >
                            <Typography
                              variant="h3"
                              color={
                                malCount > 0
                                  ? "red"
                                  : result["data"]["attributes"][
                                      "last_analysis_stats"
                                    ]["suspicious"] > 0
                                  ? "#F5BB00"
                                  : "#6AAB8E"
                              }
                              sx={{ textAlign: "center" }}
                              textAnchor="middle"
                            >
                              <text x="50%" y="50%">
                                {malCount}
                              </text>
                            </Typography>
                            <Typography
                              variant="h5"
                              color="textSecondary"
                              sx={{ textAlign: "center" }}
                              textAnchor="middle"
                            >
                              <text x="50%" y="50%">
                                / {totalEngines}
                              </text>
                            </Typography>
                          </div>
                        </foreignObject>
                      </PieChart>
                    </ResponsiveContainer>
                  </Grid>
                </Grid>

                <Divider>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <PeopleIcon />
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      Community
                    </Typography>
                  </Box>
                </Divider>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <List>
                      <ListItem alignItems="flex-start">
                        <ListItemIcon>
                          <ThumbUpOutlinedIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Voted harmless"
                          secondary={
                            result["data"]["attributes"]["total_votes"][
                              "harmless"
                            ]
                          }
                        />
                      </ListItem>
                      <ListItem alignItems="flex-start">
                        <ListItemIcon>
                          <ThumbDownOutlinedIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Voted malicious"
                          secondary={
                            result["data"]["attributes"]["total_votes"][
                              "malicious"
                            ]
                          }
                        />
                      </ListItem>
                    </List>
                  </Grid>

                  <Grid item xs={6}>
                    <List>
                      <ListItem alignItems="flex-start">
                        <ListItemIcon>
                          <PollOutlinedIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Reputation"
                          secondary={result["data"]["attributes"]["reputation"]}
                        />
                      </ListItem>
                      <ListItem alignItems="flex-start">
                        <ListItemIcon>
                          <CalendarMonthOutlinedIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Last modification"
                          secondary={`${new Date(
                            result.data.attributes.last_modification_date * 1000
                          ).toLocaleDateString()} ${new Date(
                            result["data"]["attributes"][
                              "last_modification_date"
                            ] * 1000
                          ).toLocaleTimeString()}`}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
                {result["data"]["attributes"]["total_votes"]["malicious"] ===
                  0 &&
                result["data"]["attributes"]["total_votes"]["harmless"] ===
                  0 ? null : (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ width: "100%", m: 1 }}>
                      <BorderLinearProgress
                        variant="determinate"
                        value={
                          (result["data"]["attributes"]["total_votes"][
                            "malicious"
                          ] /
                            (result["data"]["attributes"]["total_votes"][
                              "harmless"
                            ] +
                              result["data"]["attributes"]["total_votes"][
                                "malicious"
                              ])) *
                          100
                        }
                      />
                    </Box>
                  </Box>
                )}
              </Card>
            </div>

            {result["data"]["attributes"]["tags"] &&
            result["data"]["attributes"]["tags"].length > 0 ? (
              <Card
                variant="outlined"
                key="tags_card"
                sx={{ m: 1, p: 2, borderRadius: 5, boxShadow: 0 }}
              >
                <Typography variant="h5" component="h2" gutterBottom>
                  Tags
                </Typography>
                {result["data"]["attributes"]["tags"].length > 0 ? (
                  <>
                    {result["data"]["attributes"]["tags"].map((tag, index) => (
                      <React.Fragment key={index}>
                        <Chip label={tag} sx={{ m: 0.5 }} />
                        {index !==
                          result["data"]["attributes"]["tags"].length - 1}
                      </React.Fragment>
                    ))}
                  </>
                ) : (
                  <p>None</p>
                )}
              </Card>
            ) : null}

            {result["data"]["attributes"]["crowdsourced_context"] &&
            result["data"]["attributes"]["crowdsourced_context"].length > 0 ? (
              <Card
                key="crowdsourced_context_card"
                variant="outlined"
                sx={{ m: 1, p: 2, borderRadius: 5, boxShadow: 0 }}
              >
                <Typography variant="h5" component="h2" gutterBottom>
                  Crowdsourced context
                </Typography>
                {result["data"]["attributes"]["crowdsourced_context"].length >
                0 ? (
                  result["data"]["attributes"]["crowdsourced_context"].map(
                    (cc, index) => {
                      return (
                        <div key={index + "_div"}>
                          <b>Title: </b>
                          {cc.title}
                          <br />
                          <b>Source: </b>
                          {cc.source}
                          <br />
                          <b>Timestamp: </b>
                          {cc.timestamp}
                          <br />
                          <b>Detail: </b>
                          {cc.detail}
                          <br />
                          <b>Severity: </b>
                          {cc.severity}
                          <br />
                        </div>
                      );
                    }
                  )
                ) : (
                  <p>None</p>
                )}
              </Card>
            ) : null}

            {result["data"]["attributes"]["popularity_ranks"] &&
            Object.keys(result["data"]["attributes"]["popularity_ranks"])
              .length > 0 ? (
              <Card
                key="popularity_card"
                variant="outlined"
                sx={{ m: 1, p: 2, borderRadius: 5, boxShadow: 0 }}
              >
                <Typography variant="h5" component="h2" gutterBottom>
                  Popularity ranks
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Domain's position in popularity ranks such as Alexa,
                  Quantcast, Statvoo, etc.
                </Typography>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {Object.entries(
                    result["data"]["attributes"]["popularity_ranks"]
                  ).map(([name, data]) => (
                    <div
                      key={name + "_div"}
                      style={{ flexBasis: "15%", marginBottom: "5px" }}
                    >
                      <Card
                        variant="outlined"
                        key={name + "_popularity_card"}
                        sx={{ m: 1, p: 1.5, borderRadius: 5, boxShadow: 0 }}
                      >
                        <Typography variant="h6" component="h2" gutterBottom>
                          {name}
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Grid container spacing={1} alignItems="center">
                          <Grid item>
                            <StarIcon color="primary" />
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" component="span">
                              {data.rank}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Card>
                    </div>
                  ))}
                </div>
              </Card>
            ) : null}

            {result["data"]["attributes"]["names"] &&
              result["data"]["attributes"]["names"].length > 0 && (
                <>
                  <Card
                    key="last_analysis_results_card"
                    variant="outlined"
                    sx={{ m: 1, p: 2, borderRadius: 5, boxShadow: 0 }}
                  >
                    <Typography variant="h5" component="h2" gutterBottom>
                      Filenames
                    </Typography>
                    <List>
                      {result["data"]["attributes"]["names"].map(
                        (name, index) => (
                          <ListItem>
                            <ListItemText primary={name} />
                          </ListItem>
                        )
                      )}
                    </List>
                  </Card>
                </>
              )}

            {result["data"]["attributes"]["elf_info"] &&
            result["data"]["attributes"]["elf_info"]["section_list"].length >
              0 ? (
              <Card
                variant="outlined"
                key="tags_card"
                sx={{ m: 1, p: 2, borderRadius: 5, boxShadow: 0 }}
              >
                <Typography variant="h5" component="h2" gutterBottom>
                  ELF information (Executable and Linkable Format)
                </Typography>
                <List>
                  <Grid container spacing={2}>
                    {Object.entries(
                      result["data"]["attributes"]["elf_info"]["header"]
                    ).map(([key, value]) => (
                      <Grid item xs={4} key={key}>
                        <ListItemText primary={key} secondary={value} />
                      </Grid>
                    ))}
                  </Grid>
                </List>
                <Typography variant="h5" component="h2" gutterBottom mt={2}>
                  Section List
                </Typography>
                <TableContainer
                  component={Paper}
                  sx={{
                    boxShadow: 0,
                    borderRadius: 5,
                    border: 1,
                    borderColor: theme.palette.background.tableborder,
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            bgcolor: theme.palette.background.tablecell,
                            fontWeight: "bold",
                          }}
                        >
                          Name
                        </TableCell>
                        <TableCell
                          sx={{
                            bgcolor: theme.palette.background.tablecell,
                            fontWeight: "bold",
                          }}
                        >
                          Section type
                        </TableCell>
                        <TableCell
                          sx={{
                            bgcolor: theme.palette.background.tablecell,
                            fontWeight: "bold",
                          }}
                        >
                          Virtual address
                        </TableCell>
                        <TableCell
                          sx={{
                            bgcolor: theme.palette.background.tablecell,
                            fontWeight: "bold",
                          }}
                        >
                          Physical offset
                        </TableCell>
                        <TableCell
                          sx={{
                            bgcolor: theme.palette.background.tablecell,
                            fontWeight: "bold",
                          }}
                        >
                          Flags
                        </TableCell>
                        <TableCell
                          sx={{
                            bgcolor: theme.palette.background.tablecell,
                            fontWeight: "bold",
                          }}
                        >
                          Size
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {result["data"]["attributes"]["elf_info"][
                        "section_list"
                      ].map((section, index) => (
                        <TableRow key={index}>
                          <TableCell>{section["name"]}</TableCell>
                          <TableCell>{section.section_type}</TableCell>
                          <TableCell>{section.virtual_address}</TableCell>
                          <TableCell>{section.physical_offset}</TableCell>
                          <TableCell>{section.flags}</TableCell>
                          <TableCell>{section.size}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            ) : null}

            {result["data"]["attributes"]["last_analysis_results"] &&
            Object.keys(result["data"]["attributes"]["last_analysis_results"])
              .length > 0 ? (
              <Card
                key="last_analysis_results_card"
                variant="outlined"
                sx={{ m: 1, p: 2, borderRadius: 5, boxShadow: 0 }}
              >
                <Typography variant="h5" component="h2" gutterBottom>
                  Last analysis results
                </Typography>
                <TableContainer
                  component={Paper}
                  sx={{
                    boxShadow: 0,
                    borderRadius: 5,
                    border: 1,
                    borderColor: theme.palette.background.tableborder,
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            bgcolor: theme.palette.background.tablecell,
                            fontWeight: "bold",
                          }}
                        >
                          Engine
                        </TableCell>
                        <TableCell
                          sx={{
                            bgcolor: theme.palette.background.tablecell,
                            fontWeight: "bold",
                          }}
                        >
                          Category
                        </TableCell>
                        <TableCell
                          sx={{
                            bgcolor: theme.palette.background.tablecell,
                            fontWeight: "bold",
                          }}
                        >
                          Result
                        </TableCell>
                        <TableCell
                          sx={{
                            bgcolor: theme.palette.background.tablecell,
                            fontWeight: "bold",
                          }}
                        >
                          Method
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(
                        result["data"]["attributes"]["last_analysis_results"]
                      )
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map(([name, analysis], index) => (
                          <TableRow key={index}>
                            <TableCell>{name}</TableCell>
                            <TableCell
                              sx={{
                                bgcolor:
                                  analysis.category === "malicious"
                                    ? "red"
                                    : "#6AAB8E",
                              }}
                            >
                              {analysis.category}
                            </TableCell>
                            <TableCell>{analysis.result}</TableCell>
                            <TableCell>{analysis.method}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={
                      Object.entries(
                        result["data"]["attributes"]["last_analysis_results"]
                      ).length
                    }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
              </Card>
            ) : null}

            {result["data"]["attributes"]["whois"] && (
              <Card
                key="whois_card"
                variant="outlined"
                sx={{ m: 1, p: 2, borderRadius: 5, boxShadow: 0 }}
              >
                <Typography variant="h5" component="h2" gutterBottom>
                  Whois
                </Typography>
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {expanded
                    ? result["data"]["attributes"]["whois"]
                    : result["data"]["attributes"]["whois"].slice(0, 200)}
                </Typography>
                {result["data"]["attributes"]["whois"].length > 250 && (
                  <Button onClick={toggleExpanded}>
                    {expanded ? "Read Less" : "Read More"}
                  </Button>
                )}
              </Card>
            )}
          </Box>
        ) : (
          <Box sx={{ margin: 1 }}>
            <Grid
              xs
              item={true}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <NoDetails />
            </Grid>
          </Box>
        )
      ) : null}
    </>
  );

  return (
    <>
      <ResultRow
        name="Virustotal"
        id="virustotal"
        icon="vt_logo_small"
        loading={loading}
        result={result}
        summary={
          malCount === null
            ? "No matches found"
            : "Detected as malicious by " + malCount + " engine(s)"
        }
        summary_color={{ color: null }}
        color={malCount > 0 ? "red" : "green"}
        error={error}
        details={details}
      />
    </>
  );
}
