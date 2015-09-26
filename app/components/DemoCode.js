module.exports = {
  source : "\n'Animal_Minimalis\n'By: Nums -- Modified by Brad Lyman\n'Good for mutation sims and for\n'newbies to see how a basic bot works.\n'Contains everything necessary for it\n'to survive and reproduce.\n\n' Gene 1 Food Finder\ncond\n  eye5 &gt; 0\n  and refeye != myeye\nstart\n  dx &lt;- refveldx\n  up &lt;- refvelup + 30\nstop\n\n' Gene 2 Eat Food\ncond\n  eye5 &gt; 50\n  and refeye != myeye\nstart\n  shoot &lt;- -1\n  up    &lt;- refvelup\nstop\n\n' Gene 3 Avoiding Family\ncond\n  eye5 = 0\n  or refeye = myeye\nstart\n  rnd   &lt;- 314\n  aimdx &lt;- rnd\nstop\n\n' Gene 4 Reproduce\ncond\n  nrg &gt; 20000\nstart\n  repro &lt;- 10\nstop\n\nend\n"
};


