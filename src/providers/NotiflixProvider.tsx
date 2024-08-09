"use client";

import Notiflix from "notiflix";
import { PropsWithChildren, useEffect } from "react";

function NotiflixProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    Notiflix.Notify.init({
      distance: "35px",
      timeout: 1500,
      success: {
        background: "#00B8A2",
        textColor: "#fff",
      },
      failure: {
        background: "#E9430C",
        textColor: "#fff",
      },
    });
    Notiflix.Report.init({
      success: {
        titleColor: "#161817",
        svgColor: "#00B8A2",
        buttonBackground: "#00B8A2",
        backOverlayColor: "rgba(0,0,0,0.45)",
      },
      failure: {
        titleColor: "#161817",
        svgColor: "#E9430C",
        buttonBackground: "#E9430C",
        backOverlayColor: "rgba(0,0,0,0.45)",
      },
    });
  }, []);
  return <>{children}</>;
}

export default NotiflixProvider;
