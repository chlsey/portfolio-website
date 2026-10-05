const base = import.meta.env.BASE_URL;

export type Hobby = {
    id: string;
    title: string;
    image: string;
    medium?: string;
};


export const hobbies: Hobby[] = [
    { id: "hobby-1", title: "Hiking",   image: `${base}hobbies/hiking.jpg`, medium: "Went to Banff :]" },
    { id: "hobby-2", title: "Hanging with my dog",  image: `${base}hobbies/dog.jpg`, medium: "His name is 'the little guy'" },
    { id: "hobby-3", title: "Drawing", image: `${base}hobbies/drawing.jpg`, medium: "Yeah, if I didn't make it clear enough." },
    { id: "hobby-4", title: "Cooking", image: `${base}hobbies/cooking.jpg`, medium: "I like cooking recipes I find on Instagram reels..." },
    { id: "hobby-5", title: "Crafts", image: `${base}hobbies/crafts.jpg`, medium: "Made this keychain over Christmas last year." },
];
