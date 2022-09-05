import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import ReactJson from "react-json-view";
import "bootstrap/dist/css/bootstrap.css";
import itemConfig from "./storage_item_config.json";
import "./styles.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

var JsonConfig = {
  gift: {
    gold: 500000,
    diamond: 0,
    tickets: [],
    items: [],
  },
};

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
  });

  const [items, setItems] = React.useState([]);
  const [tickets, setTickets] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  const [counterTicket, setCounterTicket] = React.useState(0);
  const [selectedItemType, setItemType] = React.useState({
    type: 0,
  });

  function clickAddItem() {
    console.log("Add item");
    setItems((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
    console.log(JSON.stringify(items));
  }

  const removeItem = (index) => () => {
    console.log("INDEX_REMOVE", index);
    setItems((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ]);
    setCounter((prevCounter) => prevCounter - 1);
    console.log(JSON.stringify(items));
  };

  function clickAddTicket() {
    console.log("Click Add ticket");
    setTickets((prevIndexes) => [...prevIndexes, counterTicket]);
    setCounterTicket((prevCounter) => prevCounter + 1);
    console.log(JSON.stringify(tickets));
  }

  const removeTicket = (index) => () => {
    console.log("INDEX_REMOVE", index);
    setTickets((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ]);
    setCounterTicket((prevCounter) => prevCounter - 1);
    console.log(JSON.stringify(items));
  };

  function handleChange(e) {
    console.log("Item type selected" + e.target.value);
    setItemType({ ...selectedItemType, type: e.target.value });
    console.log("Selected" + selectedItemType);
  }

  const onSubmit = (data) => {
    console.log("DT: " + JSON.stringify(data));

    // check null
    if (data.tickets === undefined) {
      data.tickets = [];
    }
    if (data.items === undefined) {
      data.items = [];
    }
    // end check

    var jsonResult = {};
    jsonResult.gift = data;
    JsonConfig = jsonResult;
    navigator.clipboard.writeText(JSON.stringify(JsonConfig));
 
    NotificationManager.success('Copied to clipboard', 'Generate gifts sucessfully');
  }; // your form submit function which will invoke after successful validation

  console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <p id="head_input">GOlD</p>
      <input
        type="number"
        defaultValue={0}
        {...register("gold", { valueAsNumber: true })}
      />

      <p>DIAMOND</p>
      {/* include validation with required or other standard HTML validation rules */}
      <input
        type="number"
        defaultValue={0}
        {...register("diamond", { required: true, valueAsNumber: true })}
      />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <p>This field is required</p>}

      <p>
        ITEMS
        <div className="items">
          <ul>
            {items.map((index) => {
              const fieldName = `items[${index}]`;
              return (
                <li>
                  <div>
                    <p>Item ID</p>
                    <select
                      type="number"
                      defaultValue={0}
                      id="itemId"
                      {...register(`${fieldName}.itemId`, {
                        valueAsNumber: true,
                      })}
                    >
                      {Object.keys(itemConfig[selectedItemType.type]).map(
                        (key) => {
                          var obj = itemConfig[selectedItemType.type][key];
                          return <option value={obj.id}>{obj.name}</option>;
                        }
                      )}
                    </select>
                    <p>Item Type</p>
                    <select
                      id="itemType"
                      {...register(`${fieldName}.itemType`, {
                        valueAsNumber: true,
                      })}
                      onChange={handleChange}
                    >
                      <option value="0">AVATAR</option>
                      <option value="1">INTERACTION</option>
                      <option value="2">EMOTICON</option>
                    </select>
                    <p>Item Sub Type</p>
                    {
                      <select
                        id="itemSubType"
                        defaultValue={0}
                        {...register(`${fieldName}.itemSubType`, {
                          valueAsNumber: true,
                        })}
                      >
                        <option value="0">1 Day</option>
                        <option value="1">7 Days</option>
                        <option value="2">30 Days</option>
                      </select>
                    }
                    <p>Item Number</p>
                    <input
                      type="number"
                      defaultValue={1}
                      id="itemNum"
                      {...register(`${fieldName}.itemNum`, {
                        valueAsNumber: true,
                      })}
                    ></input>
                    <button type="button" onClick={removeItem(index)}>
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </p>
      <div>
        <input type="button" value="+" onClick={clickAddItem} />
      </div>
      <p>
        TICKETS
        <div className="tickets">
          <ul>
            {tickets.map((index) => {
              const fieldName = `tickets[${index}]`;
              return (
                <li>
                  <div>
                    <input
                      type="number"
                      defaultValue={0}
                      id="ticketNum"
                      {...register(`${fieldName}.ticketNum`, {
                        valueAsNumber: true,
                      })}
                    ></input>
                    <select
                      id="ticketType"
                      {...register(`${fieldName}.ticketType`, {
                        valueAsNumber: true,
                      })}
                    >
                      <option value="1">Event Egg Breaker</option>
                      <option value="2">Event Lucky Card</option>
                      <option value="3">Event Tacos</option>
                    </select>
                    <button type="button" onClick={removeTicket(index)}>
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </p>
      <div>
        <input type="button" value="+" onClick={clickAddTicket} />
      </div>

      <NotificationContainer />
      <input type="submit" />
      <div className="App">
        <ReactJson src={JsonConfig} theme="monokai" />
      </div>
    </form>
  );
}

const rootElement = document.getElementById("root");

 
class Example extends React.Component {
  createNotification = (type) => {
    return () => {
     
    };
  };
 
  render() {
    return (
      <div>
        <button className='btn btn-info'
          onClick={this.createNotification('info')}>Info
        </button>
        <hr/>
        <button className='btn btn-success'
          onClick={this.createNotification('success')}>Success
        </button>
        <hr/>
        <button className='btn btn-warning'
          onClick={this.createNotification('warning')}>Warning
        </button>
        <hr/>
        <button className='btn btn-danger'
          onClick={this.createNotification('error')}>Error
        </button>
 
        <NotificationContainer/>
      </div>
    );
  }
}
 
ReactDOM.render(<><App />
<Example/></>, rootElement);
