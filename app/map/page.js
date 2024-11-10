import BottomNavbar from "../../components/BottomNavbar";

const MapScreen = () => {
  return (
    <>
      <iframe
        className="w-full h-full absolute inset-0"
        src="https://wanderlog.com/list/geoMap/101/palawan-island-map/map"
        name="map"
        title="Tourist spots map"
      ></iframe>

      <BottomNavbar />
    </>
  );
};

export default MapScreen;
