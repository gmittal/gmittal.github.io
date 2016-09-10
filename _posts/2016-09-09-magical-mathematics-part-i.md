---START_METADATA---
{
  "title": "Magical Mathematics: Part I",
  "author": "Gautam Mittal",
  "summary": "Searching for fibs in unexpected places.",
  "tags":[
    "me",
    "magic"
  ]
}
---END_METADATA---
Mathematics is truly magical. It's also really important. How important? Well, the entire basis for our understanding of the universe relies on rules outlined by mathematics. The examples I outline in this post are very simple and are limited to a very simple set of concepts.

![Applied Math from XKCD](http://imgs.xkcd.com/comics/purity.png)
<lead>_The purity spectrum._</lead>

### Fibonacci and The Golden Ratio
Today, I revisited a very magical series in mathematics: [The Fibonacci numbers](https://en.wikipedia.org/wiki/Fibonacci_number).

<center>$$0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ... $$</center>

The Fibonacci sequence is related to some of the most beautiful concepts yielded by mathematicians, such as the [Golden Ratio](https://en.wikipedia.org/wiki/Golden_ratio) (also denoted by $$\phi$$), defined as:

<center>$$ \phi = {1 + \sqrt 5 \over 2} \approx 1.61803399 $$</center>

The Golden Ratio is often found in nature and is considered appealing to the human eye. It takes the form of the following spiral (Donald Trump's hair happens to fit this "golden spiral" as well).

![Donald Trump's hair is the Golden Spiral](https://s-media-cache-ak0.pinimg.com/736x/eb/a0/81/eba081c6bf916fc86d809327dea09639.jpg)

### The Issue with a Recursive Formula
The simplest way to think of the Fibonacci sequence is to think of each number as the sum of the previous two numbers. This "recursive formula" is the most well-known way of computing the terms in the sequence. However, this recursive algorithm becomes exponentially more inefficient as you try to compute later terms in the sequence. Let's take this simple Scheme code to get some early terms of the sequence.
```scheme
; Our very basic (recursive) Fibonacci formula
(define (fib n)
    (cond
      ((= n 0) 0)
      ((= n 1) 1)
      (else
        (+ (fib (- n 1))
           (fib (- n 2))))))
```

Now let's trace some example calls. If I try to find the 2nd term of the series, the computer runs something like this:
```scheme
|(fib 2)
| (fib 1)
| 1
| (fib 0)
| 0

; Our final output
1
```

As you can see, when we call ```(fib 2)```, the computer has to calculate the values of ```(fib 0)``` and ```(fib 1)```, or the addends of the 2nd term. What happens when we try a bigger number, say ```(fib 5)```?
```scheme
|(fib 5)
| (fib 4)
| |(fib 3)
| | (fib 2)
| | |(fib 1)
| | |1
| | |(fib 0)
| | |0
| | 1
| | (fib 1)
| | 1
| |2
| |(fib 2)
| | (fib 1)
| | 1
| | (fib 0)
| | 0
| |1
| 3
| (fib 3)
| |(fib 2)
| | (fib 1)
| | 1
| | (fib 0)
| | 0
| |1
| |(fib 1)
| |1
| 2

; Final output
5
```
The execution tree is exponentially larger! In fact, my computer can barely compute ```(fib 20)```, and even that takes around a minute to calculate. Clearly, this recursive formula is fairly cumbersome if we cannot compute Fibonacci terms greater than the 20th term. Now in terms of computer science, you can drastically speed up the compute process by rewriting the Fibonacci code above as an [iterative procedure](https://mitpress.mit.edu/sicp/full-text/sicp/book/node15.html). However, the question is, can we do this using pure mathematics?

### Jacques Binet and Raiders of The Lost Explicit Formula
This is where it starts to get interesting.

It turns out that an intuitively recursive sequence like the Fibonacci numbers can be computed explicitly, or using a direct formula in terms of the $$nth$$ Fibonacci term.

One way to generate an approximation of the sequence is to use the Golden Ratio. Because the Fibonacci sequence adheres to the Golden Ratio, you can find a decimal approximation for the next term in the sequence by multiplying the previous term by the Golden Ratio.

<center>$$ F_\{n} \approx F_1 \cdot \phi ^n \quad F_1=1, $$</center>

Given that formula, the approximation of the sequence would go:

<center>$$ 1.00, 1.62, 2.62, 4.24, 6.85, 11.09, 17.94, ... $$</center>

That doesn't look great, but this approximation tends to work better with larger Fibonacci numbers, because as $$ n $$ gets larger, $$ F_\{n+1} / F_n  \approx  \phi $$.

That's great an all, but it does not provide an explicit _integer_ formula. Also, we don't just want an approximation. We want the real deal.

In fact, [Jacques Binet](http://mathworld.wolfram.com/BinetsFibonacciNumberFormula.html), a French mathematician, created an explicit integer formula ([proof available here](http://math.stackexchange.com/questions/846126/base-case-in-the-binet-formula-proof-by-strong-induction)) using the Golden Ratio (he, along with Euler and Bernoulli were the first to prove the ratio). He discovered this:

<center>$$ F_n = {{\phi ^n - (- \phi) ^{-n}} \over \sqrt(5)} $$</center>

The formula above produces something that is truly amazing (but not unexpected):
<center>$$ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ... $$</center>

Binet produced this around 150 years ago. But _what if I told you there was a simpler (more profound) method_ of generating Fibonacci numbers?


### Math or Magic?
The rational function below produces all of the Fibonacci numbers.

![The magic generator](https://puu.sh/r64k0/c2642f6d1b.png)
<center>$$ G(x) = {{1} \over {1 - x - x^2}} $$</center>

<center>$$ G(10^{-3}) = 1.0102030508132134... $$</center>

Woah, now that's some real wizardry. This is where I start to question my sanity. We talked about recursive formulas. Then we discussed the Golden Ratio. But how can a rational function that involves neither of those two produce the magical series once discovered by Fibonacci?

This is crazy, and to be honest, I don't have the credentials to prove this sort of magic. I first saw this formula on [Paul Hankin's](https://paulhankin.github.io/Fibonacci/) blog, and I found it particularly interesting because I had never seen it done this way before. He has a wonderful proof and explanation of how this works, and has some nice Python code which you can try for yourself.

Until next time, keep observing the mystical ways of the mathematical universe.
