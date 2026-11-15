---
layout: default
---

<div class="intro-section">
  <p class="bio-text">
    I'm a backend software engineer building high-performance developer tooling, 
    editor extensions, and autonomous agent skills with a minimalist mindset and an open-source focus.
  </p>

  <div class="social-links">
    <a href="https://github.com/leblocks" class="social-pill" target="_blank" rel="noopener">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
      GitHub
    </a>
    <a href="https://www.linkedin.com/in/alexander-gurevich-6944a2162/" class="social-pill" target="_blank" rel="noopener">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
      LinkedIn
    </a>
    <a href="https://stackoverflow.com/users/6482931/monsieur-merso" class="social-pill" target="_blank" rel="noopener">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18h20v4H2zM6 14l12-3M8 10l11-6M11 6l9-9"></path></svg>
      Stack Overflow
    </a>
    <a href="https://docs.google.com/document/d/e/2PACX-1vRl2wJbKtvQATNbgvxZvt03tPdlCrdqnztSZkZroazmgHQzEhlE62XeESyDPW1YWDhccPPYgYVDZRHZ/pub" class="social-pill" target="_blank" rel="noopener">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      Curriculum Vitae
    </a>
  </div>
</div>

<h2 class="section-title">Neovim Plugins &amp; Developer Tools</h2>
<p class="section-subtitle">High-performance navigation engines, parsers, and editor productivity extensions.</p>

<div class="projects-grid">
  <!-- treetags.nvim -->
  <div class="project-card">
    <div>
      <div class="card-top">
        <h3 class="project-title"><a href="https://github.com/leblocks/treetags.nvim" target="_blank" rel="noopener">treetags.nvim</a></h3>
        <div class="project-badges">
          <span class="tag-badge">Neovim</span>
          <a class="star-counter" href="https://github.com/leblocks/treetags.nvim/stargazers" target="_blank" rel="noopener" title="GitHub Stars">
            ★ <span class="gh-stars" data-repo="leblocks/treetags.nvim">--</span>
          </a>
        </div>
      </div>
      <p class="project-desc">
        Find definitions across projects without a language server. Builds an offline definition index using Tree-sitter &amp; SQLite with fzf-lua and Telescope pickers.
      </p>
    </div>
    <div class="card-footer">
      <span class="tag-badge">Lua / Tree-sitter</span>
      <div class="card-links">
        <a href="https://github.com/leblocks/treetags.nvim" class="card-link" target="_blank" rel="noopener">Repository &rarr;</a>
      </div>
    </div>
  </div>

  <!-- toggle.nvim -->
  <div class="project-card">
    <div>
      <div class="card-top">
        <h3 class="project-title"><a href="https://github.com/leblocks/toggle.nvim" target="_blank" rel="noopener">toggle.nvim</a></h3>
        <div class="project-badges">
          <span class="tag-badge">Neovim</span>
          <a class="star-counter" href="https://github.com/leblocks/toggle.nvim/stargazers" target="_blank" rel="noopener" title="GitHub Stars">
            ★ <span class="gh-stars" data-repo="leblocks/toggle.nvim">--</span>
          </a>
        </div>
      </div>
      <p class="project-desc">
        Fast word-toggling under cursor for Neovim. Supports circular keyword cycles (e.g. <code>public</code> &rarr; <code>protected</code> &rarr; <code>private</code>) and custom domain rules.
      </p>
    </div>
    <div class="card-footer">
      <span class="tag-badge">Lua</span>
      <div class="card-links">
        <a href="https://github.com/leblocks/toggle.nvim" class="card-link" target="_blank" rel="noopener">Repository &rarr;</a>
      </div>
    </div>
  </div>

  <!-- hopcsharp.nvim -->
  <div class="project-card">
    <div>
      <div class="card-top">
        <h3 class="project-title"><a href="https://github.com/leblocks/hopcsharp.nvim" target="_blank" rel="noopener">hopcsharp.nvim</a></h3>
        <div class="project-badges">
          <span class="tag-badge">Neovim</span>
          <a class="star-counter" href="https://github.com/leblocks/hopcsharp.nvim/stargazers" target="_blank" rel="noopener" title="GitHub Stars">
            ★ <span class="gh-stars" data-repo="leblocks/hopcsharp.nvim">--</span>
          </a>
        </div>
      </div>
      <p class="project-desc">
        Tree-sitter + SQLite powered fast code navigation engine tailored for C# solutions in Neovim, eliminating heavy LSP indexer bottlenecks.
      </p>
    </div>
    <div class="card-footer">
      <span class="tag-badge">C# / Lua</span>
      <div class="card-links">
        <a href="https://github.com/leblocks/hopcsharp.nvim" class="card-link" target="_blank" rel="noopener">Repository &rarr;</a>
      </div>
    </div>
  </div>

  <!-- dotfiles -->
  <div class="project-card">
    <div>
      <div class="card-top">
        <h3 class="project-title"><a href="https://github.com/leblocks/dotfiles" target="_blank" rel="noopener">dotfiles</a></h3>
        <div class="project-badges">
          <span class="tag-badge">DevOps</span>
          <a class="star-counter" href="https://github.com/leblocks/dotfiles/stargazers" target="_blank" rel="noopener" title="GitHub Stars">
            ★ <span class="gh-stars" data-repo="leblocks/dotfiles">--</span>
          </a>
        </div>
      </div>
      <p class="project-desc">
        Cross-platform PowerShell Core environment setup and automation scripts for Windows and Linux, backed by Docker integration and Pester test suites.
      </p>
    </div>
    <div class="card-footer">
      <span class="tag-badge">PowerShell</span>
      <div class="card-links">
        <a href="https://github.com/leblocks/dotfiles" class="card-link" target="_blank" rel="noopener">Repository &rarr;</a>
      </div>
    </div>
  </div>
