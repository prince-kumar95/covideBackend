const express = require("express");
const fetch = require("node-fetch");
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5050;

app.get("/help-line", async (req, res) => {
  let data;
  await fetch(process.env.CONTACTS_URL)
    .then((r) => r.json())
    .then((r) => (data = r.data.contacts.regional));
  res.send(data);
});

app.get("/advises", async (req, res) => {
    let data;
    await fetch(process.env.NOTIFICATION_URL)
      .then((r) => r.json())
      .then((r) => {
          const notifi = r.data.notifications;
          notifi.map((item)=>{
              item.date = item.title.substring(0,item.title.indexOf(" ")) || "N/A";
              item.title = item.title.substring(item.title.indexOf(" "))
          })
          data = notifi;
      });
    res.send(data);
  });

  app.get("/hospital-beds", async (req, res) => {
    let data;
    await fetch(process.env.HOSPITAL_BEDS_URL)
      .then((r) => r.json())
      .then((r) => (data = r.data.regional));
    res.send(data);
  });

  app.get("/college-beds", async (req, res) => {
    let data;
    await fetch(process.env.COLLEGE_BEDS_URL)
      .then((r) => r.json())
      .then((r) => (data = r.data.medicalColleges));
    res.send(data);
  });

//   app.get("/college-beds", async (req, res) => {
//     let data;
//     await fetch("https://api.rootnet.in/covid19-in/hospitals/medical-colleges")
//       .then((r) => r.json())
//       .then((r) => (data = r.data.medicalColleges));
//     res.send(data);
//   });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
