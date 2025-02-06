import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Shop from "./shop/page";

export default function Home() {
  return (
    <div>   
       <Hero/>
       <Body/>
    </div>
  );
}
