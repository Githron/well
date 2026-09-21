type WelcomeProps = {
  onContinue: () => void;
};

export default function Welcome({ onContinue }: WelcomeProps) {
  return (
    <div className="welcome-screen">
      <div className="archive-status">
        ACCESS GRANTED
      </div>

      <div className="archive-symbol">
        ◈
      </div>

      <h1>FILE UNLOCKED</h1>

      <p>
        SOME THINGS ARE MEANT
        <br />
        TO BE DISCOVERED.
      </p>

      <div className="archive-line"></div>

      <button
        className="continue-button"
        onClick={onContinue}
      >
        CONTINUE
      </button>
    </div>
  );
}