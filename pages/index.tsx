import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Attempts from '../components/Attempts'
import Keyboard from '../components/Keyboard'
import ModalFeedback from '../components/ModalFeedback'
import PreviousAttempts from '../components/PreviusAttempts'
import { randomWord } from '../helpers/randomWord'
import styles from '../styles/Home.module.css'
import { TAttemptCharacter } from '../types/TAttemptCharacter'

const Home: NextPage = () => {
  const [word, setWord] = useState('')
  const [focus, setFocus] = useState(0);
  const [numberAttempt, setNumberAttempt] = useState(0);
  const [currentAttempt, setCurrentAttempt] = useState<TAttemptCharacter[]>([]);
  const [attempts, setAttempts] = useState<Array<TAttemptCharacter>[]>([]);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [lettersBlack, setLettersBlack] = useState<string[]>([]);

  useEffect(() => {
    setWord(randomWord().toLocaleUpperCase());
  }, [])

  const handleClick = (index: number) => {
    setFocus(index);
  }

  const handleClickKeyboard = (character: string) => {
    let newCharacter = {
      character: character.toLocaleUpperCase(),
      color: ''
    };
    if (newCharacter.character === 'APAGAR') {
      newCharacter = {
        character: '',
        color: ''
      };
    }

    const newValue = [...currentAttempt];
    newValue[focus] = newCharacter;
    setCurrentAttempt(newValue);
    const nextBox = focus + 1;
    if (nextBox <= word.length - 1 && character !== 'apagar') {
      setFocus(nextBox);
    }
  }

  const handleClickEnter = () => {
    const allFieldsFilled = currentAttempt.length === word.length && currentAttempt.every(character => !!character?.character);
    
    if (allFieldsFilled) {
      const attempt = numberAttempt + 1

      const response = currentAttempt.map((box, index) => {
        let color = 'black';
        const wordArray = word.split('');

        if (wordArray.some(character => box.character === character)) {
          color = 'yellow';
        }

        if (wordArray[index] === box.character) {
          color = 'green';
        }

        if (color === 'black') {
          setLettersBlack(prevState => ([...prevState, box.character.toLocaleLowerCase()]));
        }

        return ({
          character: box.character,
          color
        });
      });

      setCurrentAttempt([]);
      const wordCorrect = response.every(attempt => attempt.color === 'green');
      const restAttempts = word.length - attempt;
      if (restAttempts < 0) {
        setAttempts([
          ...attempts,
          response
        ]);
        setFailure(!wordCorrect);
      } else {
        setAttempts([
          ...attempts,
          response,
          ...Array(restAttempts).fill([])
        ]);
      }
      
      setSuccess(wordCorrect);
      setNumberAttempt(attempt);
      setFocus(0);
    }
  }

  const reset = () => {
    setSuccess(false);
    setFailure(false);
    setNumberAttempt(0);
    setFocus(0);
    setAttempts([]);
    setCurrentAttempt([]);
    setLettersBlack([]);
  }

  return (
    <div className={styles.layout}>
      <ModalFeedback
        success={success} 
        failure={failure} 
        word={word} 
        reset={reset} 
      />
      <div>
        <h1 className={styles.title}>Descubra a palavra</h1>
        
        <PreviousAttempts attempts={attempts} />
        {numberAttempt <= word.length && (
          <div className={styles.attempt}>
            {word.split('').map((_: string, index: number) => {
              const styleFocus = focus === index ? styles.focus : '';

              return (
                <div 
                  key={index}
                  className={`${styles.input} ${styleFocus} ${styles.default}`}
                  onClick={() => handleClick(index)}
                >
                  {currentAttempt[index]?.character || ''}
                </div>
              )
            })}
          </div>
        )}
        <Attempts word={word} numberAttempt={numberAttempt} />
        <Keyboard 
          onClick={handleClickKeyboard} 
          onClickEnter={handleClickEnter}
          lettersBlack={lettersBlack}
        />
      </div>
    </div>
  )
}

export default Home
