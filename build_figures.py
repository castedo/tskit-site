import msprime
import json
import os

save_dir = os.path.join("assets", "images")

fig_name = "basic_ts"
random_seed=2079967937 #  Nice example found by repeated running of msprime
ts = msprime.sim_ancestry(20, population_size=1e4, sequence_length=1000, recombination_rate=1e-8, random_seed=random_seed)
unchanged_edges=[e for e in ts.edges() if e.left==0 and e.right==ts.sequence_length]
svg = ts.draw_svg(
    size=(1000, 250),
    node_labels={},
    root_svg_attributes={'id':'basic_ts'},
    style=
        ",".join(f"#basic_ts .node.a{e.parent}.n{e.child} > .edge" for e in unchanged_edges)
        + "{stroke: white; stroke: var(--section-headings-color); stroke-width: 2px}"
        + "#basic_ts .node > .sym {visibility: hidden;} #basic_ts .node.leaf > .sym {visibility: visible;}")
with open(os.path.join(save_dir, fig_name+".svg"), "wt") as svg_file:
    svg_file.write(svg)

