import "./Home.css";
import Header from "./Header";
import MainCard from "./MainCard";
import GalleryTemplates from "./GaleryTemplates";
import TableTemplates from "./TableTemplates";
import { Card } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="gray-background w-full min-h-screen  px-3 py-3">
      <Header></Header>
      <MainCard></MainCard>
      <GalleryTemplates></GalleryTemplates>
      <Card className="w-full h-24 my-5 rounded-3xl bg-neutral-500 flex justify-center items-center">
        {" "}
        IMPROVE YOUR DATA EXTRACTION
      </Card>
      <TableTemplates></TableTemplates>
    </div>
  );
}

