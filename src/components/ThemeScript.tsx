export default function ThemeScript() {
  const script = `
    (function() {
      var theme = localStorage.getItem('theme');
      if (theme === 'light' || theme === 'dark') {
        document.documentElement.classList.toggle('dark', theme === 'dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
