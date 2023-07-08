import React from "react";
import { rows } from "../../../constants/chatData";
import { useParams } from "react-router-dom";
import "./../../../assets/styles/chat.css";

function DetailChat() {
  const { id } = useParams();
  const Chat = rows[id];

  const messages = [
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
    "Message",
  ];

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card mb-3" style={{ width: 650 }}>
            <div className="row g-0">
              <div className="col-md-4">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    className="img-fluid rounded-start mt-5"
                    src={Chat.logo}
                    alt="Card image cap"
                    style={{ height: 250, width: 250 }}
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title " style={{ textAlign: "center" }}>
                    {Chat.name}
                  </h3>
                  <hr></hr>
                  <div className="row">
                    <div className="col-4">
                      <h6>Name :</h6>
                    </div>
                    <div className="col-4">
                      <p className="card-text">
                        <small className="text-muted">{Chat.name}</small>
                      </p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-4">
                      <h6>Admin :</h6>
                    </div>
                    <div className="col-4">
                      <p className="card-text">
                        <small className="text-muted">{Chat.admin}</small>
                      </p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-4">
                      <h6>Chat Type : </h6>
                    </div>
                    <div className="col-4">
                      <p className="card-text">{Chat.chatType}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-4">
                      <h6> Created At : </h6>
                    </div>
                    <div className="col-4">
                      <p className="card-text">
                        <small className="text-muted">
                          {Chat.createdAt}
                        </small>
                      </p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-4">
                      <h6>Users number :</h6>
                    </div>
                    <div className="col-4">
                      <p className="card-text">
                        <small className="text-muted">
                          {Chat.usersNumber}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-4">
                      <h6>Members:</h6>
                    </div>
                    <div className="col-4">
                      {Chat?.users.map((e, i) => (
                        <span className="card-text" key={i}>
                          <small className="text-muted">{e + " "}</small>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4" style={{ width: 600 }}>
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h5 className="card-title">Messenger</h5>
                <hr />
                <div
                  className="chat-message"
                  style={{ maxHeight: 530, overflow: "auto" }}
                >
                  {messages.map((message, index) => (
                    <p
                      className={`message ${
                        index % 2 === 0 ? "message-left" : "message-right"
                      }`}
                      key={index}
                    >
                      {message}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailChat;
