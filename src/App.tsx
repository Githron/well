import { useEffect, useState } from "react";
import "./App.css";
import Welcome from "./Welcome";
import Secret from "./Secret";

export default function App() {
  const [entered, setEntered] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [decrypted, setDecrypted] = useState(false);

  useEffect(() => {
    if (!unlocked) return;

    const timer = setTimeout(() => {
      setDecrypted(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [unlocked]);

  if (unlocked) {
  return (
    <main className="love-page">
      {decrypted ? (
        <Secret />
      ) : (
        <div className="hidden-file">
          <div className="archive-status">
            DECRYPTING...
          </div>

          <div className="loading-symbol">
            ◈
          </div>

          <h1>HIDDEN FILE</h1>

          <p>
            PLEASE WAIT.
            <br />
            SOMETHING IS BEING REVEALED.
          </p>
        </div>
      )}
    </main>
  );
}

  if (entered) {
    return (
      <main className="love-page">
        <Welcome onContinue={() => setUnlocked(true)} />
      </main>
    );
  }

  return (
    <main className="love-page">
      <div className="scanline"></div>

      <div className="floating-hearts">
        <span>+</span>
        <span>+</span>
        <span>+</span>
        <span>+</span>
        <span>+</span>
      </div>

      <div className="love-card">
        <div className="status">● SYSTEM ONLINE</div>

        <div className="symbol">◈</div>

        <h1>UNKNOWN</h1>

        <p>
          PRIVATE ARCHIVE
          <br />
          ACCESS REQUIRED
        </p>

        <button onClick={() => setEntered(true)}>ENTER</button>

        <div className="code">09 · 21 · 26</div>
      </div>
    </main>
  );
}
