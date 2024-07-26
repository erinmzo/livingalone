import Notiflix from "notiflix";
export const notiflixInit = () => {
  Notiflix.Report.init({
    success: {
      background: "#b32414",
      textColor: "#fff",
    },
    failure: {
      svgColor: "#3143e",
      titleColor: "#1e1e1e",
      messageColor: "#242424",
      buttonBackground: "#3143e",
      buttonColor: "#fff",
      backOverlayColor: "rgba(0,0,0,0.5)",
    },
    warning: {
      background: "#23421c",
      textColor: "#fff",
    },
    info: {
      background: "#14343c",
      textColor: "#fff",
    },
  });
};
