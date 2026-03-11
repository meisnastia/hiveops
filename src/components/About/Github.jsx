import React from "react";
import GitHubCalendar from "react-github-calendar";

export default function Github() {
  const theme = {
    dark: ["#161B22", "#3B2E10", "#6B4D1A", "#B8860B", "#FFC107"],
  };

  return (
    <div className="text-center">
      <GitHubCalendar
        username="meisnastia"
        blockSize={12}
        blockMargin={4}
        theme={theme}
        fontSize={14}
      />
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "0.85rem",
          marginTop: "1rem",
        }}
      >
        Contribution activity
      </p>
    </div>
  );
}
