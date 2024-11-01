var map = new maplibregl.Map({
  container: "map",
  style: "https://tiles.openfreemap.org/styles/liberty", // Estilo de mapa de OpenFreeMap
  center: [-3.70256, 40.4165], // Coordenadas de ubicación inicial
  zoom: 11, // Nivel de zoom inicial
});

var marker = new maplibregl.Marker({ color: "blue" })
  .setLngLat([-3.70256, 40.4165])
  .setPopup(new maplibregl.Popup().setHTML("Este es una ciudad Fantastica"))
  .addTo(map);

const getBikeNetwork = async () => {
  try {
    const response = await fetch("https://api.citybik.es/v2/networks/bicimad");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }

  setTimeout(getBikeNetwork, 10000);
};

const coordinates = [];
getBikeNetwork().then((bikeData) => {
  bikeData.network.stations.forEach(
    ({ name, latitude, longitude, free_bikes, empty_slots }) => {
      coordinates.push({ name, longitude, latitude, free_bikes, empty_slots });
    }
  );

  console.log(coordinates);

  coordinates.forEach(function (station) {
    new maplibregl.Marker({ color: "red" })
      .setLngLat([station.longitude, station.latitude])
      //.setPopup(new maplibregl.Popup().setHTML(station.name, station.free_bikes, station.empty_slots))
      //.setPopup(new maplibregl.Popup().setHTML(`Station:${station.name}, <br>Free Bikes:${station.free_bikes}<br>,Empty Sots:${station.empty_slots}`) )
      .setPopup(
        new maplibregl.Popup().setHTML(
          `<div>Station:${station.name}, <br>Free Bikes:${station.free_bikes}, <br>Empty Sots:${station.empty_slots}</div>`
        )
      )
      .addTo(map);
  });
});

// we have to use the ForEach loop. The markers must be tied to EACH coordinate. So, I have to put the makert part for
//long,lat,name, etc inside the ForEach loop above it. I can't execute it out side of it. Each station is unique, so when it's running, that is when
//i need to plot it on the map. makes sense.
/*

let userData
async function executeUserData() {
    userData =  await getUserData;
};
executeUserData()
*/
