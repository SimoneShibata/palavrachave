import React from 'react'
import styles from '../../styles/Home.module.css'

type TKeyboardProps = {
  onClick: (character: string) => void
  onClickEnter: () => void
  lettersBlack: string[]
}

type TButtonProps = {
  className: string
  onClick: (character?: string | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode
}

const Button = ({ className, onClick, children }: TButtonProps) => (
  <button
    className={className}
    onClick={onClick}
  >
    {children}
  </button>
)

const Keyboard = ({ onClick, onClickEnter, lettersBlack }: TKeyboardProps) => {
  const getClassNames = (character: string) => (
    `${styles.buttonKeyboard} ${lettersBlack.includes(character) ? styles.keyboardBlack : ''}`
  )

  return (
    <div className={styles.keyboard}>
      <div className={styles.rowKeyboard}>
        {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'].map(character => (
          <Button
            key={`character-${character}`}
            onClick={() => onClick(character)}
            className={getClassNames(character)}
          >
            {character.toLocaleUpperCase()}
          </Button>
        ))}
      </div>
      <div className={styles.rowKeyboard}>
        {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'apagar'].map(character => (
          <Button
            key={`character-${character}`}
            onClick={() => onClick(character)}
            className={getClassNames(character)}
          >
            {character.toLocaleUpperCase()}
          </Button>
        ))}
      </div>
      <div className={styles.rowKeyboard}>
        {['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(character => (
          <Button
            key={`character-${character}`}
            onClick={() => onClick(character)}
            className={getClassNames(character)}
          >
            {character.toLocaleUpperCase()}
          </Button>
        ))}
        <Button
          onClick={onClickEnter}
          className={styles.buttonKeyboard}
        >
          ENTER
        </Button>
      </div>
    </div>
  )
}

export default Keyboard;