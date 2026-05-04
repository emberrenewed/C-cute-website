# C++ Notebook ✨

> A cute, responsive, beginner-friendly C++ learning website built like a pastel notebook.

[![Made with HTML](https://img.shields.io/badge/HTML-5-ff8fab?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Styled with CSS](https://img.shields.io/badge/CSS-Responsive-b6f0d5?style=for-the-badge&logo=css3&logoColor=222)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-Interactive-fff2a8?style=for-the-badge&logo=javascript&logoColor=222)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![C++ Lessons](https://img.shields.io/badge/C++-Lessons-d4bbfc?style=for-the-badge&logo=cplusplus&logoColor=white)](https://isocpp.org/)

## 🌸 About

**C++ Notebook** is a soft, animated learning website for new C++ students. It explains programming ideas with friendly lessons, colorful examples, progress tracking, bookmarks, syntax-highlighted code, and a hand-drawn notebook style.

The project is fully static, so it can run directly in the browser or be hosted on GitHub Pages.

## ✨ Features

- 📚 **15 beginner C++ lessons** from introduction basics to small projects
- 🔍 **Lesson search** for quickly finding topics
- ✅ **Progress tracker** saved in the browser with `localStorage`
- 🔖 **Bookmarks** for favorite lessons
- 🎨 **Palette drawer** with multiple cute color themes
- 🌙 **Dark mode** with saved preference
- 🔊 **Tiny sound effects** generated with the Web Audio API
- 🎉 **Confetti celebration** when lessons are completed
- 🌸 **Decorative animations** including petals, sparkles, cursor effects, and a mascot
- 💻 **Syntax highlighting** for C++ examples using Prism.js
- 📱 **Responsive layout** for desktop, tablet, and mobile screens

## 📱 Responsive Design

The layout adapts across screen sizes:

- **Desktop:** sidebar lessons + main notebook page
- **Tablet:** tighter grid spacing and smaller lesson panels
- **Mobile:** collapsible sidebar, stacked header, full-width search, and touch-friendly controls
- **Small phones:** reduced spacing and scaled typography for comfortable reading

Main responsive breakpoints are handled in `styles.css` around `1024px`, `820px`, `600px`, and `480px`.

## 🧁 Tech Stack

- **HTML5** for the page structure
- **CSS3** for the custom notebook theme, animations, palettes, and responsive layout
- **Vanilla JavaScript** for lessons, progress, bookmarks, theme state, UI interactions, and effects
- **Tailwind CDN** for utility support
- **Prism.js** for C++ syntax highlighting
- **Google Fonts** for the handwritten/cute typography

## 📂 Project Structure

```text
.
├── index.html      # Main page markup and CDN links
├── styles.css      # Cute theme, layout, animations, and responsive styles
├── app.js          # App logic, progress, bookmarks, theme controls, effects
├── lessons.js      # All C++ lesson content
└── README.md       # Project documentation
```

## 🚀 Run Locally

Because this is a static website, you can open it directly:

```text
index.html
```

Or run a simple local server:

```bash
python -m http.server 5500
```

Then visit:

```text
http://localhost:5500
```

## 🌐 Deploy On GitHub Pages

1. Push the project to GitHub.
2. Open the repository settings.
3. Go to **Pages**.
4. Choose the `main` branch.
5. Choose the root folder `/`.
6. Save and wait for GitHub to publish the site.

Expected GitHub Pages URL:

```text
https://emberrenewed.github.io/C-cute-website/
```

## 🎯 Lessons Included

- Introduction to C++
- Variables & Data Types
- Input and Output
- Operators
- If / Else
- Switch Statements
- Loops
- Functions
- Arrays
- Strings
- Pointers
- Classes and Objects
- OOP: Encapsulation, Inheritance, Polymorphism
- Files
- Mini Projects

## 🪄 Customization

You can quickly personalize the project:

- Edit lesson content in `lessons.js`
- Change colors and palettes in `styles.css`
- Adjust animations and UI behavior in `app.js`
- Update the title, meta description, and footer in `index.html`

## 🤝 Contributing

Cute improvements are welcome:

- Add more C++ lessons
- Improve accessibility
- Add quiz questions
- Add more examples and mini projects
- Polish mobile interactions
- Add screenshots or a live demo link

## 💖 Credits

Website credit shown in the footer:

[Ahmad Muhammad](https://ahmadmuhammet.netlify.app/)

## 📄 License

No license file is included yet. Add a license before allowing public reuse or contributions.
