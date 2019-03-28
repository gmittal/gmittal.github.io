---START_METADATA---
{
  "title": "Understanding Toxic Social Media with Deep Learning",
  "author": "Gautam Mittal, Adnaan Sachidanandan",
  "summary": "Obligatory Hello, world!",
  "tags":[
    "me"
  ]
}
---END_METADATA---

_This post was co-authored with Adnaan Sachidanandan and was written for the UC Berkeley [Statistics Undergraduate Student Association](https://susa.berkeley.edu/)._

The proliferation of online discourse over the past decade has enabled widespread accessibility of information and ideas, with billions of users actively using social networking platforms such as Reddit, YouTube, and Facebook. However, the popularity of Internet-based discussions has also come with greater anonymity in these conversations. In some of these online discussions, toxic environments emerge. Exploring the interactions that cause these toxic environments to develop is important in order to eliminate this problem. In addition, understanding the toxic "composition" of an environment, such as the relative frequencies of obscenities, insults, threats, and comments propagating identity hate, can also provide insight towards how to fight these issues. Although Internet censorship and systems that control freedom of speech are contentious issues, our research aims to investigate trends and characteristics about these toxic conversations using deep neural networks.

### Model Selection, Architecture, and Data
There are multiple approaches to quantifying toxicity in text on social media platforms. An intuitive baseline model would be to correlate toxicity with the frequency of obscene words found in the comment threads on social networks. However, the context of the obscenities chosen can greatly affect the overall toxicity of a particular comment. As a result, a more robust model is necessary to effectively quantify toxicity from the context and other textual features such as emoticons and punctuation of comments.

Inspired by the Google Jigsaw Conversation AI team’s efforts to automate moderation at scale with natural language processing models, we designed and trained a deep neural network to automatically learn robust features from text inputs and to provide an associated multi-label classification score among six different labels: toxic, severe toxic, obscene, threat, insult, and identity hate.

Our baseline model, which filters out [stop words](https://nlp.stanford.edu/IR-book/html/htmledition/dropping-common-terms-stop-words-1.html) and uses the frequency of obscene words as a toxicity metric can be described by the following Python code:

```python
def predict(comment):
    words = len([word for word in comment.split() if word not in STOP_WORDS])
    obscene = len([word for word in comment.split() if word in OBSCENE_WORDS])
    return 0 if words == 0 else obscene/words
```

This model is only able to determine toxicity of a snippet of text and not the other five labels provided in our training set. In addition, it is unaware of additional textual features that may provide greater context in determining a more accurate toxicity metric for a social media comment.

<iframe src="https://gautam.cc/susa-fa18/interactive/models/baseline/" width="100%" border="0"></iframe>

To improve on this model, we use deep learning methods to enable automatic detection of robust features to determine toxicity given social media text. We trained a [multi-layer perceptron](https://en.wikipedia.org/wiki/Multilayer_perceptron) with a word embedding layer of 256 units, a single hidden layer of 250 units, and an output layer with 6 units, one for each output label. Using the [Adam optimizer](https://arxiv.org/pdf/1412.6980.pdf), our network, when trained on the [Google Toxic Comment Classification](https://www.kaggle.com/c/jigsaw-toxic-comment-classification-challenge) data, converged in approximately 20 minutes on a quad-core Intel i7 CPU and achieved approximately 95% test accuracy on the Kaggle leaderboard. Although this model was able to discern the toxicity and other metrics for all of the validation samples with reasonable accuracy, this architecture inherently has no awareness of how different sequences of tokens affect the final output.

<iframe src="https://gautam.cc/susa-fa18/interactive/models/mlp/" width="100%" border="0"></iframe>
