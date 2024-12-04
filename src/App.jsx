import "./App.css";
import Header from "./components/Header";
import MainCard from "./components/MainCard";
import GalleryTemplates from "./components/GalleryTemplates"
import TableTemplates from "./components/TableTemplates";
import { Card } from "@nextui-org/react";

function App() {
  return (
    <div className="gray-background w-full min-h-screen  px-3 py-3">
      <Header></Header>
      <MainCard></MainCard>
      <GalleryTemplates></GalleryTemplates>
      <Card className="w-full h-24 my-5 rounded-3xl bg-neutral-500 flex justify-center items-center"> IMPROVE YOUR DATA EXTRACTION</Card>
      <TableTemplates></TableTemplates>
    </div>
  );
}

export default App;
