import io from "socket.io-client";
let socketUrl = "http://154.92.15.136:9000";
if (window.location.hostname == "localhost") {
  socketUrl = "http://127.0.0.1:9000";
}
const socket = io(socketUrl);
socket.on("connect", () => {
  console.log("连接成功");
});
export default socket;
