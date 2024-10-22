import * as React from "react";
import { useColorScheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect } from "react";

export default function ColorModeSelect(props) {
  const { mode, setMode } = useColorScheme();
  useEffect(() => {
    if (mode !== "light") {
      setMode("light");
    }
  }, [mode, setMode]);
  if (!mode) {
    return null;
  }
  return (
    <Select
      value={mode}
      onChange={(e) => setMode(e.target.value)}
      SelectDisplayProps={{
        "data-screenshot": "toggle-mode",
      }}
      {...props}
    >
      <MenuItem value="system">System</MenuItem>
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  );
}