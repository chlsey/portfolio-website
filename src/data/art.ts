const base = import.meta.env.BASE_URL;

export type ArtPiece = {
    id: string;
    title: string;
    image: string;
    medium?: string;
};

export const artworks: ArtPiece[] = [
    { id: "piece-0", title: "Home, painted this when I was really homesick :[",   image: `${base}art/home.jpg`, medium: "Digital" },
    { id: "piece-1", title: "Some cool supermarket fish I saw", image: `${base}art/fish.jpg`, medium: "Watercolor" },
    { id: "piece-2", title: "Banff trip sketches from May 2026!",  image: `${base}art/banff-1.jpg`, medium: "Marker + colored pencils" },
    { id: "piece-3", title: "Banff trip sketches", image: `${base}art/banff-2.jpg`, medium: "Marker + colored pencils" },
    { id: "piece-4", title: "Bike ride, very inspired by the movie Look Back!!", image: `${base}art/bikeride.jpg`, medium: "Digital" },
    { id: "piece-5", title: "Sunset drive",   image: `${base}art/sunset.jpg`, medium: "Digital" },
    { id: "piece-6", title: "A lovers tarot card inspired magazine cover",   image: `${base}art/lovers.jpg`, medium: "Digital" },
    { id: "piece-7", title: "Just a bunch of silly animals",   image: `${base}art/animals.png`, medium: "Pencil + gouache" },
    { id: "piece-8", title: "A background for a morgue game I worked on!",   image: `${base}art/morgue.png`, medium: "Photobashed" },
    { id: "piece-9", title: "A few discord stickers I made for UofT's CSSU",   image: `${base}art/stickers.jpg`, medium: "Digital" },
];
