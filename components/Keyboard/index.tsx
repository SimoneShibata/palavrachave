import styles from '../../styles/Home.module.css'

type TKeyboardProps = {
  onClick: (character: string) => void
  onClickEnter: () => void
}

const Keyboard = ({ onClick, onClickEnter }: TKeyboardProps) => (
  <div className={styles.keyboard}>
    <div className={styles.rowKeyboard}>
      {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'].map(character => (
        <button
          key={`character-${character}`}
          className={styles.buttonKeyboard}
          onClick={() => onClick(character)}
        >
          {character.toLocaleUpperCase()}
        </button>
      ))}
    </div>
    <div className={styles.rowKeyboard}>
      {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'apagar'].map(character => (
        <button
          key={`character-${character}`}
          className={styles.buttonKeyboard}
          onClick={() => onClick(character)}
        >
          {character.toLocaleUpperCase()}
        </button>
      ))}
    </div>
    <div className={styles.rowKeyboard}>
      {['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(character => (
        <button
          key={`character-${character}`}
          className={styles.buttonKeyboard}
          onClick={() => onClick(character)}
        >
          {character.toLocaleUpperCase()}
        </button>
      ))}
      <button
        className={styles.buttonKeyboard}
        onClick={onClickEnter}
      >
        ENTER
      </button>
    </div>
  </div>
)

export default Keyboard;