import "dotenv/config";
import { admin } from "../config/firebase-admin";

const db = admin.firestore();

const slangs = [
  // Naija Slang
  {
    word: "wahala",
    category: "Naija Slang",
    description:
      "Means trouble or a problematic situation; often used humorously or seriously.",
  },
  {
    word: "sapa",
    category: "Naija Slang",
    description: "Describes a state of being broke or financially down.",
  },
  {
    word: "abeg",
    category: "Naija Slang",
    description:
      "A polite or emphatic way of saying 'please' or begging for something.",
  },
  {
    word: "chop",
    category: "Naija Slang",
    description: "Means to eat or enjoy something, often money or food.",
  },
  {
    word: "japa",
    category: "Naija Slang",
    description:
      "To escape or run away, usually from a difficult situation or the country.",
  },
  {
    word: "gbasgbos",
    category: "Naija Slang",
    description: "Describes a heated argument or fight; back-and-forth drama.",
  },
  {
    word: "yarn",
    category: "Naija Slang",
    description: "To talk or gist with someone.",
  },
  {
    word: "kpatakpata",
    category: "Naija Slang",
    description: "Means completely or entirely; emphasizes totality.",
  },
  {
    word: "runs",
    category: "Naija Slang",
    description: "Refers to hustling or engaging in shady deals or side gigs.",
  },
  {
    word: "omo",
    category: "Naija Slang",
    description:
      "An exclamation used to express shock, excitement, or emphasis.",
  },
  {
    word: "ehen",
    category: "Naija Slang",
    description:
      "Used to confirm understanding, agreement, or express realization.",
  },
  {
    word: "shege",
    category: "Naija Slang",
    description:
      "Refers to suffering or trouble, often humorously or seriously.",
  },
  {
    word: "shenk",
    category: "Naija Slang",
    description: "To ignore, cancel plans, or stand someone up.",
  },
  {
    word: "dey play",
    category: "Naija Slang",
    description:
      "Sarcastic phrase used when someone is not taking things seriously.",
  },
  {
    word: "how far",
    category: "Naija Slang",
    description: "A casual way to ask someone how they're doing or what's up.",
  },
  {
    word: "on colos",
    category: "Naija Slang",
    description: "Refers to someone acting crazy or being high.",
  },
  {
    word: "e choke",
    category: "Naija Slang",
    description:
      "Used to express overwhelming excitement, surprise, or success.",
  },
  {
    word: "mad o",
    category: "Naija Slang",
    description: "An exclamation of disbelief, excitement, or amazement.",
  },
  {
    word: "see finish",
    category: "Naija Slang",
    description: "When someone has lost respect due to overfamiliarity.",
  },
  {
    word: "no wahala",
    category: "Naija Slang",
    description: "Means 'no problem' or 'it’s okay'.",
  },
  {
    word: "e no easy",
    category: "Naija Slang",
    description:
      "Used to acknowledge that something is difficult or stressful.",
  },
  {
    word: "baff up",
    category: "Naija Slang",
    description: "Means to dress well or look sharp.",
  },
  {
    word: "chop life",
    category: "Naija Slang",
    description: "To enjoy life and live well without stress.",
  },
  {
    word: "gbe body",
    category: "Naija Slang",
    description: "A hype phrase meaning ‘get lit’ or ‘turn up’.",
  },
  {
    word: "yab",
    category: "Naija Slang",
    description: "To mock, tease, or insult playfully.",
  },
  {
    word: "pepper dem",
    category: "Naija Slang",
    description: "To flaunt success or make others envious.",
  },
  {
    word: "one kain",
    category: "Naija Slang",
    description:
      "Used to describe something odd, suspicious, or not quite right.",
  },
  {
    word: "Wetin dey sup",
    category: "Naija Slang",
    description: "What’s happening?",
  },
  {
    word: "Abeg",
    category: "Naija Slang",
    description: "Please",
  },
  {
    word: "No wahala",
    category: "Naija Slang",
    description: "No problem / It’s okay",
  },
  {
    word: "How far?",
    category: "Naija Slang",
    description: "What’s up? / How are you?",
  },
  {
    word: "E choke",
    category: "Naija Slang",
    description: "That’s impressive / overwhelming",
  },
  {
    word: "Wahala be like bicycle",
    category: "Naija Slang",
    description: "Problems keep coming easily",
  },
  {
    word: "Omo!",
    category: "Naija Slang",
    description: "Expression of surprise or emphasis (e.g., “Omo see crowd!”)",
  },
  {
    word: "Shey you dey whine me ni?",
    category: "Naija Slang",
    description: "Are you joking with me?",
  },
  {
    word: "Gbese",
    category: "Naija Slang",
    description: "Trouble or debt",
  },
  {
    word: "No vex",
    category: "Naija Slang",
    description: "Don’t be angry",
  },
  {
    word: "E don set",
    category: "Naija Slang",
    description: "Things are ready or about to go down",
  },
  {
    word: "Na so",
    category: "Naija Slang",
    description: "That’s how it is",
  },
  {
    word: "Japa",
    category: "Naija Slang",
    description: "To flee or escape (especially out of the country)",
  },
  {
    word: "Na me try pass",
    category: "Naija Slang",
    description: "I did the most / I performed the best",
  },

  // Music
  {
    word: "afrobeats",
    category: "Music",
    description:
      "A genre of music originating from West Africa combining traditional African rhythms with modern sounds.",
  },
  {
    word: "vibes",
    category: "Music",
    description:
      "Refers to a musical atmosphere or feeling that’s enjoyable and rhythmic.",
  },
  {
    word: "banger",
    category: "Music",
    description: "A hit song or track that is very popular and danceable.",
  },
  {
    word: "jam",
    category: "Music",
    description: "A song that’s enjoyable and often played repeatedly.",
  },
  {
    word: "playlist",
    category: "Music",
    description: "A curated list of songs grouped for a mood or purpose.",
  },
  {
    word: "turn up",
    category: "Music",
    description: "To get hyped or excited, especially at parties or concerts.",
  },
  {
    word: "beat",
    category: "Music",
    description: "The rhythmic backbone or instrumental part of a song.",
  },
  {
    word: "hype",
    category: "Music",
    description: "Excitement generated around a song or artist.",
  },
  {
    word: "hook",
    category: "Music",
    description: "The catchy and repeated part of a song, often the chorus.",
  },
  {
    word: "bars",
    category: "Music",
    description: "Lyrics or rhymes delivered in a rap or hip-hop song.",
  },

  // Food
  {
    word: "jollof",
    category: "Food",
    description:
      "A spicy rice dish popular across West Africa, especially in Nigeria and Ghana.",
  },
  {
    word: "suya",
    category: "Food",
    description:
      "Grilled spicy meat skewers, typically beef or chicken, a popular Nigerian street food.",
  },
  {
    word: "fufu",
    category: "Food",
    description:
      "A starchy staple made by pounding yam, cassava, or plantain; eaten with soups.",
  },
  {
    word: "egusi",
    category: "Food",
    description:
      "A soup made with ground melon seeds and leafy vegetables, often eaten with fufu.",
  },
  {
    word: "moi moi",
    category: "Food",
    description:
      "A steamed bean pudding made from blended peeled beans, peppers, and spices.",
  },
  {
    word: "banga",
    category: "Food",
    description:
      "A rich soup made from palm nut extract, common in southern Nigeria.",
  },
  {
    word: "puff puff",
    category: "Food",
    description: "A deep-fried dough snack that is sweet, soft, and round.",
  },
  {
    word: "ofada",
    category: "Food",
    description:
      "A local Nigerian rice often served with spicy stew and assorted meats.",
  },
  {
    word: "okro",
    category: "Food",
    description:
      "A slimy vegetable used in making draw soup, typically eaten with swallow.",
  },
  {
    word: "swallow",
    category: "Food",
    description:
      "Generic term for dough-like starchy meals eaten with soup (e.g., fufu, eba).",
  },

  // Naija History & Culture
  {
    word: "agbada",
    category: "Culture",
    description:
      "A flowing wide-sleeved robe worn by men in West Africa on special occasions.",
  },
  {
    word: "gele",
    category: "Culture",
    description:
      "A traditional headwrap worn by Nigerian women for formal events.",
  },
  {
    word: "oriki",
    category: "Culture",
    description:
      "A praise poetry in Yoruba culture that describes lineage and achievements.",
  },
  {
    word: "eyo",
    category: "Culture",
    description:
      "A traditional Yoruba festival celebrated with costumed masquerades in Lagos.",
  },
  {
    word: "isiagu",
    category: "Culture",
    description:
      "A traditional Igbo shirt often worn by chiefs and dignitaries.",
  },
  {
    word: "amala",
    category: "Culture",
    description:
      "A Nigerian swallow made from yam flour, native to the Yoruba people.",
  },
  {
    word: "naming ceremony",
    category: "Culture",
    description:
      "A traditional celebration for introducing a newborn to the family and community.",
  },
  {
    word: "masquerade",
    category: "Culture",
    description:
      "A spiritual or cultural dancer in costume, common in Nigerian festivals.",
  },
  {
    word: "tribal marks",
    category: "Culture",
    description:
      "Facial or body markings made for cultural identity or beauty.",
  },
  {
    word: "dowry",
    category: "Culture",
    description: "Traditional gift or bride price paid during marriage rites.",
  },

  // Pop Culture
  {
    word: "bbnaija",
    category: "Pop Culture",
    description:
      "A popular Nigerian reality TV show where contestants live in a house under surveillance.",
  },
  {
    word: "skit",
    category: "Pop Culture",
    description: "A short comedic video often shared on social media.",
  },
  {
    word: "trending",
    category: "Pop Culture",
    description:
      "Describes something currently popular or viral on social media.",
  },
  {
    word: "hashtag",
    category: "Pop Culture",
    description:
      "A word or phrase preceded by a # sign used to tag topics on social media.",
  },
  {
    word: "influencer",
    category: "Pop Culture",
    description:
      "A person with a large social media following who influences trends and opinions.",
  },
  {
    word: "clout",
    category: "Pop Culture",
    description: "Fame or influence, especially on social media platforms.",
  },
  {
    word: "meme",
    category: "Pop Culture",
    description:
      "A humorous image, video, or text that spreads rapidly online.",
  },
  {
    word: "cancelled",
    category: "Pop Culture",
    description:
      "Social media backlash leading to someone being boycotted or shunned.",
  },
  {
    word: "challenge",
    category: "Pop Culture",
    description:
      "A viral trend where people imitate or perform specific actions online.",
  },
  {
    word: "emoji",
    category: "Pop Culture",
    description:
      "Icons or symbols used to express emotions or ideas in digital communication.",
  },

  // Sports
  {
    word: "ball na life",
    category: "Sports",
    description:
      "Used to express deep love for football; football is everything.",
  },
  {
    word: "naija no dey carry last",
    category: "Sports",
    description:
      "A patriotic phrase meaning Nigerians always strive to win or succeed.",
  },
  {
    word: "you sabi ball",
    category: "Sports",
    description: "A compliment meaning someone is very skilled at football.",
  },
  {
    word: "scatter pitch",
    category: "Sports",
    description:
      "Means to dominate or perform extremely well in a football match.",
  },
  {
    word: "baller",
    category: "Sports",
    description:
      "A stylish or skilled football player, often one who plays like a pro.",
  },
  {
    word: "one-man mopol",
    category: "Sports",
    description:
      "Describes a player who plays alone, doing everything without team support.",
  },
  {
    word: "dem go collect",
    category: "Sports",
    description:
      "Said when the opposing team is about to be thoroughly defeated.",
  },
  {
    word: "awon midfield",
    category: "Sports",
    description:
      "A playful way to refer to the central players controlling the game.",
  },
  {
    word: "bench warmer",
    category: "Sports",
    description: "A player who rarely plays and is always on the bench.",
  },
  {
    word: "he no sabi pass",
    category: "Sports",
    description: "Said about a selfish or poor passer in the game.",
  },
  {
    word: "over sabi",
    category: "Sports",
    description:
      "Used for a player who tries too hard to show off or do too much.",
  },
  {
    word: "he carry leg go house",
    category: "Sports",
    description: "Refers to someone who wasted a good scoring opportunity.",
  },
  {
    word: "e no dey show work",
    category: "Sports",
    description:
      "Said when a player isn’t performing or living up to the hype.",
  },
  {
    word: "he no get legs",
    category: "Sports",
    description: "Means the player lacks speed or stamina.",
  },
  {
    word: "match don cast",
    category: "Sports",
    description:
      "Used when a game is going badly or hopes of winning are lost.",
  },
  {
    word: "VAR don rob us",
    category: "Sports",
    description:
      "Complaining that VAR (video review) unfairly favored the opponent.",
  },
  {
    word: "ball no be by mouth",
    category: "Sports",
    description:
      "Says that playing football is about action, not just talking.",
  },
  {
    word: "omo see goal",
    category: "Sports",
    description: "An exclamation after witnessing an amazing goal.",
  },
  {
    word: "na training we dey do",
    category: "Sports",
    description:
      "Said sarcastically when a team is being badly beaten, as if it’s just practice.",
  },
  {
    word: "coach don use jazz",
    category: "Sports",
    description:
      "Joking that a coach used charms or magic to win or influence a game.",
  },

  // Intellectual / Smart Slangs
  {
    word: "Sharp guy",
    category: "Intellectual",
    description: "Smart or cunning person",
  },
  {
    word: "Sense full ground",
    category: "Intellectual",
    description: "Very intelligent",
  },
  {
    word: "Your head correct",
    category: "Intellectual",
    description: "You are smart / You are thinking straight",
  },
  {
    word: "IQ dey burst brain",
    category: "Intellectual",
    description: "Super intelligent",
  },
  {
    word: "Na brain you use",
    category: "Intellectual",
    description: "You used your brain / You were smart",
  },
  {
    word: "You dey reason well",
    category: "Intellectual",
    description: "You think properly",
  },
  {
    word: "You too get sense",
    category: "Intellectual",
    description: "You are really smart",
  },
  {
    word: "You sabi book",
    category: "Intellectual",
    description: "You are brilliant academically",
  },
  {
    word: "Code dey your head",
    category: "Intellectual",
    description: "You are good at coding",
  },
  {
    word: "E get why",
    category: "Intellectual",
    description: "There's a deep or smart reason behind something",
  },
  {
    word: "You dey burst my brain",
    category: "Intellectual",
    description: "You are impressing me with your intellect",
  },
  {
    word: "Na who sabi, dey chop",
    category: "Intellectual",
    description: "Knowledge brings advantage",
  },

  // Funny / Sarcastic Slangs
  {
    word: "You don dey ment",
    category: "Funny",
    description: "You are acting crazy",
  },
  {
    word: "You dey craze?",
    category: "Funny",
    description: "Are you mad?",
  },
  {
    word: "Oga rest",
    category: "Funny",
    description: "Stop talking / Take a break",
  },
  {
    word: "Na your papa get am?",
    category: "Funny",
    description: "Is it your father's own? (used sarcastically)",
  },
  {
    word: "Dem swear for you?",
    category: "Funny",
    description: "Are you cursed?",
  },
  {
    word: "Who give you belle?",
    category: "Funny",
    description: "How did this happen? (mock surprise)",
  },
  {
    word: "No be juju be that?",
    category: "Funny",
    description: "Is this not witchcraft? (used jokingly)",
  },
  {
    word: "You dey whine me ni?",
    category: "Funny",
    description: "Are you kidding me?",
  },
  {
    word: "Which kain wahala be this?",
    category: "Funny",
    description: "What kind of problem is this?",
  },
  {
    word: "You don come again o",
    category: "Funny",
    description: "There you go again",
  },
  {
    word: "Wetin concern me?",
    category: "Funny",
    description: "What is my business?",
  },
  {
    word: "You too dey do like mumu",
    category: "Funny",
    description: "You act foolishly often",
  },

  // Hustle / Money Slangs
  {
    word: "Runs",
    category: "Hustle",
    description: "A hustle (legal or illegal)",
  },
  {
    word: "Wetin man go do?",
    category: "Hustle",
    description: "What else can one do? (resignation to hustle)",
  },
  {
    word: "Soft life",
    category: "Hustle",
    description: "Comfortable, stress-free life",
  },
  {
    word: "Owo dey",
    category: "Hustle",
    description: "There's money",
  },
  {
    word: "No money, no love",
    category: "Hustle",
    description: "Without money, love fades",
  },
  {
    word: "Man must wack",
    category: "Hustle",
    description: "A man must eat (survive)",
  },
  {
    word: "Secure the bag",
    category: "Hustle",
    description: "Make money / Get the deal",
  },
  {
    word: "Street no dey smile",
    category: "Hustle",
    description: "Life is hard out here",
  },
  {
    word: "E go be",
    category: "Hustle",
    description: "It will work out eventually",
  },
  {
    word: "Sapa hold me",
    category: "Hustle",
    description: "I’m broke",
  },
  {
    word: "Na hustle we dey",
    category: "Hustle",
    description: "We are grinding / working hard",
  },
  {
    word: "Blow",
    category: "Hustle",
    description: "To become successful",
  },
  {
    word: "Na money be fine bobo",
    category: "Hustle",
    description: "Money makes you attractive",
  },
];

async function seedSlangs() {
  const batch = db.batch();

  slangs.forEach(({ word, category }) => {
    const docRef = db.collection("slangs").doc(word.toLowerCase());
    batch.set(docRef, { word, category });
  });

  await batch.commit();
  console.log("Slangs seeded successfully!");
}

seedSlangs().catch(console.error);
