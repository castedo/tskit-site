---
layout: software-page
title: msprime
name: msprime
#Uncomment to override automatic values
#description: 
#repo_url: 
gh_org: tskit-dev
docs_url: https://tskit.dev/msprime/docs/
category: simulate
permalink: /msprime
python_package: msprime
logo: https://raw.githubusercontent.com/tskit-dev/msprime/main/msprime_logo.svg
code_snippet: |2
  ts = msprime.sim_ancestry(
      samples=10, 
      recombination_rate=1e-4, 
      sequence_length=1e6
  )
  ts = msprime.sim_mutations(ts, rate=1e-6)
---

Msprime is a Python package that simulates ancestral histories and 
DNA sequence data. Msprime uses backwards-in-time "coalescent" models
which allows it to simulate data very efficiently; however, it 
is not as flexible as forwards-in-time simulators like SLiM or fwdpy11.
