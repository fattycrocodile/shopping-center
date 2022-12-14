import usePreviewHotkeys from "./hooks/usePreviewHotkeys";

type HotIFrameProps = {
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  srcDoc: string;
};

const HotIFrame: React.FC<HotIFrameProps> = ({
  viewMode,
  setViewMode,
  srcDoc,
}) => {
  const { iframeRef, textareaRef } = usePreviewHotkeys({ setViewMode });

  return (
    <>
      {viewMode === "html" ? (
        <textarea
          className="code-container mono"
          readOnly
          value={srcDoc}
          ref={textareaRef}
        ></textarea>
      ) : (
        <div className={`frame ${viewMode === "mobile" ? " mobile" : ""}`}>
          <iframe srcDoc={srcDoc} ref={iframeRef} />
        </div>
      )}
      <style jsx>{`
        .frame {
          margin: auto;
          display: block;
        }
        .mobile.frame {
          padding: 64px 16px 74px;
          max-width: 324px;
          border-radius: 32px;
          margin: 64px auto;
        }
        .mobile iframe {
          height: 568px;
          max-width: 320px;
        }
        iframe {
          width: 100%;
          border: none;
          height: calc(100vh - 65px);
        }
        .mobile,
        .mobile iframe {
          border: 1px dotted #333;
        }
        .code-container {
          font-size: 10px;
          white-space: pre-wrap;
          padding: 16px;
          outline: none;
          height: calc(100vh - 65px);
          width: 100%;
          resize: none;
        }
        @media (prefers-color-scheme: dark) {
          .code-container {
            white-space: pre-wrap;
            color: white;
            background: #212121;
          }
        }
      `}</style>
    </>
  );
};

export default HotIFrame;
