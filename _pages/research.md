---
layout: page
permalink: /research/
title: Research
description: LLM4SEC and SEC4LLM research at Trust AI & Security Lab
nav: true
nav_order: 3
---

<section class="research-page">
  <header class="research-overview">
    <p class="research-eyebrow">Bidirectional AI Security</p>
    <h2>Secure what language models build. Use language models to strengthen security.</h2>
    <p>
      TAIS Lab studies the two-way relationship between language models and security. Under
      <strong>LLM4SEC</strong>, we use language models and specialised agents to find
      vulnerabilities, generate secure code, and validate and repair software. Under
      <strong>SEC4LLM</strong>, we develop threat models, benchmarks, and verification methods for
      LLM-based, retrieval-augmented, and tool-using systems. Across both pillars, we ask what
      evidence shows that an AI-enabled system is functionally correct, secure, and aligned with
      real-world requirements.
    </p>
  </header>

  <nav class="research-pillar-index" aria-label="Research pillars">
    <a class="research-pillar-link research-pillar-link--llm4sec" href="#llm4sec">
      <span class="research-pillar-link__number">01</span>
      <strong>LLM4SEC</strong>
      <span>Language models and AI for software security</span>
      <small>Generation · Detection · Verification · Repair</small>
    </a>
    <a class="research-pillar-link research-pillar-link--sec4llm" href="#sec4llm">
      <span class="research-pillar-link__number">02</span>
      <strong>SEC4LLM</strong>
      <span>Security and assurance for LLM-based systems</span>
      <small>Retrieval · Tools · Agents · Execution</small>
    </a>
  </nav>

  <section
    class="research-pillar research-pillar--llm4sec"
    id="llm4sec"
    aria-labelledby="llm4sec-heading"
  >
    <header class="research-pillar__heading">
      <div class="research-pillar__identity">
        <span>01</span>
        <p>LLM4SEC</p>
      </div>
      <div>
        <p class="research-eyebrow">Language Models and AI for Security</p>
        <h2 id="llm4sec-heading">AI and agents across the secure software lifecycle</h2>
        <p>
          We use language models, specialised agents, and verification methods from
          secure-by-construction generation to vulnerability detection, diagnosis, and repair.
        </p>
      </div>
    </header>

    <div class="research-project-grid">
      <article class="research-project">
        <div class="research-project__meta">
          <span>Current research</span>
          <span>Secure generation</span>
        </div>
        <h3>Secure-by-construction code generation</h3>
        <p>
          MACGen coordinates planning, security analysis, code generation, and review through
          specialised agents and structured artefacts. The objective is not merely compilable code,
          but code that satisfies functional and security requirements together.
        </p>
        <p class="research-project__evidence">MACGen · under review</p>
      </article>

      <article class="research-project">
        <div class="research-project__meta">
          <span>Accepted work</span>
          <span>Detection</span>
        </div>
        <h3>Vulnerability detection and verification</h3>
        <p>
          VulScope combines local program context with verification to distinguish plausible
          vulnerability predictions from evidence-backed findings.
        </p>
        <p class="research-project__evidence">
          <a href="{{ '/publications/' | relative_url }}#kim2026vulscope">
            VulScope · <em>Empirical Software Engineering</em>
          </a>
        </p>
      </article>

      <article class="research-project">
        <div class="research-project__meta">
          <span>Research trajectory</span>
          <span>Repair</span>
        </div>
        <h3>Evidence-driven vulnerability repair</h3>
        <p>
          Our repair research has progressed from fine-tuned language models to execution-based
          evaluation at ICSE 2026. Recent DeepAVR technical work further investigates
          validation-guided re-localisation and root-cause-oriented repair.
        </p>
        <ul class="research-project__evidence-list">
          <li>
            <a href="{{ '/publications/' | relative_url }}#han2026rethinking">
              Automated vulnerability repair · ICSE 2026
            </a>
          </li>
          <li>DeepAVR · recent technical work</li>
        </ul>
      </article>
    </div>
  </section>

  <section
    class="research-pillar research-pillar--sec4llm"
    id="sec4llm"
    aria-labelledby="sec4llm-heading"
  >
    <header class="research-pillar__heading">
      <div class="research-pillar__identity">
        <span>02</span>
        <p>SEC4LLM</p>
      </div>
      <div>
        <p class="research-eyebrow">Security for Large Language Models</p>
        <h2 id="sec4llm-heading">Security and assurance for LLM-based and agentic systems</h2>
        <p>
          We investigate failures caused by adversarial input, insecure retrieval, unsafe tool use,
          and misaligned generated artefacts, then develop evidence-based methods for evaluating and
          controlling those failures.
        </p>
      </div>
    </header>

    <div class="research-project-grid">
      <article class="research-project">
        <div class="research-project__meta">
          <span>Published and current work</span>
          <span>RAG security</span>
        </div>
        <h3>Retrieval and conversational security</h3>
        <p>
          We study response drift under narrative injection and develop consistent evaluations of
          attacks and defences for retrieval-augmented systems, jointly considering attack success,
          answer correctness, and retrieval-corpus quality.
        </p>
        <ul class="research-project__evidence-list">
          <li>
            <a href="{{ '/publications/domestic/' | relative_url }}#kim2026narrative">
              Narrative injection · ASK 2026
            </a>
          </li>
          <li>
            <a href="{{ '/publications/domestic/' | relative_url }}#kim2026ragsecurity">
              RAG security analysis · ASK 2026
            </a>
          </li>
          <li>Attack–defence evaluation · ongoing research</li>
        </ul>
      </article>

      <article class="research-project">
        <div class="research-project__meta">
          <span>Current research</span>
          <span>Tool-using agents</span>
        </div>
        <h3>Execution-grounded agent assurance</h3>
        <p>
          We build execution-oriented evaluations for agents that generate Terraform and ROS 2
          software, going beyond syntax to test deployability, user intent, security policy,
          interfaces, build and launch behaviour, and behavioural correctness.
        </p>
        <ul class="research-project__evidence-list">
          <li>Infrastructure-as-Code Agent · ongoing research</li>
          <li>
            <a href="{{ '/publications/domestic/' | relative_url }}#lee2026ros2">
              ROS 2 execution study · ASK 2026
            </a>
          </li>
          <li>ROS 2 agent benchmark · ongoing research</li>
        </ul>
      </article>

      <article class="research-project research-project--foundation">
        <div class="research-project__meta">
          <span>Research foundation</span>
          <span>Model and FL security</span>
        </div>
        <h3>From learning-system security to agent assurance</h3>
        <p>
          Our model- and federated-learning-security research provides the threat-modelling
          foundation for SEC4LLM, spanning model extraction, property inference, Byzantine attacks,
          backdoors, privacy leakage, and robust defence.
        </p>
        <ul class="research-project__evidence-list">
          <li>
            <a href="{{ '/publications/' | relative_url }}#lee2022precise">
              Model extraction · ESORICS 2022
            </a>
          </li>
          <li>
            <a href="{{ '/publications/' | relative_url }}#lee2023flguard">
              FLGuard · ESORICS 2023
            </a>
          </li>
          <li>
            <a href="{{ '/publications/' | relative_url }}#cho2024vflip">
              VFLIP · ESORICS 2024
            </a>
          </li>
          <li>
            <a href="{{ '/publications/' | relative_url }}#cho2026pifd">
              PI-FD · IEEE Access 2026
            </a>
          </li>
        </ul>
      </article>
    </div>
  </section>

  <section class="research-methods" aria-labelledby="research-methods-heading">
    <div class="research-methods__intro">
      <p class="research-eyebrow">One assurance principle</p>
      <h2 id="research-methods-heading">Evidence before confidence</h2>
      <p>
        Capability alone is not sufficient. We seek measurable evidence that AI-enabled systems
        remain functionally correct, secure, and dependable when connected to software, retrieval
        stores, tools, infrastructure, and physical environments.
      </p>
    </div>
    <ul class="research-methods__list">
      <li><span>01</span><strong>Explicit threat models</strong></li>
      <li><span>02</span><strong>Execution-grounded evaluation</strong></li>
      <li><span>03</span><strong>Verification and feedback</strong></li>
      <li><span>04</span><strong>Reproducible benchmarks</strong></li>
    </ul>
  </section>

  <p class="research-publications-link">
    <a href="{{ '/publications/' | relative_url }}">View the full publication record</a>
  </p>
</section>
