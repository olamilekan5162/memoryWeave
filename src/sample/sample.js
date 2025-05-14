import lekan from "../assets/lekan.jpg";
import sade from "../assets/sade.png";
import holy from "../assets/holy.png";
import { v4 as uuidv4 } from "uuid";

export const sample = [
  {
    id: uuidv4(),
    title: "Moms Birthday",
    tags: ["birthday", "2024", "beach"],
    media: [
      { id: 1, url: lekan },
      { id: 2, url: sade },
      { id: 3, url: holy },
    ],
    date: new Date("2024-01-10").toDateString(),
    location: "Osogbo",
    ambientSound: "path/to/waves.mp3",
    note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas placeat assumenda qui, dolorem voluptate adipisci aut iure in magnam facilis amet fuga quisquam.",
  },
  {
    id: uuidv4(),
    title: "Summer Holiday",
    tags: ["holiday", "2023", "fun"],
    media: [
      { id: 1, url: sade },
      { id: 2, url: lekan },
      { id: 3, url: holy },
    ],
    date: new Date("2023-10-11").toDateString(),
    location: "Adamawa",
    ambientSound: "path/to/waves.mp3",
  },
  {
    id: uuidv4(),
    title: "Jesus Convention",
    tags: ["jesus", "convention", "church", "2022"],
    media: [
      { id: 1, url: holy },
      { id: 2, url: lekan },
      { id: 3, url: sade },
    ],
    ambientSound: "path/to/waves.mp3",
    date: new Date("2022-02-22").toDateString(),
    location: "Ilorin",
  },
];