</div>

<h2 class="section-title">Agentic AI Skills &amp; Tools</h2>
<p class="section-subtitle">Production-grade tools and skills for autonomous coding agents (Universal Ctags, project resolvers, workflow automation).</p>

<div class="projects-grid">
  <!-- ctags-skill -->
  <div class="project-card">
    <div>
      <div class="card-top">
        <h3 class="project-title"><a href="https://github.com/leblocks/ctags-skill" target="_blank" rel="noopener">ctags-skill</a></h3>
        <div class="project-badges">
          <span class="tag-badge">Agent Skill</span>
          <a class="star-counter" href="https://github.com/leblocks/ctags-skill/stargazers" target="_blank" rel="noopener" title="GitHub Stars">
            ★ <span class="gh-stars" data-repo="leblocks/ctags-skill">--</span>
          </a>
        </div>
      </div>
      <p class="project-desc">
        Fast symbol definition lookup for navigating massive codebases (~35x faster than ripgrep). Returns clean structured JSON with file, line, kind, and scope.
      </p>
    </div>
    <div class="card-footer">
      <span class="tag-badge">Universal Ctags / Bash / Batch</span>
      <div class="card-links">
        <a href="https://github.com/leblocks/ctags-skill" class="card-link" target="_blank" rel="noopener">Repository &rarr;</a>
      </div>
    </div>
  </div>

  <!-- dotnet-findproject-skill -->
  <div class="project-card">
    <div>
      <div class="card-top">
        <h3 class="project-title"><a href="https://github.com/leblocks/dotnet-findproject-skill" target="_blank" rel="noopener">dotnet-findproject-skill</a></h3>
        <div class="project-badges">
          <span class="tag-badge">Agent Skill</span>
          <a class="star-counter" href="https://github.com/leblocks/dotnet-findproject-skill/stargazers" target="_blank" rel="noopener" title="GitHub Stars">
            ★ <span class="gh-stars" data-repo="leblocks/dotnet-findproject-skill">--</span>
          </a>
        </div>
      </div>
      <p class="project-desc">
        Teaches AI agents to resolve any C# source file to its nearest owning <code>.csproj</code> in large monorepos, enabling fast targeted builds and scoped test execution.
      </p>
    </div>
    <div class="card-footer">
      <span class="tag-badge">.NET / CLI</span>
      <div class="card-links">
        <a href="https://github.com/leblocks/dotnet-findproject-skill" class="card-link" target="_blank" rel="noopener">Repository &rarr;</a>
      </div>
    </div>
  </div>

  <!-- agent-todo-skill -->
  <div class="project-card">
    <div>
      <div class="card-top">
        <h3 class="project-title"><a href="https://github.com/leblocks/agent-todo-skill" target="_blank" rel="noopener">agent-todo-skill</a></h3>
        <div class="project-badges">
          <span class="tag-badge">Agent Skill</span>
          <a class="star-counter" href="https://github.com/leblocks/agent-todo-skill/stargazers" target="_blank" rel="noopener" title="GitHub Stars">
            ★ <span class="gh-stars" data-repo="leblocks/agent-todo-skill">--</span>
          </a>
        </div>
      </div>
      <p class="project-desc">
        Autonomous task execution skill: scans for <code>AGENT TODO</code> markers, implements requested logic, runs verification tests, and safely cleans completed tags.
      </p>
    </div>
    <div class="card-footer">
      <span class="tag-badge">Agentic Coding</span>
      <div class="card-links">
        <a href="https://github.com/leblocks/agent-todo-skill" class="card-link" target="_blank" rel="noopener">Repository &rarr;</a>
      </div>
    </div>
  </div>

  <!-- metaprompt-skill -->
  <div class="project-card">
    <div>
      <div class="card-top">
        <h3 class="project-title"><a href="https://github.com/leblocks/metaprompt-skill" target="_blank" rel="noopener">metaprompt-skill</a></h3>
        <div class="project-badges">
          <span class="tag-badge">Agent Skill</span>
          <a class="star-counter" href="https://github.com/leblocks/metaprompt-skill/stargazers" target="_blank" rel="noopener" title="GitHub Stars">
            ★ <span class="gh-stars" data-repo="leblocks/metaprompt-skill">--</span>
          </a>
        </div>
      </div>
      <p class="project-desc">
        Instruction-only agent skill that refines and enhances rough conversational prompts into high-specification LLM instructions without executing them.
      </p>
    </div>
    <div class="card-footer">
      <span class="tag-badge">Prompt Engineering</span>
      <div class="card-links">
        <a href="https://github.com/leblocks/metaprompt-skill" class="card-link" target="_blank" rel="noopener">Repository &rarr;</a>
      </div>
    </div>
  </div>
