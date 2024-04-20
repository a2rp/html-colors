import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import predefinedColors from "./predefinedColors.json";
import { Button, Tooltip } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from "react-toastify";

const HtmlColors = () => {
    const [selectedColor, setSelectedColor] = useState("");
    const [redColorValue, setRedColorValue] = useState(70);
    const [greenColorValue, setGreenColorValue] = useState(70);
    const [blueColorValue, setBlueColorValue] = useState(70);
    const [nameColorValue, setNameColorValue] = useState(0);
    const [rgbColorValue, setRgbColorValue] = useState(0);
    const [hexColorValue, setHexColorValue] = useState(0);
    const [hslColorValue, setHslColorValue] = useState(0);

    // function hexToRgb(hex, result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.toLowerCase())) {
    //     return result ? result.map(i => parseInt(i, 16)).slice(1) : null
    // }

    function hexToRGB(h) {
        let r = 0, g = 0, b = 0;

        // 3 digits
        if (h.length == 4) {
            r = "0x" + h[1] + h[1];
            g = "0x" + h[2] + h[2];
            b = "0x" + h[3] + h[3];

            // 6 digits
        } else if (h.length == 7) {
            r = "0x" + h[1] + h[2];
            g = "0x" + h[3] + h[4];
            b = "0x" + h[5] + h[6];
        }

        return "rgb(" + +r + "," + +g + "," + +b + ")";
    }

    function RGBToHex(r, g, b) {
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);

        if (r.length === 1) r = "0" + r;
        if (g.length === 1) g = "0" + g;
        if (b.length === 1) b = "0" + b;

        return "#" + r + g + b;
    }

    function RGBToHSL(r, g, b) {
        // Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;

        // Find greatest and smallest channel values
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        // Calculate hue
        // No difference
        if (delta == 0)
            h = 0;
        // Red is max
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        // Green is max
        else if (cmax == g)
            h = (b - r) / delta + 2;
        // Blue is max
        else
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        // Make negative hues positive behind 360°
        if (h < 0)
            h += 360;

        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return "hsl(" + h + "," + s + "%," + l + "%)";
    }

    useEffect(() => {
        if (selectedColor.length === 0) return;
        const { value: hex } = selectedColor;
        let rgb = hexToRGB(hex);
        rgb = rgb.split("rgb(")[1];
        rgb = rgb.split(")")[0];
        rgb = rgb.split(",");
        // console.log(hex, rgb, "rgb");
        setRedColorValue(parseInt(rgb[0]));
        setGreenColorValue(parseInt(rgb[1]));
        setBlueColorValue(parseInt(rgb[2]));
    }, [selectedColor]);

    useEffect(() => {
        const rgbValue = `rgb(${redColorValue}, ${greenColorValue}, ${blueColorValue})`;
        setRgbColorValue(rgbValue);

        const hexValue = RGBToHex(parseInt(redColorValue), parseInt(greenColorValue), parseInt(blueColorValue));
        setHexColorValue(hexValue);

        const hslValue = RGBToHSL(redColorValue, greenColorValue, blueColorValue);
        setHslColorValue(hslValue);

        const presentObject = predefinedColors.filter(color => color.value.toLowerCase() === hexValue);
        // console.log(presentObject, "presentobjecy");
        if (presentObject.length > 0) {
            setNameColorValue(presentObject[0].name);
        } else {
            setNameColorValue("");
        }

        // console.log(rgbValue, hexValue, hslValue);
    }, [redColorValue, greenColorValue, blueColorValue]);

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.heading}>Html colors</div>
                <div className={styles.subheading}>Predefined colors</div>
                <ul className={styles.predefinedColorList}>
                    {predefinedColors && predefinedColors.map((color, index) => (
                        <li
                            key={index}
                            className={styles.color}
                            style={{ backgroundColor: color.value }}
                            onClick={() => setSelectedColor(color)}
                            title={`${color.name} - ${color.value}`}
                        >
                            {/* <Tooltip className={styles.tooltip} title={`${color.name} - ${color.value}`}> */}
                            <Button size="small" className={styles.colorButton} sx={{ color: "#000", padding: "5px 15px" }}>
                                {color.name}
                            </Button>
                            {/* </Tooltip> */}
                        </li>
                    ))}
                </ul>

                <div className={styles.otherColors}>
                    <div className={styles.rangeContainer}>
                        <div className={styles.redContainer}>
                            <label htmlFor="">Red - {redColorValue}</label>
                            <input type="range" min={0} max={255} step={1}
                                className={styles.redColorRange}
                                value={redColorValue}
                                onChange={event => setRedColorValue(event.target.value)}
                            />
                        </div>
                        <div className={styles.greenContainer}>
                            <label htmlFor="">Green - {greenColorValue}</label>
                            <input type="range" min={0} max={255} step={1}
                                className={styles.greenColorRange}
                                value={greenColorValue}
                                onChange={event => setGreenColorValue(event.target.value)}
                            />
                        </div>
                        <div className={styles.blueContainer}>
                            <label htmlFor="">Blue - {blueColorValue}</label>
                            <input type="range" min={0} max={255} step={1}
                                className={styles.blueColorRange}
                                value={blueColorValue}
                                onChange={event => setBlueColorValue(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.colorValuesContainer} style={{ backgroundColor: rgbColorValue }}>
                        <h3 className={styles.name}>
                            Name - {nameColorValue}
                            <CopyToClipboard text={rgbColorValue}>
                                <ContentCopyIcon
                                    sx={{ color: "#fff", cursor: "pointer" }}
                                    onClick={() => { toast.warn(`Copied to clipboard - ${nameColorValue}`); }}
                                />
                            </CopyToClipboard>
                        </h3>
                        <h3 className={styles.rgb}>
                            RGB - {rgbColorValue}
                            <CopyToClipboard text={rgbColorValue}>
                                <ContentCopyIcon
                                    sx={{ color: "#fff", cursor: "pointer" }}
                                    onClick={() => { toast.warn(`Copied to clipboard - ${rgbColorValue}`); }}
                                />
                            </CopyToClipboard>
                        </h3>
                        <h3 className={styles.hex}>
                            Hex - {hexColorValue}
                            <CopyToClipboard text={hexColorValue}>
                                <ContentCopyIcon
                                    sx={{ color: "#fff", cursor: "pointer" }}
                                    onClick={() => { toast.warn(`Copied to clipboard - ${hexColorValue}`); }}
                                />
                            </CopyToClipboard>
                        </h3>
                        <h3 className={styles.hsl}>
                            HSL - {hslColorValue}
                            <CopyToClipboard text={hslColorValue}>
                                <ContentCopyIcon
                                    sx={{ color: "#fff", cursor: "pointer" }}
                                    onClick={() => { toast.warn(`Copied to clipboard - ${hslColorValue}`); }}
                                />
                            </CopyToClipboard>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HtmlColors

