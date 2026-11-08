"use client";

import React, { useEffect, useRef } from "react";

export const ADSTERRA_CONFIG = {
  SMARTLINK: "https://arwf.org/4/f3bccff685af6bb956568ec0f9dc7ab0",
  POPUNDER_SRC: "https://bicea.org/14/bb12f9ebf50e5fe179b168308d5612e0",
  SOCIAL_BAR_SRC: "https://afders.org/1/3935576bbe7bfd78d3b554940def07a9",
  NATIVE_SCRIPT: "https://bicea.org/21/ed86ec2006caca98183af0a564bc141b",
  NATIVE_CONTAINER_ID: "container-ed86ec2006caca98183af0a564bc141b",
  BANNERS: {
    "728x90": { key: "cd5a2316a82639e02069745f095360c2", width: 728, height: 90 },
    "320x50": { key: "4d6debda066a719f195874848140dbc3", width: 320, height: 50 },
    "300x250": { key: "7d7fb68b3e76f42b5c73a41ff4ab8b24", width: 300, height: 250 },
    "468x60": { key: "94f1bdc6646e5d9a4bacbe82f638ba95", width: 468, height: 60 },
    "160x600": { key: "fdabf24a3ed0bfb74fae1a011d5f5117", width: 160, height: 600 },
    "160x300": { key: "efb23c41bb6f85aa034dff123859d4b0", width: 160, height: 300 },
  },
};

interface AdSlotProps {
  format?: "728x90" | "320x50" | "300x250" | "468x60" | "160x600" | "160x300" | "native" | "mobile-sticky";
  className?: string;
}

export function AdSlot({ format = "728x90", className = "" }: AdSlotProps) {
  const nativeRef = useRef<HTMLDivElement>(null);

  // Native banner dynamic injection
  useEffect(() => {
    if (format === "native" && nativeRef.current) {
      nativeRef.current.innerHTML = "";
      const containerDiv = document.createElement("div");
      containerDiv.id = ADSTERRA_CONFIG.NATIVE_CONTAINER_ID;
      nativeRef.current.appendChild(containerDiv);

      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = ADSTERRA_CONFIG.NATIVE_SCRIPT;
      nativeRef.current.appendChild(script);
    }
  }, [format]);

  // Mobile Sticky bottom banner (320x50)
  if (format === "mobile-sticky") {
    const config = ADSTERRA_CONFIG.BANNERS["320x50"];
    const srcDocContent = `<!DOCTYPE html>
<html>
  <head>
    <style>body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; }</style>
  </head>
  <body>
    <script type="text/javascript">
      atOptions = {
        'key' : '${config.key}',
        'format' : 'iframe',
        'height' : ${config.height},
        'width' : ${config.width},
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="https://bicea.org/22/${config.key}"></script>
  </body>
</html>`;

    return (
      <div className={`fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 border-t border-zinc-800 backdrop-blur-md py-1.5 flex flex-col items-center justify-center md:hidden ${className}`}>
        <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono uppercase mb-0.5">
          <span className="bg-zinc-800 px-1 rounded text-zinc-400">Ad</span>
          <span>Sponsored</span>
        </div>
        <iframe
          srcDoc={srcDocContent}
          width={config.width}
          height={config.height}
          title="Adsterra Mobile Banner 320x50"
          className="border-0 overflow-hidden"
          scrolling="no"
        />
      </div>
    );
  }

  // Native Banner Format
  if (format === "native") {
    return (
      <div className={`rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 overflow-hidden flex flex-col justify-between ${className}`}>
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60 mb-2">
          <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded">
            Sponsored
          </span>
          <span className="text-[11px] text-zinc-500">Partner Offer</span>
        </div>
        <div ref={nativeRef} className="w-full flex items-center justify-center min-h-[100px]" />
      </div>
    );
  }

  // Standard Banner Formats (728x90, 300x250, 468x60, etc.)
  const bannerConfig = ADSTERRA_CONFIG.BANNERS[format] || ADSTERRA_CONFIG.BANNERS["728x90"];

  const bannerSrcDoc = `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
      }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      atOptions = {
        'key' : '${bannerConfig.key}',
        'format' : 'iframe',
        'height' : ${bannerConfig.height},
        'width' : ${bannerConfig.width},
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="https://bicea.org/22/${bannerConfig.key}"></script>
  </body>
</html>`;

  return (
    <div className={`w-full flex flex-col items-center justify-center my-4 overflow-hidden ${className}`}>
      <div className="flex items-center justify-between w-full max-w-[${bannerConfig.width}px] text-[10px] text-zinc-500 font-mono uppercase pb-1 px-1">
        <span className="bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">
          Advertisement
        </span>
        <span>Adsterra Verified</span>
      </div>
      <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-2 flex items-center justify-center shadow-inner overflow-x-auto max-w-full">
        <iframe
          srcDoc={bannerSrcDoc}
          width={bannerConfig.width}
          height={bannerConfig.height}
          title={`Adsterra Banner ${format}`}
          className="border-0 overflow-hidden"
          scrolling="no"
        />
      </div>
    </div>
  );
}