</div>

<h2 class="section-title">Visual Therapy &amp; Games</h2>
<p class="section-subtitle">Web-based visual exercises engineered to support individuals with amblyopia (lazy eye).</p>

<div class="projects-grid">
  <!-- lazy-eye-blocks -->
  <div class="project-card">
    <div>
      <div class="card-top">
        <h3 class="project-title"><a href="https://leblocks.github.io/lazy-eye-blocks/" target="_blank" rel="noopener">lazy-eye-blocks</a></h3>
        <div class="project-badges">
          <span class="tag-badge">Web App</span>
        </div>
      </div>
      <p class="project-desc">
        Tetris re-engineered as a visual therapy exercise to support individuals training amblyopic vision through contrast and color coordination.
      </p>
    </div>
    <div class="card-footer">
      <span class="tag-badge">JavaScript</span>
      <div class="card-links">
        <a href="https://leblocks.github.io/lazy-eye-blocks/" class="card-link" target="_blank" rel="noopener">Play &rarr;</a>
        <a href="https://github.com/leblocks/lazy-eye-blocks" class="card-link" target="_blank" rel="noopener">Repository</a>
      </div>
    </div>
  </div>

  <!-- renverso -->
  <div class="project-card">
    <div>
      <div class="card-top">
        <h3 class="project-title"><a href="https://leblocks.github.io/renverso/" target="_blank" rel="noopener">renverso</a></h3>
        <div class="project-badges">
          <span class="tag-badge">Web App</span>
        </div>
      </div>
      <p class="project-desc">
        A puzzle game challenging players to align tile colors with backgrounds, emphasizing cognitive engagement and binocular visual coordination.
      </p>
    </div>
    <div class="card-footer">
      <span class="tag-badge">JavaScript</span>
      <div class="card-links">
        <a href="https://leblocks.github.io/renverso/" class="card-link" target="_blank" rel="noopener">Play &rarr;</a>
        <a href="https://github.com/leblocks/renverso" class="card-link" target="_blank" rel="noopener">Repository</a>
      </div>
    </div>
  </div>
</div>

<h2 class="section-title">Selected Gists &amp; Utilities</h2>

<div class="gists-list">
  <div class="gist-item">
    <div class="gist-info">
      <a href="https://gist.github.com/leblocks/e239b36a0a8e0164846b46d37e04c827" class="gist-title" target="_blank" rel="noopener">Watch-Files.ps1</a>
      <span class="gist-desc">PowerShell Core utility to tail multiple files simultaneously with distinct color-coded console prefixes.</span>
    </div>
    <span class="tag-badge">PowerShell</span>
  </div>

  <div class="gist-item">
    <div class="gist-info">
      <a href="https://gist.github.com/leblocks/0ceba56b9c12ba32629d04acf139fc4a" class="gist-title" target="_blank" rel="noopener">powershell-bootstrap.sh</a>
      <span class="gist-desc">Zero-dependency shell script to bootstrap PowerShell Core on Linux into <code>$HOME/pwsh</code> without root.</span>
    </div>
    <span class="tag-badge">Bash</span>
  </div>
</div>

<script>
  // Fetch real-time GitHub stars for project cards
  (function fetchStars() {
    const starSpans = document.querySelectorAll('.gh-stars[data-repo]');
    starSpans.forEach(span => {
      const repo = span.getAttribute('data-repo');
      const cacheKey = 'stars_' + repo;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached !== null) {
        span.textContent = cached;
        return;
      }
      fetch('https://api.github.com/repos/' + repo)
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => {
          if (data && typeof data.stargazers_count === 'number') {
            span.textContent = data.stargazers_count;
            sessionStorage.setItem(cacheKey, data.stargazers_count);
          }
        })
        .catch(() => {
          span.textContent = '★';
        });
    });
  })();
</script>
