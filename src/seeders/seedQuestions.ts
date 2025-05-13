import "dotenv/config";
import { admin } from "../config/firebase-admin";

const db = admin.firestore();

const questions = [
  //  NAIJA SLANG
  {
    question: "What does “Wahala be like bicycle” mean?",
    options: [
      "Trouble is easy to start",
      "It is fun to ride",
      "It is slow and steady",
      "It is expensive",
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

  //  MUSIC
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
    question:
      "Which song is known for the line “Now wey I dey alive” by Patoranking?",
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
    question:
      "Which Nollywood movie is famous for the line “My money grows like grass”?",
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
    question:
      "Which Nigerian series is known for the catchphrase “My dear, I cannot kill myself”?",
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

  // SPORTS
  {
    question:
      "Who is known as the 'Mathematical' in Nigerian football history?",
    options: [
      "Rashidi Yekini",
      "Jay-Jay Okocha",
      "Segun Odegbami",
      "Kanu Nwankwo",
    ],
    answer: "Segun Odegbami",
    category: "Sports",
  },
  {
    question:
      "Which Nigerian footballer scored Nigeria's first-ever World Cup goal?",
    options: [
      "Daniel Amokachi",
      "Rashidi Yekini",
      "Jay-Jay Okocha",
      "Kanu Nwankwo",
    ],
    answer: "Rashidi Yekini",
    category: "Sports",
  },
  {
    question:
      "In which year did Nigeria's Super Eagles win their first AFCON title?",
    options: ["1980", "1994", "2000", "2013"],
    answer: "1980",
    category: "Sports",
  },
  {
    question:
      "Which Nigerian female athlete is known as the 'Queen of the Track'?",
    options: [
      "Blessing Okagbare",
      "Mary Onyali",
      "Falilat Ogunkoya",
      "Chioma Ajunwa",
    ],
    answer: "Blessing Okagbare",
    category: "Sports",
  },
  {
    question: "Who is Nigeria’s first Olympic gold medalist?",
    options: [
      "Mary Onyali",
      "Chioma Ajunwa",
      "Falilat Ogunkoya",
      "Francis Obikwelu",
    ],
    answer: "Chioma Ajunwa",
    category: "Sports",
  },
  {
    question: "Which Nigerian club is known as 'The People’s Elephant'?",
    options: [
      "Enyimba FC",
      "Kano Pillars",
      "Rangers International",
      "Sunshine Stars",
    ],
    answer: "Enyimba FC",
    category: "Sports",
  },
  {
    question:
      "Who was the captain of the Super Eagles during the 2013 AFCON win?",
    options: ["Kanu Nwankwo", "Joseph Yobo", "Vincent Enyeama", "Mikel Obi"],
    answer: "Joseph Yobo",
    category: "Sports",
  },
  {
    question:
      "Which Nigerian striker is known for the famous goal celebration 'Flute Dance'?",
    options: [
      "Jay-Jay Okocha",
      "Kanu Nwankwo",
      "Rashidi Yekini",
      "Victor Moses",
    ],
    answer: "Rashidi Yekini",
    category: "Sports",
  },
  {
    question: "Which Nigerian player has won the UEFA Champions League?",
    options: [
      "Jay-Jay Okocha",
      "Obafemi Martins",
      "Kanu Nwankwo",
      "Victor Osimhen",
    ],
    answer: "Kanu Nwankwo",
    category: "Sports",
  },
  {
    question:
      "Nigeria's famous 'D’Tigress' is the national team for which sport?",
    options: ["Handball", "Basketball", "Volleyball", "Table Tennis"],
    answer: "Basketball",
    category: "Sports",
  },
  {
    question: "Which Nigerian athlete is known as 'The Beast' in boxing?",
    options: ["Samuel Peter", "Anthony Joshua", "Ike Ibeabuchi", "Efe Ajagba"],
    answer: "Samuel Peter",
    category: "Sports",
  },
  {
    question: "Which Nigerian goalkeeper is famous for his penalty saves?",
    options: ["Ike Shorunmu", "Peter Rufai", "Vincent Enyeama", "Carl Ikeme"],
    answer: "Vincent Enyeama",
    category: "Sports",
  },
  {
    question:
      "In which year did Nigeria’s Golden Eaglets win their first U-17 World Cup?",
    options: ["1985", "1993", "2007", "2013"],
    answer: "1985",
    category: "Sports",
  },
  {
    question:
      "Which Nigerian athlete broke the 100m hurdles world record in 2022?",
    options: [
      "Mary Onyali",
      "Falilat Ogunkoya",
      "Blessing Okagbare",
      "Tobi Amusan",
    ],
    answer: "Tobi Amusan",
    category: "Sports",
  },
  {
    question: "Who is the first Nigerian player to play in the NBA?",
    options: ["Hakeem Olajuwon", "Obinna Ekezie", "Ime Udoka", "Festus Ezeli"],
    answer: "Hakeem Olajuwon",
    category: "Sports",
  },
  {
    question:
      "Which Nigerian female footballer won the CAF Women’s Player of the Year award four times?",
    options: [
      "Asisat Oshoala",
      "Perpetua Nkwocha",
      "Mercy Akide",
      "Desire Oparanozie",
    ],
    answer: "Perpetua Nkwocha",
    category: "Sports",
  },
  {
    question: "Which Nigerian athlete is known for the phrase 'No shaking'?",
    options: [
      "Rashidi Yekini",
      "Kanu Nwankwo",
      "Jay-Jay Okocha",
      "Taribo West",
    ],
    answer: "Taribo West",
    category: "Sports",
  },
  {
    question:
      "Who is the first Nigerian boxer to become a heavyweight world champion?",
    options: ["Ike Ibeabuchi", "Samuel Peter", "Anthony Joshua", "Efe Ajagba"],
    answer: "Anthony Joshua",
    category: "Sports",
  },
  {
    question: "Which Nigerian footballer is known as 'The Big Boss'?",
    options: ["Stephen Keshi", "Sunday Oliseh", "Mikel Obi", "Joseph Yobo"],
    answer: "Stephen Keshi",
    category: "Sports",
  },
  {
    question:
      "Which Nigerian player scored a hat-trick against Cameroon in AFCON 2004?",
    options: [
      "Jay-Jay Okocha",
      "Julius Aghahowa",
      "Obafemi Martins",
      "Yakubu Aiyegbeni",
    ],
    answer: "Julius Aghahowa",
    category: "Sports",
  },
  {
    question:
      "Which Nigerian player won the FIFA U-17 World Cup Golden Boot in 2015?",
    options: [
      "Kelechi Iheanacho",
      "Victor Osimhen",
      "Samuel Chukwueze",
      "Taiwo Awoniyi",
    ],
    answer: "Victor Osimhen",
    category: "Sports",
  },
  {
    question:
      "Who was the first Nigerian player to play in the English Premier League?",
    options: ["Taribo West", "Jay-Jay Okocha", "Efan Ekoku", "Kanu Nwankwo"],
    answer: "Efan Ekoku",
    category: "Sports",
  },
  {
    question:
      "Which Nigerian athlete won the Commonwealth gold medal in wrestling in 2018?",
    options: [
      "Odunayo Adekuoroye",
      "Blessing Oborududu",
      "Aminat Adeniyi",
      "Daniel Igali",
    ],
    answer: "Blessing Oborududu",
    category: "Sports",
  },
  {
    question:
      "Who scored Nigeria’s winning goal against Argentina at the 1996 Olympics?",
    options: [
      "Kanu Nwankwo",
      "Jay-Jay Okocha",
      "Emmanuel Amuneke",
      "Celestine Babayaro",
    ],
    answer: "Emmanuel Amuneke",
    category: "Sports",
  },
  {
    question: "Which Nigerian boxer won gold at the 1962 Commonwealth Games?",
    options: ["Nojim Maiyegun", "Hogan Bassey", "Dick Tiger", "Samuel Peter"],
    answer: "Nojim Maiyegun",
    category: "Sports",
  },
  {
    question: "Who is the youngest Nigerian to play in a FIFA World Cup?",
    options: [
      "Kelechi Iheanacho",
      "Samuel Chukwueze",
      "Femi Opabunmi",
      "Mikel Obi",
    ],
    answer: "Femi Opabunmi",
    category: "Sports",
  },
  {
    question:
      "Which Nigerian player won an NBA championship with the Milwaukee Bucks?",
    options: [
      "Hakeem Olajuwon",
      "Giannis Antetokounmpo",
      "Michael Olowokandi",
      "Thanasis Antetokounmpo",
    ],
    answer: "Thanasis Antetokounmpo",
    category: "Sports",
  },
  {
    question: "Who is the first Nigerian to win a UFC title?",
    options: [
      "Kamaru Usman",
      "Israel Adesanya",
      "Sodiq Yusuff",
      "Usman Garuba",
    ],
    answer: "Kamaru Usman",
    category: "Sports",
  },
  {
    question: "Which Nigerian basketball team is known as D’Tigers?",
    options: [
      "Male Basketball Team",
      "Female Basketball Team",
      "U-17 Team",
      "Beach Volleyball Team",
    ],
    answer: "Male Basketball Team",
    category: "Sports",
  },
  {
    question:
      "Which Nigerian athlete won bronze in the long jump at the 1996 Olympics?",
    options: [
      "Mary Onyali",
      "Falilat Ogunkoya",
      "Chioma Ajunwa",
      "Glory Alozie",
    ],
    answer: "Chioma Ajunwa",
    category: "Sports",
  },

  // Track and Field
  {
    question: "Who is Nigeria’s fastest female sprinter as of 2022?",
    options: ["Blessing Okagbare", "Mary Onyali", "Tobi Amusan", "Mercy Nku"],
    answer: "Tobi Amusan",
    category: "Track and Field",
  },
  {
    question: "Which Nigerian sprinter is known as the 'Divine Express'?",
    options: [
      "Divine Oduduru",
      "Seye Ogunlewe",
      "Blessing Okagbare",
      "Davidson Ezinwa",
    ],
    answer: "Divine Oduduru",
    category: "Track and Field",
  },
  {
    question:
      "Which Nigerian athlete won silver at the 2000 Olympics in the 4x400m relay?",
    options: [
      "Mary Onyali",
      "Falilat Ogunkoya",
      "Fatimah Yusuf",
      "Glory Alozie",
    ],
    answer: "Falilat Ogunkoya",
    category: "Track and Field",
  },
  {
    question: "Who holds the Nigerian record for men’s 100m?",
    options: [
      "Olusoji Fasuba",
      "Divine Oduduru",
      "Seye Ogunlewe",
      "Francis Obikwelu",
    ],
    answer: "Olusoji Fasuba",
    category: "Track and Field",
  },
];

async function seed() {
  const batch = db.batch();
  const colRef = db.collection("questions");

  questions.forEach((q) => {
    const docRef = colRef.doc();
    batch.set(docRef, q);
  });

  await batch.commit();
  console.log("All trivia questions seeded successfully.");
}

seed();
