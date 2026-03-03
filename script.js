async function runAgent() {

  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("results").innerHTML = "";

  const res = await fetch("/api/agent");
  const data = await res.json();

  document.getElementById("loading").classList.add("hidden");

  data.forEach(job => {

    const div = document.createElement("div");
    div.className = "job-card";

    div.innerHTML = `
      <h2>${job.company}</h2>
      <h3>${job.title}</h3>
      <a href="${job.url}" target="_blank">Apply Link</a>
      <pre>${job.aiAnalysis}</pre>
      <button onclick='saveJob(${JSON.stringify(job)})'>Save Job</button>
    `;

    document.getElementById("results").appendChild(div);
  });
}

async function saveJob(job) {

  await fetch("/api/saveJob", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job)
  });

  alert("Job saved!");
}
