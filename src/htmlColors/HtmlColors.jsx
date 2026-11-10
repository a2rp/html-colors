import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import predefinedColors from "./predefinedColors.json";

function hexToRGB(hex) {
    const value = hex.replace(/^#/, "");
    return {
        red: Number.parseInt(value.slice(0, 2), 16),
        green: Number.parseInt(value.slice(2, 4), 16),
        blue: Number.parseInt(value.slice(4, 6), 16),
    };
}

function RGBToHex(red, green, blue) {
    return `#${[red, green, blue].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

function RGBToHSL(red, green, blue) {
    const r = red / 255;
    const g = green / 255;
    const b = blue / 255;
    const minimum = Math.min(r, g, b);
    const maximum = Math.max(r, g, b);
    const delta = maximum - minimum;
    let hue = 0;
    let saturation = 0;
    const lightness = (maximum + minimum) / 2;

    if (delta !== 0) {
        saturation = delta / (1 - Math.abs(2 * lightness - 1));
        if (maximum === r) hue = ((g - b) / delta) % 6;
        else if (maximum === g) hue = (b - r) / delta + 2;
        else hue = (r - g) / delta + 4;
        hue = (hue * 60 + 360) % 360;
    }

    return `hsl(${Math.round(hue)}, ${(saturation * 100).toFixed(1)}%, ${(lightness * 100).toFixed(1)}%)`;
}

function getReadableTextColor(hex) {
    const { red, green, blue } = hexToRGB(hex);
    const linearize = (channel) => {
        const value = channel / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    };
    const luminance = 0.2126 * linearize(red) + 0.7152 * linearize(green) + 0.0722 * linearize(blue);
    return luminance > 0.179 ? "#10131a" : "#ffffff";
}

function CopyButton({ label, value }) {
    return (
        <CopyToClipboard
            text={value}
            onCopy={(_text, copied) => {
                if (copied) toast.success(`Copied ${label}: ${value}`);
                else toast.error(`Could not copy ${label}.`);
            }}
        >
            <button
                type="button"
                className={styles.copyButton}
                aria-label={`Copy ${label} value ${value}`}
                title={`Copy ${label}`}
            >
                <FiCopy aria-hidden="true" />
            </button>
        </CopyToClipboard>
    );
}

const HtmlColors = () => {
    const [redColorValue, setRedColorValue] = useState(70);
    const [greenColorValue, setGreenColorValue] = useState(70);
    const [blueColorValue, setBlueColorValue] = useState(70);
    const [selectedColorName, setSelectedColorName] = useState("");

    const rgbColorValue = `rgb(${redColorValue}, ${greenColorValue}, ${blueColorValue})`;
    const hexColorValue = RGBToHex(redColorValue, greenColorValue, blueColorValue);
    const hslColorValue = RGBToHSL(redColorValue, greenColorValue, blueColorValue);
    const matchingColor = predefinedColors.find((color) => color.value.toLowerCase() === hexColorValue);
    const nameColorValue = selectedColorName || matchingColor?.name || "";

    function selectColor(color) {
        const { red, green, blue } = hexToRGB(color.value);
        setSelectedColorName(color.name);
        setRedColorValue(red);
        setGreenColorValue(green);
        setBlueColorValue(blue);
    }

    function updateChannel(setValue, event) {
        setSelectedColorName("");
        setValue(Number(event.target.value));
    }

    return (
        <main className={styles.container} id="colors">
            <div className={styles.main}>
                <h1 className={styles.heading}>HTML colors</h1>
                <p className={styles.intro}>Explore CSS named colors, adjust RGB channels, and copy the color in the format you need.</p>

                <h2 className={styles.subheading} id="palette-heading">Predefined colors</h2>
                <ul className={styles.predefinedColorList} aria-labelledby="palette-heading">
                    {predefinedColors.map((color) => (
                        <li key={color.name} className={styles.color}>
                            <button
                                type="button"
                                className={styles.colorButton}
                                style={{ backgroundColor: color.value, color: getReadableTextColor(color.value) }}
                                aria-label={`Select ${color.name}, ${color.value}`}
                                aria-pressed={selectedColorName ? color.name === selectedColorName : color.value.toLowerCase() === hexColorValue}
                                onClick={() => selectColor(color)}
                            >
                                {color.name}
                            </button>
                        </li>
                    ))}
                </ul>

                <section className={styles.otherColors} aria-label="Custom color and converted values">
                    <div className={styles.rangeContainer}>
                        <div className={styles.redContainer}>
                            <label htmlFor="red-range">Red <output>{redColorValue}</output></label>
                            <input id="red-range" type="range" min="0" max="255" step="1" className={styles.redColorRange} value={redColorValue} onChange={(event) => updateChannel(setRedColorValue, event)} />
                        </div>
                        <div className={styles.greenContainer}>
                            <label htmlFor="green-range">Green <output>{greenColorValue}</output></label>
                            <input id="green-range" type="range" min="0" max="255" step="1" className={styles.greenColorRange} value={greenColorValue} onChange={(event) => updateChannel(setGreenColorValue, event)} />
                        </div>
                        <div className={styles.blueContainer}>
                            <label htmlFor="blue-range">Blue <output>{blueColorValue}</output></label>
                            <input id="blue-range" type="range" min="0" max="255" step="1" className={styles.blueColorRange} value={blueColorValue} onChange={(event) => updateChannel(setBlueColorValue, event)} />
                        </div>
                    </div>

                    <div className={styles.colorValuesContainer} id="converter" style={{ backgroundColor: rgbColorValue }}>
                        <h3 className={styles.name}>
                            <span className={styles.valueText}>Name · {nameColorValue || "No exact CSS name"}</span>
                            {nameColorValue && <CopyButton label="color name" value={nameColorValue} />}
                        </h3>
                        <h3 className={styles.rgb}>
                            <span className={styles.valueText}>RGB · {rgbColorValue}</span>
                            <CopyButton label="RGB" value={rgbColorValue} />
                        </h3>
                        <h3 className={styles.hex}>
                            <span className={styles.valueText}>HEX · {hexColorValue}</span>
                            <CopyButton label="HEX" value={hexColorValue} />
                        </h3>
                        <h3 className={styles.hsl}>
                            <span className={styles.valueText}>HSL · {hslColorValue}</span>
                            <CopyButton label="HSL" value={hslColorValue} />
                        </h3>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default HtmlColors;
