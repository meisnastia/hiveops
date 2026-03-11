const React = require("react");
const { Document, Page, View, Text, Link } = require("@react-pdf/renderer");
const { styles, colors } = require("./styles");
const resumeData = require("./resumeData");

const e = React.createElement;

function getField(obj, lang) {
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.en;
}

// ═══════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════

function Header({ lang }) {
  const d = resumeData;
  return e(View, { style: styles.headerContainer },
    e(View, { style: styles.headerLeft },
      e(Text, { style: styles.headerName }, getField(d.header.name, lang)),
      e(Text, { style: styles.headerTitle }, getField(d.header.title, lang)),
      e(Text, { style: styles.headerSummary }, getField(d.summary, lang))
    ),
    e(View, { style: styles.headerRight },
      e(Text, { style: styles.contactItem }, getField(d.header.location, lang)),
      e(Link, { src: `mailto:${d.header.email}`, style: { textDecoration: "none" } },
        e(Text, { style: { ...styles.contactItem, color: colors.accent } }, d.header.email)
      ),
      e(Text, { style: styles.contactItem }, `Telegram: ${d.header.telegram}`),
      e(Link, { src: `https://${d.header.linkedin}`, style: { textDecoration: "none" } },
        e(Text, { style: { ...styles.contactItem, color: colors.accent } }, d.header.linkedin)
      ),
      e(Link, { src: `https://${d.header.github}`, style: { textDecoration: "none" } },
        e(Text, { style: { ...styles.contactItem, color: colors.accent } }, d.header.github)
      ),
      e(Text, { style: styles.contactItem }, d.header.website)
    )
  );
}

function SectionTitle({ title }) {
  return e(Text, { style: styles.sectionTitle }, title);
}

function ExpBlock({ job, lang }) {
  const bullets = getField(job.bullets, lang);
  return e(View, { style: styles.expBlock },
    e(View, { style: styles.expHeader },
      e(Text, { style: styles.expTitle }, getField(job.title, lang)),
      e(Text, { style: styles.expPeriod }, getField(job.period, lang))
    ),
    e(Text, { style: styles.expCompany }, getField(job.company, lang)),
    ...bullets.map((b, i) =>
      e(View, { key: `b-${i}`, style: styles.bulletItem },
        e(Text, { style: styles.bulletDot }, "•"),
        e(Text, { style: styles.bulletText }, b)
      )
    )
  );
}

function Education({ lang }) {
  const d = resumeData;
  const labels = d.sectionLabels;
  return e(View, null,
    e(SectionTitle, { title: getField(labels.education, lang) }),
    e(View, { style: styles.eduBlock },
      e(View, { style: styles.expHeader },
        e(Text, { style: styles.expTitle }, getField(d.education.degree, lang)),
        e(Text, { style: styles.expPeriod }, d.education.period)
      ),
      e(Text, { style: styles.expCompany }, getField(d.education.institution, lang)),
      e(Text, { style: styles.eduNote }, getField(d.education.note, lang))
    )
  );
}

function Skills({ lang }) {
  const d = resumeData;
  const labels = d.sectionLabels;
  return e(View, null,
    e(SectionTitle, { title: getField(labels.skills, lang) }),
    ...d.skills.map((s, i) =>
      e(View, { key: `sk-${i}`, style: styles.skillRow },
        e(Text, { style: styles.skillCategory }, s.category),
        e(Text, { style: styles.skillItems }, s.items)
      )
    )
  );
}

function Badges({ lang }) {
  const d = resumeData;
  const labels = d.sectionLabels;
  return e(View, null,
    e(SectionTitle, { title: getField(labels.badges, lang) }),
    ...d.badges.map((b, i) =>
      e(Text, { key: `bg-${i}`, style: styles.badgeItem }, `✓ ${b}`)
    )
  );
}

function Languages({ lang }) {
  const d = resumeData;
  const labels = d.sectionLabels;
  const langs = d.languages[lang] || d.languages.en;
  return e(View, null,
    e(SectionTitle, { title: getField(labels.languages, lang) }),
    ...langs.map((l, i) =>
      e(Text, { key: `lang-${i}`, style: styles.langLine },
        e(Text, { style: { fontWeight: "bold" } }, l.name),
        ` — ${l.level}`
      )
    )
  );
}

// ═══════════════════════════════════════════════════
// MAIN DOCUMENT
// ═══════════════════════════════════════════════════

function ResumeDocument({ lang }) {
  const d = resumeData;
  const labels = d.sectionLabels;

  return e(Document, null,
    e(Page, { size: "A4", style: styles.page },
      // Header with contact
      e(Header, { lang }),

      // Experience
      e(SectionTitle, { title: getField(labels.experience, lang) }),
      ...d.experience.map((job, i) =>
        e(ExpBlock, { key: `exp-${i}`, job, lang })
      ),

      // Education
      e(Education, { lang }),

      // Skills + Badges side by side
      e(View, { style: styles.twoColumns },
        e(View, { style: styles.columnLeft },
          e(Skills, { lang })
        ),
        e(View, { style: styles.columnRight },
          e(Badges, { lang }),
          e(Languages, { lang })
        )
      )
    )
  );
}

module.exports = ResumeDocument;
