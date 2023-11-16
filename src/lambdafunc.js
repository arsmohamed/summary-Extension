import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate";

// Create a TranslateClient instance
const client = new TranslateClient({ region: "ca-central-1" });

export const handler = async (event) => {

  //Get the paragraph and the target language code from the event object 
  const requestBody = JSON.parse(event.body);
  const paragraph = requestBody.paragraph;
  const languageCode = requestBody.languageCode;
  
  //Create a TranslateTextCommand Instance
  const command = new TranslateTextCommand({
    SourceLanguageCode: "en", // Assume the paragraph is in English
    TargetLanguageCode: languageCode, // Use the target language code from the event
    Text: paragraph // Use the paragraph from the event
  })
  return "it is working "
  /// Invoke the command and return the response
  // try {
  //   const response = await client.send(command);
  //   return {
  //     statusCode: 200,
  //     headers: {},
  //     body: response.TranslatedText
  //   };
  // } catch (error) {
  //   return {
  //     statusCode: 500,
  //     headers: {},
  //     body: error.message
  //   }
  // }
};
