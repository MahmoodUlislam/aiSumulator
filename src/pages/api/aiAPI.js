import { generateOrganizedContent } from "../../utils/aiLogic";

export default async function aiAPI(req, res) {
  // Your AI logic goes here to generate organized content based on the keyword
  try {
    if (!req.body.keywords || req.body.keywords.length === 0) {
      return res.status(204).json({ error: "No keywords provided" });
    }

    // Generate organized content using AI
    const organizedContent = await generateOrganizedContent(req.body.keywords);

    // Return the organized content as a response
    res.status(200).json({ organizedContent });
  } catch (error) {
    // Handle any errors that occur during the AI processing
    res
      .status(500)
      .json({ error: "An error occurred while generating organized content" });
  }
}
