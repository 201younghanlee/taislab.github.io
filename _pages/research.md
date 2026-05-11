---
layout: page
permalink: /research/
title: Research
description: research topics at Trust AI & Security Lab
nav: true
nav_order: 3
---

<section class="research-page">
  <p class="research-intro">
    TAIS Lab studies trustworthy AI systems from both sides: using AI to improve security, and securing AI against emerging threats. Our work builds on published research in federated learning robustness, privacy leakage, model extraction, adversarial malware, IoT intrusion detection, and hardware-assisted system security.
  </p>

  <div class="research-topics">
    <article class="research-topic">
      <div class="research-figure">
        <svg class="research-diagram" role="img" aria-label="Bidirectional flow between large language models and security systems" viewBox="0 0 360 180">
          <defs>
            <marker id="arrow-llm" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="context-stroke" />
            </marker>
          </defs>
          <rect class="diagram-panel" x="28" y="42" width="112" height="72" rx="6" />
          <rect class="diagram-panel" x="220" y="42" width="112" height="72" rx="6" />
          <text class="diagram-label" x="84" y="75" text-anchor="middle">LLM</text>
          <text class="diagram-small" x="84" y="96" text-anchor="middle">agent</text>
          <text class="diagram-label" x="276" y="75" text-anchor="middle">Security</text>
          <text class="diagram-small" x="276" y="96" text-anchor="middle">evidence</text>
          <path class="diagram-line diagram-cyan" d="M145 63 C175 38, 185 38, 215 63" marker-end="url(#arrow-llm)" />
          <path class="diagram-line diagram-navy" d="M215 95 C185 120, 175 120, 145 95" marker-end="url(#arrow-llm)" />
          <circle class="diagram-node diagram-cyan-fill" cx="180" cy="50" r="5" />
          <circle class="diagram-node diagram-navy-fill" cx="180" cy="109" r="5" />
          <path class="diagram-dash" d="M84 122 L84 145 L276 145 L276 122" />
          <text class="diagram-small diagram-caption" x="180" y="163" text-anchor="middle">use AI for security, then secure the AI</text>
        </svg>
      </div>
      <h2>LLM4SEC &amp; SEC4LLM</h2>
      <p>
        We use LLMs as security agents that can connect code, execution evidence, retrieval context, and attack traces into actionable analysis. At the same time, we study how LLM systems fail under adversarial prompts, tool misuse, insecure retrieval, and unsafe generated code, then build defenses that make those systems trustworthy in security-critical workflows.
      </p>
    </article>

    <article class="research-topic">
      <div class="research-figure">
        <svg class="research-diagram" role="img" aria-label="Automated vulnerability repair pipeline" viewBox="0 0 360 180">
          <defs>
            <marker id="arrow-repair" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="context-stroke" />
            </marker>
          </defs>
          <rect class="diagram-panel" x="20" y="55" width="70" height="54" rx="6" />
          <rect class="diagram-panel" x="110" y="55" width="70" height="54" rx="6" />
          <rect class="diagram-panel" x="200" y="55" width="70" height="54" rx="6" />
          <rect class="diagram-panel" x="290" y="55" width="50" height="54" rx="6" />
          <text class="diagram-small" x="55" y="78" text-anchor="middle">Code</text>
          <text class="diagram-small" x="55" y="96" text-anchor="middle">context</text>
          <text class="diagram-small" x="145" y="78" text-anchor="middle">Detect</text>
          <text class="diagram-small" x="145" y="96" text-anchor="middle">weakness</text>
          <text class="diagram-small" x="235" y="78" text-anchor="middle">Repair</text>
          <text class="diagram-small" x="235" y="96" text-anchor="middle">safely</text>
          <text class="diagram-small" x="315" y="78" text-anchor="middle">Red</text>
          <text class="diagram-small" x="315" y="96" text-anchor="middle">team</text>
          <path class="diagram-line diagram-cyan" d="M92 82 H106" marker-end="url(#arrow-repair)" />
          <path class="diagram-line diagram-cyan" d="M182 82 H196" marker-end="url(#arrow-repair)" />
          <path class="diagram-line diagram-cyan" d="M272 82 H286" marker-end="url(#arrow-repair)" />
          <path class="diagram-dash" d="M315 112 C292 143, 81 143, 55 112" marker-end="url(#arrow-repair)" />
          <circle class="diagram-node diagram-navy-fill" cx="55" cy="126" r="5" />
          <circle class="diagram-node diagram-cyan-fill" cx="315" cy="126" r="5" />
        </svg>
      </div>
      <h2>Automated Vulnerability Repair, Secure Code Generation, RAG Security, Red Teaming</h2>
      <p>
        We develop automated workflows that find weaknesses, generate repairs, and verify whether the patched system is actually safer. This direction extends lessons from kernel integrity monitoring, branch-trace behavior modeling, IoT intrusion detection, and adversarial malware generation into secure code generation, RAG security, and practical red teaming.
      </p>
    </article>

    <article class="research-topic">
      <div class="research-figure">
        <svg class="research-diagram" role="img" aria-label="AI model boundary with attacks and defenses" viewBox="0 0 360 180">
          <defs>
            <marker id="arrow-model" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="context-stroke" />
            </marker>
          </defs>
          <rect class="diagram-boundary" x="102" y="28" width="156" height="118" rx="10" />
          <circle class="diagram-node diagram-cyan-fill" cx="180" cy="87" r="29" />
          <text class="diagram-label diagram-white" x="180" y="92" text-anchor="middle">Model</text>
          <path class="diagram-line diagram-navy" d="M37 58 C58 58, 73 63, 95 75" marker-end="url(#arrow-model)" />
          <path class="diagram-line diagram-navy" d="M323 57 C300 57, 285 64, 263 76" marker-end="url(#arrow-model)" />
          <path class="diagram-line diagram-cyan" d="M99 113 C72 129, 55 129, 35 119" marker-end="url(#arrow-model)" />
          <path class="diagram-line diagram-cyan" d="M261 113 C288 129, 306 129, 326 119" marker-end="url(#arrow-model)" />
          <text class="diagram-small diagram-caption" x="52" y="47" text-anchor="middle">SCA</text>
          <text class="diagram-small diagram-caption" x="308" y="47" text-anchor="middle">FL updates</text>
          <text class="diagram-small diagram-caption" x="64" y="149" text-anchor="middle">model theft</text>
          <text class="diagram-small diagram-caption" x="296" y="149" text-anchor="middle">property leak</text>
          <path class="diagram-dash" d="M128 34 L232 140" />
          <path class="diagram-dash" d="M232 34 L128 140" />
        </svg>
      </div>
      <h2>Security and Privacy of AI Models</h2>
      <p>
        We analyze how AI models leak sensitive information through side channels, model queries, local updates, and clustered training behavior. This line is grounded in work showing that side-channel information can amplify model extraction and that clustered federated learning can leak unintended properties, motivating defenses such as obfuscation, robust aggregation, and client-level differential privacy.
      </p>
    </article>

    <article class="research-topic">
      <div class="research-figure">
        <svg class="research-diagram" role="img" aria-label="Backdoor and differential privacy training diagram" viewBox="0 0 360 180">
          <defs>
            <marker id="arrow-privacy" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="context-stroke" />
            </marker>
          </defs>
          <rect class="diagram-panel" x="28" y="36" width="82" height="94" rx="6" />
          <circle class="diagram-node diagram-cyan-fill" cx="55" cy="62" r="8" />
          <circle class="diagram-node diagram-navy-fill" cx="82" cy="88" r="8" />
          <circle class="diagram-node diagram-alert-fill" cx="61" cy="111" r="8" />
          <text class="diagram-small diagram-caption" x="69" y="148" text-anchor="middle">VFL data</text>
          <path class="diagram-line diagram-cyan" d="M115 83 H157" marker-end="url(#arrow-privacy)" />
          <rect class="diagram-boundary" x="162" y="47" width="78" height="72" rx="8" />
          <text class="diagram-small" x="201" y="78" text-anchor="middle">identify</text>
          <text class="diagram-small" x="201" y="96" text-anchor="middle">purify</text>
          <path class="diagram-line diagram-cyan" d="M244 83 H287" marker-end="url(#arrow-privacy)" />
          <rect class="diagram-panel" x="292" y="36" width="44" height="94" rx="6" />
          <circle class="diagram-node diagram-navy-fill" cx="314" cy="70" r="10" />
          <path class="diagram-dash" d="M314 82 V116" />
          <text class="diagram-small diagram-caption" x="314" y="148" text-anchor="middle">robust AI</text>
          <path class="diagram-dash diagram-alert" d="M61 111 C111 152, 249 152, 314 114" />
          <text class="diagram-small diagram-caption" x="180" y="166" text-anchor="middle">remove triggers, reduce leakage</text>
        </svg>
      </div>
      <h2>Backdoor Attacks, Differential Privacy</h2>
      <p>
        We investigate attacks that implant hidden behavior into collaborative AI and defenses that identify, remove, or neutralize malicious information before it controls the prediction. This direction connects VFLIP’s inference-time identification and purification for vertical federated learning, FLGuard’s contrastive filtering of malicious clients, and differential privacy as a practical tool for reducing property leakage.
      </p>
    </article>
  </div>
</section>
