// import OpenAI from "openai";
// import { OPENAI_KEY } from "./constants";

// const openai = new OpenAI({
//   apiKey: OPENAI_KEY,
//   dangerouslyAllowBrowser: true,
// });

// export default openai;
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_PRO_KEY);

export default genAI;
