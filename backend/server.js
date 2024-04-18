const express = require("express"); 
const dotenv = require("dotenv");
const chats = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
dotenv.config();
connectDB();
const app = express(); 
app.use(express.json()); 

// Route mặc định trả về thông báo khi API hoạt động thành công
app.get("/", (req, res) => {
  res.send("API IS RUNNING SUCCESSFULLY...");
});
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
const server = app.listen(5000, console.log(`Server started on port ${PORT}`.yellow.bold)); 

const io =require("socket.io")(server,{
  pingTimeout : 60000,
  cors:{
    origin: "http://localhost:3000"
  }
});

// Sự kiện khi có kết nối mới từ client
io.on("connection",(socket)=>{
socket.on('setup',(userData)=>{
  socket.join(userData._id)// Tham gia vào phòng theo ID của người dùng
  console.log(userData._id )
  socket.emit("we conntected")// Gửi thông báo đã kết nối thành công cho client
})
})

