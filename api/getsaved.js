let savedJobs = [];

export default function handler(req, res) {
  res.status(200).json(savedJobs);
}
