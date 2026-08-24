<!-- Generated from the canonical HTML during the site build. -->

Canonical URL: [https://www.taislab.co.kr/research/](https://www.taislab.co.kr/research/)

# Research

Research in secure software engineering, LLM security, and AI/ML security.

LLMs for security

## LLM4SEC

01

### Automated Vulnerability Repair

We investigate whether language models can repair vulnerable code without changing its intended behaviour. Candidate patches are tested for security and functional correctness.

- Patch Generation
- Root-Cause Repair
- Build and Test Validation

Current work Validation-guided root-cause analysis and repair

Related paper [ Rethinking the Capability of Fine-Tuned Language Models for Automated Vulnerability Repair ](/publications/#han2026rethinking)

02

### Vulnerability Detection

We combine local code context with validation to identify security flaws while reducing false positives. The goal is to make automated findings more precise and actionable.

- Local Context Analysis
- Candidate Verification
- False-Positive Reduction

Related paper [ VulScope: Software Vulnerability Detection via Local Context Analysis and Verification ](/publications/#kim2026vulscope)

03

### Secure Code Generation

We study how language models can generate code that satisfies both functional requirements and security constraints. Validation is used to identify weaknesses early.

- Security-Aware Generation
- Functional Correctness
- Code Validation

Current work Secure code generation under functional and security requirements

04

### Kernel Code Fault Localization

We are building a benchmark for locating faults in kernel code, where low-level behaviour and long-range dependencies challenge conventional methods.

- Linux Kernel
- Fault Localization
- Benchmarking

Current work LLM-based fault localization for Linux kernel code

Security for LLMs and AI/ML systems

## SEC4LLM & AI/ML Security

01

### RAG Security

We examine attacks on retrieval-augmented generation, including malicious or misleading retrieved content. Attacks and defences are compared under shared evaluation criteria.

- Retrieval Poisoning
- Prompt Injection
- Attack–Defence Evaluation

Related paper [ Security Analysis and Defense Comparison in RAG ](/publications/domestic/#kim2026ragsecurity)

02

### IaC Agent Assurance

We evaluate AI-generated infrastructure-as-code beyond syntax and execution, asking whether it matches user intent and aligns with relevant security policies.

- Terraform
- Intent Alignment
- Security Policy Compliance

Current work Intent- and policy-aware evaluation of Terraform-generating agents

03

### ROS 2 Agent Assurance

We develop execution-grounded evaluations for AI-generated ROS 2 software, covering build and launch success, interface correctness, and expected runtime behaviour.

- ROS 2
- Interface Correctness
- Runtime Validation

Related paper [ Evaluating Open-Source LLM Performance for ROS 2 Code Generation: An Execution-Centric Pilot Study ](/publications/domestic/#lee2026ros2)

04

### Federated Learning Security

We study privacy and integrity risks in federated learning, including inference, inversion, backdoor, and Byzantine attacks, together with practical defences.

- Privacy Leakage
- Byzantine Robustness
- Backdoor Defence

Related paper [ FLGuard: Byzantine-Robust Federated Learning via Ensemble of Contrastive Models ](/publications/#lee2023flguard)

[View the full publication record](/publications/)
