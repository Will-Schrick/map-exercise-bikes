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
    const response = await fetch("https://api.citybik.es/v2/networks/bicimad", {
      mode: "no-cors",
    });
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const bikeData = getBikeNetwork();

const coordinates = [];
bikeData.network.stations.forEach(({ latitude, longitude }) => {
  coordinates.push({ longitude, latitude });
});


/*
let userData
async function executeUserData() {
    userData =  await getUserData;
}
executeUserData()
*/
