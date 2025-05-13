import React, { useEffect } from "react";
import { useGetConfigQuery } from "../../../controller/api/admin/ApiSetting";

const MetaPixel = () => {
  const { data: appConfig } = useGetConfigQuery();
  const isDevelopment =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  useEffect(() => {
    if (!appConfig?.meta_pixel) return;

    try {
      // Add meta tag for domain verification
      const meta = document.createElement("meta");
      meta.setAttribute("name", "facebook-domain-verification");
      meta.setAttribute("content", appConfig.meta_pixel);
      document.head.appendChild(meta);

      // Initialize Meta Pixel
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );

      // Initialize pixel with your pixel ID
      window.fbq("init", appConfig.meta_pixel);

      // Track PageView
      window.fbq("track", "PageView");

      // Debug logging in development
      if (isDevelopment) {
        console.log("Meta Pixel initialized in development mode");
        console.log("Pixel ID:", appConfig.meta_pixel);
        console.log(
          "Note: Meta Pixel tracking may not work properly in localhost"
        );
        console.log(
          "Tips: Install Facebook Pixel Helper extension for debugging"
        );
      }

      // Cleanup function
      return () => {
        const metaTag = document.querySelector(
          'meta[name="facebook-domain-verification"]'
        );
        if (metaTag) {
          metaTag.remove();
        }
      };
    } catch (error) {
      console.error("Error initializing Meta Pixel:", error);
    }
  }, [appConfig]);

  if (!appConfig?.meta_pixel) return null;

  return (
    <noscript>
      <img
        height='1'
        width='1'
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${appConfig.meta_pixel}&ev=PageView&noscript=1`}
        alt=''
      />
    </noscript>
  );
};

export default MetaPixel;
