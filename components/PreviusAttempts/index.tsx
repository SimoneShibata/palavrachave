import styles from '../../styles/Home.module.css'
import { TAttemptCharacter } from '../../types/TAttemptCharacter'

type TPreviousAttemptsProps = {
  attempts: Array<TAttemptCharacter>[]
}

const PreviousAttempts = ({ attempts }: TPreviousAttemptsProps) => {
  return (
    <>
      {attempts
        .filter(attempt => attempt.length > 0)
        .map((arrayCharacteres, i) => {
          return (
            <div key={i} className={styles.attempt}>
              {arrayCharacteres.map((box, index) => (
                <div 
                  key={index}
                  className={`${styles.input} ${styles[`${box.color}`]}`}
                >
                  {box.character}
                </div>
              ))}
            </div>
          )
        })
      }
    </>
  )
}

export default PreviousAttempts;