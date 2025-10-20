import './compressedSections.css';

const SECTIONS = [
  {
    title: "Early years (0 – 5)",
    content: (
      <>
        <p>• Blablabla bla blab la</p>
        <p>• Word word word, word word</p>
        <p>• This is a sentence</p>
      </>
    ),
  },
  {
    title: "Primary School (6 – 11)",
    content: (
      <>
        <p>• Blablabla bla blab la</p>
        <p>• Word word word, word word</p>
        <p>• This is a sentence</p>
      </>
    ),
  },
  {
    title: "Teenagers (12 – 17)",
    content: (
      <>
        <p>• Blablabla bla blab la</p>
        <p>• Word word word, word word</p>
        <p>• This is a sentence</p>
      </>
    ),
  },
  {
    title: "Adults (18+ years)",
    content: (
      <>
        <p>• Blablabla bla blab la</p>
        <p>• Word word word, word word</p>
        <p>• This is a sentence</p>
      </>
    ),
  },
];

export default function CompressedSections() {
  return (
    <div className="age-sections">
      {SECTIONS.map(({ title, content }) => (
        <div key={title} className="age-card">
          <h2 className="age-title">{title}</h2>
          <div className="age-content">{content}</div>
        </div>
      ))}
    </div>
  );
}
