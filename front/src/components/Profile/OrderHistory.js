import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommands } from "../../store/command";
import "../../assets/styles/profile.css";


const CommandList = () => {
  const dispatch = useDispatch();
  const commands = useSelector((state) => state.command.commands);

  useEffect(() => {
    dispatch(fetchCommands());
  }, [dispatch]);

  return (
    <div>
      <h1>Command List</h1>
      <div className="command-container">
      {commands.items.map((command) => (
        <div key={command.id} className="command-card">
          <h3>Command ID: {command.id}</h3>
          <p>Your Name: {command.clientName}</p>
          <p>Your Email: {command.clientEmail}</p>
          <p>Your Address: {command.clientAddress}</p>

          <ul>
            {command.commandLine.map((line) => (
              <li key={line.commandId}>
                Article ID: {line.articleByBranchId},
                Quantity: {line.quantity}

              </li>
            ))}
          </ul>
        </div>
      ))}
      </div>
    </div>
  );
};

export default CommandList;
