"use client";
import Deposit from "./deposit"
import { Web3Provider } from "./Web3Provider";

import Header from "../ui/Header";
import Footer from "../ui/Footer";

import "../styles/tailwind.css"
import "../styles/van.css"
import "../styles/common.css"

export default function Home() {
  return (
       <Web3Provider>
        <Header />
        <Deposit />
        <Footer />
      </Web3Provider>
  );
}
