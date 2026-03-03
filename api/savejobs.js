let savedJobs = [];

export default function handler(req, res) {

  if (req.method === "POST") {
    savedJobs.push(req.body);
    res.status(200).json({ message: "Saved successfully" });
  } else {
    res.status(405).end();
  }
}
