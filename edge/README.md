# TAIS Lab edge content negotiation

This Worker serves the existing Jekyll build without changing its visual design. For page URLs it
negotiates between the generated HTML and Markdown variants, returns `406` when neither is
acceptable, and adds `Vary: Accept, Accept-Encoding` to negotiated responses. Missing Markdown
routes receive a short agent-oriented `404` response.

The build writes `_site/.nojekyll` because the Markdown alternatives are final static assets. The
GitHub Pages deployment also preserves this marker so the generated files are not passed through a
second Jekyll and Liquid rendering step.

The Worker is deliberately not connected to the public domain by this repository change. The
current domain points directly to GitHub Pages, which cannot inspect an `Accept` request header or
set the required `Vary` response header. Activating this layer therefore requires a Cloudflare
account, a deployment token, and an approved DNS or custom-domain change.

Local checks:

```sh
bundle exec jekyll build --lsi
python3 scripts/generate_agent_markdown.py --site-dir _site
node --test edge/worker.test.mjs
```

After an approved deployment, verify both variants:

```sh
curl -i -H 'Accept: text/markdown' https://www.taislab.co.kr/research/
curl -i -H 'Accept: text/html' https://www.taislab.co.kr/research/
curl -i -H 'Accept: application/json' https://www.taislab.co.kr/research/
curl -i -H 'Accept: text/markdown' https://www.taislab.co.kr/path-that-does-not-exist
```
