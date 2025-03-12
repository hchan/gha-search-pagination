# A Showcase of How to Search for Workflows in GHA

The [`gh-pages.yml`](.github/workflows/gh-pages.yaml) will run on any push to the `main` branch in the `.github/workflows` directory.  
This action will update the following files:
- [`workflows.json`](https://hchan.github.io/gha-search-pagination/workflows.json)
- [`metadata.json`](https://hchan.github.io/gha-search-pagination/metadata.json)

These files will then be used to generate a RemixJS UI that helps search for workflows.

## GitHub Actions Search and Pagination

You can access the GitHub Actions Search and Pagination UI [here](https://hchan.github.io/gha-search-pagination/).

## References
* [Remix Docs - SPA Mode](https://remix.run/docs/en/main/guides/spa-mode)
