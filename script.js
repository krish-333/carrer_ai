async function runAgent() {

  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("output").textContent = "";

  const res = await fetch("/api/agent");
  const data = await res.json();

  document.getElementById("loading").classList.add("hidden");
  document.getElementById("output").textContent = data.result;
}
