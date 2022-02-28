import styles from '../../styles/Home.module.css';

type TModalFeedbackProps = {
  success: boolean
  failure: boolean
  word: string
  reset: () => void
}

const ModalFeedback = ({ success, failure, word, reset }: TModalFeedbackProps) => {
  if (!success && !failure) {
    return null;
  }

  if (failure) {
    return (
      <div className={styles.modal}>
        <h1 className={styles.title}>Que pena!</h1>
        <p>você errou a palavra {word}</p>
        <button onClick={reset} className={styles.button}>Jogar novamente</button>
      </div>
    )
  }

  return (
    <div className={styles.modal}>
      <h1 className={styles.title}>Parabéns!</h1>
      <p>você acertou a palavra {word}</p>

      <button onClick={reset} className={styles.button}>Jogar novamente</button>
    </div>
  )
}

export default ModalFeedback;