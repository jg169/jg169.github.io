class TerminalPortfolio {
    constructor() {
        this.output = document.getElementById('output');
        this.input = document.getElementById('command-input');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentPath = '~';

        this.commands = {
            help: this.showHelp.bind(this),
            about: this.showAbout.bind(this),
            skills: this.showSkills.bind(this),
            experience: this.showExperience.bind(this),
            projects: this.showProjects.bind(this),
            education: this.showEducation.bind(this),
            contact: this.showContact.bind(this),
            links: this.showLinks.bind(this),
            clear: this.clearTerminal.bind(this),
            whoami: this.whoami.bind(this),
            ls: this.listDirectory.bind(this),
            cat: this.catFile.bind(this),
            pwd: this.showPath.bind(this),
            date: this.showDate.bind(this),
            weather: this.showWeather.bind(this),
            joke: this.tellJoke.bind(this),
            matrix: this.matrixMode.bind(this),
            coffee: this.getCoffee.bind(this),
            sudo: this.sudoCommand.bind(this)
        };

        this.funnyComments = [
            "// Compiling... just kidding, it's JavaScript lol",
            "// Loading with the speed of a blockchain transaction...",
            "// This code is more stable than my sleep schedule",
            "// Error 404: Social life not found",
            "// Powered by Stack Overflow and prayer",
            "// This terminal is now self-aware... hopefully friendly",
            "// Processing... please don't unplug me "
        ];

        this.init();
        this.initTicker();
    }

    //ticker
    initTicker() {
        // Dynamic ticker updates
        setInterval(() => {
            this.updateTickerValues();
        }, 10000); // Update every 10 seconds
    }

    updateTickerValues() {
        const ticker = document.getElementById('ticker');
        const items = ticker.querySelectorAll('.ticker-item');

        items.forEach(item => {
            const symbol = item.textContent.split(' ')[0];
            const isUp = Math.random() > 0.3; // 70% chance of being up
            const change = (Math.random() * 10).toFixed(1);

            // Special cases for some stocks
            let finalChange = change;
            if (symbol === 'BANKING ') finalChange = (Math.random() * 500 + 200).toFixed(1);
            if (symbol === 'STRESSLVL') finalChange = (Math.random() * 20).toFixed(1);
            if (symbol === 'DEBUGSKILL') finalChange = (Math.random() * 2).toFixed(1);
            if (symbol === 'NYUGPA') finalChange = '3.867';

            const arrow = isUp ? '↑' : '↓';
            const colorClass = isUp ? 'up' : 'down';

            // Special handling for certain stocks that should behave differently
            if (symbol === 'VIBES.NYC' || symbol === 'COFFEE.FUEL' || symbol === 'JPMC.EXP') {
                item.innerHTML = `${symbol} <span class="up">↑ ${finalChange}%</span>`;
            } else if (symbol === 'STRESS.LVL' || symbol === 'PROCRASTN8') {
                item.innerHTML = `${symbol} <span class="down">↓ ${finalChange}%</span>`;
            } else {
                item.innerHTML = `${symbol} <span class="${colorClass}">${arrow} ${finalChange}%</span>`;
            }
        });
    }

    init() {
        this.input.addEventListener('keydown', this.handleInput.bind(this));
        this.input.focus();

        // Add some startup flair
        setTimeout(() => {
            this.typewriter("System initialized successfully! 🚀", 50);
        }, 1000);
    }

    handleInput(event) {
        if (event.key === 'Enter') {
            const command = this.input.value.trim();
            if (command) {
                this.executeCommand(command);
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
            }
            this.input.value = '';
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.commandHistory[this.historyIndex];
            }
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.input.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                this.input.value = '';
            }
        }
    }

    executeCommand(command) {
        this.addLine(`<span class="prompt">jonathan@portfolio:${this.currentPath}$</span> ${command}`);

        const [cmd, ...args] = command.toLowerCase().split(' ');

        if (this.commands[cmd]) {
            this.commands[cmd](args);
        } else {
            this.addOutput(`Command not found: ${cmd}`);
            this.addOutput(`<span class="comment">${this.getRandomComment()}</span>`);
            this.addOutput('Type "help" to see available commands.');
        }
    }

    addLine(content) {
        const div = document.createElement('div');
        div.className = 'line';
        div.innerHTML = content;
        this.output.appendChild(div);
        this.scrollToBottom();
    }

    addOutput(content) {
        const div = document.createElement('div');
        div.className = 'response';
        div.innerHTML = content;
        this.output.appendChild(div);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.output.parentElement.scrollTop = this.output.parentElement.scrollHeight;
    }

    getRandomComment() {
        return this.funnyComments[Math.floor(Math.random() * this.funnyComments.length)];
    }

    typewriter(text, speed = 30) {
        let i = 0;
        const div = document.createElement('div');
        div.className = 'response typing';
        this.output.appendChild(div);

        const timer = setInterval(() => {
            div.innerHTML = text.slice(0, i) + (i === text.length ? '' : '|');
            i++;
            if (i > text.length) {
                clearInterval(timer);
                div.classList.remove('typing');
            }
        }, speed);

        this.scrollToBottom();
    }

    showHelp() {
        const helpText = `
Available Commands:
<span class="link">about</span>      - Learn more about me <br>
<span class="link">skills</span>     - View my technical skills <br>
<span class="link">experience</span> - Check out my work experience <br>
<span class="link">projects</span>   - See my projects and awards I got <br>
<span class="link">education</span>  - My educational background <br>
<span class="link">contact</span>    - Get in touch with me <br>
<span class="link">links</span>      - My social media and websites <br>
<span class="link">clear</span>      - Clear the terminal <br>
<span class="link">whoami</span>     - Display current user info <br>
<span class="link">ls</span>         - List directory contents <br>
<span class="link">cat</span>        - Display file contents <br>
<span class="link">pwd</span>        - Show current directory <br>
<span class="link">date</span>       - Show current date and time <br>
<span class="link">coffee</span>     - Get some virtual coffee ☕ <br>
<span class="link">joke</span>       - Hear a programming joke <br>
<span class="link">matrix</span>     - Enter the Matrix (warning: cool) <br>

<span class="comment">${this.getRandomComment()}</span>
        `;
        this.addOutput(helpText);
    }

    showAbout() {
        this.addOutput('Fetching personal data...');
        this.addOutput(`<span class="comment">${this.getRandomComment()}</span>`);

        setTimeout(() => {
            const about = `
    About Jonathan:
    <br><br>
    🎓 Attended: Courant Institute of Mathematics and Stern School of Business @ NYU <br>
    🎓 Double Major: Computer Science & Business Technology Entrepreneurship <br>
    💼 Former JP Morgan Summer Analyst in Commercial Investment Banking<br>
    🔬 Applied Computer Science Researcher with published work<br>
    🚀 Entrepreneur & Founder of multiple student initiatives<br>
    📊 Data Science enthusiast with experience in ML and AI<br>
    <br>
    I'm passionate about the intersection of technology and business,<br>
    with hands-on experience in fintech, data analytics, and startup development.<br>
    Currently based in New York, originally from the Bay Area.<br>
    <br>
    <span class="comment">// Fun fact: I've analyzed $1B+ worth of trades and still can't predict the stock market 📈</span>
            `;
            this.addOutput(about);
        }, 1500);
    }

    showSkills() {
        this.addOutput('Loading skill tree...');
        this.addOutput(`<span class="comment">// Calculating years of Stack Overflow dependency...</span>`);

        setTimeout(() => {
            const skills = `
    Technical Skills:
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    <br>
    <strong>Technical Skills:</strong><br>
    - Data Analytics<br>
    - Statistical Analysis<br>
    - Tableau<br>
    - PostgreSQL<br>
    - Python<br>
    - Jupyter Notebook<br>
    - Java<br>
    - C<br>
    - MS Office<br>
    - PowerBI<br>
    <br>
    <strong>General Skills:</strong><br>
    - Google Product Management Certified<br>
    - Agile<br>
    - Scrum<br>
    - Jira<br>
    - GSuite<br>
    - Market Research<br>
    - Competitive Analysis<br>
    - Consulting<br>
    <br>
    Programming Languages:
    Python         <br>
    Java           <br>
    C              <br>
    SQL            <br>
    <br>
    <span class="comment">// I'm also tourist-phrasebook level fluent in file hexdumps</span>
            `;
            this.addOutput(skills);
        }, 2000);
    }

    showExperience() {
        this.addOutput('Accessing work history database...');
        this.addOutput(`<span class="comment">${this.getRandomComment()}</span>`);

        setTimeout(() => {
            const experience = `
    Professional Experience:
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    <br>
    <strong>🏦 J.P. MORGAN COMMERCIAL INVESTMENT BANK</strong> - New York, NY<br>
    <strong>SUMMER ANALYST</strong> | June 2024 - August 2024<br>
    - Successfully completed a job simulation focused on analyzing and auditing business processes for regulatory compliance and efficiency<br>
    - Tested automated data workflow, designed process flowchart, analyzed key activities, decision points, stakeholders to enhance clarity<br>
    - Investigated processes identifying 2+ risks while interfacing departments in UK and HK, uncovered potential areas for improvement<br>
    - Executed in-depth review of 100+ trades/assets worth $1 Billion+, simultaneously worked on 2 distinct projects, reviewed trade records<br>
    <br>
    <strong>🔬 FUNDED APPLIED COMPUTER SCIENCE RESEARCH AT NYU</strong> - New York, NY<br>
    <strong>Independent Student Researcher</strong> | November 2023 - May 2024<br>
    - Successfully secured a competitive $350 DURF grant for computer science research through effective communication and project planning<br>
    - Analyzed and forecasted financial needs throughout the length of the project accounting for ambiguous and changing costs<br>
    - Investigated the evolution of digital public discourse sentiments with large language model enabled methodologies / data-based modeling<br>
    - Researched segmented consumer persona sentiments for demand forecasting with the reasoning agent frameworks LLamaIndex<br>
    - Published abstract in The Inquiry and presented findings at the New York Undergraduate Research Conference, paper in progress<br>
    <br>
    <strong>🔬 APPLIED COMPUTER SCIENCE RESEARCH AT NYU</strong> - New York, NY<br>
    <strong>Research Assistant</strong> | May 2023 - September 2023<br>
    - Developed optimized embeddings solution for machine learning based semantic matching of multi-channel media of images, text, audio<br>
    - Devised 2 solutions for concurrent multi-media data feed processing with Langchain, Mozilla Deepspeech, and Google Cloud Vision<br>
    - Prototyped and implemented user-friendly GUI frontend for data collection dashboard for A/B testing with Javascript, NextJS, HTML<br>
    - Researched cost-efficient data management architecture and conceptualized human-comprehensible and auditable AI data workflows<br>
    <br>
    <strong>📊 DATA SCIENCE RESEARCH WITH NYU STERN PROGRAM FOR UNDERGRADUATE RESEARCH (SPUR)</strong> - New York, NY<br>
    <strong>Research Assistant</strong> | October 2022 - April 2023<br>
    - Synthesized 22+ NYC transportation, infrastructure, and public health datasets with Socrata Open Data, PostgreSQL, Jupyter Notebook<br>
    - Analyzed quantitative data from OpenWeather API and Meteostat API using Python; data visualization with: Pandas, Folium, Mapbox<br>
    - Developed solutions to cross-reference geocode data and time series data for infrastructure safety insights and analyze/predict problems<br>
    - Presented analysis and data driven recommendations at Open Data Week to public, NY State senators, Office of Information & Technology<br>
    <br>
    <strong>💼 UPROLINKS</strong> - Boston, MA<br>
    <strong>Business Development Head Intern</strong> | July 2021 - August 2022<br>
    - Conducted competitive analysis research, analyzed 12 industry business models; produced market research reports for new-market entry<br>
    - Partnered with engineering team to create educational software for ~30 end-users; liaised with Immigrant Family Services Institute<br>
    - Led intern development project, managed 4 interns with Agile development, facilitated weekly intern Scrum meetings as product owner<br>
    - Created and presented a product vision and value-add slidedeck to major publishing firms, resulting in potential go-to-market funding deal<br>
    <br>
    <span class="comment">// Plot twist: I actually enjoyed writing reports 📊</span>
            `;
            this.addOutput(experience);
        }, 2000);
    }

    showProjects() {
        this.addOutput('Compiling project portfolio...');
        this.addOutput(`<span class="comment">// Warning: May contain traces of caffeine and late nights</span>`);

        setTimeout(() => {
            const projects = `
    Leadership Experience & Projects:
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    <br>
    <strong>🚀 COMMUNIL PROJECT</strong> - New York, NY<br>
    <strong>Founder/Student Entrepreneur</strong> | September 2021 - May 2024<br>
    - Successfully pitched analytics focused digital-analog social media to competitive NYU Prototyping fund; received financial backing<br>
    - Orchestrated customer research initiative, conducted 100+ user interviews on beachhead markets resulting in 20+ peer referrals<br>
    - Presented deliverables with technical updates to fund managers, donors, and investors; achieved target business goals; pivoted accordingly<br>
    - Problem-solve technical prototyping obstacles; utilized Google AppSheet and HTML/CSS with launch roadmap for Android and iOS<br>
    <br>
    <strong>🪙 BLOCKCHAIN AND FINTECH AT NYU STERN (NYU B&S)</strong> - New York, NY<br>
    <strong>Executive Board Member</strong> | February 2022 - January 2023<br>
    - Managed administrative tasks and event marketing to over 1000+ students, leading to new 130+ member growth and strong engagement<br>
    - Implemented project management procedures with Atlassian software; facilitated events with Binance, Paypal, JP Morgan Onyx<br>
    - Researched proof methods and rollup protocols; contributed to student newsletter on Web3; developed NFT club membership badges<br>
    <br>
    <strong>🏆 Awards & Recognition:</strong><br>
    - 2022 PWC Challenge Case Competition Winner<br>
    - NYU Prototyping Fund Grant Winner<br>
    - NYU Data Science Meet Winner<br>
    - TedX Speaker<br>
    <br>
    <span class="comment">// Side effect: Now I see APIs everywhere I look 👁️</span>
            `;
            this.addOutput(projects);
        }, 2500);
    }

    showEducation() {
        this.addOutput('Retrieving academic records...');
        this.addOutput(`<span class="comment">// GPA loading... please don't judge 📚</span>`);

        setTimeout(() => {
            const education = `
    Education:
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    <br>
    <strong>🎓 NEW YORK UNIVERSITY</strong><br>
    <strong>LEONARD N. STERN SCHOOL OF BUSINESS AND COURANT INSTITUTE OF MATHEMATICAL SCIENCES</strong><br>
    New York, NY | <strong>EXPECTED MAY 2025</strong><br>
    <br>
    <strong>Computer Science and Bachelor of Science in Business, Technology, and Entrepreneurship (BTE) (Double Major) </strong><br>
    - GPA: 3.873/4.00 | Honors Thesis Program | Top 10% | MAGNA CUM LAUDE | Dean's List | Founder's Day Award <br>
    - SAT: 1540/1600; SAT Physics: 800/800<br>
    - Honors Thesis: Investigating Practical Implementations of AI/ML Automation Technologies in Real Organizational Contexts
    <br>
    <strong>📚 Relevant Coursework:</strong><br>
    - Statistics for Business with Regression<br>
    - Algorithms<br>
    - Information Technology<br>
    - Economics of Global Business<br>
    - Managerial Accounting<br>
    - Financial Accounting<br>
    - Management and Organizations<br>
    - Discrete Math<br>
    - Artificial Intelligence<br>
    - Linear Algebra<br>
    - Wharton Online: Fintech<br>
    <br>
    <strong>🏫 BHS </strong> <br>
    MAY 2021<br>
    <br>
    <span class="comment">// Pro tip: Philosophical walks with friends is not listed as a course but should be 📖☕</span>
            `;
            this.addOutput(education);
        }, 1800);
    }

    showContact() {
        this.addOutput('Establishing secure connection...');
        this.addOutput(`<span class="comment">// Encryption level: Friendship 🤝</span>`);

        setTimeout(() => {
            const contact = `
    Contact Information:
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    <br>
    📧 <strong>Email:</strong> JG6911@STERN.NYU.EDU<br>
    📱 <strong>Phone:</strong> [ Inquire ] <br>
    📍 <strong>Location:</strong> New York, NY<br>
    <br>
    <strong>Best ways to reach me:</strong><br>
    - Email for professional inquiries<br>
    - LinkedIn for networking<br>
    - Phone for urgent matters (but please don't call at 3 AM)<br>
    <br>
    <strong>Response time:</strong> Usually within 24 hours<br>
    (Unless I'm debugging, then it might be 24 months)<br>
    <br>
    <span class="comment">// I promise I'm more responsive than Internet Explorer 🐌</span>
            `;
            this.addOutput(contact);
        }, 1500);
    }

    showLinks() {
        this.addOutput('Fetching social media presence...');
        this.addOutput(`<span class="comment">// Loading professional internet identity...</span>`);

        setTimeout(() => {
            const links = `
My Links & Social Media:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔗 Professional:
   <span class="link" onclick="window.open('https://www.linkedin.com/in/-jonathangao/', '_blank')">LinkedIn Profile</span>

🌐 Personal Websites:
   <span class="link" onclick="window.open('#', '_blank')">Personal Portfolio Site</span>
   <span class="link" onclick="window.open('#', '_blank')">Project Showcase</span>

💼 Professional Portfolio:
   <span class="link" onclick="window.open('#', '_blank')">Business Portfolio</span>

🚀 GitHub:
   <span class="link" onclick="window.open('https://github.com/jg169', '_blank')">Code Repository</span>

Note: Click on any link to open in a new tab!

<span class="comment">// Warning: My GitHub contribution graph looks like a very sad lawn right now 🌱</span>
            `;
            this.addOutput(links);
        }, 1200);
    }

    clearTerminal() {
        this.output.innerHTML = '';
        this.addOutput('Terminal cleared! ✨');
        this.addOutput(`<span class="comment">${this.getRandomComment()}</span>`);
    }

    whoami() {
        const responses = [
            "You are jonathan, but more importantly, you're awesome! 🌟",
            "jonathan - A human who speaks fluent JavaScript and broken English",
            "User: jonathan | Status: Up | Mood: Optimistic | Bugs: Probably many",
            "jonathan - Professional code wrangler and coffee consumer"
        ];
        this.addOutput(responses[Math.floor(Math.random() * responses.length)]);
        this.addOutput(`<span class="comment">// Identity crisis resolved ✅</span>`);
    }

    listDirectory() {
        this.addOutput('Listing directory contents...');
        setTimeout(() => {
            const contents = `
📁 about.txt
📁 skills.json
📁 experience.md
📁 projects/
📁 education.pdf
📁 contact.vcf
📁 coffee_recipes.txt
📁 random_thoughts.log
📁 backup_plans.zip

<span class="comment">// Use 'cat <filename>' to view file contents</span>
<span class="comment">// Warning: coffee_recipes.txt is classified information ☕</span>
            `;
            this.addOutput(contents);
        }, 800);
    }

    catFile(args) {
        if (args.length === 0) {
            this.addOutput('Usage: cat <filename>');
            return;
        }

        const file = args[0];
        const files = {
            'coffee_recipes.txt': 'CLASSIFIED: Level 5 Coffee Security Clearance Required ☕🔒',
            'random_thoughts.log': 'Why do they call it debugging when bugs are features? 🐛\nTodo: Learn to cook something other than ramen\nNote: Rubber duck is my best debugging partner',
            'backup_plans.zip': 'Plan A: Become successful developer\nPlan B: Professional video game tester\nPlan C: Open a coffee shop that only plays lo-fi hip hop',
            'about.txt': 'Jonathan'
        };

        if (files[file]) {
            this.addOutput(files[file]);
        } else {
            this.addOutput(`cat: ${file}: No such file or directory`);
            this.addOutput(`<span class="comment">// Maybe try 'ls' to see available files?</span>`);
        }
    }

    showPath() {
        this.addOutput(`/home/jonathan${this.currentPath}`);
    }

    showDate() {
        const now = new Date();
        this.addOutput(now.toString());
        this.addOutput(`<span class="comment">// Time flies when you're having fun (and debugging) 🕒</span>`);
    }

    showWeather() {
        const weathers = [
            "☀️ Sunny with a chance of productivity",
            "🌧️ Rainy - perfect coding weather",
            "❄️ Snow - hot chocolate and code compilation weather",
            "⛅ Cloudy with scattered semicolons",
            "🌩️ Stormy - like my relationship with CSS"
        ];
        this.addOutput('Checking weather...');
        setTimeout(() => {
            this.addOutput(weathers[Math.floor(Math.random() * weathers.length)]);
            this.addOutput(`<span class="comment">// Weather report accuracy: 0% guaranteed</span>`);
        }, 1000);
    }

    tellJoke() {
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
            "Why don't programmers like nature? It has too many bugs! 🌿🐛",
            "What's a programmer's favorite hangout place? Foo Bar! 🍺",
            "Why did the programmer quit his job? He didn't get arrays! 📊",
            "What do you call a programmer from Finland? Nerdic! 🇫🇮",
            "Why do Java developers wear glasses? Because they can't C#! 👓"
        ];

        this.addOutput('Loading humor module...');
        setTimeout(() => {
            this.addOutput(jokes[Math.floor(Math.random() * jokes.length)]);
            this.addOutput(`<span class="comment">// Comedy.exe has stopped working</span>`);
        }, 1500);
    }

    getCoffee() {
        const coffeeArt = `
        ☕ Virtual Coffee Dispensed! <br>

            (  )   (   )  )         <br>
             ) (   )  (  (          <br>
             ( )  (    ) )          <br>
             _____________          <br>
            <_____________> ___     <br>
            |             |/ _ \\   <br>
            |               | | |   <br>
            |               |_| |   <br>
         ___|             |\\___/   <br>
        /    \\___________/    \\   <br>
        \\_____________________/    <br>

        `;
        this.addOutput(coffeeArt);
    }

    matrixMode() {
        this.addOutput('Entering the Matrix...');
        this.addOutput(`<span class="comment">// There is no spoon... only semicolons 🥄</span>`);

        let matrix = '';
        for (let i = 0; i < 5; i++) {
            let line = '';
            for (let j = 0; j < 50; j++) {
                line += Math.random() > 0.5 ? '1' : '0';
            }
            matrix += line + '\n';
        }

        setTimeout(() => {
            this.addOutput(`<pre style="color: #00ff00; font-size: 10px;">${matrix}</pre>`);
            this.addOutput('🕶️');
            this.addOutput(`<span class="comment">//</span>`);
        }, 2000);
    }

    sudoCommand(args) {
        if (args.length === 0) {
            this.addOutput('sudo: no command specified');
            return;
        }

        const responses = [
            "Nice try! But this isn't a real terminal 😄",
            "sudo: permission denied (and also, this is JavaScript)",
            "With great power comes great responsibility... which is why you can't have sudo",
            "sudo: command not found (but your confidence is admirable)",
            "Access denied! Try saying 'please' instead 🙏"
        ];

        this.addOutput(responses[Math.floor(Math.random() * responses.length)]);
        this.addOutput(`<span class="comment">// Pro tip: 'sudo' doesn't work on personality issues either</span>`);
    }
 }

 // Initialize the terminal when the page loads
 document.addEventListener('DOMContentLoaded', () => {
    new TerminalPortfolio();
 });

 // Add some Easter eggs
 document.addEventListener('keydown', (e) => {
    // Konami code easter egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    if (!window.konamiProgress) window.konamiProgress = 0;

    if (e.code === konamiCode[window.konamiProgress]) {
        window.konamiProgress++;
        if (window.konamiProgress === konamiCode.length) {
            console.log('🎉 Konami Code activated! You found the secret! 🎉');
            window.konamiProgress = 0;
        }
    } else {
        window.konamiProgress = 0;
    }
 });