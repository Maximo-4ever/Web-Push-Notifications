const PUBLIC_VAPID_KEY =
  "BD_0ncd-fsDcjsJNQt9Yy99VHKZ-IoO1RzNH73iL_SvwFQUP1LH1ZWKSu607oTetygDlT710DXkMaNgRMxJymLY";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const subscription = async () => {
  // Service Worker
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/",
  });
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
  });

  await fetch("/subscription", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const form = document.getElementById("myForm");
const message = document.getElementById("message");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("/new-message", {
    method: "POST",
    body: JSON.stringify({
      message: message.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  form.reset();
});

subscription();
