---START_METADATA---
{
  "title": "Portfolio",
  "author": "Gautam Mittal",
  "summary": "A portfolio of some projects that I sent to colleges.",
  "tags":[
    "me"
  ]
}
---END_METADATA---



### Kenko: Smart Nutrition Assistant
Kenko is an iPhone app that I built at PennApps XII, one of the world's largest collegiate hackathons. The app allows a user to take a picture of any food item, packaged or not, and acquire nutritional insights about that item using artificial intelligence. The app features an easy-to-use camera interface which is connected to a Node.js web-server that processes the image, identifies the food item in the frame, searches for its nutrition data on an open database, and returns an organized, smart nutrition label to the user. The app has Yelp integration and an Apple HealthKit feature, allowing users to keep track of their calories along with the rest of their health metrics. The app placed in the Top 10 and won “Best Cloud-based App” at PennApps, was written about in an article in the Philadelphia Magazine in September 2015, and won third place in CA-18’s Congressional App Challenge. All code is available [here](https://github.com/gmittal/kenko).

### PartySync: Social Streaming Platform
PartySync is an online social streaming platform that I created to watch videos with others in real-time. The web platform, available at partysync.herokuapp.com, allows users to create viewing rooms with unique names (i.e. “Cool”, “Party”, etc.) and build collaborative playlists, chat, and watch their favorite YouTube videos together using websocket technologies. The app works with YouTube, supports full-screen viewing, and has universal pause and skip buttons, allowing any user on the platform to control the viewing experience. PartySync can be used by a single individual, but can easily scale up to host viewing parties with dozens of members from around the world. All code is available [here](https://github.com/partysync).

### Ringo: Browser-based App IDE
I have spent a lot of time mentoring at various educational events and hackathons, and two years ago I realized that many students wanted to build iPhone apps but lacked two major resources: an iPhone and more importantly, a Mac with Apple’s Xcode development environment installed. At the time, those were the only tools one could use to build iPhone apps, so I decided to build Ringo, an online integrated development environment (IDE) to build and test iPhone apps in Apple’s Swift programming language. The editor works on any browser and has a built-in iPhone simulator, allowing users to build iPhone apps on any computer (even computers that are not Macs and don’t have Xcode installed) and test their code without a physical iOS device. Ringo is open-source and has been used at a variety of hackathons in the Bay Area, and is especially useful for educational workshops where not all of the students have access to Mac computers. The source code is available [here](https://github.com/ringo).

### Autonomous Golf Cart
This past summer, I explored a simple question: what does it take to build a self-driving car? Unfortunately, I did not have access to a car, so four of us pitched in to buy a used golf cart shell instead. We installed a 6HP combustion engine and connected the various mechanical subsystems (initial challenges included getting the brakes and the accelerator to work, and the engine to not stall). We also couldn’t afford a LIDAR sensor, used in most modern autonomous vehicles, so we recreated the NVIDIA end-to-end approach, which uses a deep learning pipeline, written using Google’s TensorFlow, to predict steering angles from a front-facing camera image. This would allow us to keep costs low with reasonable results. The hardware and software halves of the project are now in good shape and work well separately, allowing us to experiment with learning and image processing, but we are continuing to work on connecting the two together.
