const { StyleSheet, Font } = require("@react-pdf/renderer");
const path = require("path");

// Register Roboto font family (supports Cyrillic)
Font.register({
  family: "Roboto",
  fonts: [
    { src: path.join(__dirname, "fonts", "Roboto-Regular.ttf"), fontWeight: "normal" },
    { src: path.join(__dirname, "fonts", "Roboto-Bold.ttf"), fontWeight: "bold" },
    { src: path.join(__dirname, "fonts", "Roboto-Italic.ttf"), fontStyle: "italic" },
    { src: path.join(__dirname, "fonts", "Roboto-BoldItalic.ttf"), fontWeight: "bold", fontStyle: "italic" },
  ],
});

// Disable hyphenation for cleaner text
Font.registerHyphenationCallback((word) => [word]);

// Bee/Honey color palette
const colors = {
  primary: "#3E2723",     // Bee-dark brown — name, section headers
  accent: "#B8860B",      // Dark goldenrod — section lines, dates
  honey: "#FFC107",       // Honey gold — subtle highlights
  text: "#2D2D2D",        // Near-black — body text
  secondary: "#5D4037",   // Brown — subtitles
  muted: "#6B7280",       // Gray — dates, secondary info
  separator: "#D7CCC8",   // Light brown-gray — lines
  badgeBg: "#FFF8E1",     // Very light amber — badge bg
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 24,
    paddingLeft: 32,
    paddingRight: 32,
    fontFamily: "Roboto",
    fontSize: 9.5,
    color: colors.text,
    lineHeight: 1.35,
  },

  // Header
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 2.5,
    borderBottomColor: colors.accent,
  },
  headerLeft: {
    flex: 1,
    paddingRight: 12,
  },
  headerName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    letterSpacing: 0.8,
    marginBottom: 8,
    lineHeight: 1.1,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.accent,
    marginBottom: 10,
    lineHeight: 1.1,
  },
  headerSummary: {
    fontSize: 9,
    lineHeight: 1.5,
    color: colors.text,
    textAlign: "justify",
  },
  headerRight: {
    width: 155,
    paddingLeft: 12,
    justifyContent: "flex-start",
    paddingTop: 4,
  },
  contactItem: {
    fontSize: 8.5,
    color: colors.secondary,
    marginBottom: 3.5,
  },

  // Section title
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: "bold",
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 6,
    marginBottom: 4,
    paddingBottom: 2.5,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.accent,
  },

  // Experience
  expBlock: {
    marginBottom: 6,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 1.5,
  },
  expTitle: {
    fontWeight: "bold",
    fontSize: 10.5,
    color: colors.primary,
  },
  expPeriod: {
    fontSize: 8.5,
    color: colors.accent,
    fontWeight: "bold",
  },
  expCompany: {
    fontSize: 9,
    color: colors.muted,
    marginBottom: 3,
  },

  // Bullets
  bulletItem: {
    flexDirection: "row",
    marginBottom: 1.5,
    paddingLeft: 4,
  },
  bulletDot: {
    width: 10,
    fontSize: 9,
    color: colors.accent,
    marginTop: 0.5,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.35,
    color: colors.text,
  },

  // Education
  eduBlock: {
    marginBottom: 4,
  },
  eduNote: {
    fontSize: 8.5,
    fontStyle: "italic",
    color: colors.muted,
    marginTop: 2,
  },

  // Skills + Badges side by side
  twoColumns: {
    flexDirection: "row",
    gap: 16,
    marginTop: 4,
  },
  columnLeft: {
    flex: 1.3,
  },
  columnRight: {
    flex: 1,
  },

  // Skills
  skillRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  skillCategory: {
    fontWeight: "bold",
    fontSize: 9,
    width: 65,
    color: colors.accent,
  },
  skillItems: {
    fontSize: 8.5,
    flex: 1,
    color: colors.text,
    lineHeight: 1.35,
  },

  // Badges
  badgeItem: {
    fontSize: 8.5,
    color: colors.text,
    marginBottom: 2,
  },

  // Languages
  langLine: {
    fontSize: 9,
    color: colors.text,
    marginBottom: 2,
  },
});

module.exports = { styles, colors };
