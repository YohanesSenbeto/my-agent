import {generateText} from "ai";
//import the google module from the ai package
import {google} from "@ai-sdk/google";

//Specify the model to use for generating the text and a prompt
const {text} = await generateText({
  model: google("models/gemini-2.5-flash"), // Use the Gemini 2.5 Flash model
  prompt: "Hello, how are you?"
});

console.log(text);