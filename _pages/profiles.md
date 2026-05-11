---
layout: page
permalink: /people/
title: People
description: members of Trust AI & Security Lab
nav: true
nav_order: 2
---

<section class="people-section professor-section">
  <h2>Professor</h2>
  <div class="people-profile">
    <div class="people-profile__image">
      {% include figure.liquid loading="eager" path="assets/img/pic.png" class="img-fluid z-depth-1 rounded-circle" alt="Younghan Lee" cache_bust=true %}
    </div>
    <div class="people-profile__body">
      <h3>Younghan Lee</h3>
      <p>
        Younghan Lee is an assistant professor at the Convergence Security Engineering Department,
        Sungshin Women's University. He worked as a postdoctoral researcher at Seoul National
        University.
      </p>

      <h4>Degree</h4>
      <ul>
        <li>Ph.D. in Electrical and Computer Engineering, Seoul National University, 2024. Advised by Prof. Yunheung Paek.</li>
        <li>BEng in Electrical and Electronic Engineering, Imperial College London, 2016.</li>
      </ul>

      <h4>Research Interests</h4>
      <p>
        Trust AI and Security, adversarial example attacks, model extraction attacks, federated
        learning, differential privacy, and multimodal learning.
      </p>

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

<section class="people-section">
  <h2>Graduate Students</h2>
  <p class="people-empty">No members listed yet.</p>
</section>

<section class="people-section">
  <h2>Undergraduate Students</h2>
  <p class="people-empty">No members listed yet.</p>
</section>

<section class="people-section">
  <h2>Alumni</h2>
  <p class="people-empty">No members listed yet.</p>
</section>

<section class="people-section">
  <h2>Past Undergraduate Students</h2>
  <p class="people-empty">No members listed yet.</p>
</section>
