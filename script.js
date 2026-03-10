<script>
(function () {
  // ---- Detect browser ----
  const ua = navigator.userAgent;
  let browser = "Unknown";

  if (ua.includes("Edg/")) browser = "Microsoft Edge";
  else if (ua.includes("OPR") || ua.includes("Opera")) browser = "Opera";
  else if (ua.includes("Chrome") && !ua.includes("Edg/")) browser = "Chrome";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";

  // ---- Create UI box ----
  const box = document.createElement("div");
  box.id = "session-info-box";
  box.innerHTML = `
    <div class="si-title">Session Info</div>
    <div class="si-row"><span>Browser</span><span id="si-browser">${browser}</span></div>
    <div class="si-row"><span>Local Time</span><span id="si-local">--:--:--</span></div>
    <div class="si-row"><span>UTC Time</span><span id="si-utc">--:--:--</span></div>
    <div class="si-row"><span>Date</span><span id="si-date">--/--/----</span></div>
    <div class="si-row"><span>URL</span><span id="si-url">${window.location.href}</span></div>
  `;
  document.body.appendChild(box);

  // ---- Styles ----
  const style = document.createElement("style");
  style.textContent = `
    #session-info-box {
      position: fixed;
      bottom: 20px;
      left: 20px;
      padding: 14px 18px;
      min-width: 240px;
      background: rgba(0,0,0,0.35); /* transparent background */
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      color: #fff;
      font-family: system-ui, -apple-system, Segoe UI, Inter, sans-serif;
      font-size: 13px;
      border-radius: 16px;
      border: 1px solid rgba(174, 239, 255, 0.2);
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
      z-index: 99999;
      user-select: none;
      line-height: 1.4;
    }

    #session-info-box .si-title {
      font-weight: 700;
      font-size: 13px;
      margin-bottom: 8px;
      letter-spacing: 0.4px;
      opacity: 0.9;
    }

    #session-info-box .si-row {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      margin: 4px 0;
      opacity: 0.95;
      font-size: 13px;
    }

    #session-info-box .si-row span:last-child {
      font-weight: 600;
      color: #aeefff;
      word-break: break-word;
    }

    @media (max-width: 600px) {
      #session-info-box {
        font-size: 12px;
        padding: 12px 14px;
        min-width: 200px;
      }
    }
  `;
  document.head.appendChild(style);

  // ---- Time updater ----
  function updateTime() {
    const now = new Date();

    const localTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    const utcTime = now.toUTCString().split(" ")[4];
    const date = now.toLocaleDateString();

    document.getElementById("si-local").textContent = localTime;
    document.getElementById("si-utc").textContent = utcTime;
    document.getElementById("si-date").textContent = date;
  }

  updateTime();
  setInterval(updateTime, 1000);
})();
</script>
