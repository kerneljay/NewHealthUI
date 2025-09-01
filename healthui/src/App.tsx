import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const maxPrice = 10000000000;
  const [visible, setVisible] = useState(true);
  const [discordImg, setDiscordImg] = useState(
    "https://kudos.tv/cdn/shop/files/A_AP_ROCKY_300x.png?v=1679069333"
  );
  const [health, setHealth] = useState(2);
  const [armour, setArmour] = useState(2);
  const [voice, setVoice] = useState(false);
  const [tokens, setTokens] = useState(0);
  const [heading, setHeading] = useState(0);
  const [healthColour, setHealthColour] = useState("#73f76e");
  const [armourColour, setArmourColour] = useState("#6ec2f7");
  const [streetNameColour, setStreetNameColour] = useState("#6ec2f7");
  const [streetNamesVisible, setStreetNamesVisible] = useState(true);
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
        if (data.streetNamesVisible !== undefined)
          setStreetNamesVisible(data.streetNamesVisible);
        if (data.streetNameColour !== undefined) setStreetNameColour(data.streetNameColour);
        if (data.healthColour !== undefined) setHealthColour(data.healthColour);
        if (data.armourColour !== undefined) setArmourColour(data.armourColour);
        if (data.img !== undefined) setDiscordImg(data.img);
        if (data.visible !== undefined) setVisible(data.visible);
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
      {visible && (
        <div className="info_container">
          <div
            className="location_container"
            style={{ display: streetNamesVisible ? "flex" : "none" }}
          >
            <img
              src="./cursor.png"
              alt=""
              className="cursor"
              style={{ transform: `rotate(${heading}deg)` }} // <-- Rotate based on heading
            />
            <h1 className="location">
              {streetName1} | <span className="street2" style={{ color: streetNameColour }}>{streetName2}</span>
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
                    style={{
                      boxShadow: i < armour ? `0 0 3px ${armourColour}` : "",
                      backgroundColor: i < armour ? armourColour : undefined,
                    }}
                  />
                ))}
              </div>

              <div className="health_bar">
                {segments.map((i) => (
                  <div
                    key={i}
                    className={`health_segment${i < health ? " filled" : ""}`}
                    style={{
                      boxShadow: i < health ? `0 0 3px ${healthColour}` : "",
                      backgroundColor: i < health ? healthColour : undefined,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="discord_container">
              <img src={discordImg} alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
