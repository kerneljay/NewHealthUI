import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const maxPrice = 10000000000;
  const [discordImg, setDiscordImg] = useState("https://kudos.tv/cdn/shop/files/A_AP_ROCKY_300x.png?v=1679069333");
  const [health, setHealth] = useState(2);
  const [armour, setArmour] = useState(2);
  const [voice, setVoice] = useState(false);
  const [tokens, setTokens] = useState(0);
  const [heading, setHeading] = useState(0);
  const [streetName1, setStreetName1] = useState("Prociopor");
  const [streetName2, setStreetName2] = useState("Paleto Bay");
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;

      if (data.type === "updateAll") {
        if (data.setImg !== undefined) setDiscordImg(data.setImg);
        if (data.voice !== undefined) setVoice(data.voice);
        if (data.tokens !== undefined) setTokens(data.tokens);
        if (data.health !== undefined) setHealth(data.health);
        if (data.armour !== undefined) setArmour(data.armour);
        if (data.heading !== undefined) setHeading(data.heading);
        if (data.street1 !== undefined) setStreetName1(data.street1);
        if (data.street2 !== undefined) setStreetName2(data.street2);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const segments = [0, 1, 2, 3];

  return (
    <>
      <div className="info_container">
        <div className="location_container">
          <img
            src="./cursor.png"
            alt=""
            style={{ transform: `rotate(${heading}deg)` }} // <-- Rotate based on heading
          />
          <h1>
            {streetName1} | {streetName2}
          </h1>
        </div>

        <div className="info">
          <div className="health_container">
            <div className="armaui_voice">
              <div className="left_container">
                <img src="./logo.png" alt="" />
                <h1>
                  £
                  {tokens
                    .toString()
                    .slice(0, 10)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  {tokens >= maxPrice ? "..." : ""}
                </h1>
              </div>

              <div className="voice_container">
                <h1 className="time">{time}</h1>
                <h1>{voice ? "🔊" : "🔇"}</h1>
              </div>
            </div>

            <div className="armour_bar">
              {segments.map((i) => (
                <div
                  key={i}
                  className={`armour_segment${i < armour ? " filled" : ""}`}
                />
              ))}
            </div>

            <div className="health_bar">
              {segments.map((i) => (
                <div
                  key={i}
                  className={`health_segment${i < health ? " filled" : ""}`}
                />
              ))}
            </div>
          </div>
          <div className="discord_container">
            <img
              src={discordImg}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
