import OpenAI from "openai";
import fetch from "node-fetch";

export default async function handler(req, res) {

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const jobRes = await fetch("https://remotive.com/api/remote-jobs");
  const jobData = await jobRes.json();

  const filteredJobs = jobData.jobs.slice(0, 5);

  let results = [];

  for (let job of filteredJobs) {

    const prompt = `
You are an elite AI Career Strategist.

Candidate:
Early career in Data/Analytics/AI roles.
Location: India or Remote.

Analyze:

Title: ${job.title}
Company: ${job.company_name}
Description: ${job.description.slice(0, 1000)}

Return structured response:

MATCH_SCORE:
WHY_STRONG_FIT:
SKILL_GAPS:
WHY_JOIN_ANSWER (120 words):
COVER_LETTER (150 words):
RESUME_KEYWORDS_TO_ADD:
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: "You are a professional recruiter." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7
    });

    results.push({
      company: job.company_name,
      title: job.title,
      url: job.url,
      analysis: completion.choices[0].message.content
    });
  }

  res.status(200).json(results);
}
