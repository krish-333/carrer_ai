import OpenAI from "openai";
import fetch from "node-fetch";

export default async function handler(req, res) {

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // 1️⃣ Fetch real jobs from Remotive API
  const response = await fetch("https://remotive.com/api/remote-jobs");
  const data = await response.json();

  const jobs = data.jobs.slice(0, 5);

  let results = "";

  for (let job of jobs) {

    const analysisPrompt = `
You are an elite career strategist.

Evaluate this job:

Title: ${job.title}
Company: ${job.company_name}
Description: ${job.description.slice(0, 1200)}

Do the following:

1. Give Match Score (0-100)
2. Why strong fit for data/analytics candidate
3. Skill gaps
4. Tailored 120-word "Why join?" answer
5. Short cover letter (max 150 words)
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: "You are an expert recruiter." },
        { role: "user", content: analysisPrompt }
      ],
      temperature: 0.7
    });

    results += `
==================================================
Company: ${job.company_name}
Role: ${job.title}
Apply: ${job.url}

${completion.choices[0].message.content}

==================================================

`;
  }

  res.status(200).json({
    result: results
  });
}
