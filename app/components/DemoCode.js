module.exports = {
  source : "'Animal_Minimalis\n'By: Nums -- Modified by Brad Lyman\n'Good for mutation sims and for\n'newbies to see how a basic bot works.\n'Contains everything necessary for it\n'to survive and reproduce.\n\n' Gene 1 Food Finder\ncond\n  eye5 > 0\n  and refeye != myeye\nstart\n  dx <- refveldx\n  up <- refvelup + 30\nstop\n\n' Gene 2 Eat Food\ncond\n  eye5 > 50\n  and refeye != myeye\nstart\n  shoot <- -1\n  up    <- refvelup\nstop\n\n' Gene 3 Avoiding Family\ncond\n  eye5 = 0\n  or refeye = myeye\nstart\n  rnd   <- 314\n  aimdx <- rnd\nstop\n\n' Gene 4 Reproduce\ncond\n  nrg > 20000\nstart\n  repro <- 10\nstop\n\nend\n"
};
