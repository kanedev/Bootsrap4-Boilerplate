import { showAlert } from "./notLazyLoaded";

window.onload = () => {
  const alertBtn = document.querySelector("#alert");
  const lazyAlertBtn = document.querySelector("#lazyAlert");

  alertBtn.addEventListener("click", () => {
      showAlert();
  });

  lazyAlertBtn.addEventListener("click", () => {
    import(/* webpackChunkName: "lazyLoaded" */ './lazyLoaded').then(module => {
        module.showLazyAlert();
    });
});
};
