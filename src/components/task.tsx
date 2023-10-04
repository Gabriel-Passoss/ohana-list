import { TaskProps } from '@/app/page'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { AiFillEdit, AiOutlineCheck } from 'react-icons/ai'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

interface TaskComponentProps {
  task: TaskProps
  handleDeleteTask: (id: string) => void
  handleSetIsChecked: (id: string) => void
  editTask: (id: string, title: string) => void
  selectTask: (id: string) => void
}

export function Task({
  task,
  handleDeleteTask,
  handleSetIsChecked,
  editTask,
  selectTask,
}: TaskComponentProps) {
  const [isOnEditMode, setIsOnEditMode] = useState(false)
  const [inputText, setInputText] = useState('')
  const [isSelected, setIsSelected] = useState(false)
  const inputRef = useRef<HTMLInputElement>(document.createElement('input'))

  function handleEditTask() {
    editTask(task.id, inputText)
    setIsOnEditMode(false)
    setInputText('')
  }

  function handleEditMode() {
    setIsOnEditMode((state) => !state)
    setInputText(task.title)
  }

  function handleSelectTask() {
    setIsSelected((state) => !state)
    selectTask(task.id)
  }

  useEffect(() => {
    if (isOnEditMode) {
      inputRef.current.focus()
    }
  }, [isOnEditMode])

  return (
    <Flex
      align="center"
      gap="0.75rem"
      bg="gray.400"
      w="100%"
      p="1rem"
      borderRadius="8px"
    >
      <Button bg="transparent" onClick={() => handleSetIsChecked(task.id)}>
        {task.isChecked ? (
          <Image
            src="/checked.svg"
            alt="mark as task completed icon"
            height={24}
            width={24}
          />
        ) : (
          <Image
            src="/uncheck.svg"
            alt="mark as task completed icon"
            height={24}
            width={24}
          />
        )}
      </Button>
      {isOnEditMode ? (
        <Input
          minW={screen.availWidth < 700 ? '41vw' : '31vw'}
          bg="gray.400"
          required
          ref={inputRef}
          onChange={(event) => setInputText(event.target.value)}
          value={inputText}
        />
      ) : (
        <Text
          textDecoration={task.isChecked ? 'line-through' : ''}
          minW={screen.availWidth < 700 ? '41vw' : '31vw'}
        >
          {task.title}
        </Text>
      )}
      <Button onClick={() => handleDeleteTask(task.id)}>
        <Image src="/trash.svg" alt="delete task icon" height={24} width={24} />
      </Button>
      {isOnEditMode ? (
        <Button color="green" onClick={handleEditTask}>
          <AiOutlineCheck />
        </Button>
      ) : (
        <Button color="yellow_button" onClick={handleEditMode}>
          <AiFillEdit />
        </Button>
      )}
      {isSelected ? (
        <Button onClick={handleSelectTask}>
          <Image
            src="/checked.svg"
            alt="delete task icon"
            height={23}
            width={23}
          />
        </Button>
      ) : (
        <Button onClick={handleSelectTask}>
          <Image
            src="/uncheck.svg"
            alt="delete task icon"
            height={23}
            width={23}
          />
        </Button>
      )}
    </Flex>
  )
}
