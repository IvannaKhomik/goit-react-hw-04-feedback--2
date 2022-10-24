import { useState } from 'react';
import { Container } from './App.styled';
import { FeedbackOptions } from './FeedbackOptions';
import { Statistics } from './Statistics';
import { Section } from './Section';
import { Notification } from './Notificate';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const changeStatistics = event => {
    const { name } = event.currentTarget;
    switch (name) {
      case 'good':
        setGood(state => state + 1);
        break;
      case 'neutral':
        setNeutral(state => state + 1);
        break;
      case 'bad':
        setBad(state => state + 1);
        break;
      default:
        return;
    }
  };
  const options = ['good', 'neutral', 'bad'];
  const totalFeedbacks = good + neutral + bad;
  const noFeedbacks = totalFeedbacks === 0;
  const countPositiveFeedbackPercentage = total => {
    if (total > 0) {
      return Math.round((good / total) * 100);
    }
  };
  const totalPositivePercentage =
    countPositiveFeedbackPercentage(totalFeedbacks);

  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions onLeaveFeedback={changeStatistics} options={options} />
      </Section>

      <Section title="Statistics">
        {noFeedbacks ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedbacks}
            positivePercentage={totalPositivePercentage}
          />
        )}
      </Section>
    </Container>
  );
};
