---
layout: software-page
title: pyslim
name: pyslim
#Uncomment to override automatic values
#description: 
#repo_url: 
gh_org: tskit-dev
docs_url: https://tskit.dev/pyslim/docs/stable
category: analyse
python_package: pyslim
priority: 12
code_snippet: |2
  rts = pyslim.recapitate(
      ts, 
      ancestral_Ne=10000
  )
---

pyslim is a small python package to help analyse and manipulate tree sequences
produced by SLiM, e.g., to identify individuals alive at a particular time,
or to recapitate the results of a SLiM simulation.

