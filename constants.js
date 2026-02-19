export const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export const MONTH_QUOTES = [
  "Small steps repeated daily become life-changing progress.",
  "Every day holds a new opportunity to grow.",
  "Courage is not the absence of fear, but moving forward anyway.",
  "Progress blooms in the season of persistence.",
  "What feels impossible today may become ordinary tomorrow.",
  "In every moment of effort, there is a seed of triumph.",
  "Growth rarely announces itself — it simply arrives.",
  "The smallest victory is still a victory worth celebrating.",
  "You are doing more than you know.",
  "Strength is not always loud. Sometimes it is quiet and steady.",
  "Each challenge overcome is a new chapter of resilience.",
  "The year closes with gratitude for every step taken."
];

export const SECTIONS = [
  "Intention",
  "Appointments",
  "Weekly Logs",
  "Progress",
  "Hard Days",
  "Self Check-In",
  "Gratitude"
];

export const EMPTY_MONTH = () => ({
  intention: "",
  oneWord: "",
  goals: ["", "", ""],
  appointments: Array(5).fill(null).map(() => ({
    date: "", type: "", focus: "", notes: "", followUp: ""
  })),
  weeks: Array(4).fill(null).map(() => ({
    effort: "", noticed: "", win: "", challenges: ""
  })),
  progress: { skill: "", easier: "", breakthrough: "", proud: "" },
  hardDays: { heavy: "", emotions: "", support: "", truth: "" },
  selfCheck: { energy: 0, stress: 0, sleep: "", draining: "", filling: "", selfCare: "" },
  gratitude: ["", "", ""],
  memory: "",
  winsLog: [],
  completed: false,
});

export const EMPTY_YEAR = () => ({
  biggestGrowth: "",
  milestone: "",
  parentGrowth: "",
  hopefulFor: "",
  months: MONTHS.map(() => EMPTY_MONTH()),
});

export const STORAGE_KEY = "alilo-journal-2025";
