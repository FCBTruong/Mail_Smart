import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactJson from "react-json-view";
import "bootstrap/dist/css/bootstrap.css";
import itemConfig from "./storage_item_config.json";

import Container from "@mui/material/Container";
import MailIcon from "@mui/icons-material/Mail";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

export default function App() {
  const [data, setData] = useState({
    gift: {
      gold: 0,
      diamond: 0,
      tickets: [],
      items: [],
    },
    action: "",
  });
  useEffect(() => {
    document.title = "Mail Smart";
  }, [data]);

  const onChangeGold = (e) => {
    var newData = { ...data };
    newData.gift.gold = (e.target.value) ? parseInt(e.target.value) : 0;
    setData(newData);
  };

  const onChangeDiamond = (e) => {
    var newData = { ...data };
    newData.gift.diamond = (e.target.value) ? parseInt(e.target.value) : 0;
    setData(newData);
  };

  const onChangeAction = (e) => {
    var newData = { ...data };
    newData.action = e.target.value;
    setData(newData);
  };

  const onAddTicket = (e) => {
    var newData = { ...data };
    newData.gift.tickets.push({ticketType: 1, ticketNum: 0});
    setData(newData);
  };

  const onRemoveTicket = (e) => {
    var newData = { ...data };
    newData.gift.tickets = []
    setData(newData);
  };

  const onChangeTicketNum = (e) => {
    var newData = { ...data };
    newData.gift.tickets[0].ticketNum = (e.target.value) ? parseInt(e.target.value) : 0;
    setData(newData);
  }

  const onChangeTicketType = (e) => {
    var newData = { ...data };
    newData.gift.tickets[0].ticketType = (e.target.value) ? parseInt(e.target.value) : 0;
    setData(newData);
  }

  const onAddItem = (e) => {
    NotificationManager.info("Not available yet", ".");
  };

  const onSubmit = () => {
    navigator.clipboard.writeText(JSON.stringify(data));

    NotificationManager.success(
      "Copied to clipboard",
      "Generate gifts sucessfully"
    );
  }; // your form submit function which will invoke after successful validation

  return (
    <div>
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="15vh"
        >
          <MailIcon
            sx={{ fontSize: 80, align: "center" }}
            align="right"
            color="primary"
          />
        </Box>
        <Container>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="gold_input"
              label="Gold"
              variant="outlined"
              value={data.gift.gold}
              onChange={onChangeGold}
              type="number"
              InputProps={{ inputProps: { min: 0, max: 10000000 } }}
            />
            <TextField
              id="diamond_input"
              label="Diamond"
              variant="outlined"
              value={data.gift.diamond}
              onChange={onChangeDiamond}
              type="number"
              InputProps={{ inputProps: { min: 0, max: 100000 } }}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Action</InputLabel>
              <Select
                labelId="action"
                id="action"
                value={data.gift.action}
                label="Action"
                onChange={onChangeAction}
              >
                <MenuItem value={"none"}>NONE</MenuItem>
                <MenuItem value={"open_my_home"}>Open My Home</MenuItem>
                <MenuItem value={"open_shop"}>Open Shop</MenuItem>
                <MenuItem value={"join_table"}>Join Table</MenuItem>
              </Select>
            </FormControl>
            {data.gift.tickets.length > 0 ? (
              data.gift.tickets.map((ticket) => {
                return (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FormControl style={{ width: "50%" }}>
                      <InputLabel id="demo-simple-select-label">
                        Ticket
                      </InputLabel>
                      <Select
                        labelId="ticket"
                        id="ticket"
                        value={data.gift.tickets[0].ticketType}
                        label="Ticket"
                        onChange={onChangeTicketType}
                      >
                        <MenuItem value={1}>EggBreak</MenuItem>
                        <MenuItem value={2}>LuckyCard</MenuItem>
                        <MenuItem value={3}>Tacos</MenuItem>
                      </Select>
                    </FormControl>
                    <div style={{ width: "10px" }}></div>
                    <FormControl style={{ width: "50%" }}>
                      <TextField
                        id="ticket_number_input"
                        label="Number"
                        variant="outlined"
                        value={data.gift.tickets[0].ticketNum}
                        onChange={onChangeTicketNum}
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 100000 } }}
                      />
                    </FormControl>
                    <IconButton color="primary" component="label">
                      <input hidden onClick={onRemoveTicket} />
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                );
              })
            ) : (
              <Button
                variant="outlined"
                onClick={onAddTicket}
                color="primary"
                startIcon={<AddIcon />}
              >
                ADD TICKET
              </Button>
            )}
            <Button
              onClick={onAddItem}
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
            >
              ADD ITEM
            </Button>
          </Box>
        </Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="10vh"
        >
          <Button variant="contained" onClick={onSubmit}>
            Generate
          </Button>
        </Box>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
          }}
        >
          <ReactJson src={data} theme="monokai" />
        </Box>
      </Container>
      <NotificationContainer />
    </div>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(
  <>
    <App />
  </>,
  rootElement
);
