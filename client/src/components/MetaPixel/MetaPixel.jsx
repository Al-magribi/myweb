import React, { useEffect } from "react";
import { useGetConfigQuery } from "../../controller/api/setting/ApiSetting";

const MetaPixel = () => {
  const { data: config } = useGetConfigQuery();

  useEffect(() => {
    // Meta Pixel Code
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
    fbq("init", config?.metaPixel);
    fbq("track", "PageView");
  }, []);

  return (
    <noscript>
      <img
        height='1'
        width='1'
        style={{ display: "none" }}
        src='https://www.facebook.com/tr?id=1687846078540644&ev=PageView&noscript=1'
        alt=''
      />
    </noscript>
  );
};

export default MetaPixel;
