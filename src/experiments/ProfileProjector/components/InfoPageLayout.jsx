import React, { useState, useEffect } from "react"; // Added useEffect
import styles from "./InfoPage.module.css";

const InfoPageLayout = ({ pageKey, content }) => {
  const pageData = content[pageKey];
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  // **NEW: Reset state when the pageKey changes (e.g., from Pretest to Posttest)**
  useEffect(() => {
    setAnswers({});
    setIsSubmitted(false);
    setScore(null);
  }, [pageKey]); // Dependency array includes pageKey

  if (!pageData) {
    return (
      <div className={styles.infoPageContainer}>
        <h1>Content Not Found</h1>
        <p>Could not find content for key: {pageKey}</p>
      </div>
    );
  }

  const mcqSection = pageData.sections.find((sec) => sec.type === "mcq");
  const questions = mcqSection?.questions || [];

  const handleAnswerSelect = (questionId, optionIndex) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    if (!questions.length) return;

    let correctCount = 0;
    questions.forEach((q, qIndex) => {
      const questionId = q.id || qIndex;
      if (answers[questionId] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setIsSubmitted(true);
  };

  return (
    <div className={styles.infoPageContainer}>
      <h1>{pageData.title}</h1>
      {pageData.sections.map((section, index) => (
        <React.Fragment key={index}>
          {section.type === "paragraph" && <p>{section.text}</p>}
          {section.type === "list" && (
            <ul>
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
          {section.type === "mcq" && questions.length > 0 && (
            <div className={styles.mcqContainer}>
              {questions.map((q, qIndex) => {
                const questionId = q.id || qIndex;
                const userAnswer = answers[questionId];
                const isCorrect = userAnswer === q.correctAnswerIndex;

                return (
                  <div key={questionId} className={styles.questionBlock}>
                    <p className={styles.questionText}>
                      <strong>{qIndex + 1}.</strong> {q.question}
                    </p>
                    <ul className={styles.optionsList}>
                      {q.options.map((option, optionIndex) => {
                        let optionClass = styles.optionItem;
                        if (isSubmitted) {
                          if (optionIndex === q.correctAnswerIndex) {
                            optionClass += ` ${styles.correct}`;
                          } else if (optionIndex === userAnswer) {
                            optionClass += ` ${styles.incorrect}`;
                          } else {
                            optionClass += ` ${styles.dimmed}`;
                          }
                        }

                        return (
                          <li key={optionIndex} className={optionClass}>
                            <label>
                              <input
                                type="radio"
                                name={`question_${questionId}`}
                                value={optionIndex}
                                checked={userAnswer === optionIndex}
                                onChange={() =>
                                  handleAnswerSelect(questionId, optionIndex)
                                }
                                disabled={isSubmitted}
                                className={styles.radioInput}
                              />
                              {option}
                              {isSubmitted &&
                                optionIndex === q.correctAnswerIndex && (
                                  <span className={styles.feedbackMark}>
                                    {" "}
                                    ✔
                                  </span>
                                )}
                              {isSubmitted &&
                                optionIndex === userAnswer &&
                                !isCorrect && (
                                  <span className={styles.feedbackMark}>
                                    {" "}
                                    ✖
                                  </span>
                                )}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
              {!isSubmitted && (
                <button onClick={handleSubmit} className={styles.submitButton}>
                  Submit Answers
                </button>
              )}
              {isSubmitted && score !== null && (
                <div className={styles.scoreDisplay}>
                  <h3>
                    Your Score: {score} / {questions.length}
                  </h3>
                </div>
              )}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default InfoPageLayout;
