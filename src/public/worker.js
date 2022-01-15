self.addEventListener("push", (e) => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: "https://maximo-4ever.github.io/Archivos/logo.jpg"
  });
});
