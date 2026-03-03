import OpenAI from "openai";
import fetch from "node-fetch";
import fs from "fs";

export default async function handler(req, res) {

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const jobRes = await fetch("https://remotive.com/api/remote-jobs");
  const jobData = await jobRes.json();

  const jobs = jobData.jobs.slice(0, 5);

  let finalResults = [];

  for (let job of jobs) {

    const prompt = `
You are an elite career strategist.

Candidate Profile:
Interested in Data Analytics, AI/ML, Business roles.
Location: India or Remote.

Analyze this job:

Title: ${job.title}
Company: ${job.company_name}
Description: ${job.description.slice(0,1200)}

Provide:

1. Match Score (0-100)
2. Why strong fit
3. Skill gaps
4. 120-word tailored "Why join?"
5. 150-word tailored cover letter
6. Resume keyword optimization suggestions
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: "Elite recruiter AI." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7
    });

    finalResults.push({
      company: job.company_name,
      title: job.title,
      url: job.url,
      aiAnalysis: completion.choices[0].message.content
    });
  }

  res.status(200).json(finalResults);
}
