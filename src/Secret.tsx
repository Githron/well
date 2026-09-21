import { useEffect, useState } from "react";
import tempVideo from "./assets/video/temp.mp4";

const validPasswords = [
  "Dimokolove",
  "Di mo ko luv",
  "Di mo ko lab",
  "D mu q luv",
  "Rwx012278",
  "July222018",
  "July 22, 2018",
  "07222018",
  "07 22 2018",
  "07 22 18",
];

const unlockTime = new Date("2026-09-22T00:00:00+08:00").getTime();

export default function Secret() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [messageOpened, setMessageOpened] = useState(false);

  const [timeLeft, setTimeLeft] = useState(
    Math.max(0, unlockTime - Date.now()),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(Math.max(0, unlockTime - Date.now()));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalSeconds = Math.floor(timeLeft / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const countdown = `${String(hours).padStart(2, "0")}:${String(
    minutes,
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  function handleUnlock() {
    const now = Date.now();

    if (now < unlockTime) {
      setError(`ACCESS AVAILABLE IN · ${countdown}`);
      return;
    }

    const correct = validPasswords.some(
      (validPassword) => validPassword.toLowerCase() === password.toLowerCase(),
    );

    if (!correct) {
      setError("ACCESS DENIED");
      setPassword("");
      return;
    }

    setError("");
    setVerifying(true);

    setTimeout(() => {
      setVerifying(false);
      setUnlocked(true);
    }, 1800);
  }

  if (verifying) {
    return (
      <div className="password-screen verifying-screen">
        <div className="archive-status">VERIFYING KEY...</div>

        <div className="password-symbol">◈</div>

        <h1>ACCESSING FILE</h1>

        <p>
          AUTHENTICATION ACCEPTED.
          <br />
          PLEASE WAIT.
        </p>

        <div className="verify-line">
          <span></span>
        </div>

        <div className="secret-signature">— DECODING —</div>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="password-screen">
        <div className="archive-status">ENCRYPTED FILE</div>

        <div className="password-symbol">◈</div>

        <h1>ACCESS REQUIRED</h1>

        <p>
          THIS FILE IS PROTECTED.
          <br />
          ENTER THE KEY TO CONTINUE.
        </p>

        {timeLeft > 0 && (
          <div className="countdown">
            ACCESS AVAILABLE IN
            <span>{countdown}</span>
          </div>
        )}

        <div className="password-box">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUnlock();
              }
            }}
            placeholder="ENTER PASSWORD"
            autoFocus
          />

          <button onClick={handleUnlock}>UNLOCK</button>
        </div>

        {error && <div className="password-error">{error}</div>}

        <div className="secret-signature">— AUTHORIZED ACCESS ONLY —</div>
      </div>
    );
  }

  return (
    <div className="secret-screen">
      <div className="archive-status">FILE DECRYPTED</div>

      <div className="secret-symbol">◈</div>

      <h1>SINCE</h1>

      <p className="secret-message highlight">22 · 07 · 2018</p>

      <div className="memory-frame">
        <video
          src={tempVideo}
          className="memory-video"
          autoPlay
          playsInline
          controls
          onEnded={() => setShowMessage(true)}
        />
      </div>

      <p className="secret-message">No end date found.</p>

      <div className="secret-signature">— END OF FILE —</div>

      {showMessage && !messageOpened && (
        <button
          className="message-button"
          onClick={() => setMessageOpened(true)}
        >
          OPEN PERSONAL MESSAGE
        </button>
      )}

      {messageOpened && (
        <div className="final-message">
          <div className="archive-status">PERSONAL MESSAGE</div>

          <h2>TO WELLA</h2>

          <p>
            Eight years, two months, and somehow, I still find myself choosing
            you.
          </p>

          <p>
            We've changed, we've had our good days and our difficult ones. But
            through all of it, we're still here.
          </p>

          <p>And if I had to choose again, I would still choose you.</p>

          <div className="secret-signature">— END OF TRANSMISSION —</div>
        </div>
      )}
    </div>
  );
}
