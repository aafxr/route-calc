import { hotelService } from "./services/HotelService";
import { placeService } from "./services/PlaceService";
import "./style.css";

const app = document.querySelector('#app')!

placeService.getAll().then((places) => {
  let result = "<table>";
  result += `<tr><th>id</th><th>name</th><th>address</th><th>position</th></tr>`;
  for (const place of places) {
    result += `<tr><td>${place.id}</td><td>${place.name}</td><td>${place.formatted_address}</td><td>${place.position}</td></tr>`;
  }
  result += "</table>";
  app.innerHTML += result
});

hotelService.getAll().then((hotels) => {
  let result = "<table>";
  result += `<tr><th>id</th><th>name</th><th>address</th><th>position</th></tr>`;
  for (const hotel of hotels) {
    result += `<tr><td>${hotel.id}</td><td>${hotel.name}</td><td>${hotel.formatted_address}</td><td>${hotel.position}</td></tr>`;
  }
  result += "</table>";
  app.innerHTML += result
});



