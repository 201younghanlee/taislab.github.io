# TAIS Lab edge content negotiation

This Worker serves the existing Jekyll build without changing its visual design. For page URLs it
negotiates between the generated HTML and Markdown variants, returns `406` when neither is
acceptable, and adds `Vary: Accept, Accept-Encoding` to negotiated responses. Any missing route,
including a dotted path such as `/missing.txt`, receives a short agent-oriented Markdown `404`
when the client requests Markdown while browsers retain the existing HTML `404` page.

The build writes `_site/.nojekyll` because the Markdown alternatives are final static assets. The
GitHub Pages deployment also preserves this marker so the generated files are not passed through a
second Jekyll and Liquid rendering step. It also copies the Worker to `_site/_worker.js`, the
[Cloudflare Pages Advanced Mode](https://developers.cloudflare.com/pages/functions/advanced-mode/)
entry point, so the identical site can be deployed with request-time content negotiation.

The Worker is deployed through Cloudflare Pages for `www.taislab.co.kr`. The generated `_worker.js`
is the request-time negotiation layer; publishing only the static files to GitHub Pages will not
provide `Accept` negotiation.

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
