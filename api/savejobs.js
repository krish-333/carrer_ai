import fs from "fs";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const job = req.body;

  let jobs = [];

  if (fs.existsSync("jobs.json")) {
    jobs = JSON.parse(fs.readFileSync("jobs.json"));
  }

  jobs.push(job);

  fs.writeFileSync("jobs.json", JSON.stringify(jobs, null, 2));

  res.status(200).json({ message: "Saved successfully" });
}
