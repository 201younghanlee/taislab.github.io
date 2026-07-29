---
layout: page
permalink: /publications/
title: Publications
description: International conference papers, journal articles, and preprints
nav: true
nav_order: 4
---

<!-- _pages/publications.md -->
<div class="publications publications-page">

<p class="publication-intro">
  International research outputs are listed with conference papers first,
  followed by journal articles and preprints. Accepted and forthcoming work is
  labelled explicitly, and manuscripts under review are not included. Author
  roles are shown only where they are verified from the final paper or
  publication record.
</p>

<nav class="publication-index" aria-label="Publication scope">
  <a href="{{ '/publications/' | relative_url }}" aria-current="page">
    <span>International</span>
    <small>Conferences, journals, and preprints</small>
  </a>
  <a href="{{ '/publications/domestic/' | relative_url }}">
    <span>Domestic</span>
    <small>Conference papers and journal articles</small>
  </a>
</nav>

<section class="publication-scope" id="international-publications" aria-labelledby="international-heading">
  <header class="publication-scope__header">
    <p>Global venues</p>
    <h2 id="international-heading">International Publications</h2>
  </header>

  <div class="publication-kind" id="international-conferences">
    <h3>Conference Papers</h3>
    {% bibliography --group_by year --group_order descending --query @*[scope=international && pubtype=conference] %}
  </div>

  <div class="publication-kind" id="international-journals">
    <h3>Journal Articles</h3>
    {% bibliography --group_by year --group_order descending --query @*[scope=international && pubtype=journal] %}
  </div>

  <div class="publication-kind publication-kind--compact" id="international-preprints">
    <h3>Preprints</h3>
    {% bibliography --group_by year --group_order descending --query @*[scope=international && pubtype=preprint] %}
  </div>
</section>

</div>
