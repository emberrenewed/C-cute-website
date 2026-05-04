/* =========================================================
   C++ Notebook ✨ — All Lessons
   Each lesson is written like teaching a curious 10-year-old:
   simple words, lots of analogies, sprinkled with emojis.
   ========================================================= */

window.LESSONS = [
  /* ---------- 1. Introduction ---------- */
  {
    id: 'intro',
    emoji: '🌟',
    title: 'Introduction to C++',
    tagline: 'Say hi to your new coding friend! 👋',
    sections: [
      {
        type: 'explain',
        title: '📖 What is C++?',
        body: `
          <p>Imagine you have a super smart pet robot 🤖. The robot only listens
          when you talk in a special language. That language is called <b>C++</b>!</p>
          <p>C++ is a <b>programming language</b> — a way to give very clear instructions
          to a computer so it can do magical things like play games 🎮, run apps 📱,
          or even control rockets 🚀.</p>
          <p>It was made a long time ago (1979) by a kind man named
          <b>Bjarne Stroustrup</b>. He took an older language called C and added
          fun new toys to it — that's why it's called <b>C++</b> (C with extras!).</p>
        `
      },
      {
        type: 'explain',
        title: '🍰 Anatomy of a tiny C++ program',
        body: `
          <p>Every C++ recipe (we call it a <b>program</b>) has a few ingredients:</p>
          <ul>
            <li><span class="kw">#include &lt;iostream&gt;</span> — borrows the magic for typing on screen.</li>
            <li><span class="kw">int main()</span> — the front door 🚪. The computer always starts here.</li>
            <li><span class="kw">{ }</span> — the curly hugs that wrap the recipe steps 💕.</li>
            <li><span class="kw">return 0;</span> — says "all done, everything was okay!"</li>
          </ul>
        `
      },
      {
        type: 'code',
        title: '💡 Your very first program',
        code: `// Hello world program 🌸
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, world! I'm learning C++ 💖";
    return 0;
}`,
        output: `Hello, world! I'm learning C++ 💖`
      },
      {
        type: 'tips',
        title: '🎯 Cute Tips',
        items: [
          'Every line of action ends with a <b>semicolon</b> ; like a tiny full-stop. 🌷',
          'C++ is <b>case sensitive</b> — <span class="kw">main</span> and <span class="kw">Main</span> are different words!',
          'Type slowly and read what you write — the computer is very literal. 🐢'
        ]
      },
      {
        type: 'mistakes',
        title: '❗ Tiny Oopsies to Avoid',
        items: [
          'Forgetting the <b>;</b> at the end of a line. The compiler will be sad 😢.',
          'Writing <span class="kw">Cout</span> instead of <span class="kw">cout</span> — the C must be lowercase.',
          'Not putting <span class="kw">#include &lt;iostream&gt;</span> at the top.'
        ]
      }
    ]
  },

  /* ---------- 2. Variables & Data Types ---------- */
  {
    id: 'variables',
    emoji: '📦',
    title: 'Variables & Data Types',
    tagline: 'Tiny boxes that hold your stuff! 🎁',
    sections: [
      {
        type: 'explain',
        title: '📖 What is a variable?',
        body: `
          <p>A <b>variable</b> is like a cute labeled box 📦 where you keep something
          inside. You can put a number, a letter, or even a yes/no in it.</p>
          <p>Each box needs:</p>
          <ul>
            <li>A <b>type</b> — tells what kind of thing fits inside.</li>
            <li>A <b>name</b> — what you write on the label sticker. 🏷️</li>
            <li>A <b>value</b> — the actual treasure you put in. 💎</li>
          </ul>
        `
      },
      {
        type: 'explain',
        title: '🍭 Common Data Types',
        body: `
          <ul>
            <li><span class="kw">int</span> — whole numbers like 5, -3, 42 🔢</li>
            <li><span class="kw">float</span> / <span class="kw">double</span> — numbers with decimals like 3.14 🍰</li>
            <li><span class="kw">char</span> — a single letter like 'A' or '✿' 🌸</li>
            <li><span class="kw">string</span> — a row of letters like "Hello" 💌</li>
            <li><span class="kw">bool</span> — true or false (like a yes/no toggle) 💡</li>
          </ul>
        `
      },
      {
        type: 'code',
        title: '💡 Example',
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int age = 10;              // a whole number 🎂
    float height = 1.42;       // a decimal number 📏
    char grade = 'A';          // a single letter 💯
    string name = "Luna";      // a word 🌙
    bool isHappy = true;       // yes! 💖

    cout << name << " is " << age << " years old.\\n";
    cout << "Grade: " << grade << ", Happy? " << isHappy;
    return 0;
}`,
        output: `Luna is 10 years old.
Grade: A, Happy? 1`
      },
      {
        type: 'tips',
        title: '🎯 Tips',
        items: [
          'Pick names that <b>describe</b> what\'s inside, like <span class="kw">score</span> not <span class="kw">x</span>. 🌷',
          'Use <span class="kw">double</span> for accurate decimals, <span class="kw">float</span> for smaller ones.',
          '<span class="kw">bool</span> prints 1 for true and 0 for false (the computer is shy 🙈).'
        ]
      },
      {
        type: 'mistakes',
        title: '❗ Common Mistakes',
        items: [
          'Forgetting quotes: <span class="kw">"Luna"</span> for strings, <span class="kw">\'A\'</span> for char.',
          'Starting a name with a number — variables must start with a letter or <span class="kw">_</span>.',
          'Using a <b>reserved word</b> like <span class="kw">int</span> as a variable name. 🚫'
        ]
      }
    ]
  },

  /* ---------- 3. Input / Output ---------- */
  {
    id: 'io',
    emoji: '💬',
    title: 'Input / Output (cin & cout)',
    tagline: 'Let your program talk and listen! 🎤',
    sections: [
      {
        type: 'explain',
        title: '📖 Talking to your program',
        body: `
          <p>Programs are way more fun when they talk back! 🗣️</p>
          <ul>
            <li><span class="kw">cout &lt;&lt;</span> — your program <b>says</b> something on screen.
              (Think: "<b>c</b>haracter <b>out</b>put".)</li>
            <li><span class="kw">cin &gt;&gt;</span> — your program <b>listens</b> for what you type.
              (Think: "<b>c</b>haracter <b>in</b>put".)</li>
            <li>The arrows <span class="kw">&lt;&lt;</span> and <span class="kw">&gt;&gt;</span>
              show which way the data is flowing 🏞️.</li>
          </ul>
        `
      },
      {
        type: 'code',
        title: '💡 A friendly chat',
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    int age;

    cout << "What's your name, cutie? ";
    cin >> name;
    cout << "And your age? ";
    cin >> age;

    cout << "Hi " << name << "! You are " << age << " years old 💕\\n";
    return 0;
}`,
        output: `What's your name, cutie? Mochi
And your age? 9
Hi Mochi! You are 9 years old 💕`
      },
      {
        type: 'tips',
        title: '🎯 Tips',
        items: [
          'Use <span class="kw">endl</span> or <span class="kw">"\\n"</span> to jump to a new line. ⏎',
          'For sentences with spaces use <span class="kw">getline(cin, name)</span>.',
          'You can chain many <span class="kw">&lt;&lt;</span> in one <span class="kw">cout</span>: it\'s like a conga line 💃.'
        ]
      },
      {
        type: 'mistakes',
        title: '❗ Common Mistakes',
        items: [
          'Mixing arrows: <span class="kw">cin &lt;&lt;</span> is wrong! Use <span class="kw">&gt;&gt;</span>.',
          'Forgetting to declare the variable before reading into it.',
          'Using <span class="kw">cin &gt;&gt; name</span> for full names — it stops at the space.'
        ]
      }
    ]
  },

  /* ---------- 4. Operators ---------- */
  {
    id: 'operators',
    emoji: '➕',
    title: 'Operators',
    tagline: 'Tiny math + magic symbols! ✨',
    sections: [
      {
        type: 'explain',
        title: '📖 What are operators?',
        body: `
          <p>Operators are little symbols that <b>do things</b> to your values 🪄.</p>
          <ul>
            <li><b>Arithmetic</b>: <span class="kw">+</span> <span class="kw">-</span> <span class="kw">*</span> <span class="kw">/</span> <span class="kw">%</span> (modulo = remainder)</li>
            <li><b>Comparison</b>: <span class="kw">==</span> <span class="kw">!=</span> <span class="kw">&lt;</span> <span class="kw">&gt;</span> <span class="kw">&lt;=</span> <span class="kw">&gt;=</span></li>
            <li><b>Logical</b>: <span class="kw">&amp;&amp;</span> (and), <span class="kw">||</span> (or), <span class="kw">!</span> (not)</li>
            <li><b>Assignment</b>: <span class="kw">=</span> (give value), <span class="kw">+=</span> <span class="kw">-=</span> <span class="kw">*=</span> <span class="kw">/=</span></li>
          </ul>
        `
      },
      {
        type: 'code',
        title: '💡 Example',
        code: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 3;

    cout << "a + b = " << a + b << "\\n";   // 13
    cout << "a - b = " << a - b << "\\n";   // 7
    cout << "a * b = " << a * b << "\\n";   // 30
    cout << "a / b = " << a / b << "\\n";   // 3 (whole number!)
    cout << "a % b = " << a % b << "\\n";   // 1 (leftover)

    bool friendly = (a > b) && (b > 0);    // true 💕
    cout << "friendly? " << friendly;
    return 0;
}`,
        output: `a + b = 13
a - b = 7
a * b = 30
a / b = 3
a % b = 1
friendly? 1`
      },
      {
        type: 'tips',
        title: '🎯 Tips',
        items: [
          'Dividing two <span class="kw">int</span>s drops the decimals. Use <span class="kw">double</span> if you want 3.33.',
          'Use parentheses <span class="kw">( )</span> to make order super clear 🌟.',
          '<span class="kw">==</span> compares, <span class="kw">=</span> assigns. Two equals = comparing. 💕'
        ]
      },
      {
        type: 'mistakes',
        title: '❗ Common Mistakes',
        items: [
          'Writing <span class="kw">if (a = 5)</span> instead of <span class="kw">if (a == 5)</span>.',
          'Forgetting <span class="kw">%</span> only works on whole numbers (int).',
          'Misreading: <span class="kw">5 / 2</span> is 2 in C++, not 2.5 (when both are int).'
        ]
      }
    ]
  },

  /* ---------- 5. If / Else ---------- */
  {
    id: 'ifelse',
    emoji: '🌈',
    title: 'If / Else',
    tagline: 'Make decisions like a smart cookie! 🍪',
    sections: [
      {
        type: 'explain',
        title: '📖 Choices, choices!',
        body: `
          <p>Sometimes your program needs to choose: "Should I do this OR that?" 🤔</p>
          <p>That\'s when we use <b>if / else</b>!</p>
          <ul>
            <li><span class="kw">if (condition)</span> — run this block <b>only when true</b>.</li>
            <li><span class="kw">else if</span> — try another condition.</li>
            <li><span class="kw">else</span> — what to do when nothing else fits.</li>
          </ul>
          <p>Like: "If it\'s raining ☔ I take an umbrella, else I wear sunglasses 😎."</p>
        `
      },
      {
        type: 'code',
        title: '💡 Example',
        code: `#include <iostream>
using namespace std;

int main() {
    int score;
    cout << "Your test score: ";
    cin >> score;

    if (score >= 90) {
        cout << "Wow! A+ superstar 🌟";
    } else if (score >= 70) {
        cout << "Great job, sweetie! 🍰";
    } else if (score >= 50) {
        cout << "You passed! Keep going 💪";
    } else {
        cout << "It's okay, let's practice together 💖";
    }
    return 0;
}`,
        output: `Your test score: 85
Great job, sweetie! 🍰`
      },
      {
        type: 'tips',
        title: '🎯 Tips',
        items: [
          'Always wrap conditions in <span class="kw">( )</span>.',
          'Curly hugs <span class="kw">{ }</span> are technically optional for one line — but use them anyway! Cleaner 💕.',
          'Order matters! C++ checks conditions top to bottom and stops at the first true one.'
        ]
      },
      {
        type: 'mistakes',
        title: '❗ Common Mistakes',
        items: [
          'Using <span class="kw">=</span> instead of <span class="kw">==</span> in conditions.',
          'Forgetting <span class="kw">else</span> at the end — your program may do nothing.',
          'Indenting wrong so it\'s hard to see what belongs to what.'
        ]
      }
    ]
  },

  /* ---------- 6. Switch ---------- */
  {
    id: 'switch',
    emoji: '🎛️',
    title: 'Switch',
    tagline: 'A nicer way to handle many choices! 🎀',
    sections: [
      {
        type: 'explain',
        title: '📖 The switchboard',
        body: `
          <p>When you have <b>lots</b> of options to check (like 1,2,3,4,5…),
          long if-else chains get tired 😩.</p>
          <p>A <b>switch</b> is like a vending machine 🥤 — push a button (case) and
          out comes the matching snack!</p>
          <ul>
            <li><span class="kw">case 1:</span> — do something for value 1.</li>
            <li><span class="kw">break;</span> — stop here, don\'t fall through. 🚧</li>
            <li><span class="kw">default:</span> — when no case matches.</li>
          </ul>
        `
      },
      {
        type: 'code',
        title: '💡 Example',
        code: `#include <iostream>
using namespace std;

int main() {
    int day;
    cout << "Pick a day (1-7): ";
    cin >> day;

    switch (day) {
        case 1: cout << "Monday 💼";   break;
        case 2: cout << "Tuesday 🌷";  break;
        case 3: cout << "Wednesday 🍦"; break;
        case 4: cout << "Thursday 🌸"; break;
        case 5: cout << "Friday 🎉";   break;
        case 6: cout << "Saturday 🛍️"; break;
        case 7: cout << "Sunday 😴";   break;
        default: cout << "That's not a day, silly! 🙃";
    }
    return 0;
}`,
        output: `Pick a day (1-7): 5
Friday 🎉`
      },
      {
        type: 'tips',
        title: '🎯 Tips',
        items: [
          'Switch only works on whole values: <span class="kw">int</span>, <span class="kw">char</span>, <span class="kw">enum</span>. No floats or strings.',
          'Always end each case with <span class="kw">break;</span> unless you really want fall-through.',
          'Group cases for the same action: <span class="kw">case 1: case 2: cout &lt;&lt; "weekday";</span>'
        ]
      },
      {
        type: 'mistakes',
        title: '❗ Common Mistakes',
        items: [
          'Forgetting <span class="kw">break;</span> — execution slips into the next case 🌪️.',
          'Trying to <span class="kw">switch</span> a <span class="kw">string</span> — not allowed!',
          'Forgetting <span class="kw">default:</span> for unexpected values.'
        ]
      }
    ]
  },

  /* ---------- 7. Loops ---------- */
  {
    id: 'loops',
    emoji: '🔁',
    title: 'Loops (for, while, do-while)',
    tagline: 'Do things again and again — like skipping rope! 🪀',
    sections: [
      {
        type: 'explain',
        title: '📖 Why loops?',
        body: `
          <p>Imagine telling your robot "say hi 100 times!" 🤖💬</p>
          <p>You don\'t want to write <span class="kw">cout &lt;&lt; "hi";</span> a hundred times!
          Loops do it for you 🎀.</p>
          <ul>
            <li><b>for</b> — best when you know how many times. (Like jumping rope 5 times.)</li>
            <li><b>while</b> — keep going while a condition is true. (Like keep singing while happy 🎶.)</li>
            <li><b>do-while</b> — do it at least once, then check.</li>
          </ul>
        `
      },
      {
        type: 'code',
        title: '💡 Example',
        code: `#include <iostream>
using namespace std;

int main() {
    // for loop 🌸
    for (int i = 1; i <= 3; i++) {
        cout << "for hi " << i << "\\n";
    }

    // while loop 💖
    int n = 1;
    while (n <= 3) {
        cout << "while hi " << n << "\\n";
        n++;
    }

    // do-while loop 🍬
    int m = 1;
    do {
        cout << "do hi " << m << "\\n";
        m++;
    } while (m <= 3);
    return 0;
}`,
        output: `for hi 1
for hi 2
for hi 3
while hi 1
while hi 2
while hi 3
do hi 1
do hi 2
do hi 3`
      },
      {
        type: 'tips',
        title: '🎯 Tips',
        items: [
          '<span class="kw">i++</span> means add 1 to <span class="kw">i</span>. <span class="kw">--</span> subtracts 1.',
          'Use <span class="kw">break;</span> to exit a loop early, <span class="kw">continue;</span> to skip to next round.',
          'Always make sure the condition will eventually become false — or you\'ll loop forever! ♾️'
        ]
      },
      {
        type: 'mistakes',
        title: '❗ Common Mistakes',
        items: [
          'Off-by-one: writing <span class="kw">&lt;</span> instead of <span class="kw">&lt;=</span> (or vice versa).',
          'Forgetting to update the counter — infinite loop! 🌀',
          'Using <span class="kw">;</span> right after <span class="kw">for(...)</span> by mistake.'
        ]
      }
    ]
  },

  /* ---------- 8. Functions ---------- */
  {
    id: 'functions',
    emoji: '🧁',
    title: 'Functions',
    tagline: 'Reusable little recipes for your code! 📜',
    sections: [
      {
        type: 'explain',
        title: '📖 What is a function?',
        body: `
          <p>A function is a <b>mini-recipe</b> 🧁 you can use again and again.</p>
          <p>You give it <b>ingredients</b> (parameters), it does work, and may
          <b>return</b> something delicious 🍰.</p>
          <p>Pieces of a function:</p>
          <ul>
            <li><b>Return type</b> — what the function gives back (or <span class="kw">void</span> if nothing).</li>
            <li><b>Name</b> — like the recipe title.</li>
            <li><b>Parameters</b> — the ingredients in <span class="kw">( )</span>.</li>
            <li><b>Body</b> — instructions inside <span class="kw">{ }</span>.</li>
          </ul>
        `
      },
      {
        type: 'code',
        title: '💡 Example',
        code: `#include <iostream>
using namespace std;

// little recipe to add two numbers 🍓
int add(int a, int b) {
    return a + b;
}

// recipe with no return — just says hi 💕
void sayHi(string name) {
    cout << "Hi " << name << "! 🌸\\n";
}

int main() {
    int total = add(3, 4);
    cout << "3 + 4 = " << total << "\\n";

    sayHi("Mia");
    sayHi("Sora");
    return 0;
}`,
        output: `3 + 4 = 7
Hi Mia! 🌸
Hi Sora! 🌸`
      },
      {
        type: 'tips',
        title: '🎯 Tips',
        items: [
          'Use <span class="kw">void</span> when the function doesn\'t return anything.',
          'Functions help you avoid copy-pasting code — DRY: Don\'t Repeat Yourself 💖.',
          'You can call functions inside other functions, like nesting dolls 🎎.'
        ]
      },
      {
        type: 'mistakes',
        title: '❗ Common Mistakes',
        items: [
          'Forgetting <span class="kw">return</span> in a non-<span class="kw">void</span> function.',
          'Wrong parameter types: passing a string when <span class="kw">int</span> was expected.',
          'Defining <span class="kw">main()</span> twice (you only get one front door 🚪).'
        ]
      }
    ]
  },

  /* ---------- 9. Arrays ---------- */
  {
    id: 'arrays',
    emoji: '🍱',
    title: 'Arrays',
    tagline: 'A row of cute little boxes! 📦📦📦',
    sections: [
      {
        type: 'explain',
        title: '📖 What\'s an array?',
        body: `
          <p>Imagine a <b>candy box</b> 🍬 with many slots. Each slot can hold one candy.</p>
          <p>An <b>array</b> is exactly that! A row of variables of the same type, all sharing
          one name. We pick a candy by its <b>index</b> (slot number).</p>
          <p>Important: indexes start at <b>0</b>, not 1! 🌷</p>
        `
      },
      {
        type: 'code',
        title: '💡 Example',
        code: `#include <iostream>
using namespace std;

int main() {
    int scores[5] = {90, 85, 78, 92, 88};

    cout << "First score: " << scores[0] << "\\n"; // 90
    cout << "Last score:  " << scores[4] << "\\n"; // 88

    int total = 0;
    for (int i = 0; i < 5; i++) {
        total += scores[i];
    }
    cout << "Average: " << total / 5;
    return 0;
}`,
        output: `First score: 90
Last score:  88
Average: 86`
      },
      {
        type: 'tips',
        title: '🎯 Tips',
        items: [
          'Loop through arrays with a <span class="kw">for</span> from <span class="kw">0</span> to <span class="kw">size - 1</span>.',
          'Need a flexible-size array? Use <span class="kw">std::vector</span> 🧚.',
          'Arrays of arrays = 2D array, like a tic-tac-toe board ❌⭕.'
        ]
      },
      {
        type: 'mistakes',
        title: '❗ Common Mistakes',
        items: [
          'Going past the end: <span class="kw">scores[5]</span> when size is 5 (slot doesn\'t exist!).',
          'Forgetting indexes start at <b>0</b>.',
          'Mixing types — all candies in the box must be the same flavor 🍭.'
        ]
      }
    ]
  },

  /* ---------- 10. Strings ---------- */
  {
    id: 'strings',
    emoji: '🎀',
    title: 'Strings',
    tagline: 'A string of pretty letter beads! 🪡',
    sections: [
      {
        type: 'explain',
        title: '📖 What is a string?',
        body: `
          <p>A <b>string</b> is a <b>line of letters</b> like a beaded bracelet 💎.</p>
          <p>In C++ we use <span class="kw">#include &lt;string&gt;</span> and the
          <span class="kw">string</span> type to make life easy.</p>
          <p>Strings have powers (called <b>methods</b>) like:</p>
          <ul>
            <li><span class="kw">.length()</span> — how many letters?</li>
            <li><span class="kw">.substr(start, n)</span> — cut out a piece.</li>
            <li><span class="kw">+</span> — glue two strings together.</li>
          </ul>
        `
      },
      {
        type: 'code',
        title: '💡 Example',
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string first = "Hello";
    string second = "Cutie";

    string greet = first + ", " + second + "! 💖";
    cout << greet << "\\n";

    cout << "Length: " << greet.length() << "\\n";
    cout << "First letter: " << greet[0] << "\\n";
    cout << "Slice: " << greet.substr(7, 5) << "\\n";
    return 0;
}`,
        output: `Hello, Cutie! 💖
Length: 14
First letter: H
Slice: Cutie`
      },
      {
        type: 'tips',
        title: '🎯 Tips',
        items: [
          'You can index strings just like arrays: <span class="kw">name[0]</span>.',
          'Use <span class="kw">getline(cin, name)</span> for input with spaces.',
          '<span class="kw">+=</span> adds to a string: <span class="kw">name += "!";</span>'
        ]
      },
      {
        type: 'mistakes',
        title: '❗ Common Mistakes',
        items: [
          'Forgetting <span class="kw">#include &lt;string&gt;</span>.',
          'Mixing <span class="kw">char</span> (\'A\') with <span class="kw">string</span> ("A").',
          'Going past the last letter — out of bounds! 🚪'
        ]
      }
    ]
  },

  /* ---------- 11. Pointers ---------- */
  {
    id: 'pointers',
    emoji: '🧭',
    title: 'Pointers (the gentle intro)',
    tagline: 'Tiny treasure maps to your data! 🗺️',
    sections: [
      {
        type: 'explain',
        title: '📖 What\'s a pointer?',
        body: `
          <p>Imagine your variable lives in a tiny <b>house</b> 🏠 in computer memory.
          Every house has an <b>address</b>.</p>
          <p>A <b>pointer</b> is a special note that holds the <b>address</b> of a house —
          not the thing inside, but where to find it 📮.</p>
          <ul>
            <li><span class="kw">int* p</span> — a pointer that points to an int.</li>
            <li><span class="kw">&amp;x</span> — gives the address of <span class="kw">x</span>. (Like reading the house number.)</li>
            <li><span class="kw">*p</span> — peeks inside the house the pointer points to.</li>
          </ul>
        `
      },
      {
        type: 'code',
        title: '💡 Example',
        code: `#include <iostream>
using namespace std;

int main() {
    int candy = 5;
    int* p = &candy;     // p remembers candy's address 📍

    cout << "candy value:    " << candy << "\\n";
    cout << "candy address:  " << &candy << "\\n";
    cout << "p (address):    " << p << "\\n";
    cout << "*p (peek inside): " << *p << "\\n";

    *p = 10;             // change candy through the map!
    cout << "candy now: " << candy;
    return 0;
}`,
        output: `candy value:    5
candy address:  0x7ffeefb...
p (address):    0x7ffeefb...
*p (peek inside): 5
candy now: 10`
      },
      {
        type: 'tips',
        title: '🎯 Tips',
        items: [
          'Always initialize a pointer — random addresses are scary 👻.',
          'Use <span class="kw">nullptr</span> to mean "doesn\'t point anywhere yet".',
          'Pointers are powerful but tricky — practice slowly with safe examples 🐾.'
        ]
      },
      {
        type: 'mistakes',
        title: '❗ Common Mistakes',
        items: [
          'Dereferencing a null/uninitialized pointer 💥.',
          'Confusing <span class="kw">*p</span> (the value) with <span class="kw">p</span> (the address).',
          'Forgetting that changing <span class="kw">*p</span> changes the original variable.'
        ]
      }
    ]
  },

  /* ---------- 12. OOP: Classes & Objects ---------- */
  {
    id: 'oop-classes',
    emoji: '🦄',
    title: 'OOP: Classes & Objects',
    tagline: 'Make your own cute creatures! 🐰',
    sections: [
      {
        type: 'explain',
        title: '📖 The big idea',
        body: `
          <p><b>OOP</b> stands for <b>Object-Oriented Programming</b>.</p>
          <p>Think of a <b>class</b> as a cookie cutter 🍪 — a blueprint.
          And an <b>object</b> is the actual cookie you bake from it.</p>
          <p>A class can have:</p>
          <ul>
            <li><b>Attributes</b> (data) — like <span class="kw">name</span>, <span class="kw">color</span>.</li>
            <li><b>Methods</b> (actions) — like <span class="kw">jump()</span>, <span class="kw">sing()</span>.</li>
          </ul>
        `
      },
      {
        type: 'code',
        title: '💡 Example',
        code: `#include <iostream>
#include <string>
using namespace std;

class Bunny {
public:
    string name;
    string color;

    void hop() {
        cout << name << " the " << color << " bunny hops! 🐰\\n";
    }
};

int main() {
    Bunny mochi;
    mochi.name = "Mochi";
    mochi.color = "pink";
    mochi.hop();

    Bunny luna;
    luna.name = "Luna";
    luna.color = "lavender";
    luna.hop();
    return 0;
}`,
        output: `Mochi the pink bunny hops! 🐰
Luna the lavender bunny hops! 🐰`
      },
      {
        type: 'tips',
        title: '🎯 Tips',
        items: [
          'Class names usually start with a <b>Capital Letter</b>.',
          'Don\'t forget the semicolon <span class="kw">;</span> after the class\'s closing <span class="kw">}</span>.',
          'A <b>constructor</b> sets up the object when it\'s created. (Like name-tagging the bunny at birth 🎀.)'
        ]
      },
      {
        type: 'mistakes',
        title: '❗ Common Mistakes',
        items: [
          'Forgetting <span class="kw">public:</span> — by default, members are private!',
          'Missing <span class="kw">;</span> after class definition.',
          'Using <span class="kw">.</span> for pointers — should be <span class="kw">-&gt;</span>.'
        ]
      }
    ]
  },

  /* ---------- 13. Encapsulation / Inheritance / Polymorphism ---------- */
  {
    id: 'oop-eip',
    emoji: '🌷',
    title: 'OOP: Encapsulation, Inheritance, Polymorphism',
    tagline: 'The 3 magical superpowers of OOP! ✨',
    sections: [
      {
        type: 'explain',
        title: '🔒 Encapsulation — keep secrets safe',
        body: `
          <p>We hide some attributes so only the class can change them. It keeps things
          neat and prevents accidents 💕.</p>
          <ul>
            <li><span class="kw">private:</span> — only the class can touch.</li>
            <li><span class="kw">public:</span> — anyone can use.</li>
            <li>Use <b>getter</b> and <b>setter</b> methods to control access.</li>
          </ul>
        `
      },
      {
        type: 'explain',
        title: '👨‍👩‍👧 Inheritance — pass things down',
        body: `
          <p>A class can <b>inherit</b> from another. Like a child bunny inheriting
          fluffy ears from a parent! 🐰</p>
          <p><span class="kw">class Cat : public Animal { ... }</span></p>
        `
      },
      {
        type: 'explain',
        title: '🎭 Polymorphism — many shapes',
        body: `
          <p>Same method name, different behaviors. A <span class="kw">speak()</span>
          on a Cat says "meow", on a Dog says "woof!". 🐱🐶</p>
          <p>Use <span class="kw">virtual</span> in the base class and <span class="kw">override</span>
          in children.</p>
        `
      },
      {
        type: 'code',
        title: '💡 Big example',
        code: `#include <iostream>
#include <string>
using namespace std;

class Animal {
protected:
    string name;
public:
    Animal(string n) : name(n) {}
    virtual void speak() {
        cout << name << " makes a sound 🎵\\n";
    }
};

class Cat : public Animal {
public:
    Cat(string n) : Animal(n) {}
    void speak() override {
        cout << name << " says meow 🐱\\n";
    }
};

class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}
    void speak() override {
        cout << name << " says woof 🐶\\n";
    }
};

int main() {
    Animal* pets[2] = { new Cat("Mochi"), new Dog("Biscuit") };
    for (int i = 0; i < 2; i++) pets[i]->speak();
    return 0;
}`,
        output: `Mochi says meow 🐱
Biscuit says woof 🐶`
      },
      {
        type: 'tips',
        title: '🎯 Tips',
        items: [
          'Use <span class="kw">protected</span> so children can use the field but outsiders can\'t.',
          'Always mark base methods <span class="kw">virtual</span> when you expect to override.',
          'Polymorphism shines when you store different objects in one container ✨.'
        ]
      },
      {
        type: 'mistakes',
        title: '❗ Common Mistakes',
        items: [
          'Forgetting <span class="kw">virtual</span> — the wrong method runs.',
          'Public attributes when they should be private (loss of encapsulation).',
          'Not using initializer list for parent constructor.'
        ]
      }
    ]
  },

  /* ---------- 14. File Handling ---------- */
  {
    id: 'files',
    emoji: '📂',
    title: 'File Handling',
    tagline: 'Save and read your secret diary! 📔',
    sections: [
      {
        type: 'explain',
        title: '📖 Why file handling?',
        body: `
          <p>Sometimes we want to <b>remember</b> things even after the program closes.
          That\'s where files come in 📔💕.</p>
          <p>Use <span class="kw">#include &lt;fstream&gt;</span>:</p>
          <ul>
            <li><span class="kw">ofstream</span> — write to a file (output).</li>
            <li><span class="kw">ifstream</span> — read from a file (input).</li>
            <li><span class="kw">fstream</span> — both!</li>
          </ul>
        `
      },
      {
        type: 'code',
        title: '💡 Example',
        code: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // write to a file ✏️
    ofstream out("diary.txt");
    out << "Today I learned C++ files! 💖\\n";
    out << "I am so proud of myself 🌟\\n";
    out.close();

    // read from a file 📖
    ifstream in("diary.txt");
    string line;
    while (getline(in, line)) {
        cout << line << "\\n";
    }
    in.close();
    return 0;
}`,
        output: `Today I learned C++ files! 💖
I am so proud of myself 🌟`
      },
      {
        type: 'tips',
        title: '🎯 Tips',
        items: [
          'Always <span class="kw">.close()</span> the file when finished. 🔒',
          'Use <span class="kw">getline</span> to read line by line.',
          'Check <span class="kw">if (in.is_open())</span> before reading.'
        ]
      },
      {
        type: 'mistakes',
        title: '❗ Common Mistakes',
        items: [
          'Forgetting to include <span class="kw">&lt;fstream&gt;</span>.',
          'Trying to read a file that doesn\'t exist.',
          'Opening for writing — it overwrites the file unless you use <span class="kw">ios::app</span>!'
        ]
      }
    ]
  },

  /* ---------- 15. Mini Projects ---------- */
  {
    id: 'projects',
    emoji: '🎁',
    title: 'Mini Projects',
    tagline: 'Now let\'s build cute things together! 💪',
    sections: [
      {
        type: 'explain',
        title: '🌟 Project 1 — Magic Calculator',
        body: `
          <p>A calculator that does <span class="kw">+ - * /</span> and tells the user
          how cool they are 💕.</p>
        `
      },
      {
        type: 'code',
        title: '💡 Code',
        code: `#include <iostream>
using namespace std;

int main() {
    double a, b;
    char op;
    cout << "Enter num op num (e.g. 3 + 4): ";
    cin >> a >> op >> b;

    switch (op) {
        case '+': cout << a + b; break;
        case '-': cout << a - b; break;
        case '*': cout << a * b; break;
        case '/':
            if (b != 0) cout << a / b;
            else cout << "no dividing by zero, cutie! 🚫";
            break;
        default: cout << "unknown op 🙈";
    }
    cout << "\\nyou rock! 🌟";
    return 0;
}`,
        output: `Enter num op num (e.g. 3 + 4): 8 * 5
40
you rock! 🌟`
      },
      {
        type: 'explain',
        title: '🌷 Project 2 — Number Guessing Game',
        body: `
          <p>The computer thinks of a number 1–10 and you try to guess it! 🎲</p>
        `
      },
      {
        type: 'code',
        title: '💡 Code',
        code: `#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));
    int secret = rand() % 10 + 1;
    int guess, tries = 0;

    cout << "Guess my number 1-10! 🌸\\n";
    do {
        cout << "your guess: ";
        cin >> guess;
        tries++;
        if (guess < secret) cout << "too small 🐣\\n";
        else if (guess > secret) cout << "too big 🐘\\n";
    } while (guess != secret);

    cout << "yay! you got it in " << tries << " tries! 🎉";
    return 0;
}`,
        output: `Guess my number 1-10! 🌸
your guess: 5
too small 🐣
your guess: 8
too big 🐘
your guess: 7
yay! you got it in 3 tries! 🎉`
      },
      {
        type: 'explain',
        title: '🎀 Project 3 — Cute To-Do List',
        body: `
          <p>Use a <span class="kw">vector&lt;string&gt;</span> to keep tasks!
          Add, show, and check them off 💕.</p>
        `
      },
      {
        type: 'code',
        title: '💡 Code',
        code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    vector<string> tasks;
    int choice;

    while (true) {
        cout << "\\n1) add  2) show  3) quit: ";
        cin >> choice;
        cin.ignore();

        if (choice == 1) {
            string t;
            cout << "what to do? ";
            getline(cin, t);
            tasks.push_back(t);
            cout << "added! 🌷\\n";
        } else if (choice == 2) {
            cout << "your todo list 📝\\n";
            for (int i = 0; i < tasks.size(); i++)
                cout << " " << (i+1) << ". " << tasks[i] << "\\n";
        } else break;
    }
    cout << "bye-bye 💖";
    return 0;
}`,
        output: `1) add  2) show  3) quit: 1
what to do? buy stickers
added! 🌷
1) add  2) show  3) quit: 2
your todo list 📝
 1. buy stickers
1) add  2) show  3) quit: 3
bye-bye 💖`
      },
      {
        type: 'tips',
        title: '🎯 Tips',
        items: [
          'Try changing the projects — add new options, change colors of messages! 💕',
          'Save your favorite project to a file using <span class="kw">fstream</span>.',
          'Show your friends! Coding is way more fun shared 🌸.'
        ]
      },
      {
        type: 'mistakes',
        title: '❗ Common Mistakes',
        items: [
          'Forgetting <span class="kw">cin.ignore()</span> before <span class="kw">getline</span>.',
          'Infinite loops — always have a way to quit.',
          'Not testing edge cases like empty lists or zero input.'
        ]
      }
    ]
  }
];
