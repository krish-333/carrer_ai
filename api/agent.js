import OpenAI from "openai";

export default async function handler(req, res) {

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
You are an autonomous AI career agent.

Find 5 high-quality jobs for:
- Data Analyst
- Business Analyst
- AI/ML entry-level roles

Location: India or Remote.

For each job provide:
Company
Role
Why good fit
Application strategy
Short sample answer (Why join?)
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      { role: "system", content: "Elite recruiter AI." },
      { role: "user", content: prompt }
    ],
  });

  res.status(200).json({
    result: completion.choices[0].message.content
  });
}
