---
layout: software-page
title: tskit
name: tskit
gh_org: tskit-dev
docs_url: https://tskit.dev/tskit/docs/
category: analyse
python_package: tskit
logo: https://raw.githubusercontent.com/tskit-dev/administrative/main/tskit_logo.svg
code_snippet: |2
  ts = tskit.load("example.trees")
  afs = ts.allele_frequency_spectrum()
---
The tskit library provides the underlying functionality used to load, examine, and
manipulate tree sequences, including efficient methods for calculating genetic statistics.
It often forms part of an installation of other software packages such as 
msprime, SLiM, fwdpp, and tsinfer.