const LINKS = [
  {
    title: 'Utility Tools',
    indictor: ['bg-fuchsia-300', 'bg-fuchsia-400/75'],
    text: 'group-hover:group-not-[.disabled]:text-fuchsia-300 group-focus:group-not-[.disabled]:text-fuchsia-300',
    border: 'hover:not-[.disabled]:border-fuchsia-300 focus:not-[.disabled]:border-fuchsia-300',
    background: 'hover:not-[.disabled]:bg-fuchsia-400/10 focus:not-[.disabled]:bg-fuchsia-400/10',
    shadow: 'hover:not-[.disabled]:shadow-fuchsia-400/10 focus:not-[.disabled]:shadow-fuchsia-400/10',
    groups: [
      {
        update: '',
        title: 'Unit Converter',
        description: 'Convert between different units of measurement.',
        url: ''
      },
      {
        update: '',
        title: 'Keyboard Tester',
        description: 'Test your keyboard and see which keys are being pressed.',
        url: ''
      },
      {
        update: '',
        title: 'Unicode Symbols',
        description: 'Browse and copy various Unicode symbols and emojis.',
        url: ''
      },
    ],
  },
  {
    title: 'Time Tools',
    indictor: ['bg-lime-300', 'bg-lime-400/75'],
    text: 'group-hover:group-not-[.disabled]:text-lime-300 group-focus:group-not-[.disabled]:text-lime-300',
    border: 'hover:not-[.disabled]:border-lime-300 focus:not-[.disabled]:border-lime-300',
    background: 'hover:not-[.disabled]:bg-lime-400/10 focus:not-[.disabled]:bg-lime-400/10',
    shadow: 'hover:not-[.disabled]:shadow-lime-400/10 focus:not-[.disabled]:shadow-lime-400/10',
    groups: [
      {
        update: '',
        title: 'Day and Time Clock',
        description: 'Show current day and time with timezone support.',
        url: ''
      },
      {
        update: '',
        title: 'Timezone Converter',
        description: 'Convert time between different timezones.',
        url: ''
      },
      {
        update: '2026-05-13',
        title: 'Unit Timestamp Converter',
        description: 'Convert between Unix timestamps and human-readable dates.',
        url: 'timestamp'
      },
      {
        update: '',
        title: 'Time Difference Calculator',
        description: 'Calculate the difference between two times.',
        url: ''
      },
    ],
  },
  {
    title: 'For Developers',
    indictor: ['bg-amber-300', 'bg-amber-400/75'],
    text: 'group-hover:group-not-[.disabled]:text-amber-300 group-focus:group-not-[.disabled]:text-amber-300',
    border: 'hover:not-[.disabled]:border-amber-300 focus:not-[.disabled]:border-amber-300',
    background: 'hover:not-[.disabled]:bg-amber-400/10 focus:not-[.disabled]:bg-amber-400/10',
    shadow: 'hover:not-[.disabled]:shadow-amber-400/10 focus:not-[.disabled]:shadow-amber-400/10',
    groups: [
      {
        update: '',
        title: 'Color Code Converter',
        description: 'Convert between different color code formats by color picker.',
        url: ''
      },
      {
        update: '',
        title: 'Cron Expression Parser',
        description: 'Parse and validate cron expressions.',
        url: ''
      },
      {
        update: '',
        title: 'Regex Tester',
        description: 'Test and validate regular expressions.',
        url: ''
      },
    ],
  },
  {
    title: 'Text Decoder/Encoder',
    indictor: ['bg-rose-300', 'bg-rose-400/75'],
    text: 'group-hover:group-not-[.disabled]:text-rose-300 group-focus:group-not-[.disabled]:text-rose-300',
    border: 'hover:not-[.disabled]:border-rose-300 focus:not-[.disabled]:border-rose-300',
    background: 'hover:not-[.disabled]:bg-rose-400/10 focus:not-[.disabled]:bg-rose-400/10',
    shadow: 'hover:not-[.disabled]:shadow-rose-400/10 focus:not-[.disabled]:shadow-rose-400/10',
    groups: [
      {
        update: '2026-05-07',
        title: 'ASCII Code Converter',
        description: 'Convert text to ASCII code and vice versa.',
        url: 'ascii'
      },
      {
        update: '',
        title: 'Base64 Code Converter',
        description: 'Convert text to base64 code and vice versa.',
        url: ''
      },
      {
        update: '',
        title: 'URL Code Converter',
        description: 'Convert text to URL code and vice versa.',
        url: ''
      },
      {
        update: '',
        title: 'JSON Converter',
        description: 'Convert JSON to various formats.',
        url: ''
      },
      {
        update: '',
        title: 'YAML Converter',
        description: 'Convert YAML to various formats.',
        url: ''
      },
      {
        update: '',
        title: 'CSS Converter',
        description: 'Convert CSS to minified formats and vice versa.',
        url: ''
      },
      {
        update: '',
        title: 'JavaScript Converter',
        description: 'Convert JavaScript to minified formats and vice versa.',
        url: ''
      },
    ],
  },
  {
    title: 'Language Tools',
    indictor: ['bg-violet-300', 'bg-violet-400/75'],
    text: 'group-hover:group-not-[.disabled]:text-violet-300 group-focus:group-not-[.disabled]:text-violet-300',
    border: 'hover:not-[.disabled]:border-violet-300 focus:not-[.disabled]:border-violet-300',
    background: 'hover:not-[.disabled]:bg-violet-400/10 focus:not-[.disabled]:bg-violet-400/10',
    shadow: 'hover:not-[.disabled]:shadow-violet-400/10 focus:not-[.disabled]:shadow-violet-400/10',
    groups: [
      {
        update: '',
        title: '한글 to ㄅㄆㄇㄈ Converter',
        description: 'Convert 한글 (Hangul) to ㄅㄆㄇㄈ (Bopomofo) and vice versa.',
        url: ''
      },
      {
        update: '',
        title: '한글 to romanization Converter',
        description: 'Convert 한글 (Hangul) to romanized form and vice versa.',
        url: ''
      },
      {
        update: '',
        title: 'Chinese to romanization Converter',
        description: 'Convert Chinese characters to romanized form (support various transform systems).',
        url: ''
      },
      {
        update: '',
        title: 'Chinese to ㄅㄆㄇㄈ Converter',
        description: 'Convert Chinese characters to ㄅㄆㄇㄈ (Bopomofo).',
        url: ''
      },
    ],
  },
  {
    title: 'Fun Tools ^^',
    indictor: ['bg-sky-300', 'bg-sky-400/75'],
    text: 'group-hover:group-not-[.disabled]:text-sky-300 group-focus:group-not-[.disabled]:text-sky-300',
    border: 'hover:not-[.disabled]:border-sky-300 focus:not-[.disabled]:border-sky-300',
    background: 'hover:not-[.disabled]:bg-sky-400/10 focus:not-[.disabled]:bg-sky-400/10',
    shadow: 'hover:not-[.disabled]:shadow-sky-400/10 focus:not-[.disabled]:shadow-sky-400/10',
    groups: [
      {
        update: '',
        title: 'Random Picker',
        description: 'Randomly pick items from a list.',
        url: ''
      },
      {
        update: '',
        title: 'FPS Reaction Speed Tester',
        description: 'Test your reaction speed in a fast-paced environment.',
        url: ''
      },
    ],
  },
  {
    title: 'You May Also Like! (External Links)',
    indictor: ['bg-slate-300', 'bg-slate-400/75'],
    text: 'group-hover:group-not-[.disabled]:text-slate-300 group-focus:group-not-[.disabled]:text-slate-300',
    border: 'hover:not-[.disabled]:border-slate-300 focus:not-[.disabled]:border-slate-300',
    background: 'hover:not-[.disabled]:bg-slate-400/10 focus:not-[.disabled]:bg-slate-400/10',
    shadow: 'hover:not-[.disabled]:shadow-slate-400/10 focus:not-[.disabled]:shadow-slate-400/10',
    groups: [
      {
        update: '',
        title: 'Our Tech Blog!',
        description: 'Read our latest articles and updates.',
        url: 'https://blog.lusw.dev'
      },
      {
        update: '',
        title: 'SplatoonBot',
        description: 'A bot for Splatoon Players!',
        url: 'https://lusw.dev/splatoon/'
      },
      {
        update: '',
        title: '철도탑승기록',
        description: '(한국)철도 탑승 기록 사이트입니다!',
        url: 'https://kr-metro.lusw.dev/'
      },
      {
        update: '',
        title: '우연히 유년잉',
        description: '我們的韓文歌詞翻譯站!',
        url: 'https://kr.lusw.dev/docs/'
      },
    ],
  },
]