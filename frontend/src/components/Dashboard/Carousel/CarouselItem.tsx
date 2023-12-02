import React from "react";
import { transform } from "typescript";

export const items = [
  {
    description: "Register in the app",
    title: "JOINING THE TEAM",
    icon: require("../../../assets/Throphy-01.png"),
  },
  {
    description: "Make the first win",
    title: "FIRST WIN",
    icon: require("../../../assets/Throphy-02.png"),
  },
  {
    description: "Add first friend",
    title: "BE-FRIENDER",
    icon: require("../../../assets/Throphy-05.png"),
  },
  {
    description: "Complete a combo of 3 consecutive wins",
    title: "WILDIN 'OUT",
    icon: require("../../../assets/Throphy-03.png"),
  },
  {
    description: "Play a game in every single mode",
    title: "VERSATILE PONGER",
    icon: require("../../../assets/Throphy-08.png"),
  },
  {
    description: "Win a game without conseiving a single goal",
    title: "THE WALL",
    icon: require("../../../assets/Throphy-04.png"),
  },
  {
    description: "Add 3 friends",
    title: "THE SOCIALISER",
    icon: require("../../../assets/Throphy-06.png"),
  },
  {
    description: "Complete a combo of 10 consecutive wins",
    title: "THE VANQUISHER",
    icon: require("../../../assets/Throphy-07.png"),
  },
  {
    description: "Win a game in every single mode",
    title: "THE CHAMELEON",
    icon: require("../../../assets/Throphy-09.png"),
  },
  {
    description: "Manage to beat every single friend at least one time",
    title: "THE EXECUTIONER",
    icon: require("../../../assets/Throphy-10.png"),
  },
];

export const CarouselItem = ({ item } : { item: any }) => {
  return (
    <div  className="snap-center m-auto carousel-item inline-flex flex-col place-items-center justify-center h-[340px]">
      <img className="carousel-img animated hinge min-[0px]:w-[190px] min-[0px]:h-[190px] md:w-[250px] md:h-[250px] p-8" src={item.icon} />
      <div className="carousel-item-text min-[0px]:text-xl xl:text-2xl font-Nova font-bold">{item.title}</div>
    </div>
  );
};