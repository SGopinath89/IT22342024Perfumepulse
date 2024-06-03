from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import sys

def categorize_comment(comment):
    analyzer = SentimentIntensityAnalyzer()
    vs = analyzer.polarity_scores(comment)
    if vs['compound'] >= 0.05:
        return 'good'
    elif vs['compound'] <= -0.05:
        return 'bad'
    else:
        return 'neutral'

if __name__ == "__main__":
    if len(sys.argv) > 1:
        comment = sys.argv[1]
        category = categorize_comment(comment)
        print(category)
    else:
        print("neutral")
