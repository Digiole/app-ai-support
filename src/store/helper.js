import { create } from 'zustand';

import { v4 as uuidv4 } from 'uuid';

import { EVALS, } from "@/appConfig";

import { generateUniqueId } from "@/utils";
function checkStorage() {
  let session = generateUniqueId();
  if (typeof window !== 'undefined') {
    const speakToStorage = sessionStorage.getItem(EVALS.appStorage);
    // console.log(speakToStorage);

    let speakTo = {};
    if (speakToStorage !== null) {
      speakTo = JSON.parse(speakToStorage);
    }

    if (speakTo?.session === undefined) {
      speakTo["session"] = session;
      sessionStorage.setItem(EVALS.appStorage, JSON.stringify(speakTo));
    }
    session = speakTo.session;


  }
  return session;
}
function getUrl() {
  let url = "http://localhost:3333/api/v1/";
  if (typeof window !== "undefined") {
    url = window.location.origin + "/api/v1";
  }
  return url;
}
function checkLng() {

  let userlang = "en";
  if (typeof window !== "undefined") {

    userlang = navigator.language || navigator.userLanguage;

    if (userlang.startsWith("en-")) {
      userlang.toLowerCase().substring(0, 2);
    }
  }
  return userlang;
}
const useStore = create((set) => ({
  url: getUrl(),
  currentUser: "",
  requestId: "",
  sessionID: checkStorage(),
  language: checkLng(),
  scoreLimit: EVALS.defaultScoreLimit,
  example: { "question": "", "show": false },
  isFooterRendered: false,
  queryActive: false,
  haveChunks: false,
  summary: "",
  lastGoodAnswer: {},
  currentTopic: 'topic-0',
  models: { 'gpt-3.5-turbo': 3000, 'gpt-3.5-turbo-1106': 15000 },
  defaultModel: "gpt-3.5-turbo-1106",

  setCurrentTopic: (value) => set(() => ({ currentTopic: value })),
  setSummary: (value) => set(() => ({ summary: value })),
  setLastGoodAnswer: (value) => set(() => ({ lastGoodAnswer: value })),
  setSummary: (value) => set(() => ({ summary: value })),
  setHaveChunks: (value) => set(() => ({ haveChunks: value })),
  setQueryActive: (value) => set(() => ({ queryActive: value })),
  setIsFooterRendered: (value) => set(() => ({ isFooterRendered: value })),
  setExample: (value) => set(() => ({ example: value })),
  setSessionID: (value) => set(() => ({ sessionID: value })),

  setCurrentUser: (value) => set(() => ({ currentUser: value })),
  setRequestId: (value) => set(() => ({ requestId: value || uuidv4() })),
}));

export default useStore;