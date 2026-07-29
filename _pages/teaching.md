---
layout: page
permalink: /teaching/
title: Teaching
description: University courses, teaching evidence, and selected additional teaching.
nav: true
nav_order: 5
---

{% assign formal_teaching = site.data.teaching.formal %}
{% assign teaching_evidence = site.data.teaching.evidence %}
{% assign additional_teaching = site.data.teaching.additional %}

<section class="teaching-page">
  <section class="teaching-section" aria-labelledby="university-teaching-heading">
    <header class="teaching-section__heading">
      <p class="teaching-eyebrow">Formal courses</p>
      <h2 id="university-teaching-heading">University teaching</h2>
    </header>

    <div class="teaching-term-list">
      {% for term in formal_teaching %}
        <section class="teaching-term" aria-labelledby="teaching-term-{{ forloop.index }}">
          <header class="teaching-term__heading">
            <h3 id="teaching-term-{{ forloop.index }}">{{ term.term }}</h3>
            <p class="teaching-term__load">{{ term.load }}</p>
          </header>

          <div class="teaching-course-list">
            {% for course in term.courses %}
              <article class="teaching-course">
                <div class="teaching-course__main">
                  <h4>{{ course.title }}</h4>
                  <p>{{ course.institution }}</p>
                  {% if course.description %}
                    {% for detail in course.description %}
                      <p class="teaching-course__detail">{{ detail }}</p>
                    {% endfor %}
                  {% endif %}
                </div>
                {% if course.meta %}
                  <p class="teaching-course__year">{{ course.meta }}</p>
                {% endif %}
              </article>
            {% endfor %}
          </div>
        </section>
      {% endfor %}
    </div>
  </section>

  <section class="teaching-section" aria-labelledby="teaching-evidence-heading">
    <header class="teaching-section__heading">
      <p class="teaching-eyebrow">Evaluation and development</p>
      <h2 id="teaching-evidence-heading">Teaching evidence</h2>
    </header>

    <ul class="teaching-evidence">
      {% for item in teaching_evidence %}
        <li>{{ item }}</li>
      {% endfor %}
    </ul>
  </section>

  <section class="teaching-section" aria-labelledby="additional-teaching-heading">
    <header class="teaching-section__heading">
      <p class="teaching-eyebrow">Postgraduate, international, and invited teaching</p>
      <h2 id="additional-teaching-heading">Additional teaching</h2>
    </header>

    <div class="teaching-course-list">
      {% for course in additional_teaching %}
        <article class="teaching-course">
          <div class="teaching-course__main">
            <h3>{{ course.title }}</h3>
            <p>{{ course.institution }}</p>
            {% if course.description %}
              {% for detail in course.description %}
                <p class="teaching-course__detail">{{ detail }}</p>
              {% endfor %}
            {% endif %}
          </div>
          <p class="teaching-course__year">{{ course.year }}</p>
        </article>
      {% endfor %}
    </div>
  </section>

</section>
