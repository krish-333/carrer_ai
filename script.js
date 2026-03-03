async function runAgent() {

  document.getElementById("output").textContent =
    "Searching jobs...";

  const response = await fetch("/api/agent");
  const data = await response.json();

  document.getElementById("output").textContent =
    data.result;
}
