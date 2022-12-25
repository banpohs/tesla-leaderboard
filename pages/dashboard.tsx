import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

export default function Dashboard() {
  const { handleSubmit, register } = useForm()
  return (
    <Box px={20} pt={10}>
      <Heading size="xl" pb={8}>
        테슬라 RC카 대시보드
      </Heading>

      <Heading size="md" pt={4} pb={2}>
        기록 등록하기
      </Heading>
      <form
        onSubmit={handleSubmit(async (values) => {
          const res = await fetch('/api/leaderboard', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              KEY: localStorage.getItem('key') || '',
            },
            body: JSON.stringify({
              name: values.name,
              studentID: values.studentID,
              seconds: Number(values.seconds),
              staff: values.staff
            }),
          })
            .then((res) => res)
            .catch((err) => {
              err.json = () => err

              return err
            })

          if (res.status === 200) window.location.reload()
          else alert(JSON.stringify(await res.json()))
        })}
      >
        <FormControl>
          <Flex>
            <Box>
              <FormLabel>학번</FormLabel>
              <Input
                type="number"
                maxLength={5}
                placeholder="10729"
                width={24}
                mb={4}
                isRequired
                {...register('studentID')}
              />
            </Box>
            <Box ml={8}>
              <FormLabel>이름</FormLabel>
              <Input
                type="text"
                width={60}
                mb={4}
                isRequired
                {...register('name')}
              />
            </Box>
          </Flex>
          <FormLabel>시간 (초)</FormLabel>
          <Input
            type="number"
            width={24}
            mb={4}
            isRequired
            {...register('seconds')}
          />{' '}
          초<FormLabel>부원 여부</FormLabel>
          <Checkbox {...register('staff')} />
        </FormControl>
        <Button mt={4} type="submit">
          등록
        </Button>
      </form>

      <Heading size="md" pt={20} pb={2}>
        인증
      </Heading>
      <Button
        onClick={() => {
          const key = prompt('인증 키?', localStorage.getItem('key') || '')
          localStorage.setItem('key', key!)
        }}
      >
        인증키 등록
      </Button>
    </Box>
  )
}
