import { hotelService } from './services/HotelService';
import { placeService } from './services/PlaceService';
import Graph from './data-structur/Graph';
import './style.css';
import { PlaceType } from './types/PlaceType';
import GraphVertex from './data-structur/GraphVertex';
import { FieldSelector } from './classes/FieldSelector';
import { GraphWeightType } from './types/GraphWeightType';
import GraphEdge from './data-structur/GraphEdge';
import { GraphVertexWeight } from './classes/GraphVertexWeight';
import { distAB } from './distAB';

const app = document.querySelector('#app')!;

placeService.getAll().then((places) => {
  let result = '<table>';
  result += `<tr><th>id</th><th>name</th><th>address</th><th>position</th></tr>`;
  for (const place of places) {
    result += `<tr><td>${place.id}</td><td>${place.name}</td><td>${place.formatted_address}</td><td>${place.position}</td></tr>`;
  }
  result += '</table>';
  app.innerHTML += result;
});

hotelService.getAll().then((hotels) => {
  let result = '<table>';
  result += `<tr><th>id</th><th>name</th><th>address</th><th>position</th></tr>`;
  for (const hotel of hotels) {
    result += `<tr><td>${hotel.id}</td><td>${hotel.name}</td><td>${hotel.formatted_address}</td><td>${hotel.position}</td></tr>`;
  }
  result += '</table>';
  app.innerHTML += result;
});

placeService.getAll().then((places) => {
  const graph = new Graph<PlaceType, GraphVertexWeight<GraphWeightType>>();
  const fieldSelector = new FieldSelector<GraphWeightType>('distance')

  places.map((p) => new GraphVertex(p)).forEach((vp) => graph.addVertex(vp));
  const vertices = graph.getAllVertices();
  
  vertices.map(vp => 
    vertices
    .filter(v => v !== vp)
    .forEach(v => {
      const gvw = new GraphVertexWeight<GraphWeightType>(
        {
          distance: distAB(vp.value.position, v.value.position),
          rate:v.value.rate
        }, fieldSelector)

      graph.addEdge(new GraphEdge(vp, v, gvw))
    }
  )
});
