---
layout: page
permalink: /research/
title: Research
description: Research in secure software engineering, LLM security, and AI/ML security.
nav: true
nav_order: 3
---

<section class="research-page">
  <section
    class="research-track"
    id="core-research"
    aria-labelledby="core-research-heading"
  >
    <header class="research-track__heading">
      <div>
        <p class="research-eyebrow">LLMs for security</p>
        <h2 id="core-research-heading">LLM4SEC</h2>
      </div>
    </header>

    <div class="research-topic-grid">
      <article class="research-topic" id="automated-vulnerability-repair">
        <span class="research-topic__number">01</span>
        <h3>Automated Vulnerability Repair</h3>
        <p class="research-topic__description">
          We investigate whether language models can repair vulnerable code without changing its
          intended behaviour. Candidate patches are tested for security and functional correctness.
        </p>
        <ul class="research-keywords">
          <li>Patch Generation</li>
          <li>Root-Cause Repair</li>
          <li>Build and Test Validation</li>
        </ul>
        <p class="research-topic__paper research-topic__paper--ongoing">
          <span>Current work</span>
          Validation-guided root-cause analysis and repair
        </p>
        <p class="research-topic__paper">
          <span>Related paper</span>
          <a href="{{ '/publications/' | relative_url }}#han2026rethinking">
            Rethinking the Capability of Fine-Tuned Language Models for Automated Vulnerability Repair
          </a>
        </p>
      </article>

      <article class="research-topic" id="vulnerability-detection">
        <span class="research-topic__number">02</span>
        <h3>Vulnerability Detection</h3>
        <p class="research-topic__description">
          We combine local code context with validation to identify security flaws while reducing
          false positives. The goal is to make automated findings more precise and actionable.
        </p>
        <ul class="research-keywords">
          <li>Local Context Analysis</li>
          <li>Candidate Verification</li>
          <li>False-Positive Reduction</li>
        </ul>
        <p class="research-topic__paper">
          <span>Related paper</span>
          <a href="{{ '/publications/' | relative_url }}#kim2026vulscope">
            VulScope: Software Vulnerability Detection via Local Context Analysis and Verification
          </a>
        </p>
      </article>

      <article class="research-topic" id="secure-code-generation">
        <span class="research-topic__number">03</span>
        <h3>Secure Code Generation</h3>
        <p class="research-topic__description">
          We study how language models can generate code that satisfies both functional
          requirements and security constraints. Validation is used to identify weaknesses early.
        </p>
        <ul class="research-keywords">
          <li>Security-Aware Generation</li>
          <li>Functional Correctness</li>
          <li>Code Validation</li>
        </ul>
        <p class="research-topic__paper research-topic__paper--ongoing">
          <span>Current work</span>
          Secure code generation under functional and security requirements
        </p>
      </article>

      <article class="research-topic" id="kernel-code-fault-localization">
        <span class="research-topic__number">04</span>
        <h3>Kernel Code Fault Localization</h3>
        <p class="research-topic__description">
          We are building a benchmark for locating faults in kernel code, where low-level behaviour
          and long-range dependencies challenge conventional methods.
        </p>
        <ul class="research-keywords">
          <li>Linux Kernel</li>
          <li>Fault Localization</li>
          <li>Benchmarking</li>
        </ul>
        <p class="research-topic__paper research-topic__paper--ongoing">
          <span>Current work</span>
          LLM-based fault localization for Linux kernel code
        </p>
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
        <p class="research-eyebrow">Security for LLMs and AI/ML systems</p>
        <h2 id="sec4llm-heading">SEC4LLM &amp; AI/ML Security</h2>
      </div>
    </header>

    <div class="research-topic-grid">
      <article class="research-topic">
        <span class="research-topic__number">01</span>
        <h3>RAG Security</h3>
        <p class="research-topic__description">
          We examine attacks on retrieval-augmented generation, including malicious or misleading
          retrieved content. Attacks and defences are compared under shared evaluation criteria.
        </p>
        <ul class="research-keywords">
          <li>Retrieval Poisoning</li>
          <li>Prompt Injection</li>
          <li>Attack–Defence Evaluation</li>
        </ul>
        <p class="research-topic__paper">
          <span>Related paper</span>
          <a href="{{ '/publications/domestic/' | relative_url }}#kim2026ragsecurity">
            Security Analysis and Defense Comparison in RAG
          </a>
        </p>
      </article>

      <article class="research-topic">
        <span class="research-topic__number">02</span>
        <h3>IaC Agent Assurance</h3>
        <p class="research-topic__description">
          We evaluate AI-generated infrastructure-as-code beyond syntax and execution, asking
          whether it matches user intent and aligns with relevant security policies.
        </p>
        <ul class="research-keywords">
          <li>Terraform</li>
          <li>Intent Alignment</li>
          <li>Security Policy Compliance</li>
        </ul>
        <p class="research-topic__paper research-topic__paper--ongoing">
          <span>Current work</span>
          Intent- and policy-aware evaluation of Terraform-generating agents
        </p>
      </article>

      <article class="research-topic">
        <span class="research-topic__number">03</span>
        <h3>ROS 2 Agent Assurance</h3>
        <p class="research-topic__description">
          We develop execution-grounded evaluations for AI-generated ROS 2 software, covering build
          and launch success, interface correctness, and expected runtime behaviour.
        </p>
        <ul class="research-keywords">
          <li>ROS 2</li>
          <li>Interface Correctness</li>
          <li>Runtime Validation</li>
        </ul>
        <p class="research-topic__paper">
          <span>Related paper</span>
          <a href="{{ '/publications/domestic/' | relative_url }}#lee2026ros2">
            Evaluating Open-Source LLM Performance for ROS 2 Code Generation: An Execution-Centric Pilot Study
          </a>
        </p>
      </article>

      <article class="research-topic" id="federated-learning-security">
        <span class="research-topic__number">04</span>
        <h3>Federated Learning Security</h3>
        <p class="research-topic__description">
          We study privacy and integrity risks in federated learning, including inference,
          inversion, backdoor, and Byzantine attacks, together with practical defences.
        </p>
        <ul class="research-keywords">
          <li>Privacy Leakage</li>
          <li>Byzantine Robustness</li>
          <li>Backdoor Defence</li>
        </ul>
        <p class="research-topic__paper">
          <span>Related paper</span>
          <a href="{{ '/publications/' | relative_url }}#lee2023flguard">
            FLGuard: Byzantine-Robust Federated Learning via Ensemble of Contrastive Models
          </a>
        </p>
      </article>

    </div>
  </section>

  <p class="research-publications-link">
    <a href="{{ '/publications/' | relative_url }}">View the full publication record</a>
  </p>
</section>
