//
var map = new maplibregl.Map({
  container: "map",
  style: "https://tiles.openfreemap.org/styles/liberty", // Estilo de mapa de OpenFreeMap
  center: [-3.70256, 40.4165], // Coordenadas de ubicación inicial
  zoom: 11, // Nivel de zoom inicial
});

var marker = new maplibregl.Marker({ color: "red" })
  .setLngLat([-3.70256, 40.4165])
  .setPopup(new maplibregl.Popup().setHTML("Este es una ciudad Fantastica"))
  .addTo(map);

const getBikeNetwork = async () => {
  try {
    const response = await fetch("https://api.citybik.es/v2/networks/bicimad");
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};


const coordinates = [];
getBikeNetwork().then(bikeData => {
bikeData.network.stations.forEach(({ name, latitude, longitude }) => {
  coordinates.push({ name, longitude, latitude });
  
});

console.log(coordinates);
  
coordinates.forEach(function(station)  {
  new maplibregl.Marker({ color: "red" })
      .setLngLat([station.longitude, station.latitude])
      .setPopup(new maplibregl.Popup().setHTML(station.name))
      .addTo(map);
      });

});



/*
let userData
async function executeUserData() {
    userData =  await getUserData;
}
executeUserData()
*/