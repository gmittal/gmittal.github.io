---START_METADATA---
{
  "title": "Understanding Toxic Social Media with Deep Learning",
  "author": "Gautam Mittal, Adnaan Sachidanandan",
  "summary": "Add description about neural networks and Reddit.",
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
    all = len([w for w in comment.split() if w not in STOP_WORDS])
    obscene = len([w for w in comment.split() if w in OBSCENE_WORDS])
    return 0 if all == 0 else obscene/all
```

This model is only able to determine toxicity of a snippet of text and not the other five labels provided in our training set. In addition, it is unaware of additional textual features that may provide greater context in determining a more accurate toxicity metric for a social media comment.

<iframe src="https://gautam.cc/susa-fa18/interactive/models/baseline/" height="250" scrolling="no"></iframe>
<lead>Baseline manual feature detector.</lead><br />

To improve on this model, we use deep learning methods to enable automatic detection of robust features to determine toxicity given social media text. We trained a [multi-layer perceptron](https://en.wikipedia.org/wiki/Multilayer_perceptron) with a word embedding layer of 256 units, a single hidden layer of 250 units, and an output layer with 6 units, one for each output label. Using the [Adam optimizer](https://arxiv.org/pdf/1412.6980.pdf), our network, when trained on the [Google Toxic Comment Classification](https://www.kaggle.com/c/jigsaw-toxic-comment-classification-challenge) data, converged in approximately 20 minutes on a quad-core Intel i7 CPU and achieved approximately 95% test accuracy on the Kaggle leaderboard. Although this model was able to discern the toxicity and other metrics for all of the validation samples with reasonable accuracy, this architecture inherently has no awareness of how different sequences of tokens affect the final output.

<iframe src="https://gautam.cc/susa-fa18/interactive/models/mlp/" height="250" scrolling="no"></iframe>
<lead>Multilayer perceptron. This neural network runs in your browser using TensorFlow.js!</lead><br /><br />

<table>
    <thead>
        <tr>
            <th><img src="/img/susa-fa18-mlp.png" height="400"></th>
            <th><img src="/img/susa-fa18-bilstm.png" height="400"></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><br />Multilayer Perceptron Architecture<br /> 24.3M parameters<br /> <strong>95% test accuracy</strong></td>
            <td><br />Bidirectional LSTM + 1D CNN<br /> 5.5M parameters<br /> <strong>98% test accuracy</strong></td>
        </tr>
    </tbody>
</table>

Our final model architecture was heavily inspired by top-scoring models on the public [Google Jigsaw Toxic Comment Classification Kaggle](https://www.kaggle.com/c/jigsaw-toxic-comment-classification-challenge) challenge, and the training data for our model is the publicly available Kaggle competition training set. Our model primarily consists of [bidirectional long short term memory (LSTM)](https://en.wikipedia.org/wiki/Bidirectional_recurrent_neural_networks) cells combined with [one-dimensional convolutional layers](https://blog.goodaudience.com/introduction-to-1d-convolutional-neural-networks-in-keras-for-time-sequences-3a7ff801a2cf) and fully-connected layers. These layers allow the model to find sequential patterns in the training data and learn how ordered sequences affect the final toxicity metric. We use [dropout](https://www.cs.toronto.edu/~hinton/absps/JMLRdropout.pdf) to regularize our model, allowing for more general predictions. The model has over 5.5 million parameters and takes approximately one hour to train on a quad-core Intel i7 CPU. Our model was trained on approximately 145,000 training samples, and achieved approximately 98% test accuracy on the Kaggle leaderboard.

<iframe src="https://gautam.cc/susa-fa18/interactive/models/lstm/" height="250" scrolling="no"></iframe>
<lead>Bidirectional LSTM.</lead><br />

The data that was used for analysis was downloaded from the public Reddit Self-Post Classification Task available on Kaggle. It contains over 1000 posts from over 1000 subreddits resulting in over 1 million posts of varying length, content, and contexts to analyze using our trained model.

### Reddit Analysis
With our model, we classified each post in the six labels mentioned above — toxic, severely toxic, obscene, insult, threat, and identity hate — each with a probability (0 meaning least-likely to be that label and 1 meaning most-likely). The basic statistics of the entire comment dataset are presented below:

![graph](/img/susa-fa18-graph.png)

There are some labels that are more prevalent in the comments than others. This distinction could also result from inaccuracy in the classifier, as there are multiple comments that carry different sentiments and meanings depending on the context that they appear in. For example,
From this classification, we can further categorize the comments into subreddits to obtain metrics on the toxicity and other labels for each subreddit. Out of the 1013 subreddits in the dataset, only one remained with the highest quantity of each metric: emojipasta. Another trend was the consistent presence of multiple specific pornographic subreddits in the 12 subreddits with the highest metric for each label, including the identity hate label. Furthermore, some comments appear multiple times in the 12 comments with the highest metric for each label, potentially indicating that these polarizing comments could have shifted the means of their subreddits in each respective label metric.

Alongside the comments, we obtained another dataset with categorical info on each subreddit. By combining the datasets, we determined which categories had the highest mean metrics for each label:

<iframe id="graph" src="https://gautam.cc/susa-fa18/interactive/graphs/" scrolling="no" height="600"></iframe>
<script>
var iframe = document.getElementById("graph");
iframe.contentWindow.postMessage("resize");
</script>

Sex/Relationships, Meta, and Writing/Stories top the metrics for each label, with drugs, politics/viewpoint, and social group behind these categories in multiple labels.

Further analysis into the comments revealed other interesting trends. Based on a word analysis, the top 12 comments in identity hate label all contained the same specific racial slur. Additionally, the top 12 comments in the threat label all contained the word "kill," either indicating the majority of the harshest comments contained this word, or the classifier determined that comments with this word are the most threatening.

### Proposal
This classification system can have many applications. To start, it can be used to determine which subreddits are ones to avoid, which is especially useful for users who prefer a safer online environment.

Furthermore, the system can directly be used to make every environment safe for all users via an automatic filtering system. With this system, as each comment is posted, the system can parse the comment, gather metrics for each label, and determine whether the comment should be removed or not. At the same time, with our current model, various problems could arise, as multiple inevitably non-toxic comments will be classified as toxic, therefore creating an atmosphere where individuals are unsure what they can and cannot post. This can create many problems, because it perpetuates a blurry line between what is good and bad to post, therefore creating a strict and user-unfriendly forum.

The system can also be used to gather insights into human behavior. By analyzing the words in each comment word analysis, we were able to discover important trends with what racial slurs are common in identity-hating comments. This could be expanded to conversation and messaging data to see what trends are there in more interpersonal communication.

The practical applications of this classifier are endless, and the trends we can discover using it can help us understand the online community a lot better than before.

This project and all related [code is open-sourced on GitHub](https://github.com/gmittal/susa-fa18).
