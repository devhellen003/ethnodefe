"use client";
import Image from "next/image";
import Header from "./ui/Header";
import Pool from "./ui/pool";
import Footer from "./ui/Footer";

import "./styles/tailwind.css"
import "./styles/van.css"
import "./styles/common.css"

import { Web3Provider } from "./Web3Provider";

export default function Home() {
  return (
       <Web3Provider>

         <Header />
         <Pool />
         <Footer />
      </Web3Provider>
  );
}
