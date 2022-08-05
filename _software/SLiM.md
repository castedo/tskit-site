---
layout: software-page
title: SLiM
name: SLiM
gh_org: MesserLab
docs_url: https://messerlab.org/slim/
logo: http://benhaller.com/slim/icon/SLiM_256.jpg
priority: 10
force_show_title: true
category: simulate
code_snippet: |2
  initialize() {
      initializeTreeSeq();
      initializeMutationRate(1e-8);
      initializeMutationType(
          "m1", 0.5, "e", 0.001
      );
      initializeRecombinationRate(1e-8);
  }
  1 early() { sim.addSubpop("p1", 500); }
  2000 late() { 
      sim.treeSeqOutput("out.trees");
  }
---
SLiM is a forwards-time population genetics simulator capable of simulating arbitrarily
complex evolutionary scenarios. The underlying individual-based simulation
engine is highly optimized to enable modeling of entire chromosomes in
large populations. There is also a graphical user interface
for easy simulation set-up, interactive runtime control, and dynamical
visualization of simulation output.
