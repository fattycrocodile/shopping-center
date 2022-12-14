import { useEffect, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

type HomeProps = { previews: [string, string[]][] };

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  let previews: [string, string[]][] = [];
  if (process.env.NEXT_PUBLIC_STATIC) {
    const res = await fetch("http://localhost:3883/previews.json");
    previews = await res.json();
  }
  return { props: { previews } };
};

const Home: NextPage<HomeProps> = ({ previews: initialPreviews }) => {
  const [previews, setPreviews] = useState<[string, string[]][] | null>(
    initialPreviews.length ? initialPreviews : null
  );
  const fetchData = async () => {
    const res = await fetch("/previews.json");
    setPreviews(await res.json());
  };
  useEffect(() => {
    if (!previews?.length) fetchData();
  }, [previews?.length]);

  if (!previews) {
    return <></>; // loading, should be quick bc everything is local
  }

  const showNullState =
    previews.length === 0 ||
    (previews.length === 2 &&
      previews[0][0] === "TextEmail.tsx" &&
      previews[1][0] === "Welcome.tsx" &&
      !process.env.NEXT_PUBLIC_STATIC);

  const logo = (
    <Image src="/logo-small@2x.png" width="76" height="16" alt="Mailing logo" />
  );

  return (
    <div>
      <div className="container">
        {showNullState && <div className="eyebrow">{logo}</div>}
        <h1>previews</h1>
        {showNullState && (
          <div className="null-sub">
            Build new email templates in <span className="code">emails</span>.
            Add previews to <span className="code">emails/previews</span> and
            they’ll appear below.
          </div>
        )}
        <hr />
        {previews.map((preview) => (
          <div className="email-group" key={preview[0]}>
            <h2>● {preview[0]}</h2>
            {preview[1].map((previewFunction) => (
              <div className="email-container" key={previewFunction}>
                <Link
                  key={previewFunction}
                  href={`/previews/${preview[0]}/${previewFunction}`}
                >
                  <a className="email">{previewFunction}</a>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
      {!showNullState && (
        <Link href="https://mailing.run">
          <a className="footer" target="_blank">
            {logo}
          </a>
        </Link>
      )}
      <style jsx>{`
        .container {
          max-width: 472px;
          margin: 64px auto 64px;
          padding: 64px 64px 32px;
          border-radius: 16px;
          border: 1px dotted #000;
          -webkit-font-smoothing: antialiased;
        }
        .eyebrow {
          margin-bottom: 40px;
        }
        h1 {
          font-size: 36px;
          font-weight: 700;
          margin: 0 0 16px;
          line-height: 122%;
        }
        .null-sub {
          font-size: 20px;
          max-width: 380px;
          line-height: 120%;
          padding: 0 0 16px;
          line-height: 140%;
        }
        hr {
          border-top: 1px dotted #000;
          border-bottom: none;
          margin: 24px 0 36px;
        }
        h2 {
          font-size: 20px;
          line-height: 120%;
          margin-bottom: 8px;
        }
        .code {
          background-color: #ddd;
          padding: 0 2px;
          border-radius: 3px;
          font-weight: 700;
          font-family: menlo, monospace;
        }
        .email-group {
          margin-bottom: 32px;
        }
        .email-container {
          margin-bottom: 8px;
        }
        a.email {
          transition: background-color, transform 200ms ease-out;
          display: inline-block;
        }
        a.email:hover {
          background: #e4ebfa;
        }
        a.email:active {
          transform: translateY(2px);
        }
        .footer {
          display: block;
          text-align: center;
          margin-top: -40px;
          margin-bottom: 64px;
        }
        @media (max-width: 600px) {
          .container {
            border: none;
            padding: 32px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
