import { useRef, useEffect, useState } from "react";

import perspective from "@finos/perspective/dist/esm/perspective.js";
import "@finos/perspective-viewer";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer-d3fc";
//import "@finos/perspective-viewer/dist/umd/all-themes.css";

const worker = perspective.shared_worker();

const dataUrls = [
  { url: "/superstore.arrow" },
  { url: "/date64.arrow" }
];

export function Perspective() {
  const viewerRef = useRef<any>();

  const [selectedDataUrl, setSelectedDataUrl] = useState(dataUrls[0]);

  useEffect(() => {
    let ignore = false;
    async function load() {
      const { url } = selectedDataUrl;
      const config = {}

      const response = await fetch(url);
      const buffer = await response.arrayBuffer();

      if (ignore) {
        return;
      }

      const table = worker.table(buffer);

      //  @ts-ignore
      await viewerRef.current.load(table);
      //  @ts-ignore
      await viewerRef.current.restore(config);
    }

    load();

    return () => {
      ignore = true;
    };
  }, [selectedDataUrl]);

  return (
    <>
      <select
        onChange={event => setSelectedDataUrl(dataUrls[event.target.value as any])}
      >
        {dataUrls.map(({ url }, index) => (
          <option key={url} value={index}>
            {url}
          </option>
        ))}
      </select>
      <div className="PerspectiveViewer">
        <perspective-viewer ref={viewerRef} />
      </div>
    </>
  );
}

export default Perspective;

