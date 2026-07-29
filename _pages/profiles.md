---
layout: page
permalink: /people/
title: People
description: Professor, supervision, and collaboration at Trust AI & Security Lab
nav: true
nav_order: 2
---

<section class="people-section professor-section">
  <h2>Professor</h2>
  <div class="people-profile">
    <div class="people-profile__image">
      {% include figure.liquid loading="eager" path="assets/img/profile_pic.png" class="img-fluid z-depth-1 rounded-circle" alt="Younghan Lee" cache_bust=true %}
    </div>
    <div class="people-profile__body">
      <h3>Younghan Lee</h3>
      <p>
        Younghan Lee is a tenure-track Assistant Professor in the Department of Convergence
        Security Engineering at Sungshin Women's University. His research connects security of AI
        with AI for security, spanning model and federated-learning security, privacy, secure code
        generation, vulnerability detection and repair, and assurance of LLM-based and agentic
        systems. His work has appeared at ICSE, ESORICS, RAID, DAC and DATE and in
        <em>IEEE Transactions on Artificial Intelligence</em> and <em>IEEE Access</em>.
      </p>

      <h4>Degree</h4>
      <ul>
        <li>Ph.D. in Electrical and Computer Engineering, Seoul National University, 2024. Advised by Prof. Yunheung Paek.</li>
        <li>BEng in Electrical and Electronic Engineering, Imperial College London, 2016.</li>
      </ul>

      <h4>Research Interests</h4>
      <ul>
        <li>AI security and assurance for LLM-based and agentic systems</li>
        <li>Secure code generation, vulnerability detection, and automated repair</li>
        <li>Federated-learning and model security</li>
        <li>Privacy-preserving and applied AI</li>
      </ul>

      <h4>Contacts</h4>
      <div class="people-links" aria-label="Younghan Lee contact links">
        <a href="mailto:{{ site.email | encode_email }}" title="Mail" aria-label="Mail">
          <i class="fa-solid fa-envelope" aria-hidden="true"></i>
        </a>
        <a href="https://orcid.org/{{ site.orcid_id }}" target="_blank" rel="noopener noreferrer" title="ORCID" aria-label="ORCID">
          <i class="ai ai-orcid" aria-hidden="true"></i>
        </a>
        <a href="https://scholar.google.com/citations?user={{ site.scholar_userid }}" target="_blank" rel="noopener noreferrer" title="Google Scholar" aria-label="Google Scholar">
          <i class="ai ai-google-scholar" aria-hidden="true"></i>
        </a>
        <a href="https://github.com/{{ site.github_username }}" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">
          <i class="fa-brands fa-github" aria-hidden="true"></i>
        </a>
        <a href="https://www.linkedin.com/in/{{ site.linkedin_username }}" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">
          <i class="fa-brands fa-linkedin" aria-hidden="true"></i>
        </a>
        <a href="{{ '/cv/' | relative_url }}" title="CV" aria-label="CV">
          <i class="ai ai-cv" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </div>
</section>

<section class="people-section student-section">
  <h2>Undergraduate Researchers</h2>
  <p class="student-section__intro">
    Current undergraduate researchers at Sungshin Women's University working on secure and
    trustworthy AI systems.
  </p>

  <div class="student-grid">
    <article class="student-card">
      <div class="student-card__avatar" aria-hidden="true">JL</div>
      <div class="student-card__body">
        <h3>Jeni Lee <span lang="ko">이제니</span></h3>
        <p class="student-card__role">Undergraduate Researcher</p>
        <p class="student-card__research">
          LLM-based ROS 2 code generation and execution-centred evaluation
        </p>
      </div>
    </article>

    <article class="student-card">
      <div class="student-card__avatar" aria-hidden="true">AS</div>
      <div class="student-card__body">
        <h3>Ayoung Shim <span lang="ko">심아영</span></h3>
        <p class="student-card__role">Undergraduate Researcher</p>
        <p class="student-card__research">
          Benchmarks and static evaluation for LLM-generated ROS 2 software
        </p>
      </div>
    </article>

    <article class="student-card">
      <div class="student-card__avatar" aria-hidden="true">CH</div>
      <div class="student-card__body">
        <h3>Choyeon Han <span lang="ko">한초연</span></h3>
        <p class="student-card__role">Undergraduate Researcher</p>
        <p class="student-card__research">RAG security and trustworthy LLM systems</p>
      </div>
    </article>

    <article class="student-card">
      <div class="student-card__avatar" aria-hidden="true">MJ</div>
      <div class="student-card__body">
        <h3>Minju Jang <span lang="ko">장민주</span></h3>
        <p class="student-card__role">Undergraduate Researcher</p>
        <p class="student-card__research">
          RAG attack–defence evaluation and trustworthy LLM systems
        </p>
      </div>
    </article>
  </div>
</section>

<section class="people-section">
  <h2>Student Research and Supervision</h2>
  <p>
    TAIS Lab supervises research-led student projects in AI security, LLM systems, and secure
    software engineering. Recent advised work includes three ASK 2026 proceedings papers on
    narrative injection in multi-turn LLM dialogue, execution-centred evaluation of ROS 2 code
    generation, and RAG attacks and defences. Earlier undergraduate supervision on LLM-based
    obstructive-sleep-apnoea classification led to a conference poster and a 2025 journal article.
  </p>
</section>

<section class="people-section people-contact">
  <h2>Research Enquiries</h2>
  <p>
    For research collaboration and student project enquiries, contact
    <a href="mailto:{{ site.email | encode_email }}">{{ site.email }}</a>.
  </p>
</section>
