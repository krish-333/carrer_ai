async function loadSavedJobs() {

  const res = await fetch("/jobs.json");
  const jobs = await res.json();

  jobs.forEach(job => {
    const div = document.createElement("div");
    div.className = "job-card";

    div.innerHTML = `
      <h2>${job.company}</h2>
      <h3>${job.title}</h3>
      <pre>${job.aiAnalysis}</pre>
    `;

    document.getElementById("savedJobs").appendChild(div);
  });
}

loadSavedJobs();
