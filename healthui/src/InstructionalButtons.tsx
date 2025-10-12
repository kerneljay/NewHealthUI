import { useEffect, useState } from "react";
interface Instruction {
  keys: any[];       // array of icon components
  label: string;
  keyCodes?: string[];  // optional: physical key mappings
}

export function InstructionalButtons({instructionalButtons} : {instructionalButtons: Instruction[]}) {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      console.log(`Key pressed: ${key}`);
      setPressedKeys(prev => new Set(prev).add(key));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key;
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="instructional_buttons">
      {instructionalButtons.map((button, index) => (
        <div className="instructional_button" key={index}>
          <div className="key_button_holder_container">
            {button.keyCodes?.map((keyCode, keyIndex) => (
              <div
                className={`key_button_holder ${
                  pressedKeys.has(keyCode) ? "pressed" : ""
                }`}
                key={keyIndex}
              >
                <h1>{button.keys[keyIndex]}</h1>
              </div>
            ))}
          </div>
          <h1>{button.label}</h1>
          {/* <h2>|</h2> */}
        </div>
      ))}
    </div>
  );
}
