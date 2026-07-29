---
layout: page
permalink: /publications/
title: Publications
description: International and domestic journal articles, conference papers, and preprints
nav: true
nav_order: 4
---

<!-- _pages/publications.md -->
<div class="publications publications-page">

<p class="publication-intro">
  Research outputs are organised by venue scope and publication type.
  Accepted and forthcoming work is labelled explicitly, and manuscripts under
  review are not included.
</p>

<nav class="publication-index" aria-label="Publication sections">
  <a href="#international-publications">
    <span>International</span>
    <small>Journals, conferences, and preprints</small>
  </a>
  <a href="#domestic-publications">
    <span>Domestic</span>
    <small>Peer-reviewed journal articles</small>
  </a>
</nav>

<section class="publication-scope" id="international-publications" aria-labelledby="international-heading">
  <header class="publication-scope__header">
    <p>Global venues</p>
    <h2 id="international-heading">International Publications</h2>
  </header>

  <div class="publication-kind" id="international-journals">
    <h3>Journal Articles</h3>
    {% bibliography --group_by year --group_order descending --query @*[scope=international && pubtype=journal] %}
  </div>

  <div class="publication-kind" id="international-conferences">
    <h3>Conference Papers</h3>
    {% bibliography --group_by year --group_order descending --query @*[scope=international && pubtype=conference] %}
  </div>

  <div class="publication-kind publication-kind--compact" id="international-preprints">
    <h3>Preprints</h3>
    {% bibliography --group_by year --group_order descending --query @*[scope=international && pubtype=preprint] %}
  </div>
</section>

<section class="publication-scope" id="domestic-publications" aria-labelledby="domestic-heading">
  <header class="publication-scope__header">
    <p>Korean venues</p>
    <h2 id="domestic-heading">Domestic Publications</h2>
  </header>

  <div class="publication-kind" id="domestic-journals">
    <h3>Journal Articles</h3>
    {% bibliography --group_by year --group_order descending --query @*[scope=domestic && pubtype=journal] %}
  </div>
</section>

</div>
