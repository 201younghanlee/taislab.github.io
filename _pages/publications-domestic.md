---
layout: page
permalink: /publications/domestic/
title: Publications
description: Domestic conference papers and journal articles
nav: false
---

<div class="publications publications-page">

<p class="publication-intro">
  Domestic research outputs are listed with conference papers first, followed
  by journal articles. Author roles are shown only where they are verified from
  the final paper or publication record.
</p>

<nav class="publication-index" aria-label="Publication scope">
  <a href="{{ '/publications/' | relative_url }}">
    <span>International</span>
    <small>Conferences, journals, and preprints</small>
  </a>
  <a href="{{ '/publications/domestic/' | relative_url }}" aria-current="page">
    <span>Domestic</span>
    <small>Conference papers and journal articles</small>
  </a>
</nav>

<section class="publication-scope" id="domestic-publications" aria-labelledby="domestic-heading">
  <header class="publication-scope__header">
    <p>Korean venues</p>
    <h2 id="domestic-heading">Domestic Publications</h2>
  </header>

  <div class="publication-kind" id="domestic-conferences">
    <h3>Conference Papers</h3>
    {% bibliography --group_by year --group_order descending --query @*[scope=domestic && pubtype=conference] %}
  </div>

  <div class="publication-kind publication-kind--compact" id="domestic-journals">
    <h3>Journal Articles</h3>
    {% bibliography --group_by year --group_order descending --query @*[scope=domestic && pubtype=journal] %}
  </div>
</section>

</div>
