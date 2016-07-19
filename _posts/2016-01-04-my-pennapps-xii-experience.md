---START_METADATA---
{
  "title": "Hacking Our Way To The Top",
  "author": "Gautam Mittal",
  "summary": "A brief reflection on my experience at PennApps XII.",
  "tags":[
    "nano"
  ]
}
---END_METADATA---
![expo](https://cdn-images-1.medium.com/max/800/1*8aHGZAieTmEe-TbSbib1lQ.jpeg)

This post has been long overdue for a few months now, but while I’m on winter break in a tropical country without any Wi-Fi, I thought I’d spend some time reminiscing on my team’s experiences at the University of Pennsylvania’s premier hackathon. Also, in true hackathon spirit, I’m writing this post while sleep deprived.

This past September, I was lucky enough to be selected as one of 2000 hackers to attend PennApps XII. I was super excited when I received the acceptance email in my inbox, as this would be my second hackathon outside of California. At the first out of state hackathon I attended, MHacks, I had spent an immense amount of time planning and forming a team. In the end, our hack ended up making the top ten, but the number of roadblocks we encountered during the hackathon caused most of our planning (and hours spent staying up hacking) to go to waste. If you’re curious about what happened, you can [read my earlier post](/the-mhacksv-experience).

This time, with other priorities such as schoolwork and sports, I decided to take a more relaxed approach. I decided to team up with one of my classmates who was also well acquainted with hackathons. We didn’t really have an idea, but we thought we would just try and build something simple, but also really cool. Both of us had a broad enough experience and flexibility in a variety of technologies that it wasn’t absolutely crucial to think of an idea immediately.

### Last Minute Plans
<lead>Are Sometimes The Best<lead>

I didn’t even think about PennApps until probably a couple of days before the event. I had other things going on, such as cross country meets and chemistry exams. The night before our flight to Philadelphia, my teammate and I had a quick, thirty minute brainstorming session over the Internet. We both agreed that it would be really cool to implement some form of machine learning or artificial intelligence in our app, particularly something related to image processing.

Since PennApps’ theme was centered around health-related hacks, we decided to focus our attention towards medical apps. At first, we thought we could try and build an app that could diagnose common injuries by taking a picture of the injury with your smartphone. That idea was quickly extinguished, as we realized there was no way to measure the depth or intensity of a wound (e.g. how does the app differentiate a minor scratch from a gash?). We continued to think up ideas, until it hit us. What if we could build a similar app, except instead of diagnosing injuries, it could glean nutritional information from a picture of food? Of course, it was still going to be a challenge to build, but it was definitely a more realistic idea. We had no clue what sponsor prizes we were going to go for, nor any idea what APIs or services we would use. We decided to call it a night and just not worry about it until the hackathon began.

### PennApps XII Kickoff
<lead>#STACKED<lead>

Our flight was scheduled to leave San Francisco at 7am. Personally, I wasn’t super pleased with the timing, as it didn’t allow for an adequate amount of sleep prior to the tiresome 36 hours that were ahead of us, but it didn’t matter because we were headed to the largest hackathon in the world. Pretty much all of the hackers from Stanford, UC Berkeley, and the rest of the Bay Area were on our flight, which was a relief, because that meant we were no longer the only ones on the flight discussing popular Swift and JavaScript frameworks.

When we arrived at the Wells Fargo Center a few hours later, the amount of energy, people, and swag circulating around was incredible.

![opening_ceremony](https://cdn-images-1.medium.com/max/800/1*NMDHXEbIv_biV1Ax554ggg.jpeg)
_PennApps XII Opening Ceremony_

![enter_hackathon](https://cdn-images-1.medium.com/max/800/1*AgLsefacDK33EUGLy5Q6kg.jpeg)
_Sponsor tables getting set up for the event._

After listening to some talks by various software engineers, CEOs, and Penn faculty, we began building our app.

### Try New Things, Meet Everyone
<lead>Code, People, Food, and Sleep Deprivation<lead>

Despite the fact that the Wells Fargo Center was capable of comfortably seating over 20,000 spectators, people were scrambling to desperately find a nice place to hack. We decided to set up camp at a quiet table on the second floor of the stadium.

On the flight over, I had spent some time thinking about how the app would work. The app would basically allow the user to take a picture of some food, and that picture would be uploaded to a server. The server would then have to use some API (or algorithm that we designed, though highly unlikely) to try and figure out what the food in the picture was (e.g. take a picture of a burger and have the server output “burger”). Then it would make a lookup of the food item in a nutrition database. It seemed simple enough.

Within a couple of hours of the hackathon’s start, our iOS frontend was well underway, and we had a working prototype of our backend. We decided to reward ourselves for this first success by heading down to the hardware lab to checkout some cool tech to play around with. Half of the attendees must have been standing in that line. The line went on forever. Things started to clear up when dinner started, as people began to give up and leave the line in hopes to reach the dinner buffet before another gigantic line for food formed. I decided to hold our spot in the hardware line while my teammate went off to grab dinner for both of us.

![meal](https://cdn-images-1.medium.com/max/800/1*v2B-LfCczry34MieEBvLOA.jpeg)
_A "normal" meal at PennApps._

![first_supper](https://cdn-images-1.medium.com/max/800/1*acwiPRRIXlM_2Mi8U4wKdw.jpeg)
_The first dinner at PennApps XII: Pasta, salad, and string beans._

The food was pretty good, we met a lot of cool people, and we continued working on our hack.

This was the cycle of events that constantly occurred. Hack. Eat. Network. Sleep (this step was usually shortened or omitted). Repeat. In my opinion, that is how everyone’s hackathon experience should be. Usually, I see a lot of people stressing out about their hack, skipping crucial steps in this cycle. My one piece of advice to any new hackers or those interested in hackathons is to never break this cycle. Things will only get worse and you’ll destroy your productivity/workflow if you skip steps in this cycle.

### The Expo
<lead>Unexpected Surprises<lead>

36 hours later, we start polishing up our hack, preparing it for the PennApps expo. We submitted our project to the [hackathon’s devpost](http://devpost.com/software/kenko-dnovlh), and even found time to make this cool demo video:

<center><iframe width="560" height="315" src="https://www.youtube.com/embed/SdfDD9xpK_0" frameborder="0" allowfullscreen></iframe></center>

We even practiced our product pitch a few times.

Finally, the PennApps XII Expo began. The stadium floor was packed with tired, excited hackers and the energy level was absolutely incredible.

![dave_fontenot](https://cdn-images-1.medium.com/max/800/1*Kr3Cx-zjVxWGcMn-EpWX2Q.jpeg)
_An excited Dave Fontenot tries to make his way through the crowded exhibition._

We had all sorts of people show up to our table to learn more about our hack. Some were skeptical of our claim that we could gather calorie data from a picture of food, and were convinced that we had preprogrammed the app to already know the nutrition facts for the food that we had brought for our demo. Our app was truly put to test when one of the judges ran off and came back a few minutes later holding an old M&M wrapper which she had found in the trash. As we had predicted (and to her amazement) the app successfully returned the nutrition facts.

After about an hour of showing off our creation, we were invited by a member of the PennApps staff to a special live interview on our hack. This was one of the greatest surprises to us, as we had come to PennApps to have fun and meet new people. It had never occurred to us that our hack might actually be recognized by PennApps as an interview-worthy hack. We were thrilled. After the interview we were told to enjoy the rest of the expo, but we were not prepared for what was about to happen next.

I’m going to leave you on a cliffhanger from my previous statement for just a bit, because what happened between the PennApps interview and what happened next was one of the reasons why I love to go to hackathons. While walking through the expo, I enjoyed talking with people not only about their hacks, but also about their background. I was interested to see where everyone went to college, where they went to high school, their hobbies, why the built what they built, etc. One team I talked with said they attended Princeton and had graduated from Palo Alto High School, one of the local high schools where I live. I found this to be astonishing, because the chances of this happening were extremely low. I could have completely missed this person. This is why I love networking at hackathons. You’ll always meet interesting people, and learn a lot from them.

Finally, the most second most exciting moment of the hackathon was about to begin. The top ten hacks were about to be announced. One of the PennApps organizers jumped on the main stage with a list, and began reading off team names. We heard him call “Kenko” to the stage. We were completely awestruck. We had achieved what we had never expected to achieve. We were even more shocked when the PennApps team told us we had to present first. We immediately started practicing our on-stage demo.

![proud_hackers](https://cdn-images-1.medium.com/max/800/1*IIvFnYbcvFXzZT69LtsGSQ.jpeg)
_Taking the stage at PennApps XII._

![words_cannot_describe](https://cdn-images-1.medium.com/max/800/1*QduOVJRb1A95M1swuh06xw.jpeg)
_Words could not express how happy and nervous we were._

Here’s a video of our demo on stage ([9:59](https://youtu.be/TvjwUh9taOA?t=9m59s)). It wasn’t perfect, but we’re still pretty happy.

<center><iframe width="560" height="315" src="https://www.youtube.com/embed/TvjwUh9taOA" frameborder="0" allowfullscreen></iframe></center>

I hope this post gave a clear illustration of how we managed to make our way to the top ten at the world’s largest hackathon, and the mentality and attitude we had going into the competition. We’re also planning on publicly releasing Kenko on the App Store soon, so stay tuned!
