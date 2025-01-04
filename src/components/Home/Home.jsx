import "./Home.css";
import Header from "./Header";
import MainCard from "./MainCard";
import GalleryTemplates from "./GaleryTemplates";
import TableTemplates from "./TableTemplates";
import Footer from "./Footer";
import { Card } from "@nextui-org/react";
import { TagsCloud } from "../TagsCloud/TagsCloud";

export default function Home() {
  
  return (
    <div className="gray-background w-full min-h-screen  px-3 py-3">
      <Header />
      <MainCard />
      <GalleryTemplates />
      <TagsCloud />
      <TableTemplates />
      <Footer/>
    </div>
  );
}
