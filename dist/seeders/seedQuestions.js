"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const firebase_admin_1 = require("../config/firebase-admin");
const db = firebase_admin_1.admin.firestore();
const questions = [
    //  NAIJA SLANG
    {
        question: "What does “Wahala be like bicycle” mean?",
        options: [
            "Trouble is easy to start",
            "It’s fun to ride",
            "It’s slow and steady",
            "It’s expensive",
        ],
        answer: "Trouble is easy to start",
        category: "Slang",
    },
    {
        question: "If someone is “Odogwu”, what are they?",
        options: ["A king", "A warrior", "A big person or champion", "A beggar"],
        answer: "A big person or champion",
        category: "Slang",
    },
    {
        question: "What does “Gbam!” mean in Nigerian slang?",
        options: ["Loud sound", "Complete agreement", "Explosion", "Fight"],
        answer: "Complete agreement",
        category: "Slang",
    },
    {
        question: "If someone is “doing Shakara”, what are they doing?",
        options: ["Complaining", "Showing off", "Cooking", "Dancing"],
        answer: "Showing off",
        category: "Slang",
    },
    {
        question: "If someone says “E choke!”, what do they mean?",
        options: [
            "They are in pain",
            "They are shocked or impressed",
            "They want to eat",
            "They are feeling sleepy",
        ],
        answer: "They are shocked or impressed",
        category: "Slang",
    },
    {
        question: "What does “Kpali” mean in Naija slang?",
        options: ["Certificate or document", "Money", "Friend", "Secret"],
        answer: "Certificate or document",
        category: "Slang",
    },
    {
        question: "If someone is a “Yoruba Demon”, what are they known for?",
        options: [
            "Cooking well",
            "Being a player in relationships",
            "Singing loud",
            "Fighting often",
        ],
        answer: "Being a player in relationships",
        category: "Slang",
    },
    {
        question: "If you “dey catch cruise”, what are you doing?",
        options: [
            "Driving fast",
            "Making jokes or having fun",
            "Stealing",
            "Dancing",
        ],
        answer: "Making jokes or having fun",
        category: "Slang",
    },
    // 🎶 MUSIC
    {
        question: "Who is known as the “Queen of Afrobeat”?",
        options: ["Tiwa Savage", "Yemi Alade", "Asa", "Simi"],
        answer: "Tiwa Savage",
        category: "Music",
    },
    {
        question: "What’s the title of Wizkid’s first album?",
        options: ["Superstar", "Made in Lagos", "Sound from the Other Side", "Ayo"],
        answer: "Superstar",
        category: "Music",
    },
    {
        question: "Which song made Burna Boy win his first Grammy?",
        options: ["Ye", "Last Last", "On the Low", "Twice as Tall"],
        answer: "Twice as Tall",
        category: "Music",
    },
    {
        question: "Which artist is known as “African Giant”?",
        options: ["Davido", "Burna Boy", "Mr. Eazi", "Olamide"],
        answer: "Burna Boy",
        category: "Music",
    },
    {
        question: "Which song is known for the line “Now wey I dey alive” by Patoranking?",
        options: ["No Kissing", "Abule", "Alubarika", "Celebrate Me"],
        answer: "Celebrate Me",
        category: "Music",
    },
    {
        question: "Which Nigerian rapper is known as “Mr. Incredible”?",
        options: ["Phyno", "Ice Prince", "M.I Abaga", "Vector"],
        answer: "M.I Abaga",
        category: "Music",
    },
    {
        question: "Who featured on Wizkid’s “Essence”?",
        options: ["Tiwa Savage", "Tems", "Burna Boy", "Simi"],
        answer: "Tems",
        category: "Music",
    },
    {
        question: "What is the title of Davido’s debut album?",
        options: [
            "A Better Time",
            "Son of Mercy",
            "Omo Baba Olowo (O.B.O)",
            "A Good Time",
        ],
        answer: "Omo Baba Olowo (O.B.O)",
        category: "Music",
    },
    //  FOOD
    {
        question: "What is the main ingredient in Moi Moi?",
        options: ["Yam", "Beans", "Plantain", "Cassava"],
        answer: "Beans",
        category: "Food",
    },
    {
        question: "Which of these is not a type of Nigerian soup?",
        options: ["Afang", "Jollof Soup", "Ogbono", "Efo Riro"],
        answer: "Jollof Soup",
        category: "Food",
    },
    {
        question: "What’s the popular street food combo called “Boli”?",
        options: ["Roasted Plantain", "Fried Yam", "Grilled Fish", "Puff-Puff"],
        answer: "Roasted Plantain",
        category: "Food",
    },
    {
        question: "Which of these spices is common in Jollof Rice?",
        options: ["Thyme", "Nutmeg", "Basil", "Ginger"],
        answer: "Thyme",
        category: "Food",
    },
    {
        question: "Which of these is a popular Yoruba dish?",
        options: ["Afang Soup", "Efo Riro", "Okpa", "Ofe Nsala"],
        answer: "Efo Riro",
        category: "Food",
    },
    {
        question: "What is the main ingredient in Akara?",
        options: ["Cassava", "Plantain", "Beans", "Yam"],
        answer: "Beans",
        category: "Food",
    },
    {
        question: "What is a common street food in Lagos known as “Boli”?",
        options: ["Grilled Fish", "Fried Yam", "Roasted Plantain", "Puff-Puff"],
        answer: "Roasted Plantain",
        category: "Food",
    },
    {
        question: "Which soup is famous among the Efik people?",
        options: ["Edikang Ikong", "Egusi Soup", "Afang Soup", "Efo Riro"],
        answer: "Afang Soup",
        category: "Food",
    },
    //  HISTORY & CULTURE
    {
        question: "Who was Nigeria’s first Prime Minister?",
        options: [
            "Nnamdi Azikiwe",
            "Olusegun Obasanjo",
            "Tafawa Balewa",
            "Yakubu Gowon",
        ],
        answer: "Tafawa Balewa",
        category: "History",
    },
    {
        question: "In which year did Nigeria gain independence?",
        options: ["1959", "1960", "1963", "1966"],
        answer: "1960",
        category: "History",
    },
    {
        question: "What is the traditional attire of the Yoruba called?",
        options: ["Isi Agu", "Agbada", "Okene", "Adire"],
        answer: "Agbada",
        category: "History",
    },
    {
        question: "What is the capital of Cross River State?",
        options: ["Uyo", "Asaba", "Calabar", "Yenagoa"],
        answer: "Calabar",
        category: "History",
    },
    {
        question: "Which year did Nigeria become a republic?",
        options: ["1959", "1960", "1963", "1970"],
        answer: "1963",
        category: "History",
    },
    {
        question: "Who was Nigeria’s first military Head of State?",
        options: [
            "Olusegun Obasanjo",
            "Yakubu Gowon",
            "Aguiyi Ironsi",
            "Sani Abacha",
        ],
        answer: "Aguiyi Ironsi",
        category: "History",
    },
    {
        question: "Which Nigerian city is known as the “Coal City”?",
        options: ["Lagos", "Port Harcourt", "Enugu", "Ibadan"],
        answer: "Enugu",
        category: "History",
    },
    {
        question: "The famous “Olojo Festival” is celebrated in which state?",
        options: ["Oyo", "Osun", "Lagos", "Ondo"],
        answer: "Osun",
        category: "History",
    },
    //  POP CULTURE
    {
        question: "Which Nigerian reality show launched Laycon’s career?",
        options: [
            "Nigerian Idol",
            "The Voice Nigeria",
            "Big Brother Naija",
            "Gulder Ultimate Search",
        ],
        answer: "Big Brother Naija",
        category: "Pop Culture",
    },
    {
        question: "Which Nollywood movie is famous for the line “My money grows like grass”?",
        options: [
            "Living in Bondage",
            "Aki na Ukwa",
            "Chief Daddy",
            "Billionaire’s Club",
        ],
        answer: "Billionaire’s Club",
        category: "Pop Culture",
    },
    {
        question: "Who is known as “Omo Baba Olowo”?",
        options: ["Wizkid", "Davido", "Burna Boy", "Olamide"],
        answer: "Davido",
        category: "Pop Culture",
    },
    {
        question: "What’s the name of the annual carnival in Cross River?",
        options: [
            "Lagos Carnival",
            "Calabar Carnival",
            "Abuja Carnival",
            "Owerri Festival",
        ],
        answer: "Calabar Carnival",
        category: "Pop Culture",
    },
    {
        question: "Which Nigerian series is known for the catchphrase “My dear, I cannot kill myself”?",
        options: [
            "Skinny Girl in Transit",
            "Jenifa’s Diary",
            "Sons of the Caliphate",
            "Tinsel",
        ],
        answer: "Skinny Girl in Transit",
        category: "Pop Culture",
    },
    {
        question: "Which comedian is known for the phrase “Something Hooge”?",
        options: ["Mr. Macaroni", "Broda Shaggi", "Lasisi Elenu", "Taaooma"],
        answer: "Mr. Macaroni",
        category: "Pop Culture",
    },
    {
        question: "Who starred in the movie “King of Boys” as Eniola Salami?",
        options: [
            "Genevieve Nnaji",
            "Funke Akindele",
            "Sola Sobowale",
            "Omotola Jalade",
        ],
        answer: "Sola Sobowale",
        category: "Pop Culture",
    },
    {
        question: "Which reality TV show launched Mercy Eke to fame?",
        options: [
            "Project Fame",
            "Nigerian Idol",
            "Big Brother Naija",
            "The Voice Nigeria",
        ],
        answer: "Big Brother Naija",
        category: "Pop Culture",
    },
];
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        const batch = db.batch();
        const colRef = db.collection("questions");
        questions.forEach((q) => {
            const docRef = colRef.doc();
            batch.set(docRef, q);
        });
        yield batch.commit();
        console.log("All trivia questions seeded successfully.");
    });
}
seed();
