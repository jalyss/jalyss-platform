import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommands } from "../../store/command";

const CommandList = () => {
  const dispatch = useDispatch();
  const commands = useSelector((state) => state.command);

  useEffect(() => {
    dispatch(fetchCommands());
  }, [dispatch]);

  return (
    <div>
      <h1>Command List</h1>
      {commands.map((command) => (
        <div key={command.id}>
          {/* <p>{command.title}</p> */}
          {/* <p>{command.description}</p> */}
        </div>
      ))}
    </div>
  );
};

export default CommandList;
