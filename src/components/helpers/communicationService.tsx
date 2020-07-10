let socketIO = require("socket.io-client");
let patch = require("socketio-wildcard")(socketIO.Manager);
const config = require("../helpers/config.json");

class CommunicationService {
  messageVsCallbacks: any = {};
  socket: any;

  init() {
    this.socket = socketIO(config.apiURL);
    patch(this.socket);
    this.socket.on("*", (packet: any) => {
      let messageName = packet.data[0];
      let messageBody = packet.data[1];
      let callback = this.messageVsCallbacks[messageName];
      if (!callback) {
        console.log("No callback registered ", messageName);
      } else {
        callback.method.call(callback.reference, messageBody);
      }
    });
  }

  registerCallback(messageName: any, reference: any, method: any) {
    this.messageVsCallbacks[messageName] = {
      reference: reference,
      method: method,
    };
  }

  postMessage(messageName: any, messageBody: any) {
    this.socket.emit(messageName, messageBody);
  }

  // sendMessage(receiverSocketID: any, messageName: any, message: any) {
  //   this.socket
  //   this.socket.in(receiverSocketID).emit(messageName, {
  //     message: message,
  //     receiverID: receiverSocketID,
  //   });
  // }

  unRegisterCallback(messageName: any) {
    delete this.messageVsCallbacks[messageName];
  }
}

export default new CommunicationService();
