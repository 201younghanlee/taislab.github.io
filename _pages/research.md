---
layout: page
permalink: /research/
title: Research
description: LLM4SEC, SEC4LLM, federated learning security, and model extraction at Trust AI & Security Lab
nav: true
nav_order: 3
---

<section class="research-page">
  <header class="research-overview">
    <p class="research-eyebrow">Research map</p>
    <h2>Security with LLMs. Security for LLMs.</h2>
    <p>
      TAIS Lab connects secure software engineering, LLM and agent security, federated learning
      security, and model extraction.
    </p>
    <div class="research-direction" aria-label="Two connected research directions">
      <strong>LLM4SEC</strong>
      <span aria-hidden="true">↔</span>
      <strong>SEC4LLM</strong>
    </div>
  </header>

  <section
    class="research-track research-track--llm4sec"
    id="llm4sec"
    aria-labelledby="llm4sec-heading"
  >
    <header class="research-track__heading">
      <div>
        <p class="research-eyebrow">LLMs for security</p>
        <h2 id="llm4sec-heading">LLM4SEC</h2>
      </div>
      <p class="research-flow" aria-label="Generate, detect, localize, and repair">
        Generate <span>→</span> Detect <span>→</span> Localize <span>→</span> Repair
      </p>
    </header>

    <div class="research-topic-grid research-topic-grid--four">
      <article class="research-topic">
        <span class="research-topic__number">01</span>
        <h3>Secure Code Generation</h3>
        <ul class="research-keywords">
          <li>Security Requirements</li>
          <li>Security-Aware Generation</li>
          <li>Functional Correctness</li>
          <li>Code Validation</li>
        </ul>
      </article>

      <article class="research-topic">
        <span class="research-topic__number">02</span>
        <h3>Vulnerability Detection</h3>
        <ul class="research-keywords">
          <li>Local Context Analysis</li>
          <li>Static Analysis</li>
          <li>Candidate Verification</li>
          <li>False-Positive Reduction</li>
        </ul>
      </article>

      <article class="research-topic">
        <span class="research-topic__number">03</span>
        <h3>Kernel Code Fault Localization</h3>
        <ul class="research-keywords">
          <li>Linux Kernel</li>
          <li>LLM Agents</li>
          <li>Fault Localization</li>
          <li>Context-Aware Reasoning</li>
          <li>Benchmarking</li>
        </ul>
      </article>

      <article class="research-topic">
        <span class="research-topic__number">04</span>
        <h3>Automated Vulnerability Repair</h3>
        <ul class="research-keywords">
          <li>Patch Generation</li>
          <li>Root-Cause Repair</li>
          <li>Iterative Re-Localization</li>
          <li>Build and Test Validation</li>
        </ul>
      </article>
    </div>
  </section>

  <section
    class="research-track research-track--sec4llm"
    id="sec4llm"
    aria-labelledby="sec4llm-heading"
  >
    <header class="research-track__heading">
      <div>
        <p class="research-eyebrow">Security for LLMs</p>
        <h2 id="sec4llm-heading">SEC4LLM</h2>
      </div>
      <p class="research-flow" aria-label="Retrieve, converse, act, and execute">
        Retrieve <span>→</span> Converse <span>→</span> Act <span>→</span> Execute
      </p>
    </header>

    <div class="research-topic-grid research-topic-grid--four">
      <article class="research-topic">
        <span class="research-topic__number">01</span>
        <h3>RAG Security</h3>
        <ul class="research-keywords">
          <li>Retrieval Poisoning</li>
          <li>Prompt Injection</li>
          <li>Attack–Defence Evaluation</li>
          <li>Response Robustness</li>
        </ul>
      </article>

      <article class="research-topic">
        <span class="research-topic__number">02</span>
        <h3>LLM Dialogue Security</h3>
        <ul class="research-keywords">
          <li>Narrative Injection</li>
          <li>Response Drift</li>
          <li>Multi-Turn Attacks</li>
          <li>Drift Detection</li>
        </ul>
      </article>

      <article class="research-topic">
        <span class="research-topic__number">03</span>
        <h3>IaC Agent Assurance</h3>
        <ul class="research-keywords">
          <li>Terraform</li>
          <li>Intent Alignment</li>
          <li>Policy-Aware Evaluation</li>
          <li>Deployment Validation</li>
        </ul>
      </article>

      <article class="research-topic">
        <span class="research-topic__number">04</span>
        <h3>ROS 2 Agent Assurance</h3>
        <ul class="research-keywords">
          <li>Robot Software Generation</li>
          <li>Build and Launch</li>
          <li>Interface Correctness</li>
          <li>Execution-Centred Evaluation</li>
        </ul>
      </article>
    </div>
  </section>

  <section class="research-foundations" aria-labelledby="foundations-heading">
    <header class="research-foundations__heading">
      <p class="research-eyebrow">AI/ML security foundations</p>
      <h2 id="foundations-heading">Privacy, robustness, and adversarial threats</h2>
    </header>

    <div class="research-topic-grid research-topic-grid--two">
      <article class="research-topic research-topic--foundation">
        <span class="research-topic__number">A</span>
        <h3>Federated Learning Security</h3>
        <ul class="research-keywords">
          <li>Byzantine-Robust FL</li>
          <li>Backdoor Defence</li>
          <li>Property Inference</li>
          <li>Data Reconstruction</li>
          <li>Model Inversion</li>
          <li>Privacy-Preserving FL</li>
        </ul>
      </article>

      <article class="research-topic research-topic--foundation">
        <span class="research-topic__number">B</span>
        <h3>Model Extraction</h3>
        <ul class="research-keywords">
          <li>Side-Channel Extraction</li>
          <li>Non-Query Extraction</li>
          <li>Architecture Recovery</li>
          <li>Image-Dimension Leakage</li>
          <li>Model IP Protection</li>
          <li>Attack and Defence</li>
        </ul>
      </article>
    </div>
  </section>

  <aside class="research-methods" aria-label="Shared research methods">
    <strong>Shared methods</strong>
    <ul>
      <li>Threat Modelling</li>
      <li>Execution-Based Evaluation</li>
      <li>Verification</li>
      <li>Reproducible Benchmarks</li>
    </ul>
  </aside>

  <p class="research-publications-link">
    <a href="{{ '/publications/' | relative_url }}">View the full publication record</a>
  </p>
</section>
