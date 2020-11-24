---
title: Why I like granular commits
slug: granular-git
timeZone: Europe/Berlin
published: 2020-11-18 11:30:00+01:00
---

# Why I like granular commits

It’s hard to imagine software development without version control.

When I first started writing code, I was using FTP and a simple folder on my
computer which I zipped and put on a USB-stick if I needed to transport it. If I
made changes and broke something, well, tough. I had to work it out through
trial and error—and usually didn’t.

Thankfully we have a tool so powerful that, when used carefully, can track every
change, document every modification, tell a story of a work’s evolution, and
provide clues when it doesn’t work as expected. In the following points, I’ll
illustrate what I mean by “carefully”.

## Track down harmful changes quickly

There is a very useful command called `git bisect`. When you have a problem,
like your code not compiling, and you don’t know what changed in order to cause
it, then this command is your best friend. It’s the equivalent of open code
surgery for your project.

You can start a bisect with:

```shell
git bisect start
git bisect bad
# find an old commit where everything is working
git checkout [working-commit]
git bisect good
```

Git then checks out another commit in the history halfway between the good
commit and the bad commit. This is a form of binary search and allows you to
find the offending commit quicker than if you went though each one, one by one.

You’ll then see something like this:

```
Bisecting: 0 revisions left to test after this (roughly 1 step)
[552340e4169af8da00fc209b4abac0b77e712a4e] add another seemingly fine file
```

We can check if the problem exists here. It is often a one line change or a
dependency update that causes errors.

Now suppose your commit has 200 changes in 6 different files. This makes it
harder and more time consuming to spot the offending change. You can avoid this
by committing _small_ and _granular_ changes to your Git history, so that you
can easily find where things have gone awry.

## Modular feature updates

When working on a feature for a few months or so, it’s common for requirements
to change. Changes can be hopefully as subtle as showing or not showing a piece
of text to guide a user on their journey, or whole sections of an application.

There are many instances in which you can change the behaviour of your project
without having to touch code, starting from small to large:

```
commit be0c93a4c830dfcb721a5ab2c9de631e2a38f918
Author: Alex Bass <alex@bass.dev>
Date:   Wed Nov 18 12:15:16 2020 +0100

    Update display transition duration from 150ms to 300ms
```

We get a disapproving glare from the designer, who misses the snappiness of the
original animation. Without opening the editor, we can flip it back to how it
was before.

Next, let’s say we added support for a new country in our application. This
might be encapsulated in a single commit.

```
commit 3a425a31e545ea3f1323add475b01a7cbed5fc21  (HEAD -> master)
Author: Alex Bass <alex@bass.dev>
Date:   Wed Nov 18 12:15:16 2020 +0100

    Add Japan to language switcher and country selector

commit b7b60b808d228cb7ea6b42b3f268a0146beb53ff
Author: Alex Bass <alex@bass.dev>
Date:   Wed Nov 18 12:36:11 2020 +0100

    Add JP translations
```

Now an intolerance to Matcha Kit-Kats unexpectedly sweeps the globe and product
wants to hold back for the launch. We can quickly remove the updates with a
couple of commands in less than a minute.

```
git revert 3a425a31e545ea3f1323add475b01a7cbed5fc21
git revert b7b60b808d228cb7ea6b42b3f268a0146beb53ff
```

## Serve as checkpoints

You know when you’re playing a video game deep into the night because you were
hooked and just had to finish a mission to see what comes next? Then before you
realise, it’s 04:00 and you’ve barely moved in 8 hours. Time to shut your eyes.
But first, save everything! I don’t want to play the same 8 hours again
tomorrow…

Whenever I’m working on something outside of my comfort zone, like anything with
Three.js or migrating to a new library I’ve never used before, it can be really
useful to “save” your changes at a point where everything seems to work okay.
These sorts of projects can involve a lot of tweaking and playing around, and
things can almost definitely break when you’re doing that.

Hence, it’s incredibly useful to save milestones in your progress so that you
can keep fiddling around, and when things break, you know you can jump back to
the latest working version with just a `git stash` or `git reset --hard` (or any
other of the [hundred ways to undo things][git-undo] with Git).

## Hold future you’s hand

Your commit history serves as a timeline for your project. When you join a new
team, or onboard another to yours, it’s worthwhile to give the commit or pull
request history a glance.

As you begin to get stuck into the code and modify existing components, using an
extension such as GitLens, or just Git Blame if you’re old school, adds a whole
layer of context to the code and can lead you on a journey of discovery,
beginning with a luscious hash, a modern day legend’s tale detailing the
victories and woes of the tree beneath you.

Ok, perhaps it’s not quite so cinematic in reality but picture that all your
team is on annual leave and you have a main course of refactor casserole with an
entrée of tangy dependency update and an aromatic digestif of failing
integration tests. Actually tastes a bit stodgy.

It’s at these times that granular, detailed /commitstories/ will be the tonic
that gives you strength and encourages your appetite for the meal. It’s a hell
of a lot easier to solve a problem when you have context and a bit of background
to why a change was made and the discussion around it (document your PR
comments!)

If that mental image isn’t working for you, imagine yourself in a year trying to
decipher what was going through your brain when you merged that branch. Give
future you a break, or at least a hand to hold.

## Summary

I could probably keep going on about how great granular committing is, but let’s
keep it short and _sweet_. The tl;dr is:

- Makes debugging and bisecting much easier, which can be real pulling-out-hair
  experiences
- Can make code updates quicker and more modular (what dev doesn’t like stuff to
  be modular, right?)
- Helps with tracking progress and following back your footsteps
- Serves as documentation for the future on how and why a feature/bug came to be

If you have any other thoughts or suggestions, please give me a mention or DM me
on [Twitter][twitter]!

[git-undo]:
  https://docs.gitlab.com/ee/topics/git/numerous_undo_possibilities_in_git/
[twitter]: https://twitter.com/alexbassy
