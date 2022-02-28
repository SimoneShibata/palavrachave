import styles from '../../styles/Home.module.css'

type TAttemptsProps = {
  word: string
  numberAttempt: number
};

const Attempts = ({ word = '', numberAttempt = 0 }: TAttemptsProps) => {
  const restAttempts = word.length - numberAttempt;
  if (restAttempts < 0) {
    return null;
  }
  
  return (
    <>
      { 
        Array(restAttempts).fill('')
          .map((_, i) => (
            <div key={i} className={styles.attempt}>
              {word.split('').map((_, index) => (
                <div 
                  key={index}
                  className={`${styles.input} ${styles.disabled}`}
                />
              ))}
            </div>
          ))
      }
    </>
  )
}

export default Attempts;