import OpenAI from "openai";
import fetch from "node-fetch";

export default async function handler(req, res) {

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const jobRes = await fetch("https://remotive.com/api/remote-jobs");
  const jobData = await jobRes.json();

  const job = jobData.jobs[0];

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      { role: "system", content: "You are an expert recruiter." },
      { role: "user", content: `Analyze this job: ${job.title}` }
    ],
  });

  res.status(200).json({
    message: "Success",
    job: job.title,
    ai: completion.choices[0].message.content
  });
}
